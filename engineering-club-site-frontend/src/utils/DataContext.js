import { createContext, useContext, useEffect, useState } from "react";
import Axios from 'axios';

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
      getArticles();
      getNews();
      getComments();
    
  }, []);

  //axios functions
  const getSuperAdmin = () =>{
        Axios.get('http://localhost:3001/api/superadmin')
        .then(response => {
            setSuperAdmin(response.data?.response || [])
            setIsPendingSuperAdmin(false);
            setErrorSuperAdmin(null);
        })
        .catch(error => {
            console.error('axios error: ', error)
            setIsPendingSuperAdmin(false);
            setErrorSuperAdmin(error);
          })
    };

    const getAdmin = () =>{
        Axios.get('http://localhost:3001/api/admin')
        .then(response => {
            setAdmin(response.data?.response || [])
            setIsPendingAdmin(false);
            setErrorAdmin(null);
        })
        .catch(error => {
            console.error('axios error: ', error)
            setIsPendingAdmin(false);
            setErrorAdmin(error);
          })
    };
  
  const getArticles = () =>{
        Axios.get('http://localhost:3001/api/articles')
        .then(response => {
            setArticles(response.data?.response || [])
            setIsPendingArticles(false);
            setErrorArticles(null);
        })
        .catch(error => {
            console.error('axios error: ', error)
            setIsPendingArticles(false);
            setErrorArticles(error);
          })
    };

    const getNews = () =>{
        Axios.get('http://localhost:3001/api/news')
        .then(response => {
            setNews(response.data?.response || [])
            setIsPendingNews(false);
            setErrorNews(null);
          })
        .catch(error => {
            console.error('axios error: ', error)
            setIsPendingNews(false);
            setErrorNews(error);
          })
    };

    const getComments = () =>{
        Axios.get('http://localhost:3001/api/comments')
        .then(response => {
            setComments(response.data?.response || [])
            setIsPendingComments(false);
            setErrorComments(null);
          })
        .catch(error => {
            console.error('axios error: ', error)
            setIsPendingComments(false);
            setErrorComments(error);
        
          })
    };
  
  
  
  
  // Get data from APIs
  // const getSuperAdmin = () => {
  //   fetch(ApiRoutes.SUPERADMIN)
  //     .then((res) => {
  //       if(!res.ok) {
  //         throw Error("Could not fetch the data for that resource");
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setSuperAdmin(data);
  //       setIsPendingSuperAdmin(false);
  //       setErrorSuperAdmin(null);
  //     }).catch(err => {
  //       setIsPendingSuperAdmin(false);
  //       setErrorSuperAdmin(err.message);
  //     });
  // };

  // const getAdmin = () => {
  //   fetch(ApiRoutes.ADMIN)
  //     .then((res) => {
  //       if(!res.ok) {
  //         throw Error("Could not fetch the data for that resource");
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setAdmin(data);
  //       setIsPendingAdmin(false);
  //       setErrorAdmin(null);
  //     }).catch(err => {
  //       setIsPendingAdmin(false);
  //       setErrorAdmin(err.message);
  //     });
  // };

  // const getArticle = () => {
  //   fetch(ApiRoutes.ARTICLE)
  //     .then((res) => {
  //       if(!res.ok) {
  //         throw Error("Could not fetch the data for that resource");
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setArticles(data);
  //       setIsPendingArticles(false);
  //       setErrorArticles(null);
  //     }).catch(err => {
  //       setIsPendingArticles(false);
  //       setErrorArticles(err.message);
  //     });
  // };

  // const getNews = () => {
  //   fetch(ApiRoutes.NEWS)
  //     .then((res) => {
  //       if(!res.ok) {
  //         throw Error("Could not fetch the data for that resource");
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setNews(data);
  //       setIsPendingNews(false);
  //       setErrorNews(null);
  //     }).catch(err => {
  //       setIsPendingNews(false);
  //       setErrorNews(err.message);
  //     });
  // };

  // const getComment = () => {
  //   fetch(ApiRoutes.COMMENT)
  //     .then((res) => {
  //       if(!res.ok) {
  //         throw Error("Could not fetch the data for that resource");
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setComments(data);
  //       setIsPendingComments(false);
  //       setErrorComments(null);
  //     }).catch(err => {
  //       setIsPendingComments(false);
  //       setErrorComments(err.message);
  //     });
  // };

  return (
    <DataContext.Provider 
      value={{ articles, news, comments,superadmin, admin, getSuperAdmin, getAdmin, getArticles, getNews, getComments, isPendingSuperAdmin, isPendingAdmin, isPendingArticles, 
        isPendingNews, isPendingComments, errorSuperAdmin, errorAdmin, errorArticles, errorNews, errorComments 
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
