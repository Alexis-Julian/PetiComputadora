import { getInst, getOp, isLetter } from "../helpers/InstruccionParser";
import { IoPlayBackOutline } from "react-icons/io5";
import { IoPlayForwardOutline } from "react-icons/io5";
import { IoIosPause } from "react-icons/io";
import { IoPlay } from "react-icons/io5";
import { MdOutlineReplay } from "react-icons/md";
import propTypes from "prop-types";
import ResponsiveInput from "./ResponsiveInput";
import ResponsiveParagraph from "./ResponsiveParagraph";

function Code({ counterProgram, code }) {
  return (
    <section className="p-2 size-full grid grid-rows-[0.1fr_1fr_0.1fr] ">
      <h3 className=" border-b-[1px] border-b-black/5  text-center text-2xl flex items-center justify-center">
        <p>ASSEMBLY</p>
      </h3>

      <ul className="flex flex-col gap-2 items-center p-2 overflow-y-auto">
        {code.map((reg, index) => {
          let inst = getInst(reg);

          const op = getOp(reg);

          return (
            <li
              className={`relative w-full grid grid-cols-4 gap-1 items-center justify-center border-b border-black/25 place-items-center  `}
              key={index}
            >
              <div
                className={`size-4 ${
                  counterProgram - 1 == index ? "bg-red-500/50" : "bg-red-500/5"
                }  rounded-[50%]`}
              ></div>

              <ResponsiveParagraph>{index}</ResponsiveParagraph>

              <ResponsiveInput
                style={"bg-transparent border-none outline-none"}
                readOnly={true}
                value={isLetter(inst) ? inst : "VAL"}
              />
              <ResponsiveInput
                style={"bg-transparent border-none outline-none"}
                readOnly={true}
                value={isNaN(op) ? inst : op}
              />
            </li>
          );
        })}
      </ul>

      <div className="border-t-[1px] border-t-black/5 ">
        <form className="size-full grid grid-cols-5  place-items-center [&>*:nth-child(n)]:flex [&>*:nth-child(n)]:justify-center  ">
          <button className="w-[70%] h-[40%] items-center bg-blue-400 text-white text-sm rounded-md hover:scale-95 transition-all">
            <IoPlay />
          </button>
          <button className="w-[70%] h-[40%] items-center bg-blue-400 text-white text-sm rounded-md hover:scale-95 transition-all">
            <IoIosPause />
          </button>

          <button className="w-[70%] h-[40%] items-center bg-blue-400 text-white text-sm rounded-md hover:scale-95 transition-all">
            <IoPlayBackOutline />
          </button>
          <button className="w-[70%] h-[40%] items-center bg-blue-400 text-white text-sm rounded-md hover:scale-95 transition-all">
            <IoPlayForwardOutline />
          </button>
          <button className="w-[70%] h-[40%] items-center bg-blue-400 text-white text-sm rounded-md hover:scale-95 transition-all">
            <MdOutlineReplay />
          </button>
        </form>
      </div>
    </section>
  );
}

Code.propTypes = {
  counterProgram: propTypes.oneOfType([propTypes.number, propTypes.string]),
  code: propTypes.array,
};
export default Code;
