import React from "react";

const Button = ({ label = "Join Now", styles }) => (
  <button
    type="button"
    className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}
  >
    {label}
  </button>
);

export default Button;
