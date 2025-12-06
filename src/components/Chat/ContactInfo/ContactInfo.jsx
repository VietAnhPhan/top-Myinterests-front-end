import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../Context";
import Avatar from "../../Avatar/Avatar";
import {
  UserMinus,
  UserRoundPlus,
  UserRoundX,
  UserRoundCheck,
  UserRoundMinus,
} from "lucide-react";
import styles from "./ContactInfo.module.css";

import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import useAPI from "../../../hooks/useAPI";

const ContactInfo = ({ currentContact }) => {
  const api = useAPI();
  const userContext = useContext(UserContext);
  const [requestStatus, setrequestStatus] = useState("");
  const [friendRequest, setFriendRequest] = useState(null);
  const [followRequestStatus, setFollowRequestStatus] = useState(null);

  useEffect(() => {
    async function fetchInvitations() {
      if (active) {
        const invitation = await api.friendRequest.getInvitation(
          currentContact.id
        );

        if (invitation && invitation.status === "pending") {
          setrequestStatus("pending");
        }

        if (
          (invitation && invitation.status === "cancel") ||
          (invitation && invitation.status === "rejected") ||
          !invitation
        ) {
          setrequestStatus("");
        }

        if (invitation && invitation.status === "accepted") {
          setrequestStatus("accepted");
        }

        setFriendRequest(invitation);
      }
    }

    async function fetchFollowRequest() {
      if (active) {
        const followRequest = await api.follow.getFollowRequest(
          userContext.id,
          currentContact.id
        );

        if (followRequest && followRequest.status === "following") {
          setFollowRequestStatus("Following");
        }
        if (followRequest && followRequest.status === "unfollow") {
          setFollowRequestStatus("Follow");
        }
      }
    }

    let active = true;
    fetchInvitations();
    fetchFollowRequest();
    return () => {
      active = false;
    };
  }, [currentContact.id, userContext.id]);

  async function handleSent() {
    await api.friendRequest.sendInvitation(currentContact.id);
    const invitation = await api.getInvitation(currentContact.id);
    setrequestStatus("pending");
    setFriendRequest(invitation);
  }

  async function handleRevoke() {
    await api.friendRequest.revokeInvitation(friendRequest.id);
    setrequestStatus("");
  }

  async function handleAccept() {
    await api.friendRequest.acceptInvitation(friendRequest.id);
    setrequestStatus("accepted");
  }

  async function handleReject() {
    await api.friendRequest.rejectInvitation(friendRequest.id);
    setrequestStatus("");
  }

  async function handleUnfriend() {
    await api.friendRequest.unfriend(friendRequest.id, currentContact.id);
    setrequestStatus("");
  }

  return (
    <div className="bg-white rounded-xl border-2 border-blue-200 dark:border-l-slate-700 py-4 px-6 gap-x-4 dark:bg-slate-900 z-10">
      <p className="dark:text-gray-50">Contact info</p>
      <div className="flex flex-col items-center mt-5">
        <Avatar user={currentContact} type={"infoFrame"}></Avatar>

        <p className="dark:text-gray-50 mt-3">
          {currentContact ? currentContact.fullname : ""}
        </p>
        <p className="dark:text-gray-50">
          @{currentContact ? currentContact.username : ""}
        </p>

        {/* Display invitation request */}
        <div className="hover:cursor-pointer w-full">
          {requestStatus === "pending" &&
            friendRequest &&
            friendRequest.senderId === userContext.id && (
              <div
                onClick={handleRevoke}
                className="flex gap-x-3 font-semibold"
              >
                <UserRoundMinus className={styles.icon} />
                <p className="text-green-500">Revoke invitation</p>
              </div>
            )}

          {requestStatus === "pending" &&
            friendRequest &&
            friendRequest.receiverId === userContext.id && (
              <div className="flex gap-x-3">
                <div
                  onClick={handleAccept}
                  className="flex gap-3 font-semibold"
                >
                  <UserRoundCheck className={styles.icon} />
                  <p className="text-green-500">Accept invitation</p>
                </div>
                <div onClick={handleReject} className="flex gap-3">
                  <UserRoundX className={styles.icon} />
                  <p className="text-green-500 font-semibold">
                    Reject invitation
                  </p>
                </div>
              </div>
            )}

          {requestStatus === "" && (
            <div onClick={handleSent} className="flex gap-3">
              <UserRoundPlus className={styles.icon} />
              <p className="text-green-500 font-semibold">Sent invitation</p>
            </div>
          )}

          {requestStatus === "accepted" && (
            <div className="flex gap-x-3">
              <div
                onClick={handleUnfriend}
                className="flex gap-3 font-semibold"
              >
                <UserRoundX className={styles.icon} />
                <p className="text-green-500">Unfriend</p>
              </div>
            </div>
          )}

          {followRequestStatus === "Following" && (
            <div
              onClick={handleUnfriend}
              className="flex gap-3 font-semibold bg-gray-300 w-full py-1 px-2 rounded-lg"
            >
              <DoneOutlinedIcon className={styles.icon} />
              <p>Following</p>
            </div>
          )}
        </div>
      </div>

      <p className="dark:text-gray-400 mt-5">About</p>
      <p className="dark:text-gray-50">
        {currentContact && currentContact.about}
      </p>

      <p className="dark:text-gray-400 mt-4">Email</p>
      <p className="dark:text-gray-50">
        {currentContact && currentContact.email}
      </p>
      <p className="dark:text-gray-400 mt-4">Phone number</p>
      <p className="dark:text-gray-50">
        {currentContact && currentContact.phone}
      </p>
    </div>
  );
};

export default ContactInfo;
