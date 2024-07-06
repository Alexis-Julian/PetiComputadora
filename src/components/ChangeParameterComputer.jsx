import propTypes from "prop-types";

function ChangeParameterComputer() {
  return (
    <div className="border-black border-[1px] h-full rounded-sm">
      <form className="w-full h-full grid grid-cols-3 grid-rows-2 items-center px-1">
        <label
          htmlFor=""
          className="text-lg font-semibold border-b-2 w-[95%] border-black"
        >
          SET :
          <input
            type="number"
            className="outline-none pl-1"
            defaultValue={useCodigoOperando}
          />
        </label>
        <label
          htmlFor=""
          className="text-lg font-semibold border-b-2 w-[95%] border-black "
        >
          PALABRA LOGICA :
          <input
            type="number"
            readOnly
            value={usePalabraLogica}
            className="outline-none pl-1 cursor-default"
          />
        </label>
        <label
          htmlFor=""
          className="text-lg font-semibold border-b-2 w-[95%] border-black"
        >
          TMM :
          <input
            type="text"
            readOnly
            className="outline-none pl-1"
            value={TAMANO_MAXIMO}
          />
        </label>
        <label
          htmlFor=""
          className="text-lg font-semibold border-b-2 w-[95%] border-black"
        >
          K :
          <input
            type="number"
            value={useDireccionamiento}
            onChange={(e) => setDireccionamiento(e.target.value)}
            className="outline-none pl-1"
            autoFocus
          />
        </label>
        <div className="col-start-3 col-end-4 row-start-1 row-end-3 size-full p-2 ">
          <button
            className=" text-center bg-black/50 size-full text-white rounded-md hover:bg-black transition-all"
            onClick={() => setMenuActive(!useMenuActive)}
          >
            CONFIGURACION
          </button>
        </div>
      </form>
    </div>
  );
}

ChangeParameterComputer.propTypes = {};

export default ChangeParameterComputer;
