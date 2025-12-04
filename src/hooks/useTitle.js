import { useEffect } from "react";

function useTitle(title) {
  useEffect(() => {
    document.title = title + " | Gotoplaces";
  }, [title]);
}

export default useTitle;
