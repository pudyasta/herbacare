import React from "react";
import PropTypes from "prop-types";

const Button = ({
  children,
  type,
  href,
  disabled,
  onClick,
  className,
  color,
}) => {
  return (
    <button
      type="button"
      className={
        `${
          type == "outlined"
            ? "bg-white border border-2 border-green-dark " + color
              ? color
              : "text-green-dark" + " px-2"
            : color
            ? color
            : "text-white" + " bg-green-normal"
        } relative py-3  capitalize ` + className
      }
      onClick={onClick}
      disabled={disabled}
    >
      {href && <Link tabIndex={-1} className="absolute inset-0" href={href} />}
      {children}
    </button>
  );
};
Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["primary", "outlined"]).isRequired,
  href: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
Button.defaultProps = {
  href: "",
  disabled: false,
  onClick: () => undefined,
  className: "",
};
export default Button;
