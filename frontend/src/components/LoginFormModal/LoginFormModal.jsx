import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginFormModal.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  // if (sessionUser) return <Navigate to="/" replace={true} />;
  const demoLogin = () => {
    dispatch(sessionActions.login({credential: "demo@user.io", password: "password" }));
    closeModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
    .then(closeModal)
    .catch(
      async (res) => {
        const data = await res.json();
        if (data && data.message) {
          setErrors(data.message);
        }
      }
    );
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {{errors} && <p className="error-message">{Object.values(errors)}</p>}
        <button type="submit">Log In</button>
      </form>
      <button onClick={demoLogin}>Log In As Demo User</button>
    </>
  );
}

export default LoginFormModal;
