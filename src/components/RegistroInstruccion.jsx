export default function RegistroInstruccion({
  k,
  pw,
  set,
  registerDirecc,
  registerOperand,
}) {
  const gridTemplateColumns = `repeat(${pw}, 1fr)`;
  //console.log(registerDirecc, "DIRECCION");
  //console.log(registerOperand, "OPERANDO");
  return (
    <div
      className={`relative w-[80%] h-[50px] text-xl border-black border-2   grid-rows-1 items-center  text-center`}
      style={{ display: "grid", gridTemplateColumns }}
    >
      {/* VA IDENTIFICAR AL CODIGO DE OPERANDO */}
      <div
        className={` top-[100%] w-full absolute `}
        style={{ display: "grid", gridTemplateColumns }}
      >
        <div
          className={`text-sm border-black border-b mt-2 col-start-1  col-end-${parseInt(
            set + 1
          )}`}
        >
          CODIGO OPERANDO
        </div>
      </div>

      {/* CODIGO DE OPERANDO */}
      {registerOperand.map((e, index) => {
        return (
          <i key={index} className="">
            {e}
          </i>
        );
      })}

      <div
        className={` top-[100%] w-full absolute`}
        style={{ display: "grid", gridTemplateColumns }}
      >
        <div
          className={`mx-[8px] text-sm border-black border-b mt-2`}
          style={{
            gridColumnStart: parseInt(set + 1),
            gridColumnEnd: parseInt(k + set + 1),
          }}
        >
          CAMPO DE DIRECCIONAMIENTO
        </div>
      </div>

      {/* CODIGO DE DIRECCIONAMIENTO */}
      {registerDirecc.map((e, index) => {
        return (
          <i key={index} className="">
            {e}
          </i>
        );
      })}
    </div>
  );
}
