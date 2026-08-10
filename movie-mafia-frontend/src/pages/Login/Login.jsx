import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { checkAuth } = useAuth();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await login(formData);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      {error && <p>{error}</p>}

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

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
}

export default Login;
