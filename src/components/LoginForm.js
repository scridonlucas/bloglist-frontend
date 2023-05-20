const LoginForm = ({
  handleLogin,
  username,
  handleUsernameChange,
  password,
  handlePasswordChange,
}) => {
  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            name="Passwprd"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default LoginForm;
