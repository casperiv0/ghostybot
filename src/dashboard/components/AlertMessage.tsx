import { Check, Warning } from "./icons";

interface Props {
  type?: "warning" | "error" | "success";
  message: React.ReactNode;
}

export function AlertMessage({ type = "warning", message }: Props) {
  return (
    <div className={`alert-message alert-${type}`}>
      {type === "warning" ? <Warning /> : null}
      {type === "error" ? <Warning /> : null}
      {type === "success" ? <Check /> : null}
      <p>{message}</p>
    </div>
  );
}
