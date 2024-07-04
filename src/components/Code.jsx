import { getInst, getOp, isLetter } from "../helpers/InstruccionParser";

function Instruccion(registro) {}

export default function Code({ counterProgram }) {
  const codigo = new Array(16).fill("");
  const test = [
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

  return (
    <section className="p-2 size-full grid grid-rows-[0.1fr_1fr_0.1fr] ">
      <h3 className=" border-b-[1px] border-b-black/5  text-center text-2xl flex items-center justify-center">
        <p>ASSEMBLY</p>
      </h3>

      <ul className="flex flex-col gap-2 items-center p-2 overflow-y-auto">
        {test.map((reg, index) => {
          let inst = getInst(reg);

          const op = getOp(reg);

          return (
            <li
              className={`relative w-full flex gap-1 border-b-2  border-b-black items-center`}
            >
              <div
                className={`absolute right-0 size-4 ${
                  counterProgram - 1 == index ? "bg-red-500/50" : "bg-red-500/5"
                }  rounded-[50%]`}
              ></div>
              <p className="w-[10%]">{index} :</p>
              <input
                className="outline-none h-[40px] w-[20%] bg-transparent text-center cursor-default"
                type="text"
                defaultValue={isLetter(inst) ? inst : "VAL"}
                readOnly
              />
              <input
                readOnly
                className="outline-none w-[70%] bg-transparent cursor-default"
                type="text"
                defaultValue={isNaN(op) ? inst : op}
                name=""
                id=""
              />
            </li>
          );
        })}
      </ul>

      <div className="border-t-[1px] border-t-black/5 ">
        <ul></ul>
      </div>
    </section>
  );
}
