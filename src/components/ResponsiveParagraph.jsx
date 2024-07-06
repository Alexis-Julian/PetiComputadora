import PropTypes from "prop-types";

const ResponsiveParagraph = ({ children, style }) => {
  const styles = "text-sm md:text-[11px] lg:text-sm xl:text-xl " + " " + style;
  return <p className={styles}>{children}</p>;
};

// Definir PropTypes para el componente
ResponsiveParagraph.propTypes = {
  children: PropTypes.string,
  text: PropTypes.string.isRequired,
  style: PropTypes.string,
};

export default ResponsiveParagraph;
