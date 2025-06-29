import { useEffect } from "react";

const UseTitleName = (title) => {
  useEffect(() => {
    document.title = title;
  }, [title])
}

export default UseTitleName;