import { useContext, useEffect, useState } from "react";
import Heading1 from "../Heading/Heading1";
import LikeNotification from "./LikeNotification";
import { ContentWrapper } from "../utilities/Utilities";
import { HeaderContext } from "../../Context";
import useTitle from "../../hooks/useTitle";
import useAPI from "../../hooks/useAPI";
import { useLoaderData } from "react-router";

function Notifications() {
  useTitle("Notifications");
  const user = useLoaderData();
  const api = useAPI(user.token);
  const [notifications, setNotifications] = useState([]);
  const headerContext = useContext(HeaderContext);

  useEffect(() => {
    async function fetchData() {
      const notifications = await api.notification.getNotifications();

      setNotifications(notifications);
      headerContext.setactiveMenuItem("notifications");
    }
    fetchData();
  }, []);

  return (
    <>
      <Heading1 text="Notifications" />
      <p className="mt-3">Stay updated with your interactions</p>
      {notifications.length > 0 && (
        <>
          <ul>
            {notifications.map(
              (notification) =>
                notification.type === "like" && (
                  <ContentWrapper key={notification.id}>
                    <LikeNotification data={notification} />
                  </ContentWrapper>
                )
            )}
          </ul>
        </>
      )}
    </>
  );
}

export default Notifications;
