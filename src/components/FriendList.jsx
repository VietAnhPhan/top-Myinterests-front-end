import Heading1 from "./Heading/Heading1";
import { useEffect, useState } from "react";
import { ContentWrapper } from "./Utilities/Utilities";
import api from "../api";
import { UserContext } from "../Context";
import Following from "./People/Following";

function FriendList() {
  const [activeTab, setActiveTab] = useState("Followers");
  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const followings = await api.getFollowings();
      const followers = await api.getFollowers();

      setFollowings(followings);
      setFollowers(followers);
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
