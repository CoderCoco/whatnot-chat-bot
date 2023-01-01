import { KeypressEvent } from "@app/core";

export function convertString(str: string): KeypressEvent[] {
  const returnVal: KeypressEvent[] = []

  for(const char of str) {
    returnVal.push({keyCode: char});
  }

  return returnVal
}