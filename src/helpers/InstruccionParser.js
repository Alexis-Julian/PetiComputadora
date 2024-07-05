export function getInst(s) {
  return String(s.substring(0, 3));
}

export function getOp(s) {
  return String(s.substring(3));
}

export function isLetter(c) {
  return c.toLowerCase() != c.toUpperCase();
}

export function dec2bin(v) {
  let kb = 8;
  //let k = 2 ** kb;
  let n = v.toString(2);
  let z = "0".repeat(kb);
  return z.substring(n.length) + n;
}

export function soloNumeros(cadena) {
  // Utilizamos una expresión regular para verificar si la cadena contiene solo dígitos
  const soloNumerosRegExp = /^[0-9]+$/;
  return soloNumerosRegExp.test(cadena);
}
