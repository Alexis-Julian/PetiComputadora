import propTypes from "prop-types";
function MemoriaPrincipal({ direcc, index, cp }) {
  const arrayBit = direcc.split("");

  return (
    <li
      className={`${
        cp - 1 == index ? "bg-black/5" : ""
      } transition-all cursor-pointer text-2xl grid grid-cols-[0.2fr_1fr_0.2fr] justify-center items-center gap-2 w-full text-center h-[50px]`}
    >
      <p className="border-r border-black/50">{index}</p>
      <span className="h-full w-full flex items-center">
        {arrayBit.map((e, index) => {
          return (
            <p key={index} className="flex-grow ">
              {e}
            </p>
          );
        })}
      </span>
      <p className="border-l border-black/50 text-[1.3rem]">
        {parseInt(direcc, 2)}
      </p>
    </li>
  );
}

MemoriaPrincipal.propTypes = {
  direcc: propTypes.array,
  index: propTypes.number,
  cp: propTypes.oneOfType([propTypes.number, propTypes.string]),
};
export default MemoriaPrincipal;
