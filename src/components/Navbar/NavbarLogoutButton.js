import { useNavigate } from "react-router-dom";
import { logout } from "../../slices/authSlice";
import { useDispatch } from "react-redux";

export const NavbarLogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(logout());
    navigate("/");
  };

  return <button className="bg-red-700 hover:bg-red-800 text-white rounded-md px-3 py-1"
          onClick={onClick}>Logout</button>
};