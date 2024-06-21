import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal'
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const sessionLinks = sessionUser ? (
    <li>
      <ProfileButton user={sessionUser} />
    </li>
  ) : (
    <>
      <li className='navlinks'>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
      </li>
      <li className='navlinks'>
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </li>
    </>
  );

  return (
    <div className='nav-container'>
      <ul className='nav'>
        <li className='navlinks'>
        <NavLink to="/" >
          <button>
           Home
          </button>
          </NavLink>
        </li>
        {isLoaded && sessionLinks}
      </ul>
      <h2>Concert Tickets</h2>
    </div>
  );
}

export default Navigation;
