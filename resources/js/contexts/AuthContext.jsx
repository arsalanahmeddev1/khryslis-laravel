import React, { createContext, useContext } from 'react'
import { usePage } from "@inertiajs/react";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { auth } = usePage().props;
  return (
    <AuthContext.Provider value={auth.user}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
