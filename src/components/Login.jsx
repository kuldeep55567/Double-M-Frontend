import { React, useState,useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../style";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal"; // Import your Modal component

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  useEffect(() => {
    if (!showModal && loggedIn) {
      navigate('/');
    }
  }, [showModal, navigate, loggedIn]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("handleSubmit called"); // Add this line
  
    try {
        const response = await axios.post('https://nice-jade-cocoon-gear.cyclic.app/api/login', { email, password });
        console.log("Server response: ", response); // Add this line
        if (response.data.ok) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('name', response.data.name);
          localStorage.setItem('userID', response.data.id);
          localStorage.setItem('role', response.data.role);
          setModalMessage('Logged in successfully');
          setShowModal(true);
          setLoggedIn(true);
          navigate("/")
          window.location.reload()
        }
    } catch (error) {
        console.log("Error during login: ", error); // Add this line
        if (error.response && error.response.data) {
          setModalMessage(error.response.data.mssg);
          setShowModal(true);
        } else {
          setModalMessage('Error logging in. Please try again later.');
          setShowModal(true);
        }
    }
  };
  
  return (
    <div className=" bg-primary flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Login to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-primary py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            <div className={`${styles.noramlFlex} justify-between`}>
              <div className={`${styles.noramlFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-blue-400 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-white"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href=".forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-600"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4 className="text-white">Not have any account?</h4>
              <Link to="/signup" className="text-blue-400 pl-2">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Modal 
        title="Login Error"
        content={modalMessage}
        showModal={showModal}
        setShowModal={setShowModal}
        allowCancel={true}
      />
    </div>
  );
};

export default Login;
