import PropTypes from "prop-types";

const ResponsiveInput = ({ placeholder, style, value, readOnly }) => {
  let styles =
    "border border-gray-300 rounded-md text-sm md:text-[11px] lg:text-sm xl:text-lg   w-full " +
    " " +
    style +
    (readOnly && " cursor-default");

  /* 2xl:hidden <- 1920x1080 | xl:1360x768 | lg:1024x872 | md:762x872 | mobile  */
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={styles}
      defaultValue={value && value}
      readOnly={readOnly ? true : false}
    />
  );
};

// Definir PropTypes para el componente
ResponsiveInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  style: PropTypes.string,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
};

export default ResponsiveInput;
