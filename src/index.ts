import { blake3 } from "@noble/hashes/blake3.js";
import { utf8ToBytes } from "@noble/hashes/utils.js";
import { Params, render } from "./render";

export function vecon(string: string, params: Partial<Params>): string {
	const input = utf8ToBytes(string);
	const array = blake3(input, { dkLen: 14 }).buffer;

	return render(new Uint16Array(array), params as Params); // TODO: defaults
}
