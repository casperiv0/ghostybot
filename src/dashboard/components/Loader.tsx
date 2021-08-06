interface Props {
  full: boolean;
}

export const Loader: React.FC<Props> = ({ full }: Props) => {
  return (
    <div className={full ? "full" : ""}>
      <div className="loader" />
    </div>
  );
};
