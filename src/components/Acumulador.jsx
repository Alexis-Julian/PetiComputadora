import propTypes from "prop-types";

function Acumulador({ acum }) {
  const gridTemplateColumns = `repeat(8, 1fr)`;

  return (
    <div
      className={`relative w-[80%] h-[50px] text-xl border-black border-2   grid-rows-1 items-center  text-center`}
      style={{ display: "grid", gridTemplateColumns }}
    >
      <div
        className={` top-[100%] w-full absolute`}
        style={{ display: "grid", gridTemplateColumns }}
      >
        <div
          className={`mx-[8px] text-sm border-black border-b mt-2`}
          style={{
            gridColumnStart: parseInt(1),
            gridColumnEnd: parseInt(9),
          }}
        >
          ACUMULADOR
        </div>
      </div>

      {/* CONTADOR DE PROGRAMA */}
      {acum.map((e, index) => {
        return (
          <i key={index} className="">
            {e}
          </i>
        );
      })}

      <div className="absolute -right-12 h-[50px] flex items-center border-b-2 border-black/15 ">
        {parseInt(acum.join(""), 2)}
      </div>
    </div>
  );
}

Acumulador.propTypes = {
  acum: propTypes.array.isRequired,
};

export default Acumulador;
