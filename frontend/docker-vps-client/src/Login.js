import "./styles/Login.css";

import { useState, useEffect } from "react";
import { useNavigate, useLocation, redirect } from "react-router-dom";

import { TOKEN_URL, DEFAULT_PAGE } from "./const";
import useAuth from "./library/hooks/useAuth";
import useRequest from "./library/hooks/useRequest";
import JWTDecoder from "./library/functions/JWTDecoder";

import Input from "./library/components/Input";
import Checkbox from "./library/components/Checkbox";

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { errMsg, errors, post, isLoading } = useRequest(TOKEN_URL, false);
  const from = location.state?.from?.pathname || DEFAULT_PAGE;
  // console.log(location.state?.from?.pathname);

  //  check if user have remembered tokens in storage
  useEffect(() => {
    if (window.localStorage.getItem("auth")) navigate(DEFAULT_PAGE);
  }, []);

  const [log, setLog] = useState({
    username: "",
    password: "",
    remember_me: false,
  });

  const handleChange = ({ currentTarget: input }) => {
    const newLog = { ...log };
    if (input.type == "checkbox") {
      newLog[input.name] = !newLog[input.name];
    } else {
      newLog[input.name] = input.value;
    }
    setLog(newLog);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await post(log);
    if (!data) return;

    const accessToken = data.access;
    const refreshToken = data.refresh;
    const payload = JWTDecoder(accessToken);
    const roles = [payload.role];
    setAuth({ ...log, roles, accessToken });
    if (log.remember_me) window.localStorage.setItem("auth", JSON.stringify({ username: log.username, roles, accessToken, refreshToken }));
    setLog({
      username: "",
      password: "",
    });
    navigate(from, { replace: true });
  };

  return (
    <div className="d-flex h-100">
      <div class="form-signin w-100 m-auto p-4 shadow border">
        <form onSubmit={handleSubmit}>
          <h1 class="h3 mb-4 fw-normal">Please sign in</h1>
          <Input type="text" inputClass="form-control" name="username" label="Username" placeholder="username" values={[log, "username", errors]} onChange={handleChange} required />
          <Input type="password" className="mt-3" inputClass="form-control" name="username" label="Password" placeholder="passwd" values={[log, "password", errors]} onChange={handleChange} required />
          <Checkbox label="Remember me" values={[log, "remember_me"]} onChange={handleChange} />

          {isLoading ? (
            <button class="btn btn-primary w-100 py-2 mt-1 mb-3" type="button" disabled="">
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Loading...
            </button>
          ) : (
            <button class="btn btn-primary w-100 py-2 mt-1 mb-3" type="submit">
              Sign in
            </button>
          )}
          {errMsg && <span class="badge w-100 p-2 mb-3 bg-danger-subtle border border-danger-subtle text-danger-emphasis">{errMsg}</span>}
        </form>
        <p>
          Need a new account?
          <a href="#/signup" className="mx-2">
            Sing up!
          </a>
        </p>
        <p>
          Forgot password?
          <a href="#" className="mx-2">
            we can't help
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
