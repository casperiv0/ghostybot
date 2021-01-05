const Switch = (props) => {
  return (
    <label title={props.title || ""} className="switch">
      <input {...props} type="checkbox" />
      <span className="slider"></span>
    </label>
  );
};

export default Switch;
