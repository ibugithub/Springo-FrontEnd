import { useRouter } from "next/navigation";
import { HandleLogout } from "../utils/AuthLogout";
import { DropdownMenuProps } from "../interface";
import { authenticated } from "../utils/checkAuthentication";


export const DropdownMenu = (
  {onLogoutClick} : DropdownMenuProps
) => {
  const isAuthenticated = authenticated(false)
  const router = useRouter();

  const handleLogoutClick = () => {
    onLogoutClick();
    HandleLogout(router);
  };

  return (
    <ul className="dropdown">
      {isAuthenticated ? (
        <>
          <li className="dropdown-item">
            <a href="/profile" className="dropdown-link">
              My Profile
            </a>
          </li>
          <li className="dropdown-item">
            <a href="#" className="dropdown-link" onClick={handleLogoutClick}>
              Logout
            </a>
          </li>
        </>
      ) : (
        <>
          <li className="dropdown-item">
            <a href="/signin" className="dropdown-link">
              Sign In
            </a>
          </li>
          <li className="dropdown-item">
            <a href="/signup" className="dropdown-link">
              Sign Up
            </a>
          </li>
        </>
      )}
    </ul>
  );
};

