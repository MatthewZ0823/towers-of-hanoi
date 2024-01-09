import { writable } from "svelte/store";

const initialPlates = [[6, 5, 4, 3, 2, 1], [], []];

// A 2d array of plates. i is the peg number, j is the plate number
export const plates = writable(initialPlates);
export const selectedTowers = writable([false, false, false]);
export const speed = writable(1000);
export const solving = writable(false);
