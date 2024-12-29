import { motion } from "framer-motion";
import { Loader, Lock, Mail } from "lucide-react";
import Input from "../components/Input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-hot-toast";
const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const{signin,isLoading,error,user} = useAuthStore()
  const navigate = useNavigate()

  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await signin(email,password)
      toast.success('welcome back')
      navigate('/')
    } catch (error) {
      console.log(error)
      
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className=" bg-gray-800 rounded-lg shadow-xl
     max-w-md w-full backdrop-filter backdrop-blur-xl bg-opacity-40 overflow-hidden"
    >
      <div className="p-8">
        <h2
          className="bg-gradient-to-r from-green-400 to-emerald-500 text-transparent
      bg-clip-text text-3xl font-bold text-center mb-6"
        >
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            icon={Mail}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            icon={Lock}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm ">{error}</p>}
          <div>
            <Link
              to="/forgot-password"
              className="text-green-400 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <motion.button
            initial={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="bg-green-600
          text-white rounded-lg p-2 w-full mt-4 hover:bg-green-500
          font-semibold transition duration-200"
          >
            {isLoading ? <Loader className="animate-spin mx-auto"/> : "Sign In"}
          </motion.button>
        </form>
      </div>
      <div className="p-5 bg-gray-900 opacity-50">
        <p className="text-center text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-green-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Signin;
