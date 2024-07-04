import { useState, useEffect, memo } from "react";
import RegistroInstruccion from "./components/RegistroInstruccion";
import MemoriaPrincipal from "./components/MemoriaPrincipal";
import Acumulador from "./components/Acumulador";
import ContadorPrograma from "./components/ContadorPrograma";
function App() {
  /* const [useCode, setCode] = useState([
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
  ]); */
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
  const [useCounterProgramReg, setCounterProgramReg] = useState(
    new Array(useDireccionamiento).fill("0")
  );

  /* IMPRIMIR EN PANTALLA  */
  const [usePrint, setPrint] = useState();

  const TAMANO_MAXIMO =
    String(2 ** useDireccionamiento * usePalabraLogica) + " Bytes";

  //Generra nuevvos campos de acumulador ESTO NO VA ACA
  /*  const camposAcumulador = new Array(8).fill("0");
  setAcumuladorReg(camposAcumulador); */

  async function Probando() {
    /* let mem = mem;
  let pc = pc;
  let ri = ri;
  let acum = acum;
  
  let instSet = instSet; */

    // Configuración
    let name = "Peti";
    let set = 3;
    let kb = 5;
    let k = 2 ** kb;

    // Memoria
    let tmm = k * (set + kb);
    let maxMemAdr = k - 1;
    let mem = new Array(tmm).fill(0); // Inicializa la memoria con ceros

    // Registros
    let pc = 0;
    let ri = "";
    let acum = 0;

    // Conjunto de Instrucciones
    const instSet = {
      STP: "000",
      ADD: "001",
      SUB: "010",
      STR: "011",
      JUP: "100",
      JUN: "101",
      JUI: "110",
      WRT: "111",
    };

    // Ejecutar instrucción
    /* function evalExec(inst, i, op) {
    switch (inst) {
      case "STP":
        break;
      case "ADD":
        acum = acum + parseInt(mem[op]);
        break;
      case "SUB":
        acum = acum - parseInt(mem[op]);
        break;
      case "STR":
        mem[op] = acum;
        break;
      case "JUP":
        if (Math.sign(acum) >= 1) i = op - 1;
        break;
      case "JUN":
        if (Math.sign(acum) < 0) i = op - 1;
        break;
      case "JUI":
        i = op - 1;
        break;
      case "WRT":
        console.log("DISPLAY: " + acum);
        break;
      default:
        console.log("Instrucción inválida");
        break;
    }
  } */

    const code = [
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
    ];

    // Init
    /* console.log("Mini Emulador");
  console.log(`Computadora: ${name}`);
  console.log(`Set de Instrucción: ${2 ** set}`);
  console.log(`Capacidad de direccionamiento: ${k}`);
  console.log(`Tamaño Máx. de Memoria: ${tmm}`);
   */
    // Compile Code and Load to Memory
    /* console.log("Compilando..."); */

    let op;
    let probando = [];
    for (let i = 0; i < code.length; i++) {
      if (code[i].length == 0) continue;
      let inst = getInst(code[i]);

      if (!isLetter(code[i].substring(1))) {
        inst = "STP";
        op = code[i];
      } else {
        op = getOp(code[i]);
      }

      mem[i] = instSet[inst] + dec2bin(op);
      console.log(`${code[i]} => ${mem[i]}`);
    }

    // Run Code
    // console.log("Ejecutando...");
    for (let i = 0; i < code.length; i++) {
      ri = mem[i];
      pc = i + 1;
      let inst = getInst(code[i]);
      op = getOp(code[i]);

      setCodigoOperandoReg(ri.split("").splice(0, 3));
      setDireccioReg(ri.split("").splice(3));

      /* CONVERTIR ACUMULADOR A BINARIO  */
      let binaryString = acum.toString(2);
      let paddedBinaryString = binaryString.padStart(8, "0");

      setAcumuladorReg(paddedBinaryString.split(""));

      console.log(`MA: ${i} | RI: ${ri} | PC: ${pc} | ACUM: ${acum}`);
      switch (inst) {
        case "STP":
          break;
        case "ADD":
          acum = acum + parseInt(mem[op]);
          break;
        case "SUB":
          acum = acum - parseInt(mem[op]);
          break;
        case "STR":
          mem[op] = acum;
          break;
        case "JUP":
          if (Math.sign(acum) >= 1) i = op - 1;
          break;
        case "JUN":
          if (Math.sign(acum) < 0) i = op - 1;
          break;
        case "JUI":
          i = op - 1;
          break;
        case "WRT":
          setPrint(acum);
          break;
        default:
          console.log("Instrucción inválida");
          break;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    function getInst(s) {
      return s.substring(0, 3);
    }

    function getOp(s) {
      return parseInt(s.substring(4));
    }

    function dec2bin(v) {
      let n = v.toString(2);
      let z = "0".repeat(kb);
      return z.substring(n.length) + n;
    }

    function isLetter(c) {
      return c.toLowerCase() != c.toUpperCase();
    }
  }

  /* ACA VAMOS A USAR DIRECCIONAMIENTO */

  /* CUANDO SE CAMBIA EL DIRECCIONAMIENTO HAY QUE CAMBIAR EL COONTADOR DE PROGRAMA Y MEMORIA PRINCIPAL  */
  useEffect(() => {
    //Modifiica la memoria principal
    const resultado = 2 ** useDireccionamiento;
    const memoriaArray = new Array(resultado).fill("00000000");
    setTMM(memoriaArray);
  }, []);

  useEffect(() => {
    const Asyncroia = async () => {
      await Probando();
    };
    Asyncroia();
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

  const MenuConfig = () => {
    const codigo = new Array(16).fill("");

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
        <MenuConfig />
      </section>
    </div>
  );
}

export default App;
