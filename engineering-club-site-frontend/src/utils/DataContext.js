import { createContext, useContext, useEffect, useState } from "react";
import ApiRoutes from "../api/ApiRoutes";
import axios from 'axios';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [superadmin, setSuperAdmin] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [articles, setArticles] = useState([]);
  const [news, setNews] = useState([]);
  const [comments, setComments] = useState([]);

  const [isPendingSuperAdmin, setIsPendingSuperAdmin] = useState(true);
  const [isPendingAdmin, setIsPendingAdmin] = useState(true);
  const [isPendingArticles, setIsPendingArticles] = useState(true);
  const [isPendingNews, setIsPendingNews] = useState(true);
  const [isPendingComments, setIsPendingComments] = useState(true);

  const [errorSuperAdmin, setErrorSuperAdmin] = useState(null);
  const [errorAdmin, setErrorAdmin] = useState(null);
  const [errorArticles, setErrorArticles] = useState(null);
  const [errorNews, setErrorNews] = useState(null);
  const [errorComments, setErrorComments] = useState(null);

  useEffect(() => {
      getSuperAdmin();
      getAdmin();
      getArticle();
      getNews();
      getComment();
  }, []);

  // Get data from APIs
  const getSuperAdmin = () => {
    axios.get(ApiRoutes.SUPERADMIN.GET)
      .then((res) => {
        setSuperAdmin(res.data);
        setIsPendingSuperAdmin(false);
        setErrorSuperAdmin(null);
      }).catch(err => {
        setIsPendingSuperAdmin(false);
        setErrorSuperAdmin(err.message);
      });
  };

  const getAdmin = () => {
    axios.get(ApiRoutes.ADMIN.GET)
      .then((res) => {
        setAdmin(res.data);
        setIsPendingAdmin(false);
        setErrorAdmin(null);
      }).catch(err => {
        setIsPendingAdmin(false);
        setErrorAdmin(err.message);
      });
  };

  const getArticle = () => {
    axios.get(ApiRoutes.ARTICLE.GET)
      .then((res) => {
        setArticles(res.data);
        setIsPendingArticles(false);
        setErrorArticles(null);
      }).catch(err => {
        setIsPendingArticles(false);
        setErrorArticles(err.message);
      });
  };

  const getNews = () => {
    axios.get(ApiRoutes.NEWS.GET)
      .then((res) => {
        setNews(res.data);
        setIsPendingNews(false);
        setErrorNews(null);
      }).catch(err => {
        setIsPendingNews(false);
        setErrorNews(err.message);
      });
  };

  const getComment = () => {
    axios.get(ApiRoutes.COMMENT.GET)
      .then((res) => {
        setComments(res.data);
        setIsPendingComments(false);
        setErrorComments(null);
      }).catch(err => {
        setIsPendingComments(false);
        setErrorComments(err.message);
      });
  };

  return (
    <DataContext.Provider 
      value={{ superadmin, admin, articles, news, comments, getSuperAdmin, getAdmin, getArticle, getNews, getComment, isPendingSuperAdmin, isPendingAdmin, isPendingArticles, 
        isPendingNews, isPendingComments, errorSuperAdmin, errorAdmin, errorArticles, errorNews, errorComments 
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
