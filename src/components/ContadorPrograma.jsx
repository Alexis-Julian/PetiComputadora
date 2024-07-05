export default function ContadorPrograma({ tmm, cp }) {
  //const k = 5;
  //const set = 3;
  const pw = 8;
  const gridTemplateColumns = `repeat(${pw}, 1fr)`;

  const contadorPrograma = String(tmm[cp]).split("");

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
            gridColumnEnd: parseInt(pw + 1),
          }}
        >
          CONTADOR DE PROGRAMA
        </div>
      </div>

      {/* CONTADOR DE PROGRAMA */}
      {contadorPrograma.map((e, index) => {
        return (
          <i key={index} className="">
            {e}
          </i>
        );
      })}
    </div>
  );
}
