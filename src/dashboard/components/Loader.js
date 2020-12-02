const Loader = ({ full }) => {
  return (
    <div className={full ? "full" : ""}>
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
