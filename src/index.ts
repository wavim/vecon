import { blake3 } from "@noble/hashes/blake3.js";
import { utf8ToBytes } from "@noble/hashes/utils.js";
import { draw, Params } from "./draw";

/**
 * Build Elegant SVG HashIcon
 * @param string Raw username
 * @param params Vecon params
 * @returns SVG string
 */
export function vecon(string: string, params: Partial<Params> = {}): string {
	const bytes = utf8ToBytes(string);
	const hash = blake3(bytes, { dkLen: 16 }).buffer;

	return draw(new Uint16Array(hash), {
		h: {
			min: 0,
			max: 360,
			...params.h,
		},
		s: {
			min: 60,
			max: 90,
			...params.s,
		},
		l: {
			min: 40,
			max: 70,
			...params.l,
		},

		count: {
			min: 4,
			max: 8,
			...params.count,
		},
		shift: {
			min: -45,
			max: 45,
			...params.shift,
		},
		alpha: {
			min: 70,
			max: 90,
			...params.alpha,
		},

		variance: {
			min: -10,
			max: 10,
			...params.variance,
		},
		lighting: {
			T: 10,
			L: -4,
			R: -8,
			...params.lighting,
		},

		margin: params.margin ?? 0,
		styles: params.styles ?? "",
	});
}
