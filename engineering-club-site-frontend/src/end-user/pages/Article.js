import React from "react";
import { useLocation } from "react-router-dom";

function Article() {
  const location = useLocation();

  const lastSegment = location.pathname.split("/").filter(Boolean).pop() || "";
  const capitalized = lastSegment.replace(/\b\w/g, (char) => char.toUpperCase());
  const formattedPath = capitalized.replace(/-/g, " ");

  return (
    <h1>Welcome to The {formattedPath} Page.</h1>
  );
}

export default Article;
