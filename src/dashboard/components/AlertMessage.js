import { Check, Warning } from "./icons";

const AlertMessage = ({ type = "warning", message }) => {
  return (
    <div className={`alert-message alert-${type}`}>
      {type === "warning" ? <Warning /> : null}
      {type === "success" ? <Check /> : null}
      {message}
    </div>
  );
};

export default AlertMessage;
