const LoggedIn = ({ user, handleButton }) => {
  return (
    <div>
      {user.username} is logged in.
      <button type="button" onClick={handleButton}>
        Log out
      </button>
    </div>
  );
};
export default LoggedIn;
