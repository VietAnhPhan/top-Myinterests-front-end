import { useEffect, useState } from "react";

export function useLoginTemplate() {
  const [template, setTemplate] = useState("");

  useEffect(() => {
    setTemplate("1-column");
  },[]);

  return template;
}
