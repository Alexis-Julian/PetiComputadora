export default function Acumulador() {
  const gridTemplateColumns = `repeat(8, 1fr)`;
  const campoAcumulador = new Array(8).fill("0");
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
      {campoAcumulador.map((e, index) => {
        return (
          <i key={index} className="">
            {e}
          </i>
        );
      })}
    </div>
  );
}
