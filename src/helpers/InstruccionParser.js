
export function getInst(s) {
  return s.substring(0, 3);
}

export function getOp(s) {
  return parseInt(s.substring(4));
}
/* 
export function dec2bin(v) {
  let kb = 5;
  let k = 2 ** kb;
  let n = v.toString(2);
  let z = "0".repeat(kb);
  return z.substring(n.length) + n;
} */

export function isLetter(c) {
  return c.toLowerCase() != c.toUpperCase();
}
