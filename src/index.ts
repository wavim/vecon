import { blake3 } from "@noble/hashes/blake3.js";
import { utf8ToBytes } from "@noble/hashes/utils.js";
import { Params, render } from "./generate";

/**
 * Build Elegant SVG HashIcon
 * @param string Raw username
 * @param params Vecon params
 * @returns SVG string
 */
export function vecon(string: string, params: Partial<Params> = {}): string {
	const input = utf8ToBytes(string);
	const array = blake3(input, { dkLen: 14 }).buffer;

	return render(new Uint16Array(array), {
		h: {
			min: 0,
			max: 360,
			...params.h,
		},
		s: {
			min: 70,
			max: 100,
			...params.s,
		},
		l: {
			min: 45,
			max: 65,
			...params.l,
		},

		shift: {
			min: 60,
			max: 300,
			...params.shift,
		},
		alpha: {
			min: 0.4,
			max: 1,
			...params.alpha,
		},

		variance: {
			min: -5,
			max: 20,
			...params.variance,
		},
		lighting: {
			T: 10,
			L: -4,
			R: -8,
			...params.lighting,
		},

		space: params.space ?? 0,
		style: params.style ?? "",
	});
}
