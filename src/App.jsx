import { useState, useEffect } from "react";
import RegistroInstruccion from "./components/RegistroInstruccion";
import MemoriaPrincipal from "./components/MemoriaPrincipal";
import Acumulador from "./components/Acumulador";
import ContadorPrograma from "./components/ContadorPrograma";
import Code from "./components/Code";
import { getOp, getInst, dec2bin } from "./helpers/InstruccionParser";
const worker = new Worker("./src/utils/emulador.js");

function App() {
  const [code, setCode] = useState([
    "STR 31",
    "SUB 31",
    "ADD 13",
    "JUP 05",
    "ADD 13",
    "ADD 14",
    "WRT 0",
    "STP 0",
    "WRT 0",
    "STP 0",
    "100",
    "123",
    "124",
    "11",
    "23",
  ]);

  /*EL VALOR NULL CAMBIA CUANDO EL WORKER EMPIEZA A DEVOLVER LOS VALORES A SUS RESPECTIVOS VALORES   */

  /* TAMAÑO MAXIMO DE MEMORIA */
  const [useTMM, setTMM] = useState(null);

  /* DISPLAY */
  const [useDisplay, setDisplay] = useState(null);

  /* REGISTRO DE OPERANDO */
  const [useCodigoOperandoReg, setCodigoOperandoReg] = useState(null);

  /* REGISTRO DE DIRRECCION */
  const [usetDireccioReg, setDireccioReg] = useState(null);

  /* REGISTRO DE ACUMULADOR  */
  const [useAcumuladorReg, setAcumuladorReg] = useState(null);

  /* REGISTRO DE PROGRAM COUNTER */
  const [useCounterProgram, setCounterProgram] = useState(null);

  /* ISReady */
  const [useIsReady, setIsReady] = useState(false);

  useEffect(() => {
    worker.postMessage({
      Type: "Init",
      Code: code,
    });

    worker.onmessage = function ({ data }) {
      if (data.Mem) {
        setTMM(data.Mem);
      }

      if (data.RI) {
        setCodigoOperandoReg(getInst(data.RI).split(""));
        setDireccioReg(getOp(data.RI).split(""));
        setCounterProgram(data.PC);
        setAcumuladorReg(String(dec2bin(data.ACUM)).split(""));

        //if(useCodigoOperandoReg && usetDireccioReg && useCounterProgram && useAcumuladorReg &&useTMM)
        setIsReady(!useIsReady);
      }

      if (data.Disp) {
        setDisplay(data.Disp);
      }
    };
  }, [code]);

  const Loading = () => {
    return <div className="lds-dual-ring"></div>;
  };

  const ViewPetiComputadora = () => {
    return (
      <>
        {" "}
        <section className=" w-full bg-gray-50 rounded-md  ">
          {/* <ChangePComputer /> */}
        </section>
        <section
          className="  bg-gray-50
   overflow-hidden rounded-md  col-start-1 grid grid-rows-[1fr_0.3fr] grid-cols-2 "
        >
          {/* MEMORIA PRINCIPAL  */}
          <ul className="border-[1px] border-black m-1 col overflow-y-scroll  overflow-hidden">
            {useTMM.map((e, index) => {
              return (
                <div key={index}>
                  <MemoriaPrincipal
                    direcc={e}
                    index={index}
                    cp={useCounterProgram}
                  />
                </div>
              );
            })}
          </ul>

          {/* UNIDAD DE CONTROL  */}
          <div className="border-[1px] border-black m-1 grid grid-rows-3 items-center  ">
            {/* REGISTRO PRINCIPAL */}
            <div className="w-full  flex items-center justify-center">
              <RegistroInstruccion
                registerDirecc={usetDireccioReg}
                registerOperand={useCodigoOperandoReg}
              />
            </div>
            {/* REGISTRO ACUMULADOR */}
            <div className="w-full  flex items-center justify-center">
              <Acumulador acum={useAcumuladorReg} />
            </div>

            <div className="w-full  flex items-center justify-center">
              {/* CONTADOR DE PROGRAMA  */}
              <ContadorPrograma tmm={useTMM} cp={useCounterProgram} />
            </div>
          </div>

          {/* ARITMETICA */}
          <div className="grid grid-cols-3   border-black m-1 row-start-2 row-end-3 col-start-1 col-end-3">
            <section className="rounded-sm bg-blue-50  relative">
              {/* <p className="absolute ">ARITMETICA</p> */}

              <p className="absolute top-0 left-0 text-black/50 text-md">
                Aritmetica
              </p>
            </section>
            <div className="bg-transparent"></div>
            <section className="relative rounded-sm bg-blue-50  text-center flex items-center justify-center text-2xl">
              <p>{useDisplay ? useDisplay : "Sin vista"}</p>
              <p className="absolute top-0 left-0 text-black/50 text-sm ">
                Display
              </p>
            </section>
          </div>
        </section>
        <section className=" bg-gray-50 col-start-2 col-end-3 row-start-1 row-end-3  ">
          <Code
            counterProgram={useCounterProgram}
            setCounterProgram={setCounterProgram}
            code={code}
          />
        </section>
      </>
    );
  };

  return (
    <div className="h-screen w-screen gap-2  overflow-scroll grid grid-rows-[0.2fr_1fr]  grid-cols-[1fr_0.2fr]  p-2">
      {useIsReady ? <ViewPetiComputadora /> : <Loading />}
    </div>
  );
}

export default App;
