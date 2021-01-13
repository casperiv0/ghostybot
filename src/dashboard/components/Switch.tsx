import { FC } from "react";

interface Props {
  title: string;
}

const Switch: FC<Props> = (props: Props) => {
  return (
    <label title={props.title || ""} className="switch">
      <input {...props} type="checkbox" />
      <span className="slider"></span>
    </label>
  );
};

export default Switch;
