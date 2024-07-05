import { useState, useEffect } from "react";
import RegistroInstruccion from "./components/RegistroInstruccion";
import MemoriaPrincipal from "./components/MemoriaPrincipal";
import Acumulador from "./components/Acumulador";
import ContadorPrograma from "./components/ContadorPrograma";
import Code from "./components/Code";

const worker = new Worker("./src/utils/emulador.js");

function App() {
  const [probando, setProbando] = useState(1);
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

  useEffect(() => {
    worker.postMessage({
      Type: "Init",
      Code: code,
    });

    worker.onmessage = function (message) {};
  }, []);

  const BITSDEMEMORIA = 8;
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
  const [useCodigoOperandoReg, setCodigoOperandoReg] = useState(
    new Array(useCodigoOperando).fill("0")
  );

  /* REGISTRO DE DIRRECCION */
  const [usetDireccioReg, setDireccioReg] = useState(
    new Array(useDireccionamiento).fill("0")
  );

  /* REGISTRO DE ACUMULADOR  */
  const [useAcumuladorReg, setAcumuladorReg] = useState(
    new Array(BITSDEMEMORIA).fill("0")
  );

  /* REGISTRO DE PROGRAM COUNTER */
  const [useCounterProgramReg, setCounterProgramReg] = useState(0);

  /* IMPRIMIR EN PANTALLA  */
  const [usePrint, setPrint] = useState();

  const TAMANO_MAXIMO =
    String(2 ** useDireccionamiento * usePalabraLogica) + " Bytes";

  //Generra nuevvos campos de acumulador ESTO NO VA ACA
  /*  const camposAcumulador = new Array(8).fill("0");
  setAcumuladorReg(camposAcumulador); */

  /* ACA VAMOS A USAR DIRECCIONAMIENTO */

  /* CUANDO SE CAMBIA EL DIRECCIONAMIENTO HAY QUE CAMBIAR EL COONTADOR DE PROGRAMA Y MEMORIA PRINCIPAL  */
  useEffect(() => {
    //Modifiica la memoria principal
    const resultado = 2 ** useDireccionamiento;
    const memoriaArray = new Array(resultado).fill("00000000");
    setTMM(memoriaArray);
  }, []);

  /*  */
  /* useEffect(() => {
    try {
      const operandoArray = new Array(useCodigoOperando).fill("0");
      setCodigoOperandoReg(operandoArray);
    } catch (error) {
      console.log(error);
    }
  }, [useCodigoOperando]); */

  return (
    <div className="h-screen w-screen gap-2  overflow-scroll grid grid-rows-[0.2fr_1fr]  grid-cols-[1fr_0.2fr]  p-2      font-poppins  ">
      <section className=" w-full bg-gray-50 rounded-md  ">
        1{/* <ChangePComputer /> */}
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
                <MemoriaPrincipal direcc={e} index={index} />
              </div>
            );
          })}
        </ul>

        {/* UNIDAD DE CONTROL  */}
        <div className="border-[1px] border-black m-1 grid grid-rows-3 items-center  ">
          {/* REGISTRO PRINCIPAL */}
          <div className="w-full  flex items-center justify-center">
            <RegistroInstruccion
              k={useDireccionamiento}
              pw={usePalabraLogica}
              set={useCodigoOperando}
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
            <ContadorPrograma
              k={useDireccionamiento}
              pw={usePalabraLogica}
              set={useCodigoOperando}
            />
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
            <p>{usePrint ? usePrint : "Sin vista"}</p>
            <p className="absolute top-0 left-0 text-black/50 text-sm ">
              Pantalla
            </p>
          </section>
        </div>
      </section>
      <section className=" bg-gray-50 col-start-2 col-end-3 row-start-1 row-end-3  ">
        <Code
          counterProgram={useCounterProgramReg}
          setCounterProgram={setCounterProgramReg}
          code={code}
        />
      </section>
    </div>
  );
}

export default App;
