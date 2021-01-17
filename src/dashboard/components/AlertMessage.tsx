import { FC } from "react";
import { Check, Warning } from "./icons";

interface Props {
  type?: "warning" | "error" | "success";
  message: string;
}

const AlertMessage: FC<Props> = ({ type = "warning", message }: Props) => {
  return (
    <div className={`alert-message alert-${type}`}>
      {type === "warning" ? <Warning /> : null}
      {type === "error" ? <Warning /> : null}
      {type === "success" ? <Check /> : null}
      {message}
    </div>
  );
};

export default AlertMessage;
