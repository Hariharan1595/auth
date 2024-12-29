import { motion } from "framer-motion";
import Input from "../components/Input";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const navigate = useNavigate()
  const {signup,error,isLoading} = useAuthStore( )
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
     await signup(email,password,username)
     navigate('/verify-email')
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
          Create An Account
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            icon={User}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            icon={Mail}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <motion.button
            initial={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="bg-green-600
          text-white rounded-lg p-2 w-full mt-4 hover:bg-green-500
          font-semibold transition duration-200"
          >
            {isLoading ? <Loader className="mx-auto  animate-spin"/>: "Sign Up"}
          </motion.button>
        </form>
      </div>
      <div className="p-5 bg-gray-900 opacity-50">
        <p className="text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/signin" className="text-green-400 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Signup;
