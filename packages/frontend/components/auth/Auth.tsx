import React from 'react'
import AuthHeader from './auth-header'
import AuthFormLogin from './auth-form-login'
import AuthFormSignup from './auth-form-signup'

export default function Auth({ login }: { login: boolean }) {
  return (
    <div className="flex flex-col gap-8 padding-main">
      <AuthHeader login={login} />
      {login ? <AuthFormLogin /> : <AuthFormSignup />}
    </div>
  )
}
