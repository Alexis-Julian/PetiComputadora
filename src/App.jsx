import { useState, useEffect, memo } from "react";
import RegistroInstruccion from "./components/RegistroInstruccion";
import MemoriaPrincipal from "./components/MemoriaPrincipal";
import Acumulador from "./components/Acumulador";
import ContadorPrograma from "./components/ContadorPrograma";

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

    //Genera nuevos campos de direccionamiento
    const camposDirecccionamiento = new Array(useDireccionamiento).fill("0");
    setDireccioReg(camposDirecccionamiento);
    console.log(camposDirecccionamiento);
    //Genera nuevos campos de counterProgram
    const camposCounterProgram = new Array(useDireccionamiento).fill("0");
    setCounterProgramReg(camposCounterProgram);
  }, [useDireccionamiento]);

  /*  */
  /* useEffect(() => {
    try {
      const operandoArray = new Array(useCodigoOperando).fill("0");
      setCodigoOperandoReg(operandoArray);
    } catch (error) {
      console.log(error);
    }
  }, [useCodigoOperando]); */

  const MenuConfig = () => {
    const codigo = new Array(16).fill("");
    console.log(codigo);
    return (
      <section className="p-2 size-full grid grid-rows-[0.1fr_1fr_0.2fr]">
        <h3 className=" bg-blue-50 rounded-md text-center text-2xl flex items-center justify-center">
          <p>ASSEMBLY</p>
        </h3>

        <ul className="flex flex-col gap-2 items-center p-2 overflow-y-auto">
          {codigo.map((e) => {
            return (
              <li className="w-full flex gap-1">
                <input
                  className="outline-none w-[80%]"
                  type="text"
                  name=""
                  id=""
                />
                <input className="outline-none h-[40px]" type="text" />
              </li>
            );
          })}
        </ul>

        <div className=" bg-blue-50 rounded-md">BOTONES</div>
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
  };

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
            />
          </div>
          {/* REGISTRO ACUMULADOR */}
          <div className="w-full  flex items-center justify-center">
            <Acumulador />
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
            <p>5</p>
            <p className="absolute top-0 left-0 text-black/50 text-sm ">
              Pantalla
            </p>
          </section>
        </div>
      </section>
      <section className=" bg-gray-50 col-start-2 col-end-3 row-start-1 row-end-3  ">
        <MenuConfig />
      </section>
    </div>
  );
}

export default App;
