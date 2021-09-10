import assert from "assert";

const conversionObj = {
  A: "000000",
  B: "000001",
  C: "000010",
  D: "000011",
  E: "000100",
  F: "000101",
  G: "000110",
  H: "000111",
  I: "001000",
  J: "001001",
  K: "001010",
  L: "001011",
  M: "001100",
  N: "001101",
  O: "001110",
  P: "001111",
  Q: "010000",
  R: "010001",
  S: "010010",
  T: "010011",
  U: "010100",
  V: "010101",
  W: "010110",
  X: "010111",
  Y: "011000",
  Z: "011001",
  a: "011010",
  b: "011011",
  c: "011100",
  d: "011101",
  e: "011110",
  f: "011111",
  g: "100000",
  h: "100001",
  i: "100010",
  j: "100011",
  k: "100100",
  l: "100101",
  m: "100110",
  n: "100111",
  o: "101000",
  p: "101001",
  q: "101010",
  r: "101011",
  s: "101100",
  t: "101101",
  u: "101110",
  v: "101111",
  w: "110000",
  x: "110001",
  y: "110010",
  z: "110011",
  "0": "110100",
  "1": "110101",
  "2": "110110",
  "3": "110111",
  "4": "111000",
  "5": "111001",
  "6": "111010",
  "7": "111011",
  "8": "111100",
  "9": "111101",
  "+": "111110",
  "/": "111111",
};

const conversionMap = new Map(Object.entries(conversionObj));

const base64Decode = (input: string) => {
  const replacedInput = input.replace(/=/g, "");
  const binaryNums = [...replacedInput].reduce<string>((prev, curr) => {
    return `${prev}${conversionMap.get(curr) || ""}`;
  }, "");
  const split4Len = binaryNums.match(/.{1,4}/g);
  return sliceByNumber(split4Len!, 2).reduce<string>((prev, curr) => {
    if (curr.length !== 2) return prev;

    const ascii = `${parseInt(curr[0], 2).toString(16)}${parseInt(
      curr[1],
      2
    ).toString(16)}`;
    return `${prev}${String.fromCharCode(parseInt(ascii, 16))}`;
  }, "");
};

const sliceByNumber = (array: Array<any>, length: number) => {
  const _length = Math.ceil(array.length / length);
  return new Array(_length)
    .fill(0)
    .map((_, i) => array.slice(i * length, (i + 1) * length));
};

const base64ToUint8Array = (input: string) => {
  const replacedInput = input.replace(/=/g, "");
  const binaryNums = [...replacedInput].reduce<string>((prev, curr) => {
    return `${prev}${conversionMap.get(curr) || ""}`;
  }, "");
  const split4Len = binaryNums.match(/.{1,4}/g);

  return sliceByNumber(split4Len!, 2).reduce<Number[]>((prev, curr) => {
    if (curr.length !== 2) return prev;

    return [...prev, parseInt(`${curr[0]}${curr[1]}`, 2)];
  }, []);
};

assert.strictEqual(base64Decode("QUJDREVGRw=="), "ABCDEFG");
assert.deepStrictEqual(
  base64ToUint8Array("QUJDREVGRw=="),
  [65, 66, 67, 68, 69, 70, 71]
);
