
class Comp
{
    // Config
    name = "Putete"
    set = 4
    kb = 8
    k = 2**this.kb

    // Memory
    tmm = this.k * (this.set + this.kb)
    maxMemAdr = this.k-1
    mem = []

    // Registers
    pc = 0
    ri = ""
    acum = 0
    //buf = 0

    // Instruction Set
    instSet = {
        "STP": "0000", 
        "ADD": "0001", 
        "SUB": "0010", 
        "STR": "0011", 
        "JUP": "0100", 
        "JUN": "0101", 
        "JUI": "0110", 
        "WRT": "0111",
        "PTT": "1000"
    }

    evalExec (inst) {
        switch (inst) {
            case "STP":
                process.exit();
                break;
            case "ADD":
                acum = acum + parseInt(mem[op])
                break;
            case "SUB":
                acum = acum - parseInt(mem[op])
                break;
            case "STR":
                mem[op] = acum
                break;
            case "JUP":
                if (Math.sign(acum) >= 1) i = op - 1
                break;
            case "JUN":
                if (Math.sign(acum) < 0) i = op - 1
                break;
            case "JUI":
                i = op - 1
                break;
            case "WRT":
                console.log("DISPLAY: " + acum)
                break;
            case "PTT":
                console.log("DISPLAY: Putete!")
                break;
            default:
                console.log("Instrucción inválida")
                break;
        }
    }

}

module.exports = new Comp();
