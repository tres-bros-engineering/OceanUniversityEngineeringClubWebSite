import { createContext, useContext, useEffect, useState } from "react";
import db from "../data/db.json";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [news, setNews] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Uncomment this after creating backend part or using fake APIs like json server (Remember to change the url if it doesn't match)

    // fetch("http://localhost:3001/article")
    //   .then((res) => res.json())
    //   .then(setArticles);

    // fetch("http://localhost:3001/news")
    //   .then((res) => res.json())
    //   .then(setNews);

    // fetch("http://localhost:3001/comment")
    //   .then((res) => res.json())
    //   .then(setComments);

    // Remove or comment this after creating backend part or using fake APIs like json server (This helps to fetch data directly from db.json)
    setArticles(db.article);
    setNews(db.news);
    setComments(db.comment);
  }, []);

  return (
    <DataContext.Provider value={{ articles, news, comments }}>
      {children}
    </DataContext.Provider>
  );
};
