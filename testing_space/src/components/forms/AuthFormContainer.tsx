import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type AuthFormContainerProps = {
  children?: React.ReactNode;
};

const AuthFormContainer: React.FC<AuthFormContainerProps> = ({children}) => ( 
    <div>
      {children}
      <ToastContainer/>
    </div>
  );

export default AuthFormContainer;