import { writable } from 'svelte/store';
import State from './core/state.js'

// Applicaation States
export const FA_states = writable([]);
export const base_canvas = writable({});
export const match_running = writable(true);
export const reloadd = writable(true);
export const reload = writable(true);
export const canvas_contex = writable({});

// User controlled Inputs
export const regex = writable('(11)|(00)');
export const input = writable('(11)|(00)');


// Themeing Configs
export const theme = writable('lover');
export const glass = writable(true);
