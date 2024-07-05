/* eslint-disable no-unused-vars */
// import { instSet } from "../shared/const";
// import { getInst, getOp, isLetter } from "../helpers/InstruccionParser";

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
  
  function getInst(s) {
    return s.substring(0, 3);
  }
  
  function getOp(s) {
    return parseInt(s.substring(4));
  }
  
  function isLetter(c) {
    return c.toLowerCase() != c.toUpperCase();
  }
  
  // Objeto Computadora (contiene registros, memoria, etc.)
  let Comp = {
    name: "Peti", // Nombre de la computadora
    set: 3, // Bits del Set de Instrucciones
    kb: 5, // Bits de la Capacidad de direccionamiento
    k: 0, // Capacidad de direccionamiento (se calcula después)
    numOps: 1, // Número de operandos
    ws: 0, // Bits de la palabra lógica (se calcula después)
    reg: {
      // Registros
      pc: 0, // Contador de Programa
      ri: "", // Registro de Instrucción
      acum: 0, // Acumulador
    },
    mem: {
      // Memoria
      tmm: 0, // Tamaño Máx. de Memoria (se calcula después)
      maxMemAdr: 0, // Dirección Máxima de Memoria (se calcula después)
      memMap: [], // Mapa de Memoria (se inicializa toda la memoria a 0 después)
    },
  };
  Comp.k = 2 ** Comp.kb;
  Comp.ws = Comp.set + (Comp.kb * Comp.numOps);
  Comp.mem.tmm = Comp.k * Comp.ws;
  Comp.mem.maxMemAdr = Comp.k - 1;
  Comp.mem.memMap = new Array(Comp.mem.maxMemAdr + 1).fill("00000000");
  console.log(Comp.ws);
  let execTime = 500;
  let code;
  
  const STATE = {
    Play: "Play",
    Pause: "Pause",
    Step: "Step",
    Stop: "Stop",
    Restart: "Restart",
  };
  let state = STATE.Stop;
  
  //let ma; // Memory Address (Posición actual del programa)
  
  /*
      // Ejemplo de Comunicación desde el hilo principal al Worker:
      let data = {
          Type: "Init",
          Code: ["MOV A, 5", "ADD A, 5", "STP"]
      }
      postMessage(data);
  */
  onmessage = async function (event) {
    //console.log(data);
    switch (event.data.Type) {
      case "Init":
        //init();
        code = event.data.Code;
        compilar();
        this.postMessage({ Mem: Comp.mem.memMap });
        state = STATE.Pause;
        run();
        break;
      case "Play":
        state = STATE.Play;
        break;
      case "Pause":
        state = STATE.Pause;
        break;
      case "Step":
        state = STATE.Step;
        break;
      case "Stop":
        state = STATE.Stop;
        break;
      case "Restart":
        state = STATE.Restart;
        break;
      case "setExecTime":
        execTime = event.data.ExecTime;
        break;
      default:
        console.log("onmessage@emulador => Qué me mandaste?! xD");
        break;
    }
  };
  
  function init() {
    console.log("Mini Emulador");
    console.log(`Computadora: ${Comp.name}`);
    console.log(`Set de Instrucción: ${2 ** Comp.set}`);
    console.log(`Capacidad de direccionamiento: ${Comp.k}`);
    console.log(`Tamaño Máx. de Memoria: ${Comp.mem.tmm}`);
  }
  
  function compilar() {
    // Compile Code and Load to Memory
    console.log("Compilando...");
    let inst;
    let op;
    for (let i = 0; i < code.length; i++) {
      if (code[i].length == 0) continue;
      inst = getInst(code[i]);
      if (!isLetter(code[i].substring(1))) {
        //inst = "STP";
        op = code[i];
        Comp.mem.memMap[i] = dec2bin(op);
      } else {
        op = getOp(code[i]);
        Comp.mem.memMap[i] = instSet[inst] + dec2bin(op, Comp.kb);
      }
      //console.log(`${code[i]} => ${Comp.mem.memMap[i]}`);
    }
  }
  
  async function run() {
    console.log("Ejecutando...");
    for (let ma = 0; ma < code.length; ma++) {
      if (state == STATE.Stop) break;
  
      Comp.reg.ri = Comp.mem.memMap[ma];
      Comp.reg.pc = ma + 1;
      let inst = getInst(code[ma]);
      let op = getOp(code[ma]);
      this.postMessage({ RI: Comp.reg.ri, PC: Comp.reg.pc, ACUM: Comp.reg.acum });
      //console.log(`MA: ${i} | RI: ${Comp.reg.ri} | PC: ${Comp.reg.pc} | ACUM: ${Comp.reg.acum}`);
      let x = evalExec(inst, op);
      if (x != 0) ma = x;
      await new Promise((resolve) => setTimeout(resolve, execTime));
    }
  }
  
  function evalExec(inst, op) {
    let ma = 0;
    switch (inst) {
      case "STP":
        //process.exit();
        state = STATE.Stop;
        break;
      case "ADD":
        Comp.reg.acum =
          parseInt(Comp.reg.acum) + parseInt(Comp.mem.memMap[op], 2);
        break;
      case "SUB":
        Comp.reg.acum =
          parseInt(Comp.reg.acum) - parseInt(Comp.mem.memMap[op], 2);
        break;
      case "STR":
        Comp.mem.memMap[op] = Comp.reg.acum;
        break;
      case "JUP":
        if (Math.sign(Comp.reg.acum) >= 1) ma = op - 1;
        break;
      case "JUN":
        if (Math.sign(Comp.reg.acum) < 0) ma = op - 1;
        break;
      case "JUI":
        ma = op - 1;
        break;
      case "WRT":
        this.postMessage({ Disp: Comp.reg.acum });
        console.log("DISPLAY: " + Comp.reg.acum);
        break;
      default:
        console.log("evalExec@emulador => Instrucción inválida");
        break;
    }
    return ma;
  }
  
  /**
   * Conversión Decimal a Binario
   * @param {int} v Valor decimal a convertir a binario
   * @param {int} s Tamaño de bits del binario (Opcional, predeterminado es igual al tamaño de la palabra lógica)
   * @returns {string} Valor convertido a binario
   */
  function dec2bin(v, s = Comp.ws) {
    let n = parseInt(v).toString(2);
    let z = "0".repeat(s);
    return z.substring(n.length) + n;
  }
  