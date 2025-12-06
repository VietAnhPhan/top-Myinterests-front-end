import api from "../../../api";
import styles from "../../../Button.module.css";
import Avatar from "../../Avatar/Avatar";

const ReceivingFriendRequest = ({ receivingRequests }) => {
  async function handleAccept(id) {
    await api.acceptInvitation(id);
  }

  async function handleReject(id) {
    await api.rejectInvitation(id);
  }

  return (
    <>
      <p className="dark:text-gray-50 mt-3">Receiving requests</p>
      {receivingRequests.length > 0 && (
        <ul className="flex flex-col gap-y-4">
          {receivingRequests.map((request) => (
            <li
              className="dark:text-gray-50 flex items-center"
              key={request.sender.id}
            >
              <div className="flex flex-1 items-center gap-x-4">
                <Avatar user={request.sender} type={"chatFrame"}></Avatar>
                <span>{request.sender.name}</span>
              </div>
              <button
                className={styles.acceptButton}
                onClick={() => handleAccept(request.id)}
              >
                Accept
              </button>
              <button
                className={styles.rejectButton}
                onClick={() => handleReject(request.id)}
              >
                Reject
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ReceivingFriendRequest;
