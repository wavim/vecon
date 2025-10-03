import { blake3 } from "@noble/hashes/blake3.js";
import { utf8ToBytes } from "@noble/hashes/utils.js";
import { draw, Params } from "./draw";

/**
 * Elegant SVG HashIcon
 */
export function vecon(input: string, params?: Partial<Params>): string {
	const digest = blake3(utf8ToBytes(input), { dkLen: 16 });
	const buffer = new Uint16Array(digest.buffer);

	return draw(
		buffer,
		Object.assign({
			h: {
				min: 0,
				max: 360,
			},
			s: {
				min: 70,
				max: 100,
			},
			l: {
				min: 40,
				max: 60,
			},

			count: {
				min: 4,
				max: 8,
			},
			shift: {
				min: 30,
				max: 60,
			},
			alpha: {
				min: 50,
				max: 100,
			},

			variance: {
				min: 5,
				max: 20,
			},
			lighting: {
				T: 5,
				L: 0,
				R: -5,
			},

			margin: 0,
			styles: "",
		}, params),
	);
}
