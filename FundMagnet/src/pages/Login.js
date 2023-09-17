/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable default-case */

import { useCallback, useState } from "react";
import { Transition } from "react-transition-group";
import login from "../assets/login/login-bg.jpg";
import UnauthenticatedNavbar from "../components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { appActions } from "../context/app-slice";
import useHttp from "../hooks/use-http";
import { toast } from "react-toastify";
import React from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import BlueGradientButton from "../components/BlueGradientButton";

const Login = () => {
  const [emailAuth, setEmailAuth] = useState(true);
  const [phAuth, setPhAuth] = useState(false);
  const [loginEnabled, setLoginEnabled] = useState(true);
  const [otpSentOnce, setOtpSentOnce] = useState(false);
  const [resendOtp, setResendOtp] = useState(30);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    otp: "",
  });
  const dispatch = useDispatch();
  const makeRequest = useHttp();
  const navigate = useNavigate();
  const appCtx = useSelector((state) => state.app);

  const getClasses = (state) => {
    switch (state) {
      case "entering":
        return "-translate-x-[200px] opacity-0";
      case "entered":
        return "translate-x-[0px] opacity-1";
      case "exiting":
        return "translate-x-[200px] opacity-0";
      case "exited":
        return " opacity-0";
    }
  };

  const setGlobalAuthentication = useCallback(
    (data) => {
      // if(process.env.REACT_APP_ENVIRONMENT === "prod" &&)
      makeRequest(
        {
          url: `${process.env.REACT_APP_URL_MARKETPLACE_SERVICE}/user/marketplace/list`,
          headers: {
            "X-auth-Token": data.authToken,
          },
        },
        (marketplace) => {
          dispatch(appActions.updateAuthToken(data.authToken));
          dispatch(appActions.setMarketplaceEmail(data?.email));
          dispatch(
            appActions.updateUserDetails({
              name: data.firstName + " " + data.lastName,
              email: data.email,
              userId: data.userId,
            })
          );
          dispatch(appActions.login());
          dispatch(appActions.mainnet(true));
        }
      );
    },
    [dispatch]
  );

  const disableResendOtp = useCallback(() => {
    setResendOtp(30);
    const interval = setInterval(() => {
      setResendOtp((prev) => {
        if (prev === 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleVerifyOtpClicked = useCallback(() => {
    if (!userData.email) {
      toast.error("Please enter a valid email");
      return;
    }

    if (!userData.otp) {
      toast.error("Please enter a valid OTP");
      return;
    }

    setLoginEnabled(false);
    toast.promise(
      () =>
        makeRequest(
          {
            method: "POST",
            url: `${process.env.REACT_APP_NFTVERSE_DEV_API}/otp/verify?type=login`,
            data: {
              otp: userData.otp,
              email: userData.email,
            },
            headers: {
              "X-App-Token": process.env.REACT_APP_APP_TOKEN,
              "Content-Type": "application/json",
            },
          },
          (data) => setGlobalAuthentication(data),
          (error) => console.log(error),
          () => setLoginEnabled(true)
        ),
      {
        pending: "Verifying OTP...",
        success: "OTP verified successfully",
        error: "Failed to verify OTP",
      }
    );
  }, [makeRequest, setGlobalAuthentication, userData.email, userData.otp]);

  const handleLoginClicked = useCallback(() => {
    if (!userData.email) {
      toast.error("Please enter your email");
      return;
    }

    if (!userData.password) {
      toast.error("Please enter your password");
      return;
    }

    setLoginEnabled(false);
    toast.promise(
      () =>
        makeRequest(
          {
            url: `${process.env.REACT_APP_NFTVERSE_DEV_API}/login`,
            data: { email: userData.email, password: userData.password },
            method: "POST",
            headers: {
              "X-App-Token": process.env.REACT_APP_APP_TOKEN,
              "Content-Type": "application/json",
            },
          },
          (data) => setGlobalAuthentication(data),
          (data) => console.log(data),
          () => setLoginEnabled(true)
        ),
      {
        pending: "Logging you in...",
        success: "You have successfully logged in!",
        error: "Invalid login credentials!",
      }
    );
  }, [makeRequest, setGlobalAuthentication, userData.email, userData.password]);

  const handleSendOtpClicked = useCallback(() => {
    if (!userData.email) {
      toast.error("Please enter your email");
      return;
    }

    setLoginEnabled(false);
    toast.promise(
      () =>
        makeRequest(
          {
            url: `${process.env.REACT_APP_NFTVERSE_DEV_API}/otp/send?type=login`,
            data: { email: userData.email },
            method: "post",
            headers: {
              "X-App-Token": process.env.REACT_APP_APP_TOKEN,
              "Content-Type": "application/json",
            },
          },
          () => {
            setOtpSentOnce(true);
            disableResendOtp();
          },
          (data) => console.log(data),
          () => setLoginEnabled(true)
        ),
      {
        pending: "Sending OTP...",
        success: "OTP sent successfully!",
        error: "Error sending OTP!",
      }
    );
  }, [disableResendOtp, makeRequest, userData.email]);

  const handleInputChange = useCallback((e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  if (appCtx.isLoggedIn) {
    navigate("/home");
  }
  return (
    <div className={"dark"}>
      <UnauthenticatedNavbar />
      <div
        className="w-[100%] min-h-fit bg-no-repeat bg-cover bg-fixed pt-10 dark"
        style={{ backgroundImage: `url(${login})` }}
      >
        <div className="w-[100%] min-h-screen bg-gradient-to-r from-zinc-800 via-zinc-800/80 to-zinc-600/0 p-0 md:p-20 flex">
          <div className="my-auto flex flex-col gap-10 mx-auto justify-center items-center ">
            {/* <div className="text-slate-100 w-[40vw] min-w-[300px] text-xl">
                            Sed eget mattis enim. Phasellus eu commodo augue
                        </div> */}
            <div className="text-slate-100 text-5xl font-extrabold">
              Log in.
            </div>
            <div className="flex flex-col gap-5 bg-[rgb(36,32,32)] p-4 rounded-xl">
              <Transition
                unmountOnExit
                mountOnEnter
                in={emailAuth}
                timeout={200}
                onExited={() => setPhAuth(true)}
              >
                {(state) => (
                  <div
                    className={`relative transition-all ease-out duration-200 flex flex-col gap-5 ${getClasses(
                      state
                    )}`}
                  >
                    <label className="text-white">Email:</label>
                    <Input
                      type="email"
                      placeholder="Enter your Email"
                      className="min-w-[320px] w-[40vw] max-w-[560px]"
                      name={"email"}
                      onChange={handleInputChange}
                    />
                    <label className="text-white">Password:</label>
                    <Input
                      type="password"
                      placeholder="Enter Your Password"
                      className="min-w-[320px] w-[40vw] max-w-[560px]"
                      name={"password"}
                      onChange={handleInputChange}
                    />
                    <div
                      className="bg-[#5D2BE9] text-center rounded-xl py-3 text-white"
                      // disabled={!loginEnabled}
                      onClick={handleLoginClicked}
                    >
                      Log In
                    </div>
                    <a
                      onClick={() => setEmailAuth(false)}
                      href="#"
                      className="text-slate-300 text-md"
                    >
                      Log in with email and otp
                    </a>
                  </div>
                )}
              </Transition>
              <Transition
                unmountOnExit
                mountOnEnter
                in={phAuth}
                timeout={200}
                onExited={() => setEmailAuth(true)}
              >
                {(state) => (
                  <div
                    className={`relative transition-all ease-out duration-200 flex flex-col gap-5 ${getClasses(
                      state
                    )}`}
                  >
                    <label className="text-white">Email:</label>
                    <Input
                      type="email"
                      placeholder="Enter Your Email"
                      className="min-w-[320px] w-[40vw] max-w-[560px]"
                      name={"email"}
                      onChange={handleInputChange}
                    />
                    {otpSentOnce && (
                      <>
                        <label className="text-white">Email:</label>
                        <label className="text-white">
                          We have sent you an OTP on your email
                        </label>
                        <Input
                          type="text"
                          placeholder="OTP"
                          className="min-w-[320px] w-[40vw] max-w-[560px]"
                          name={"otp"}
                          onChange={handleInputChange}
                        />
                      </>
                    )}
                    {!otpSentOnce ? (
                      <BlueGradientButton
                        // disabled={!loginEnabled}
                        onClick={handleSendOtpClicked}
                        className="bg-[#5D2BE9] text-center rounded-xl py-3 text-white"
                      >
                        Send OTP
                      </BlueGradientButton>
                    ) : (
                      <>
                        <BlueGradientButton
                          // disabled={!loginEnabled}
                          onClick={handleVerifyOtpClicked}
                          className="bg-[#5D2BE9] text-center rounded-xl py-3 text-white"
                        >
                          Log in with OTP
                        </BlueGradientButton>
                        <button
                          disabled={resendOtp !== 0}
                          onClick={handleSendOtpClicked}
                          className="text-slate-300 text-md text-left"
                        >
                          {resendOtp === 0 ? "Resend OTP" : `00:${resendOtp}`}
                        </button>
                      </>
                    )}
                    <a
                      onClick={() => setPhAuth(false)}
                      href="#"
                      className="text-slate-300 text-md"
                    >
                      Log in with email and password
                    </a>
                  </div>
                )}
              </Transition>
              <div className="flex justify-between">
                <Link to="/reset-password" className="text-slate-300 text-md">
                  Forgot password?
                </Link>
                <Link to="/signup" className="text-slate-300 text-md">
                  Signup
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
