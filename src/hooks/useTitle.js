import { useEffect } from "react";

function useTitle(title) {
  useEffect(() => {
    document.title = title + " | Social Media";
  }, [title]);
}

export default useTitle;
