import React from 'react'
import { AuthProvider } from '../../contexts/AuthContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Auth = ({ children }) => {
  return (
    <AuthProvider>
      <main className="pb-20 min-h-screen">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="w-full m-auto">
          <div className="h-[86vh] flex justify-center items-center">
            <div className="flex flex-col gap-y-2 max-w-[480px] w-full">
              {children}
            </div>
          </div>
        </div>
      </main>
    </AuthProvider>
  )
}

export default Auth
