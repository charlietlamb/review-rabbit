import AuthHeader from './auth-header'
import AuthFormLogin from './form/auth-form-login'
import AuthFormSignup from './form/auth-form-signup'

export default function Auth({ login }: { login: boolean }) {
  return (
    <div className="flex flex-col gap-4 w-full max-w-[360px] mx-auto items-center">
      <AuthHeader login={login} />
      {login ? <AuthFormLogin /> : <AuthFormSignup />}
    </div>
  )
}
