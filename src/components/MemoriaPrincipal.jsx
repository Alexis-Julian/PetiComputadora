export default function MemoriaPrincipal({ direcc, index }) {
  const arrayBit = direcc.split("");
  return (
    <li className="hover:bg-black/5 transition-all cursor-pointer text-2xl grid grid-cols-[0.2fr_1fr] justify-center items-center gap-2 w-full text-center h-[50px]">
      <p className="border-r border-black/50">{index}</p>
      <span className="h-full w-full flex items-center">
        {arrayBit.map((e, index) => {
          return (
            <i key={index} className="flex-grow">
              {e}
            </i>
          );
        })}
      </span>
    </li>
  );
}
