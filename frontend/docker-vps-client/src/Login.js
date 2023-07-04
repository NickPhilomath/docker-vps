import "./styles/Login.css";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { TOKEN_URL, DEFAULT_PAGE } from "./const";
import useAuth from "./library/hooks/useAuth";
import useRequest from "./library/hooks/useRequest";
import JWTDecoder from "./library/functions/JWTDecoder";

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { errMsg, errors, post, isLoading, isSuccess } = useRequest(TOKEN_URL);
  const from = location.state?.from?.pathname || DEFAULT_PAGE;

  const [log, setLog] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await post(log);
    if (!isSuccess) return;
    const accessToken = data.access;
    const refreshToken = data.refresh;
    const payload = JWTDecoder(accessToken);
    const roles = [payload.role];
    setAuth({ ...log, roles, accessToken });
    window.localStorage.setItem("auth", JSON.stringify({ username: log.username, roles, accessToken, refreshToken }));
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
          <div class="form-floating">
            <input type="text" class="form-control" id="floatingInput" placeholder="Username" />
            <label for="floatingInput">Username</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
            <label for="floatingPassword">Password</label>
          </div>

          <div class="form-check text-start my-3">
            <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
            <label class="form-check-label" for="flexCheckDefault">
              Remember me
            </label>
          </div>

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
        <a href="#">Forgot password?</a>
      </div>
    </div>
  );
};

export default Login;
