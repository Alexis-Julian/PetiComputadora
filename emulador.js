
const fileDef = "peti-def.js"
//const fileDef = "putete-def.js"

try {
    require.resolve("./defs/" + fileDef);
} catch (err) {
    if (err.code === "MODULE_NOT_FOUND") {
        console.log("El módulo no existe");
    }
}

const Comp = require("./defs/" + fileDef);
mem = Comp.mem
pc = Comp.pc
ri = Comp.ri
acum = Comp.acum
instSet = Comp.instSet

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

// Init
console.log("Mini Emulador")
console.log(`Computadora: ${Comp.name}`)
console.log(`Set de Instrucción: ${2**Comp.set}`)
console.log(`Capacidad de direccionamiento: ${Comp.k}`)
console.log(`Tamaño Máx. de Memoria: ${Comp.tmm}`)

// Compile Code and Load to Memory
console.log("Compilando...")
for (i = 0; i < code.length; i++) {
    if (code[i].length == 0) continue;
    inst = getInst(code[i])
    if (instSet[inst] == undefined) {
        inst = "STP"
        op = code[i]
    } else {
        op = getOp(code[i])
    }
    mem[i] = instSet[inst] + dec2bin(op)
    console.log(`${code[i]} => ${mem[i]}`)
}

// Run Code
console.log("Ejecutando...")
for (i = 0; i < code.length; i++) {
    ri = mem[i]
    pc = i + 1
    inst = getInst(code[i])
    op = getOp(code[i])
    console.log(`MA: ${i} | RI: ${ri} | PC: ${pc} | ACUM: ${acum}`)
    Comp.evalExec(inst)
    
}

function getInst(s) {
    return s.substring(0, 3)
}

function getOp(s) {
    return parseInt(s.substring(4))
}

function dec2bin(v) {
    n = v.toString(2)
    z = "0".repeat(Comp.kb)
    return z.substring(n.length) + n
}
