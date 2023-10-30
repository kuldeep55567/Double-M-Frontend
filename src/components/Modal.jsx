import React from 'react';
import { AiOutlineCloseCircle } from "react-icons/ai";
const Modal = ({ title, content, showModal, setShowModal,mode, allowCancel = true }) => {
  if (!showModal) return null;

  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center">
      <div className="absolute w-full h-full bg-black opacity-50"></div>
      <div className="bg-primary p-6 rounded shadow-lg w-11/12 sm:w-4/6 md:w-1/2 lg:w-1/3">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
          {allowCancel && (
            <AiOutlineCloseCircle
              onClick={() => { console.log("Close button clicked"); setShowModal(false); }}
              size={20}
              className="cursor-pointer text-white"
              style={{ zIndex: 1000 }}
            />
          )}
        </div>
        <p className="text-white">{content}</p>
      </div>
      
    </div>
  );
};


export default Modal;
