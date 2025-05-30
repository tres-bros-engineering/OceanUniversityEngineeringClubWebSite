import React, { useEffect } from "react";

const UseTitleName = (title) => {
  useEffect(() => {
    document.title = title;
  }, [])
}

export default UseTitleName;