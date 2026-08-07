import { useState } from "react"
import { login } from "../../services/authService"
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


function Login() {
  const { checkAuth } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email : "",
    password : "",
  })

  const handleChange = (e)=>{
    const {name, value} = e.target
    
    setFormData({
      ...formData,
      [name] : value
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const response = await login(formData)
      await checkAuth();
      navigate("/")

    } catch (error) {
      console.error(error)
      alert(error.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} noValidate>
      <input
      type="email" 
      name="email" 
      value={formData.email} 
      required
      onChange={handleChange}
      placeholder="Enter Email"
      autoComplete="email"
       />


      <input 
      type="password" 
      name="password" 
      value={formData.password} 
      required
      onChange={handleChange}
      placeholder="Enter Password"
      autoComplete="current-password"
      />

      <button 
      type="submit"
       className="bg-blue-500 hover:bg-blue-600 hover:scale-95 transition-all duration-200 p-2 rounded-md text-white">Login</button>
  </form>
    </main>
  )
}

export default Login
