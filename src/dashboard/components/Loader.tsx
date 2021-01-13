import { FC } from "react";

interface Props {
  full: boolean;
}

const Loader: FC<Props> = ({ full }: Props) => {
  return (
    <div className={full ? "full" : ""}>
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
