import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "./axios";

const useRequest = (url) => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [errMsg, setErrMsg] = useState("");

  const [pageControl, setPageControl] = useState({
    count: 0,
    next: true,
    previous: true,
  });

  const getHeaders = () => {
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + auth.accessToken,
      },
      // withCredentials: true,
    };
  };

  const handleError = (err) => {
    if (!err?.response) {
      // createMessage({ type: "danger", content: "No Server Response" });
      setErrMsg("No Server Response");
    } else if (err.response?.status === 400) {
      if (err.response.data) {
        const newErrors = {};
        Object.keys(err.response.data).forEach((s) => {
          newErrors[s] = err.response.data[s];
        });
        setErrors(newErrors);
      }
    } else if (err.response.status === 401) {
      setErrMsg("Unauthorized");
      navigate("/logout");
    } else if (err.response.status === 403) {
      // createMessage({ type: "danger", content: err.response.data.detail });
      setErrMsg(err.response.data.detail);
    } else {
      // createMessage({ type: "danger", content: err.message });
      setErrMsg(err.message);
    }
  };

  const handleSuccess = (response) => {
    setIsSuccess(true);
    if (response.status === 201 || response.status === 200) {
      if (response.data) {
        // createMessage({ type: "success", content: response.data.success });
      }
      // closeForm({ reload: true });
    }
  };

  const setUrl = (u) => {
    url = u;
  };

  const getPage = async (pageNum) => {
    setErrMsg("");
    setIsLoading(true);
    try {
      const response = await axios.get(`${url}?pagination=True&page=${pageNum}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT " + auth.accessToken,
        },
      });
      setData(response.data.results);
      setPageControl({
        count: response.data.count,
        next: response.data.next ? true : false,
        previous: response.data.previous ? true : false,
      });

      // setHasNextPage(response.data.next ? true : false);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (!err?.response) {
        // createMessage({ type: "danger", content: "No Server Response" });
      } else if (err.response.status === 401) {
        navigate("/logout");
      } else if (err.response.status === 403) {
        // createMessage({ type: "danger", content: err.response.data.detail });
      } else {
        // createMessage({ type: "danger", content: err.message });
      }
    }
  };

  const get = async () => {
    setErrMsg("");
    setIsLoading(true);
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
    setData({});
    setErrors({});
    setErrMsg("");
    setIsLoading(true);
    setIsSuccess(false);

    try {
      const response = await axios.post(url, JSON.stringify(data), getHeaders());
      setIsLoading(false);
      handleSuccess(response);
      return response.data ? response.data : true;
    } catch (err) {
      setIsLoading(false);
      handleError(err);
    }
    return;
  };

  const put = async (data) => {
    setErrors({});
    setErrMsg("");
    setIsLoading(true);
    setIsSuccess(false);

    try {
      const response = await axios.put(url, JSON.stringify(data), getHeaders());
      setIsLoading(false);
      handleSuccess(response);
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
    isSuccess,
    get,
    post,
    put,
    getPage,
    setUrl,
    pageControl,
  };
};

export default useRequest;
