/* eslint-disable no-unused-vars */

const STATE = {
    Play: "Play",
    Pause: "Pause",
    Step: "Step",
    Stop: "Stop",
    Restart: "Restart",
};
let state = STATE.Stop;

let compu = "peti"
//let compu = "putete"
self.importScripts(`./defs/${compu}-def.js`);

// eslint-disable-next-line no-undef
let C = Comp;

let execTime = 100;
let code;

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
            this.postMessage({ Mem: C.mem.memMap });
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
    console.log(`Computadora: ${C.name}`);
    console.log(`Set de Instrucción: ${2 ** C.set}`);
    console.log(`Capacidad de direccionamiento: ${C.k}`);
    console.log(`Tamaño Máx. de Memoria: ${C.mem.tmm}`);
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
            C.mem.memMap[i] = dec2bin(op);
        } else {
            op = getOp(code[i]);
            // eslint-disable-next-line no-undef
            C.mem.memMap[i] = instSet[inst] + dec2bin(op, C.kb);
        }
        //console.log(`${code[i]} => ${C.mem.memMap[i]}`);
    }
}

async function run() {
    console.log("Ejecutando...");
    for (let ma = 0; ma < code.length; ma++) {
        if (state == STATE.Stop) break;

        C.reg.ri = C.mem.memMap[ma];
        C.reg.pc = ma + 1;
        let inst = getInst(code[ma]);
        let op = getOp(code[ma]);
        this.postMessage({ RI: C.reg.ri, PC: C.reg.pc, ACUM: C.reg.acum });
        //console.log(`MA: ${i} | RI: ${C.reg.ri} | PC: ${C.reg.pc} | ACUM: ${C.reg.acum}`);
        // eslint-disable-next-line no-undef
        let x = evalExec(inst, op);
        if (x != 0) ma = x;
        await new Promise((resolve) => setTimeout(resolve, execTime));
    }
}

/**
 * Conversión Decimal a Binario
 * @param {int} v Valor decimal a convertir a binario
 * @param {int} s Tamaño de bits del binario (Opcional, predeterminado es igual al tamaño de la palabra lógica)
 * @returns {string} Valor convertido a binario
 */
function dec2bin(v, s = C.ws) {
    let b;
    if (v >= 0) {
        b = parseInt(v).toString(2).padStart(s, '0')
    } else {
        b = (v + ((2 ** s))).toString(2).slice(-s)
    }
    return b;
}

function getInst(s) {
    return s.substring(0, 3);
}

function getOp(s) {
    return parseInt(s.substring(4));
}

function isLetter(c) {
    return c.toLowerCase() != c.toUpperCase();
}
