import { useRef, useState } from "react";
import axiosClient from "../../AxiosClient";
import { useAuthContext } from "../../contexts/AuthProvider";
import Cookies from "js-cookie";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [deactivateLoginButton, setDeactivateLoginButton] = useState(false);
  const { setUser, setToken } = useAuthContext();
  const [testToken, setTestToken] = useState(null);
  const [message, setMessage] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    // The button is deactivated when the request is being sent.
    setDeactivateLoginButton(true);

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    setMessage(null);

    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        const token = Cookies.get("token");
        setUser(data.user);
        setToken(data.token);
        setTestToken(token);
        console.log("Login", data);
      })
      .catch((error) => {
        console.log(error);
        const response = error.response;
        if (response && response.status === 422) {
          setMessage(response.data.errors);
        } else {
          setMessage({
            email: [response.data.message],
          });
        }
      });

    console.log("Credentials", {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
    emailRef.current.value = "";
    passwordRef.current.value = "";

    // Once the request was processed, the button is activated after have cleared the fields.
    setDeactivateLoginButton(false);
  };

  return (
    <div
      id="login"
      className="bg-white py-8 px-4 lg:px-10 w-full max-w-[400px] lg:max-w-[450px] h-fit text-center rounded-lg"
    >
      <h2 className="text-3xl mb-5 font-bold">Login: {testToken}</h2>
      {message && (
        <div className="alert">
          <p>{message}</p>
        </div>
      )}
      <form className="w-full" onSubmit={(e) => onSubmit(e)}>
        <div className="w-full mb-5 flex items-center justify-center">
          <input
            type="email"
            name="email"
            id="email"
            className="bg-white border rounded-lg p-2 w-full"
            placeholder="Email"
            ref={emailRef}
          />
        </div>

        <div className="w-full mb-5 flex items-center justify-center">
          <input
            type="password"
            name="password"
            id="password"
            className="bg-white border rounded-lg p-2 w-full focus:border-blue-500"
            placeholder="Password"
            ref={passwordRef}
          />
        </div>

        <button
          type="submit"
          id="loginBtn"
          disabled={deactivateLoginButton}
          className="bg-blue-500 text-center py-2 w-full text-white hover:bg-blue-700 disabled:bg-blue-300 rounded-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
}
