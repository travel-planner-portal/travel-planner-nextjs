import { useState, useEffect, useRef } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../config/firebase";
import { verifyPhoneToken, storeUserData } from "../network/networkCalls";
import toast from "react-hot-toast";

export const usePhoneAuth = ({ onSuccess, onError } = {}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("PHONE");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const recaptchaRef = useRef(null);

  useEffect(() => {
    initializeRecaptcha();
  }, []);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const initializeRecaptcha = async () => {
    try {
      const recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => console.log("reCAPTCHA solved"),
          "expired-callback": () => {
            setError("reCAPTCHA expired. Please try again.");
            window.recaptchaVerifier.render();
          },
        }
      );
      window.recaptchaVerifier = recaptchaVerifier;
    } catch (error) {
      const errorMessage = "Error initializing verification system";
      console.error(errorMessage, error);
      setError(errorMessage);
      onError?.(errorMessage);
    }
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value) && value.length <= 10) {
      setPhoneNumber(value);
      setError("");
    }
  };

  const handleOTPChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value)) {
      setOtp(value);
      setError("");
    }
  };

  const sendOTP = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formattedPhoneNumber = `+91${phoneNumber}`;
      if (!formattedPhoneNumber.match(/^\+[1-9]\d{10,14}$/)) {
        throw new Error("Please enter a valid 10-digit phone number");
      }

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        window.recaptchaVerifier
      );
      window.confirmationResult = confirmationResult;
      setCountdown(30);
      setStep("OTP");
    } catch (error) {
      const errorMessage =
        error.message || "Error sending OTP. Please try again.";
      console.error("Error sending OTP:", error);
      setError(errorMessage);
      onError?.(errorMessage);

      try {
        window.recaptchaVerifier.render().then((widgetId) => {
          window.recaptchaVerifier.reset(widgetId);
        });
      } catch (e) {
        console.error("Error resetting reCAPTCHA:", e);
      }
    }
    setLoading(false);
  };
  const resendOTP = async () => {
    setOtp("");
    await sendOTP();
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!otp || otp.length !== 6) {
        throw new Error("Please enter a valid 6-digit OTP");
      }

      const result = await window.confirmationResult.confirm(otp);
      const idToken = await result.user.getIdToken();

      const response = await verifyPhoneToken(idToken);
      console.log("Phone verification response:", response);

      if (response.success) {
        if (response.isNewUser) {
          onSuccess(response);
        } else {
          storeUserData(response);
          onSuccess(response);
        }
      } else {
        throw new Error(response.message || "Phone verification failed");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      const errorMessage = error.message || "Invalid OTP. Please try again.";
      setError(errorMessage);
      onError?.(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const resetForm = () => {
    resetRecaptcha();
    setStep("PHONE");
    setError("");
    setOtp("");
  };
  const resetRecaptcha = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  };

  return {
    phoneNumber,
    otp,
    setOtp,
    step,
    error,
    loading,
    countdown,
    handlePhoneNumberChange,
    handleOTPChange,
    sendOTP,
    verifyOTP,
    resetForm,
    resendOTP,
  };
};
