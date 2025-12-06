import Heading1 from "./Heading/Heading1";
import { useContext, useEffect, useState } from "react";
import { ContentWrapper } from "./utilities/Utilities";
import { HeaderContext, UserContext } from "../Context";
import Following from "./People/Following";
import useTitle from "../hooks/useTitle";
import useAPI from "../hooks/useAPI";

function FriendList() {
  useTitle("Friends");
  const api = useAPI();
  const [activeTab, setActiveTab] = useState("Followers");
  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);
  const headerContext = useContext(HeaderContext);

  useEffect(() => {
    async function fetchData() {
      const followings = await api.follow.getFollowings();
      const followers = await api.follow.getFollowers();

      setFollowings(followings);
      setFollowers(followers);
      headerContext.setactiveMenuItem("friends");
    }

    fetchData();
  }, []);

  return (
    <>
      <Heading1 text="Friends & Connections" />
      <p className="mt-3">Manage your social connections</p>

      {/* Tabs */}

      <ContentWrapper paddingBlock="p-0.5" bgColor="bg-gray-200">
        <div className="flex justify-around">
          <p
            className={`text-center flex-1 hover:cursor-pointer py-0.5 ${
              activeTab === "Followers" && "bg-white rounded-lg"
            } `}
            onClick={() => setActiveTab("Followers")}
          >
            Followers
          </p>
          <p
            className={`text-center flex-1 hover:cursor-pointer py-0.5 ${
              activeTab === "Following" && "bg-white rounded-lg"
            }`}
            onClick={() => setActiveTab("Following")}
          >
            Following
          </p>
        </div>
      </ContentWrapper>

      {activeTab === "Followers" && (
        <div className="grid grid-cols-3 gap-5">
          {followers.map((follower) => (
            <Following key={follower.id} person={follower.follower} />
          ))}
        </div>
      )}

      {activeTab === "Following" && (
        <div className="grid grid-cols-3 gap-5">
          {followings.map((following) => (
            <Following key={following.id} person={following.followee} />
          ))}
        </div>
      )}
    </>
  );
}

export default FriendList;
