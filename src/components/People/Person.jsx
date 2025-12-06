import { useContext, useState } from "react";
import { Button } from "../Button";
import { ContentWrapper } from "../utilities/Utilities";
import { UserContext } from "../../Context";
import useAPI from "../../hooks/useAPI";

function Person(props) {
  const api = useAPI();
  const userContext = useContext(UserContext);
  const [followStatus, setFollowStatus] = useState(
    isFollowing(userContext.id, props.person.followee)
  );

  async function handleFollow() {
    const followRequest = await api.follow.followPerson(
      userContext.id,
      props.person.id
    );
    if (followRequest) {
      setFollowStatus(true);
    }
  }
  return (
    <>
      <ContentWrapper>
        <div className="flex justify-between">
          <div className="flex items-center flex-1 gap-x-5">
            <img
              src={props.person.avatarPath}
              alt={`${props.person.fullname}'s avatar`}
              className="max-w-16 rounded-full"
            />
            <div>
              <p>{props.person.fullname}</p>
              <p className="text-sm text-gray-500">@{props.person.username}</p>
              <p>{props.person.bio}</p>
            </div>
          </div>
          <Button
            className="self-start"
            text={followStatus ? "Following" : "Follow"}
            callback={handleFollow}
          />
        </div>
      </ContentWrapper>
    </>
  );
}

export default Person;

function isFollowing(followerId, followers) {
  const isFollowing = followers.map((follower) => {
    if (follower.followerId === followerId) {
      return true;
    }
  });

  if (isFollowing.length > 0) {
    return true;
  }
  return false;
}
