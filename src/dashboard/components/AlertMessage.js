const AlertMessage = ({ type = "warning", message }) => {
  return <div className={`alert-message alert-${type}`}>{message}</div>;
};

export default AlertMessage;
