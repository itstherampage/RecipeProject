import { TIMEOUT_TIMER } from './config.js';
import 'regenerator-runtime/runtime.js';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_TIMER)]);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`${data.message} \nStatus code (${res.status})`);
    }
    return data;
  } catch (error) {
    throw error; //throw the error again so it can be handled in model.js
  }
};
