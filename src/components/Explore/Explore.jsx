import { useContext, useEffect, useRef, useState } from "react";
import { HeaderContext } from "../../Context";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Heading1 from "../Heading/Heading1";
import { ContentWrapper, ContentWrapperNoBorder } from "../utilities/Utilities";
import People from "../People/Person";
import { Button } from "../Button";
import Post from "../Post/Post";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import useTitle from "../../hooks/useTitle";
import useAPI from "../../hooks/useAPI";
import { useLoaderData } from "react-router";

function Explore() {
  useTitle("Explore");
  const user = useLoaderData();
  const api = useAPI(user.token);
  const headerContext = useContext(HeaderContext);
  const inputRef = useRef(null);
  const [people, setPeople] = useState([]);
  const [posts, setPosts] = useState([]);
  const countResult = people.length + posts.length;
  const searchTerm = inputRef.current ? inputRef.current.value : "";
  const [activeTab, setActiveTab] = useState("trending");

  useEffect(() => {
    async function fetchData() {
      const topPeople = await api.people.getTopPeople();
      const trendingPosts = await api.post.getTrendingPosts();

      setPeople(topPeople);
      setPosts(trendingPosts);
      headerContext.setactiveMenuItem("explore");
    }

    fetchData();
  }, []);

  async function handleSearch() {
    const searchTerm = inputRef.current.value;

    if (searchTerm == "") return;

    const searchedPeople = await api.people.getSearchPeople(searchTerm);
    const searchedPosts = await api.post.getSearchedPosts(searchTerm);

    setPeople(searchedPeople);
    setPosts(searchedPosts);
  }

  return (
    <>
      <div className="overflow-auto">
        <Heading1 text="Explore" />
        <p className="mt-3">Discover trending topics, posts, and people</p>

        {/* Search input & button */}
        <ContentWrapper>
          <div className="flex gap-x-2 ">
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for posts, people or topics..."
                className="pl-10 py-2 w-full rounded-lg bg-gray-100"
              />
              <SearchOutlinedIcon className="absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>

            <Button
              text="Search"
              callback={handleSearch}
              icon={<SearchOutlinedIcon />}
            ></Button>
          </div>
        </ContentWrapper>

        {searchTerm !== "" && countResult > 0 && (
          <>
            <p className="mt-5">
              Found{" "}
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                {countResult}
              </span>{" "}
              results for{" "}
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                "{searchTerm}"
              </span>
            </p>
          </>
        )}

        {/* Tabs */}

        <ContentWrapper paddingBlock="p-1">
          <div className="flex justify-around">
            <p
              className="flex items-center gap-x-2 hover:cursor-pointer"
              onClick={() => setActiveTab("trending")}
            >
              <TrendingUpOutlinedIcon fontSize="small" /> Trending
            </p>
            <p
              className="flex items-center gap-x-2 hover:cursor-pointer"
              onClick={() => setActiveTab("topics")}
            >
              <TagOutlinedIcon fontSize="small" /> Topics
            </p>
            <p
              className="flex items-center gap-x-2 hover:cursor-pointer"
              onClick={() => setActiveTab("people")}
            >
              <AutoAwesomeOutlinedIcon fontSize="small" /> People
            </p>
          </div>
        </ContentWrapper>

        {activeTab == "trending" && (
          <>
            {posts.length > 0 && (
              <div className="mt-10">
                <p>Posts</p>

                <div className="grid grid-cols-1 gap-5">
                  {posts.map((post) => (
                    <Post key={post.id} author={post.author} post={post} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {activeTab == "topics" && (
          <>
            {/* {posts.length > 0 && (
              <div className="mt-10">
                <p>Posts</p>

                <div className="grid grid-cols-1 gap-y-5">
                  {posts.map((post) => (
                    <ContentWrapperNoBorder key={post.id}>
                      <Post author={post.author} post={post} />
                    </ContentWrapperNoBorder>
                  ))}
                </div>
              </div>
            )} */}
          </>
        )}

        {activeTab == "people" && (
          <>
            {people.length > 0 && (
              <div className="mt-10">
                <p>People</p>
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-5">
                  {people.map((person) => (
                    <People key={person.id} person={person} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Explore;
