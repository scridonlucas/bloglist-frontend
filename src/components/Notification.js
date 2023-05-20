const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  if (message.includes('succesfully')) return <div>{message}</div>;

  return <div>{message}</div>;
};

export default Notification;
