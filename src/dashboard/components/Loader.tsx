interface Props {
  full: boolean;
}

const Loader: React.FC<Props> = ({ full }: Props) => {
  return (
    <div className={full ? "full" : ""}>
      <div className="loader" />
    </div>
  );
};

export default Loader;
