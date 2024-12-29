import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EmailVerification = () => {
  const [code, setCode] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const{verifyEmail,error} = useAuthStore()
  const navigate = useNavigate()
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);
  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newCode = [...code];

    if (value.length > 1) {
      const pasteData = value.slice(0, 6).split("");
      for (let i = 0; i < pasteData.length; i++) {
        newCode[i] = pasteData[i] || "";
      }
      setCode(newCode);
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusedIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusedIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && !code[index]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const codeNumber = code.join("");
    try {
     await verifyEmail(codeNumber);
      toast.success("Email Verified Successfully");
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const allFilled = code.every((digit) => digit !== "");
    if (allFilled) handleSubmit(new Event("submit"));
  }, [code]);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="p-8 bg-gray-800 rounded-lg shadow-xl
     max-w-md w-full backdrop-filter backdrop-blur-xl bg-opacity-40 overflow-hidden"
      >
        <h2
          className="bg-gradient-to-r from-green-400 to-emerald-500 text-transparent
      bg-clip-text text-3xl font-bold text-center mb-6"
        >
          Verify Your Email
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Enter the 6-digit code sent to your email address
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                maxLength="6"
                value={digit}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                type="text"
                className="size-12 rounded-md border-2 border-gray-800
                     text-center font-bold text-green-500 bg-gray-700 opacity-50
                      focus:border-green-500 focus:outline-none"
              />
            ))}
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <motion.button
            initial={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="bg-green-600
          text-white rounded-lg p-2 w-full mt-4 hover:bg-green-500
          font-semibold transition duration-200"
          >
            Verify Email
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default EmailVerification;
