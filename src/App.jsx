import { useState, useEffect, memo } from "react";
import "./App.css";

function App() {
  /* INSTRUCCIONES */
  const [useMenuActive, setMenuActive] = useState(false);

  /* CODIGO DE DIRECCIONAMIENTO */
  const [useDireccionamiento, setDireccionamiento] = useState(5);
  /* CODIGO DE OPERANDO */
  const [useCodigoOperando, setCodigoOperando] = useState(3);

  /* PALABRA LOGICA */
  const [usePalabraLogica, setPalabraLogica] = useState(
    useDireccionamiento + useCodigoOperando
  );

  const [useBitsE, setBitsE] = useState(0);

  const [useTMM, setTMM] = useState([]);

  /* REGISTRO DE OPERANDO */
  const [useCodigoOperandoReg, setCodigoOperandoReg] = useState([]);
  /* REGISTRO DE DIRRECCION */
  const [usetDireccioReg, setDireccioReg] = useState([]);
  /* REGISTRO DE ACUMULADOR  */
  const [useAcumuladorReg, setAcumuladorReg] = useState([]);
  /* REGISTRO DE PROGRAM COUNTER */
  const [useCounterProgramReg, setCounterProgramReg] = useState([]);

  const TAMANO_MAXIMO =
    String(2 ** useDireccionamiento * usePalabraLogica) + " Bytes";

  useEffect(() => {
    try {
      //Modifiica la memoria principal
      const resultado = 2 ** useDireccionamiento;
      const memoriaArray = new Array(resultado).fill("00000000");
      setTMM(memoriaArray);

      //Genera nuevos campos de direccionamiento
      const camposDirecccionamiento = new Array(useDireccionamiento).fill("0");
      setDireccioReg(camposDirecccionamiento);

      //Genera nuevos campos de counterProgram
      const camposCounterProgram = new Array(useDireccionamiento).fill("0");
      setCounterProgramReg(camposCounterProgram);

      //Generra nuevvos campos de acumulador
      const camposAcumulador = new Array(8).fill("0");
      setAcumuladorReg(camposAcumulador);
    } catch (error) {
      console.log(error);
    }
  }, [useDireccionamiento]);

  useEffect(() => {
    try {
      const operandoArray = new Array(useCodigoOperando).fill("0");
      setCodigoOperandoReg(operandoArray);
    } catch (error) {
      console.log(error);
    }
  }, [useCodigoOperando]);

  const MenuConfig = () => {
    return (
      <section className="size-full">
        <div className="size-8  cursor-pointer h-[10%] w-full p-2">
          <button
            className="bg-white/90  border-[1px] size-full rounded-sm hover:bg-white transition-all"
            onClick={() => setMenuActive(!useMenuActive)}
          >
            CERRAR
          </button>
        </div>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>
      </section>
    );
  };

  const ChangePComputer = () => {
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
              value={useCodigoOperando}
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
  };

  const Register = () => {
    const gridTemplateColumns = `repeat(${usePalabraLogica}, 1fr)`;
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
              useCodigoOperando + 1
            )}`}
          >
            CODIGO OPERANDO
          </div>
        </div>

        {/* CODIGO DE OPERANDO */}
        {useCodigoOperandoReg.map((e) => {
          return <i className="">{e}</i>;
        })}

        <div
          className={` top-[100%] w-full absolute`}
          style={{ display: "grid", gridTemplateColumns }}
        >
          <div
            className={`mx-[8px] text-sm border-black border-b mt-2`}
            style={{
              gridColumnStart: parseInt(useDireccionamiento - 1),
              gridColumnEnd: parseInt(
                useDireccionamiento + useCodigoOperando + 1
              ),
            }}
          >
            CAMPO DE DIRECCIONAMIENTO
          </div>
        </div>

        {/* CODIGO DE DIRECCIONAMIENTO */}
        {usetDireccioReg.map((e) => {
          return <i className="">{e}</i>;
        })}
      </div>
    );
  };

  const RegisterMemory = ({ direcc, index }) => {
    const arrayBit = direcc.split("");

    return (
      <li className="hover:bg-black/5 transition-all cursor-pointer text-2xl grid grid-cols-[0.2fr_1fr] justify-center items-center gap-2 w-full text-center h-[50px]">
        <p className="border-r border-black/50">{index}</p>
        <span className="h-full w-full flex items-center">
          {arrayBit.map((e) => {
            return <i className="flex-grow">{e}</i>;
          })}
        </span>
      </li>
    );
  };

  const CounterProgram = () => {
    const gridTemplateColumns = `repeat(${useDireccionamiento}, 1fr)`;
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
              gridColumnEnd: parseInt(useDireccionamiento + 1),
            }}
          >
            CONTADOR DE PROGRAMA
          </div>
        </div>

        {/* CONTADOR DE PROGRAMA */}
        {useCounterProgramReg.map((e) => {
          return <i className="">{e}</i>;
        })}
      </div>
    );
  };

  const Acumulador = () => {
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
        {useAcumuladorReg.map((e) => {
          return <i className="">{e}</i>;
        })}
      </div>
    );
  };

  return (
    <div className="h-screen w-screen p-2   bg-white  flex flex-col font-poppins ">
      <section className="h-[10%] px-1 w-full ">
        <ChangePComputer />
      </section>
      <section className="grid grid-rows-[1fr_0.3fr] grid-cols-2 h-[90%]">
        {/* MEMORIA PRINCIPAL  */}
        <ul className="border-[1px] border-black m-1 col overflow-y-scroll  overflow-hidden">
          {useTMM.map((e, index) => {
            return (
              <div key={index}>
                <RegisterMemory direcc={e} index={index} />
              </div>
            );
          })}
        </ul>

        {/* UNIDAD DE CONTROL  */}
        <div className="border-[1px] border-black m-1 grid grid-rows-3 items-center  ">
          {/* REGISTRO PRINCIPAL */}
          <div className="w-full  flex items-center justify-center">
            <Register />
          </div>
          {/* REGISTRO ACUMULADOR */}
          <div className="w-full  flex items-center justify-center">
            <Acumulador />
          </div>
          <div className="w-full  flex items-center justify-center">
            {/* CONTADOR DE PROGRAMA  */}
            <CounterProgram />
          </div>
        </div>

        {/* ARITMETICA */}
        <div className="border-[1px] border-black m-1 row-start-2 row-end-3 col-start-1 col-end-3">
          ARITMETICA
        </div>
      </section>
      <div
        className={`absolute bg-black/80 right-0 top-0 h-[100%] w-[35%] transition-all translate-x-[${
          useMenuActive ? "0" : "100%"
        }]`}
      >
        <MenuConfig />
      </div>
    </div>
  );
}

export default App;
