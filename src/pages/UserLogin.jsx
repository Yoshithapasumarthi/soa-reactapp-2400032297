import { useState } from 'react'

function UserLogin() {
  const [loginData, setLoginData] = useState({ email: '', password: '' })

  function handleChange(event) {
    const { name, value } = event.target
    setLoginData({ ...loginData, [name]: value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    console.log('Login data:', loginData)
  }

  return (
    <section className="form-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <div>
          <p className="eyebrow">Welcome back</p>
          <h1>Login</h1>
          <p className="form-description">Sign in with your account details.</p>
        </div>
        <label>
          Email address
          <input name="email" type="email" value={loginData.email} onChange={handleChange} autoComplete="email" required />
        </label>
        <label>
          Password
          <input name="password" type="password" value={loginData.password} onChange={handleChange} autoComplete="current-password" required />
        </label>
        <button className="button button-primary" type="submit">Login</button>
      </form>
    </section>
  )
}

export default UserLogin