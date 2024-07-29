import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/Authcontext";
import LogoutButton from "../LogoutButton";
const NavBar = () => {
    const { authUser } = useAuthContext();

    return (

        <div >
            <nav className="navbar">
                <div className="logo">Logo</div>
                <br />

                <ul className="nav-links">
                    <li><Link to="/" >Home</Link></li>
                    <li><Link to="/employeeList">Employee List</Link></li>
                    <li>{authUser.username}</li>
                    <li><LogoutButton /></li>
                </ul>

            </nav>
          
        </div>
    )
}

export default NavBar;
