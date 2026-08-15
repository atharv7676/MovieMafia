import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <nav className="absolute top-0 left-0 z-50 w-full">
      <button
      
      onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
