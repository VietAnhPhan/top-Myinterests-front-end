import { useContext, useEffect, useRef, useState } from "react";
import { HeaderContext } from "../../Context";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Heading1 from "../Heading/Heading1";
import { ContentWrapper, ContentWrapperNoBorder } from "../Utilities/Utilities";
import api from "../../api";
import People from "../People/People";
import { Button } from "../Button";
import Post from "../Post/Post";
import { WarningToast } from "../Toast";

function Search() {
  const headerContext = useContext(HeaderContext);
  const inputRef = useRef(null);
  const [people, setPeople] = useState([]);
  const [posts, setPosts] = useState([]);
  const [instruction, setInstruction] = useState(true);
  const countResult = people.length + posts.length;
  const searchTerm = inputRef.current ? inputRef.current.value : "";
  const [activeTab, setActiveTab] = useState("all");
  const [error, setError] = useState("");

  useEffect(() => {
    headerContext.setactiveMenuItem("search");
  }, []);

  async function handleSearch() {
    const searchTerm = inputRef.current.value;

    if (searchTerm == "") {
      setError("Your content should not be empty!");
      return;
    }

    const searchedPeople = await api.getSearchPeople(searchTerm);
    const searchedPosts = await api.getSearchedPosts(searchTerm);

    setPeople(searchedPeople);
    setPosts(searchedPosts);
    setInstruction(false);
  }

  return (
    <>
      {error !== "" && <WarningToast message={error} />}
      <div className="overflow-auto">
        <Heading1 text="Search" />
        <p className="mt-3">Find posts, people, and topics</p>

        {/* Search input & button */}
        <ContentWrapper>
          <div className="flex gap-x-2 ">
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for anything..."
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

        {/* Instruction */}
        {instruction && (
          <ContentWrapper>
            <div className="text-center my-5">
              <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 inline-block p-7 rounded-full text-white">
                <SearchOutlinedIcon fontSize="large" />
              </div>
              <h3 className="text-xl mt-5">Start searching</h3>
              <p className="text-gray-500 mt-5">
                Enter a keyword to find posts, people, and topics
              </p>
            </div>
          </ContentWrapper>
        )}

        {countResult > 0 && (
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
            <ContentWrapper paddingBlock="p-1">
              <div className="flex justify-around">
                <p
                  className="hover:cursor-pointer"
                  onClick={() => setActiveTab("all")}
                >
                  All ({countResult})
                </p>
                <p
                  className="hover:cursor-pointer"
                  onClick={() => setActiveTab("posts")}
                >
                  Posts ({posts.length})
                </p>
                <p
                  className="hover:cursor-pointer"
                  onClick={() => setActiveTab("people")}
                >
                  People ({people.length})
                </p>
              </div>
            </ContentWrapper>
          </>
        )}

        {activeTab == "all" && (
          <>
            {people.length > 0 && (
              <div className="mt-10">
                <p>People</p>
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-5">
                  {people.map((person) => (
                    <People key={person.id} user={person} />
                  ))}
                </div>
              </div>
            )}

            {posts.length > 0 && (
              <div className="mt-10">
                <p>Posts</p>

                <div className="grid grid-cols-1 gap-y-5">
                  {posts.map((post) => (
                    <Post key={post.id} author={post.author} post={post} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {activeTab == "posts" && (
          <>
            {posts.length > 0 && (
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
            )}
          </>
        )}

        {activeTab == "people" && (
          <>
            {people.length > 0 && (
              <div className="mt-10">
                <p>People</p>
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-5">
                  {people.map((person) => (
                    <People key={person.id} user={person} />
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

export default Search;
