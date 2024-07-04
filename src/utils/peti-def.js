class Comps {
  // Config
  name = "Peti";
  set = 3;
  kb = 5;
  k = 2 ** this.kb;

  // Memory
  tmm = this.k * (this.set + this.kb);
  maxMemAdr = this.k - 1;
  mem = new Array(this.tmm).fill(0);

  // Registers
  pc = 0;
  ri = "";
  acum = 0;
  //buf = 0

  // Instruction Set
  instSet = {
    STP: "000",
    ADD: "001",
    SUB: "010",
    STR: "011",
    JUP: "100",
    JUN: "101",
    JUI: "110",
    WRT: "111",
  };

  evalExec(inst) {
    switch (inst) {
      case "STP":
        process.exit();
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
  }

  /*
    // Example code
    code = [
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
        "23"
    ]
    */
}

/* export default new Comp(); */
class Comp {
  // Configuración
  name = "Peti";
  set = 3;
  kb = 5;
  k = 2 ** this.kb;

  // Memoria
  tmm = this.k * (this.set + this.kb);
  maxMemAdr = this.k - 1;
  mem = new Array(this.tmm).fill(0); // Inicializa la memoria con ceros

  // Registros
  pc = 0;
  ri = "";
  acum = 0;

  // Conjunto de Instrucciones
  instSet = {
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
  evalExec(inst, op) {
    switch (inst) {
      case "STP":
        break;
      case "ADD":
        this.acum = this.acum + parseInt(this.mem[op], 10);
        break;
      case "SUB":
        this.acum = this.acum - parseInt(this.mem[op], 10);
        break;
      case "STR":
        this.mem[op] = this.acum;
        break;
      case "JUP":
        if (Math.sign(this.acum) >= 1) this.pc = op - 1;
        break;
      case "JUN":
        if (Math.sign(this.acum) < 0) this.pc = op - 1;
        break;
      case "JUI":
        this.pc = op - 1;
        break;
      case "WRT":
        console.log("DISPLAY: " + this.acum);
        break;
      default:
        console.log("Instrucción inválida");
        break;
    }
  }

  // Ejecutar el código
  runCode(code) {
    for (let i = 0; i < code.length; i++) {
      const [inst, op] = code[i].split(" ");
      this.evalExec(inst, parseInt(op, 10));
    }
  }

  /*
    // Ejemplo de código
    code = [
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
      "23"
    ]
    */
}
const peti = new Comp();
console.log(peti);
export default peti;
