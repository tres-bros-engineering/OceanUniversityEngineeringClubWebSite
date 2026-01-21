import { createContext, useContext, useState } from "react";
import axios from "axios";
import ApiRoutes from "../api/ApiRoutes";
import { useLocation, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const hash = require("./hashing");

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [AuthAdmin, setAuthAdmin] = useState(null); // if login admin details needed
  const [AuthSuperAdmin, setSuperAuthAdmin] = useState(null); // if login superadmin details needed

  const expiryTime = 3000000000 // one month in mS
  const adminlogin = (user) => {
    //get admin details from data base through backend
    axios
      .post(ApiRoutes.AUTHADMIN.POST, user)
      .then((res) => {
        setAuthAdmin(res.data?.response || []);
        const response = res.data?.response

        if (response[0]) {

          if (typeof (Storage) !== "undefined") {
            setLocalStorageWithExpiry("admin", [hash.hashWord(String(response[0])), response[1].id, response[1].email], expiryTime); //1-minute (60000 ms) time limit
            setUser(getLocalStorageWithExpiry("admin")[2]);

            toast.success(res.data?.message);

            //navigate to home page
            const redirectedPath = location.state?.path || "/admin/home";
            navigate(redirectedPath, { replace: true });
          } else {
            setUser(response[1].email); // when browser not support local storage
            //navigate to home page
            toast.success(res.data?.message);
            const redirectedPath = location.state?.path || "/admin/home";
            navigate(redirectedPath, { replace: true });
          }

        } else {
          localStorage.removeItem("admin");
          toast.error(res.data?.message);

        }


      })
      .catch((error) => {
        toast.error(error.response.data?.error);

      });


  }

  const superadminlogin = (user) => {

    //get super admin details from data base through backend
    axios
      .post(ApiRoutes.AUTHSUPERADMIN.POST, user)
      .then((res) => {
        setSuperAuthAdmin(res.data?.response || []);
        const response = res.data?.response
        if (response[0]) {

          if (typeof (Storage) !== "undefined") {
           setLocalStorageWithExpiry("superadmin", [hash.hashWord(String(response[0])), response[1].id, response[1].email], expiryTime); //1-minute (60000 ms) time limit
            setUser(getLocalStorageWithExpiry("superadmin")[2]);

            toast.success(res.data?.message);

            //navigate to home page
            const redirectedPath = location.state?.path || "/superadmin/home";
            navigate(redirectedPath, { replace: true });

          } else {
            setUser(response[1].email); // when browser not support local storage
            //navigate to home page
            toast.success(res.data?.message);
            const redirectedPath = location.state?.path || "/superadmin/home";
            navigate(redirectedPath, { replace: true });
          }

        } else {
          localStorage.removeItem("superadmin");
          toast.error(res.data?.message);
        }


      })
      .catch((error) => {
        toast.error(error.response.data?.error);

      });


  }

  //logout function
  const logout = () => {
    setUser(null);
    if (typeof (Storage) !== "undefined") {
      localStorage.removeItem("admin");
      localStorage.removeItem("superadmin");
      
    }


  }

  const setLocalStorageWithExpiry = (key, value, ttlInMilliseconds) => {

    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttlInMilliseconds, // Calculate expiration time
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  const getLocalStorageWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);

    // If the item doesn't exist, return null
    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    // Compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage and return null
      localStorage.removeItem(key);
      localStorage.clear();
      return null;
    }

    return item.value;
  }
  



  return (
    <AuthContext.Provider value={{ user, AuthAdmin, AuthSuperAdmin, setLocalStorageWithExpiry, getLocalStorageWithExpiry, adminlogin, superadminlogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
}