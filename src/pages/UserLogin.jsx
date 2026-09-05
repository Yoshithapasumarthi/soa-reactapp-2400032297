import { useState } from 'react'
import axios from 'axios'

function UserLogin() {

  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [message,setMessage] = useState("")
  const [error,setError] = useState("")

  function handleChange(event) {
    const { name, value } = event.target
    setLoginData({ ...loginData, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post('http://localhost:8001/user/login', loginData)

      if (response.status === 200) {
        console.log('Login successful:', response.data)
        //alert('Login successful')
        setMessage("Login success")
      } else {
        console.error('Login failed:', response)
        //alert('Login failed')
        setError("Login failed")
      }
    } catch (error) {
      if (error.response) {
        console.error('Error in response:', error.response.data)
       // alert(error.response.data?.message || 'Error in response')
      setError(error.response.data?.message || 'Error in response')
      } 
      else if (error.request) {
        console.error('Error in request:', error.request)
        //alert('Error in request')
        setError('Error in request')
      } else {
        console.error('Error:', error.message)
        //alert('Something went wrong')
        setError('Something went wrong')
      }
    }
  }

  return (
    <section className="form-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <div>
          {
             message ? <p>{message}</p>
             :         <p>{error}</p>
          }
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