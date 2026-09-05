import { useState } from 'react'
import axios from 'axios'

function UserRegistration() {
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
    role: '',
  })

  function handleChange(event) {
    const { name, value } = event.target
    setRegistrationData({ ...registrationData, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post('http://localhost:8001/user/add', registrationData)

      if (response.status === 201) {
        console.log('Registration successful:', response.data)
        alert('Registration successful')
      } else {
        console.error('Registration failed:', response)
        alert('Registration failed')
      }
    } catch (error) {
      if (error.response) {
        console.error('Error in response:', error.response.data)
        alert(error.response.data?.message || 'Error in response')
      } else if (error.request) {
        console.error('Error in request:', error.request)
        alert('Error in request')
      } else {
        console.error('Error:', error.message)
        alert('Something went wrong')
      }
    }
  }

  return (
    <section className="form-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <div>
          <p className="eyebrow">New account</p>
          <h1>Register</h1>
          <p className="form-description">Enter your details to create an account.</p>
        </div>
        <label>
          Full name
          <input name="name" type="text" value={registrationData.name} onChange={handleChange} autoComplete="name" required />
        </label>
        <label>
          Email address
          <input name="email" type="email" value={registrationData.email} onChange={handleChange} autoComplete="email" required />
        </label>
        <label>
          Password
          <input name="password" type="password" value={registrationData.password} onChange={handleChange} autoComplete="new-password" required />
        </label>
        <label>
          Contact number
          <input
            name="contact"
            type="tel"
            value={registrationData.contact}
            onChange={handleChange}
            inputMode="numeric"
            pattern="[6-9][0-9]{9}"
            title="Enter a 10-digit contact number starting with 6, 7, 8, or 9"
          />
        </label>
        <label>
          Role
          <select name="role" value={registrationData.role} onChange={handleChange} required>
            <option value="" disabled>Select a role</option>
            <option value="ADMIN">Admin</option>
            <option value="MANAGER">Manager</option>
            <option value="USER">User</option>
          </select>
        </label>
        <button className="button button-primary" type="submit">Register</button>
      </form>
    </section>
  )
}

export default UserRegistration