import "./styles/Login.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { REGISTER_URL } from "./const";
import useRequest from "./library/hooks/useRequest";

import Input from "./library/components/Input";

const Signup = () => {
  const navigate = useNavigate();
  const { errMsg, errors, post, isLoading } = useRequest(REGISTER_URL);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [log, setLog] = useState({
    email: "",
    username: "",
    password: "",
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
    setSignupSuccess(true);
  };

  return (
    <div className="d-flex h-100">
      <div class="form-signin w-100 m-auto p-4 shadow border">
        {!signupSuccess && (
          <>
            <form onSubmit={handleSubmit}>
              <h1 class="h3 mb-4 fw-normal">Create your account</h1>
              <Input type="email" inputClass="form-control" label="Email address:" placeholder="johndoe@example.com" values={[log, "email", errors]} onChange={handleChange} />
              <Input
                type="text"
                className="mt-3"
                inputClass="form-control"
                label="Pick a username:"
                placeholder="doehaveusername"
                values={[log, "username", errors]}
                onChange={handleChange}
                required
              />
              <Input
                type="password"
                className="mt-3 mb-4"
                inputClass="form-control"
                label="Set password:"
                placeholder="verystrongpassword"
                values={[log, "password", errors]}
                onChange={handleChange}
                required
              />

              {isLoading ? (
                <button class="btn btn-primary w-100 py-2 mt-1 mb-3" type="button" disabled="">
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Loading...
                </button>
              ) : (
                <button class="btn btn-primary w-100 py-2 mt-1 mb-3" type="submit">
                  Sign up
                </button>
              )}
              {errMsg && <span class="badge w-100 p-2 mb-3 bg-danger-subtle border border-danger-subtle text-danger-emphasis">{errMsg}</span>}
            </form>
            <p>
              Already have an account?
              <a href="#/login" className="mx-2">
                Sing in!
              </a>
            </p>
          </>
        )}
        {signupSuccess && (
          <>
            <h1 class="h3 mb-4 fw-bold text-success">Account successfully created!</h1>
            <p>
              Now, you may
              <a href="#/login" className="mx-2">
                login
              </a>
              to you account.
            </p>
            <p>
              Click
              <a href="#/" className="mx-2">
                here
              </a>
              to get back home page
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
