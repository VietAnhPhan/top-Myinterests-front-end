import api from "../../../api";
import styles from "../../../Button.module.css";
import Avatar from "../../Avatar";

const SentFriendRequest = ({ sentRequests }) => {
  
  async function handleRevoke(id) {
    await api.revokeInvitation(id);
  }

  return (
    <>
      <p className="dark:text-gray-50">Sent requests</p>
      {sentRequests.length > 0 && (
        <ul className="flex flex-col gap-y-4">
          {sentRequests.map((sentRequest) => (
            <li
              className="dark:text-gray-50 flex items-center"
              key={sentRequest.id}
            >
              <div className="flex flex-1 gap-x-4">
                <Avatar user={sentRequest.receiver} type={"chatFrame"}></Avatar>
                <span className="flex-1">{sentRequest.receiver.name}</span>
              </div>

              <button
                className={styles.rejectButton}
                onClick={() => handleRevoke(sentRequest.id)}
              >
                Revoke request
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SentFriendRequest;
