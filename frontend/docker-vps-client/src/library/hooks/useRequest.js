import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "./axios";

const useRequest = (url, redirect = true) => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [errMsg, setErrMsg] = useState("");

  const getHeaders = () => {
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + auth.accessToken,
      },
      // withCredentials: true,
    };
  };

  const reset = () => {
    setData({});
    setErrors({});
    setErrMsg("");
    setIsLoading(true);
    setIsSuccess(false);
  };

  const handleError = (err) => {
    if (!err?.response) {
      // createMessage({ type: "danger", content: "No Server Response" });
      setErrMsg("No Server Response");
      return;
    }
    // handle 400
    if (err.response?.status === 400) {
      if (err.response.data) {
        const newErrors = {};
        Object.keys(err.response.data).forEach((s) => {
          newErrors[s] = err.response.data[s];
        });
        setErrors(newErrors);
      }
      return;
    }
    // handle 401
    if (err.response.status === 401) {
      if (err.response.data && err.response.data.detail) {
        setErrMsg(err.response.data.detail);
      } else {
        setErrMsg("Unauthorized");
      }
      if (redirect) navigate("/logout");
      return;
    }
    // handle 403
    if (err.response.status === 403) {
      // createMessage({ type: "danger", content: err.response.data.detail });
      setErrMsg(err.response.data.detail);
      return;
    }

    setErrMsg(err.message);
  };

  // const handleSuccess = (response) => {
  //   setIsSuccess(true);
  //   if (response.status === 201 || response.status === 200) {
  //     if (response.data) {
  //       // createMessage({ type: "success", content: response.data.success });
  //     }
  //     // closeForm({ reload: true });
  //   }
  // };

  const setUrl = (u) => {
    url = u;
  };

  const get = async () => {
    reset();

    try {
      const response = await axios.get(url, getHeaders());
      setIsLoading(false);
      setData(response.data);
    } catch (err) {
      setIsLoading(false);
      handleError(err);
    }
  };

  const post = async (data) => {
    reset();

    try {
      const response = await axios.post(url, JSON.stringify(data), getHeaders());
      setIsLoading(false);
      setIsSuccess(true);
      console.log("response*****", response);
      return response.data ? response.data : true;
    } catch (err) {
      setIsLoading(false);
      handleError(err);
      console.log(err);
    }
    return false;
  };

  const put = async (data) => {
    reset();

    try {
      const response = await axios.put(url, JSON.stringify(data), getHeaders());
      setIsLoading(false);
      // handleSuccess(response);
      // console.log("response###", response);
      return response.data ? response.data : true;
    } catch (err) {
      setIsLoading(false);
      handleError(err);
    }
    return;
  };

  return {
    data,
    errors,
    errMsg,
    isLoading,
    get,
    post,
    put,
    setUrl,
  };
};

export default useRequest;
