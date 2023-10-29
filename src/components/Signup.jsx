import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../style";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "./Modal";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [allowCancel, setAllowCancel] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !name || !password) {
      toast.error('Please fill in all fields.');
      return;
    }
    try {
      const userData = {
        name,
        email,
        password
      };
      const response = await axios.post('https://nice-jade-cocoon-gear.cyclic.app/api/register', userData);
      
      if (response.data && response.data.mssg) {
        setModalContent(response.data.mssg); // Displaying success message in modal
        const userID = response.data.userID;
        localStorage.setItem('userID', userID);
        setShowModal(true);
        setAllowCancel(false); 
      } else if(response.data && response.data.mailError) {
        setModalContent(response.data.mailError); // Displaying mail error in modal
        setShowModal(true);
        setAllowCancel(true);
      } else if(response.data && response.data.error) {
        setModalContent(response.data.error); // Displaying any other server errors in modal
        setShowModal(true);
        setAllowCancel(true);
      } else {
        toast.error('Error during registration. Please try again.');
      }
    } catch (error) {
      const errorMessage = error.response && (error.response.data.mssg || error.response.data.mailError || error.response.data.error) ? 
                           (error.response.data.mssg || error.response.data.mailError || error.response.data.error) :
                           'Error during registration. Please try again.';
      setModalContent(errorMessage); // Displaying errors in modal
      setShowModal(true);
      setAllowCancel(true);
    }
  };

  return (
    <div className="bg-primary flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Register as a new user
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-primary py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Email Input */}
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

            {/* Password Input */}
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

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>

            {/* Login Redirect */}
            <div className={`${styles.noramlFlex} w-full`}>
              <h4 className="text-white">Already have an account?</h4>
              <Link to="/login" className="text-blue-400 pl-2">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
      
      <Modal 
        title={allowCancel ? "Error": "Registration Successfull"}
        content={modalContent}
        showModal={showModal}
        setShowModal={setShowModal}
        allowCancel={allowCancel}
      />
    </div>
  );
};

export default Signup;
