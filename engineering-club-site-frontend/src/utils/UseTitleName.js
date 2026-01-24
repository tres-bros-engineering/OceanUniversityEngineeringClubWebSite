import { useEffect } from "react";

const UseTitleName = (title) => {
  useEffect(() => {
    document.title = title + " | OCU Engineering Club";
  }, [title])
}

export default UseTitleName;