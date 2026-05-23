import { Link, useNavigate } from "react-router-dom";
import { CalendarDays } from "lucide-react";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
        >
          <div className="p-2 rounded-xl bg-white text-black group-hover:scale-105 transition">
            <CalendarDays size={20} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white tracking-wide">
              BookEvent
            </h1>
            <p className="text-[11px] text-gray-400 -mt-1">
              Discover • Book • Enjoy
            </p>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-3 md:gap-6 text-sm font-medium">
          
          <Link
            to="/"
            className="text-gray-300 hover:text-white transition duration-200"
          >
            Events
          </Link>

          <Link
            to="/create"
            className="text-gray-300 hover:text-white transition duration-200"
          >
            Become an Organiser
          </Link>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="
                px-5 py-2 rounded-xl
                bg-red-500/90 text-white
                hover:bg-red-600
                transition-all duration-200
                shadow-lg shadow-red-500/20
                hover:scale-105
              "
            >
              Logout
            </button>
          ) : (
            <div className="flex items-center gap-3">
              
              <Link
                to="/login"
                className="
                  text-gray-300
                  hover:text-white
                  transition
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                  px-5 py-2 rounded-xl
                  bg-white text-black
                  font-semibold
                  hover:bg-gray-200
                  transition-all duration-200
                  hover:scale-105
                  shadow-lg
                "
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
