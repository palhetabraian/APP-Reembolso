// unificando classe

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function classMerge(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs)); //pega como array e unifica tudo, twmerge organiza as class para tailwind utilizar com performance
}
