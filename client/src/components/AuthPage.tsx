import React, { useState } from 'react'
import LoginScreen from './LoginScreen'
import GetStartedScreen from './GetStartedScreen'

const AuthPage = () => {
  const [isLoginPage, setIsLoginPage] = useState<boolean>(true)
  return (
    <>
      {isLoginPage ? (
        <LoginScreen setIsLoginPage={setIsLoginPage} />
      ) : (
        <GetStartedScreen setIsLoginPage={setIsLoginPage} />
      )}
    </>
  )
}

export default AuthPage