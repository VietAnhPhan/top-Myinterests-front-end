import { Button } from "../Button";
import { ContentWrapper } from "../utilities/Utilities";

function Following(props) {
  return (
    <>
      <ContentWrapper>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col items-center flex-1 gap-x-5">
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
          <Button text="Unfollow" />
        </div>
      </ContentWrapper>
    </>
  );
}

export default Following;
