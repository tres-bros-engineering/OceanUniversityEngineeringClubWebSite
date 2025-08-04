import { createContext, useContext, useEffect, useState } from "react";
import ApiRoutes from "../api/ApiRoutes";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [admin, setAdmin] = useState([]);
  const [articles, setArticles] = useState([]);
  const [news, setNews] = useState([]);
  const [comments, setComments] = useState([]);

  const [isPendingAdmin, setIsPendingAdmin] = useState(true);
  const [isPendingArticles, setIsPendingArticles] = useState(true);
  const [isPendingNews, setIsPendingNews] = useState(true);
  const [isPendingComments, setIsPendingComments] = useState(true);

  const [errorAdmin, setErrorAdmin] = useState(null);
  const [errorArticles, setErrorArticles] = useState(null);
  const [errorNews, setErrorNews] = useState(null);
  const [errorComments, setErrorComments] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      getAdmin();
      getArticle();
      getNews();
      getComment();
    }, 1000);
  }, []);

  // Get data from APIs
  const getAdmin = () => {
    fetch(ApiRoutes.ADMIN)
      .then((res) => {
        if(!res.ok) {
          throw Error("Could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setAdmin(data);
        setIsPendingAdmin(false);
        setErrorAdmin(null);
      }).catch(err => {
        setIsPendingAdmin(false);
        setErrorAdmin(err.message);
      });
  };

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
      value={{ admin, articles, news, comments, getAdmin, getArticle, getNews, getComment, isPendingAdmin, isPendingArticles, 
        isPendingNews, isPendingComments, errorAdmin, errorArticles, errorNews, errorComments 
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
