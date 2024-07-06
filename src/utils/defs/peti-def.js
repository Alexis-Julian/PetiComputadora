/* eslint-disable no-unused-vars */

// Set de Instrucciones
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
Comp.mem.memMap = new Array(Comp.mem.maxMemAdr + 1).fill("0".repeat(Comp.ws));

// Evalua y ejecuta instrucciones y operandos
function evalExec(inst, op) {
    let ma = 0; // Memory Address (Posición actual del programa)
    switch (inst) {
        case "STP":
            //process.exit();
            // eslint-disable-next-line no-undef
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