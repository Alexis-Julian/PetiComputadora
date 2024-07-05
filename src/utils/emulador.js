import { instSet } from "../shared/const.js";
import {
  getInst,
  getOp,
  dec2bin,
  isLetter,
} from "../helpers/InstruccionParser.js";

onmessage = async function ({ data }) {
  console.log(data);
};
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
  //console.log(`${code[i]} => ${mem[i]}`);
}

// Run Code
// console.log("Ejecutando...");
for (let i = 0; i < code.length; i++) {
  ri = mem[i];

  pc = i + 1;

  let inst = getInst(code[i]);
  op = getOp(code[i]);

  /* CONVERTIR ACUMULADOR A BINARIO  */
  let binaryString = acum.toString(2);
  let paddedBinaryString = binaryString.padStart(8, "0");

  const peti = {
    cp: i + 1,
    co: ri.split("").splice(0, 3),
    cd: ri.split("").splice(3),
    ac: paddedBinaryString.split(""),
  };

  this.postMessage(peti);

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
  //await new Promise((resolve) => setTimeout(resolve, 1000));
}
