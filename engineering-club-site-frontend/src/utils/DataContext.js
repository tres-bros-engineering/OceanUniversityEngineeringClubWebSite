import { createContext, useContext, useEffect, useState } from "react";
import db from "../data/db.json";
import ApiRoutes from "../api/ApiRoutes";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [news, setNews] = useState([]);
  const [comments, setComments] = useState([]);

  const [isPendingArticles, setIsPendingArticles] = useState(true);
  const [isPendingNews, setIsPendingNews] = useState(true);
  const [isPendingComments, setIsPendingComments] = useState(true);

  const [errorArticles, setErrorArticles] = useState(null);
  const [errorNews, setErrorNews] = useState(null);
  const [errorComments, setErrorComments] = useState(null);

  useEffect(() => {
    // Uncomment this after creating backend part or using fake APIs like json server (Remember to change the url if it doesn't match)
    setTimeout(() => {
      getArticle();
      getNews();
      getComment();
    }, 1000);

    // Remove or comment this after creating backend part or using fake APIs like json server (This helps to fetch data directly from db.json)
    // setArticles(db.article);
    // setNews(db.news);
    // setComments(db.comment);
  }, []);

  // Get data from APIs
  const getArticle = () => {
    fetch(ApiRoutes.ARTICLE)
      .then((res) => {
        if(!res.ok) {
          throw Error("Could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setArticles(data);
        setIsPendingArticles(false);
        setErrorArticles(null);
      }).catch(err => {
        setIsPendingArticles(false);
        setErrorArticles(err.message);
      });
  };

  const getNews = () => {
    fetch(ApiRoutes.NEWS)
      .then((res) => {
        if(!res.ok) {
          throw Error("Could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setNews(data);
        setIsPendingNews(false);
        setErrorNews(null);
      }).catch(err => {
        setIsPendingNews(false);
        setErrorNews(err.message);
      });
  };

  const getComment = () => {
    fetch(ApiRoutes.COMMENT)
      .then((res) => {
        if(!res.ok) {
          throw Error("Could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setComments(data);
        setIsPendingComments(false);
        setErrorComments(null);
      }).catch(err => {
        setIsPendingComments(false);
        setErrorComments(err.message);
      });
  };

  return (
    <DataContext.Provider 
      value={{ articles, news, comments, getArticle, getNews, getComment, isPendingArticles, 
        isPendingNews, isPendingComments, errorArticles, errorNews, errorComments 
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
