import React, { useState } from 'react';

const WelcomePage = ({ onSignIn, signUp, isAdmin, onLeadLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = () => {
    if (username && password) {
      const newUser = {
        username,
        password,
        isAdmin: isAdmin,
      };
      signUp(newUser);
      setIsNewUser(false);
      setUsername('');
      setPassword('');
    }
  };

  const handleSignIn = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      onSignIn(user);
    } else {
      setErrorMessage('Invalid username or password.');
    }
  };

  return (
    <div className="welcome">
      <h1>Welcome</h1>
      {!isNewUser ? (
        <div>
          <h3>Sign In</h3>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignIn}>Sign In</button>
          <button onClick={() => setIsNewUser(true)}>Sign Up</button>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      ) : (
        <div>
          <h3>Create an Account</h3>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
      )}

      {isAdmin && (
        <div>
          <h3>Admin Login</h3>
          <button onClick={onLeadLogin}>Login as Admin</button>
        </div>
      )}
    </div>
  );
};

export default WelcomePage;
