export const randomBytes = (length: number = 256): string => {
  const arr = new Uint8Array(length);
  crypto.getRandomValues<Uint8Array>(arr);
  return arr.toString();
}
