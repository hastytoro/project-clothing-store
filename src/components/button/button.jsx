import "./button.scss";

const BUTTON_TYPES = {
  google: "google-sign-in",
  invert: "invert",
};

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
