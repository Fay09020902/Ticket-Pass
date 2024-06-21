import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Si4Chan } from 'react-icons/si';
import * as sessionActions from '../../store/session';
import { NavLink } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
        if (ulRef.current && !ulRef.current.contains(e.target)) {
          setShowMenu(false);
        }
      };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className='profiledropdown'>
      <button className="acountbutton" onClick={toggleMenu}>
        <Si4Chan />  My Account
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <div className="profile-header">
          <p>Welcome back!</p>
          <p>{user.firstName} {user.lastName}</p>
        </div>
        <li>
          <NavLink
          to={`/accounts`}
          className="my-account"
          onClick={toggleMenu}
        >
          Manage Account
        </NavLink>
        </li>
        <li>
        <NavLink
          to={"/events/new"}
          style={{ textDecoration: "none" }}
          onClick={toggleMenu}
        >
          Add your Event
        </NavLink>
        </li>
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
      </ul>
    </div>
  );
}

export default ProfileButton;
