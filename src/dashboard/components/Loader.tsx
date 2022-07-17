interface Props {
  full: boolean;
}

export function Loader({ full }: Props) {
  return (
    <div className={full ? "full" : ""}>
      <div className="loader" />
    </div>
  );
}
