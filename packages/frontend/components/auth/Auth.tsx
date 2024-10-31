import React from 'react'
import AuthHeader from './AuthHeader'
import AuthFormLogin from './AuthFormLogin'
import AuthFormSignup from './AuthFormSignup'

export default function Auth({ login }: { login: boolean }) {
  return (
    <div className="flex flex-col gap-8 padding-main">
      <AuthHeader login={login} />
      {login ? <AuthFormLogin /> : <AuthFormSignup />}
    </div>
  )
}
