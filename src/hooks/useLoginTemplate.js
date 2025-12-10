import { useState } from "react";

export function useLoginTemplate() {
  const [template, setTemplate] = useState("1-column");
  return {
    template,
    setTemplate,
  };
}
