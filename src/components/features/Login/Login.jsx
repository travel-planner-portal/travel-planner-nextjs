import React, { useState, useEffect, useCallback } from "react";
import { usePhoneAuth } from "../../../hooks/usePhoneAuth";
import { useGoogleAuth } from "../../../hooks/useGoogleAuth";
import { useNavigationContext } from "../../../context/NavigationContext";
import { GoogleIcon, XMarkIcon } from "../../../assets/images";

import {
  ArrowRight,
  X as XIcon,
  Check as CheckIcon,
  AlertCircle,
  Loader2,
  ChevronLeft,
  Phone,
  Mail,
  Globe,
  Shield,
} from "lucide-react";
import toast from "react-hot-toast";
import { Alert, AlertDescription } from "../../ui/alert";
import slider1 from "../../../assets/TripPage/slider1.svg";
import slider2 from "../../../assets/TripPage/slider2.svg";
import { useAuth } from "../../../context/AuthContext";
import { use } from "react";
import UserDetailsForm from "./UserDetailsForm";
import {
  completeRegistration,
  storeUserData,
} from "../../../network/networkCalls";
import { API_URLS } from "../../../network/apiUrls";
import { makeRequest } from "../../../network/apiHelpers";
import Image from "next/image";

const LoadingSpinner = () => <Loader2 className="w-5 h-5 animate-spin" />;

const ImageSlider = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const sliderImages = [
    {
      url: slider1,
      alt: "Adventure Awaits",
      title: "Discover New Horizons",
      subtitle: "Plan your next adventure",
    },
    {
      url: slider2,
      alt: "Travel Experience",
      title: "Create Memories",
      subtitle: "Share your journey",
    },
    {
      url: slider1,
      alt: "Explore World",
      title: "Explore the World",
      subtitle: "One trip at a time",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % sliderImages.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const parallaxStyle = {
    transform: `translate(${mousePosition.x * 20}px, ${
      mousePosition.y * 20
    }px)`,
  };

  return (
    <div className="relative w-[600px] h-[600px] overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      {sliderImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-out ${
            currentImage === index
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-full"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          <div
            className="relative w-full h-full transform transition-transform duration-100"
            style={parallaxStyle}
          >
            <Image
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
              onLoad={() => setIsLoading(false)}
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-10 text-white transform transition-all duration-1000 delay-200">
            <h2 className="text-3xl font-bold mb-2">{image.title}</h2>
            <p className="text-lg text-gray-200">{image.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const OTPInput = ({ value, onChange, maxLength = 6 }) => {
  const inputRefs = Array(maxLength)
    .fill(0)
    .map(() => React.createRef());

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleChange = (e, index) => {
    const digit = e.target.value.replace(/\D/g, "").slice(-1);
    const otpArray = value ? [...value] : Array(maxLength).fill("");
    otpArray[index] = digit;
    const newOTP = otpArray.join("").slice(0, maxLength);
    onChange(newOTP);

    if (digit && index < maxLength - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const otpArray = (value || "").padEnd(maxLength, "").split("");

  return (
    <div className="flex  gap-2 justify-center">
      {Array(maxLength)
        .fill(0)
        .map((_, index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            type="text"
            maxLength={1}
            inputMode="numeric"
            value={otpArray[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="md:w-12 w-10 aspect-square h-auto md:h-12 text-center text-xl font-bold rounded-lg border-2 border-gray-200 focus:border-yellow-300 focus:ring focus:ring-yellow-100 transition-all outline-none"
          />
        ))}
    </div>
  );
};

const Login = () => {
  const [authMethod, setAuthMethod] = useState("phone");
  const [showPassword, setShowPassword] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { setIsLogin, setIsWapper } = useNavigationContext();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSuccess = useCallback(
    (userData) => {
      if (userData.isNewUser) {
        setIsNewUser(true);
        const isGoogleAuth = !!userData.pendingUserData;

        setUserDetails({
          uid: isGoogleAuth ? userData.pendingUserData.uid : userData.uid,
          phoneNumber: isGoogleAuth ? "" : userData.phoneNumber,
          name: isGoogleAuth ? userData.pendingUserData.name : "",
          email: isGoogleAuth ? userData.pendingUserData.email : "",
          signupMethod: isGoogleAuth ? "google" : "phone",
        });
      } else {
        setIsAnimating(true);
        console.log("User Data:", userData);
        setTimeout(() => {
          login(userData.token);
          setIsLogin(false);
          setIsWapper(false);
          toast.success("Successfully logged in!", {
            icon: "🎉",
            duration: 5000,
            style: {
              background: "#10B981",
              color: "#fff",
            },
          });
        }, 1000);
      }
    },
    [setIsLogin, setIsWapper, login]
  );

  const handleUserDetailsSubmit = async (formData) => {
    try {
      setLoading(true);

      console.log("User Details:", userDetails.signupMethod);
      const endpoint =
        userDetails.signupMethod === "google"
          ? API_URLS.COMPLETE_GOOGLE_REGISTRATION
          : API_URLS.COMPLETE_SIGNUP;

      const requestData = {
        ...formData,
        uid: userDetails.uid,
      };

      if (userDetails.signupMethod === "google") {
        requestData.email = userDetails.email;
      } else {
        requestData.phoneNumber = userDetails.phoneNumber;
      }

      const response = await makeRequest({
        method: "post",
        url: endpoint,
        data: requestData,
      });

      if (response.success) {
        storeUserData(response);
        handleSuccess({ ...response, isNewUser: false });
      } else {
        throw new Error(response.message || "Registration failed");
      }
    } catch (error) {
      toast.error(error.message || "Failed to complete registration");
    } finally {
      setLoading(false);
    }
  };

  const handleError = useCallback((error) => {
    setLoginAttempts((prev) => prev + 1);
    toast.error(error || "Authentication failed", {
      icon: "❌",
    });
  }, []);

  const {
    phoneNumber,
    otp,
    setOtp,
    step,
    error: phoneError,
    loading: phoneLoading,
    countdown,
    handlePhoneNumberChange,
    handleOTPChange,
    sendOTP,
    verifyOTP,
    resetForm,
    resendOTP,
  } = usePhoneAuth({
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const { signInWithGoogle, loading: googleLoading } = useGoogleAuth({
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsLogin(false);
      setIsWapper(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[101] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div
        className={`relative bg-white rounded-2xl flex flex-col items-center max-w-[1000px] justify-center shadow-2xl overflow-hidden  w-full mx-4 transform transition-all duration-500 ${
          isAnimating ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <div id="recaptcha-container" className="invisible" />

        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all group"
        >
          <XIcon className="w-5 h-5 text-gray-600 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        <div className="flex flex-row items-stretch">
          <div className="hidden lg:block">
            <ImageSlider />
          </div>

          <div className="flex-1 flex flex-col justify-between p-6 lg:p-8 max-w-[450px]">
            {isNewUser ? (
              <>
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">
                      Complete Your Profile
                    </h1>
                    <p className="text-gray-500 text-sm">
                      Please provide some additional information to complete
                      your registration
                    </p>
                  </div>
                  <UserDetailsForm
                    onSubmit={handleUserDetailsSubmit}
                    loading={loading}
                    initialData={userDetails}
                    signupMethod={userDetails?.signupMethod}
                  />
                </div>
              </>
            ) : (
              <div className="space-y-6">
                {loginAttempts > 2 && (
                  <Alert className="border-yellow-300 bg-yellow-50">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Multiple login attempts detected. Need help? Contact
                      support.
                    </AlertDescription>
                  </Alert>
                )}

                <div>
                  <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">
                    Welcome back
                  </h1>
                  <p className="text-gray-500 text-sm">
                    Login to access your saved trips and preferences
                  </p>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={signInWithGoogle}
                    disabled={googleLoading || phoneLoading}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border-2 border-gray-100 bg-white hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {googleLoading ? (
                      <LoadingSpinner />
                    ) : (
                      <>
                        <GoogleIcon />
                        <span className="text-[15px] text-gray-700 font-medium group-hover:translate-x-1 transition-transform">
                          Continue with Google
                        </span>
                      </>
                    )}
                  </button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">
                        or continue with phone
                      </span>
                    </div>
                  </div>

                  {step === "PHONE" ? (
                    <form onSubmit={sendOTP} className="space-y-4">
                      <div>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            required
                            maxLength={10}
                            className="w-full pl-12 pr-4 py-3 text-gray-900 rounded-xl bg-gray-50 border-2 border-gray-100 focus:border-yellow-300 focus:ring focus:ring-yellow-100 transition-all outline-none"
                          />
                          {phoneNumber.length === 10 && (
                            <CheckIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1 ml-1 flex items-center gap-2">
                          <Shield className="w-3 h-3" />
                          Enter 10 digit mobile number
                        </p>
                      </div>

                      <button
                        type="submit"
                        disabled={
                          phoneLoading ||
                          googleLoading ||
                          !phoneNumber ||
                          phoneNumber.length < 10
                        }
                        className="w-full py-3 bg-yellow-300 rounded-xl text-[15px] text-gray-900 font-medium hover:bg-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                      >
                        <span className="flex items-center justify-center gap-2 group-hover:translate-x-1 transition-transform">
                          {phoneLoading ? (
                            <LoadingSpinner />
                          ) : (
                            <>
                              Send OTP
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </span>
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={verifyOTP} className="space-y-4">
                      <button
                        type="button"
                        onClick={resetForm}
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Change phone number
                      </button>

                      <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Enter verification code
                        </label>
                        <OTPInput value={otp} onChange={setOtp} maxLength={6} />
                        {countdown > 0 ? (
                          <p className="text-sm text-center text-gray-500">
                            Resend code in {countdown}s
                          </p>
                        ) : (
                          <button
                            type="button"
                            onClick={resendOTP}
                            className="w-full text-sm text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            Resend verification code
                          </button>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={otp.length < 6 || phoneLoading}
                        className="w-full py-3.5 bg-yellow-300 rounded-xl text-[15px] text-gray-900 font-medium hover:bg-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                      >
                        <span className="flex items-center justify-center gap-2 group-hover:translate-x-1 transition-transform">
                          {phoneLoading ? (
                            <LoadingSpinner />
                          ) : (
                            <>
                              Verify OTP
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-4 mt-6">
              <div className="flex flex-wrap gap-2">
                {["Security", "Privacy", "Terms"].map((item) => (
                  <button
                    key={item}
                    className="px-3 py-1 text-xs text-gray-500 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 text-center">
                This site is protected by reCAPTCHA and the Google{" "}
                <a
                  href="https://policies.google.com/privacy"
                  className="text-blue-500 hover:text-blue-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="https://policies.google.com/terms"
                  className="text-blue-500 hover:text-blue-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Service
                </a>{" "}
                apply.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
