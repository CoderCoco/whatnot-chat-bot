export interface KeySend {
  keyCode: string;
}

export function convertString(str: string): KeySend[] {
  const returnVal: KeySend[] = []

  for(const char of str) {
    returnVal.push({keyCode: char});
  }

  return returnVal
}