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
  let b;
  if (v >= 0) {
    b = parseInt(v).toString(2).padStart(kb, '0')
  } else {
    b = (v + ((2**kb))).toString(2).slice(-kb)
  }
  return b;
}

export function bin2dec(v, s = false) {
    let n = 0;
    if (s) {
        n = parseInt(v, 2) << 24 >> 24;
    } else {
        n = parseInt(v, 2);
    }
    //console.log(`v=${v} => n=${n}`);
    return n
}

export function soloNumeros(cadena) {
  // Utilizamos una expresión regular para verificar si la cadena contiene solo dígitos
  const soloNumerosRegExp = /^[0-9]+$/;
  return soloNumerosRegExp.test(cadena);
}
