import { blake3 } from "@noble/hashes/blake3.js";
import { utf8ToBytes } from "@noble/hashes/utils.js";
import { Params, render } from "./generate";

const presets: Params = {
	h: {
		min: 0,
		max: 360,
	},
	s: {
		min: 70,
		max: 100,
	},
	l: {
		min: 45,
		max: 65,
	},

	shift: {
		min: 60,
		max: 300,
	},
	alpha: {
		min: 0.4,
		max: 1,
	},

	variance: {
		min: 5,
		max: 20,
	},
	lighting: {
		T: 10,
		L: -4,
		R: -8,
	},
};

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
		h: { ...params.h, ...presets.h },
		s: { ...params.s, ...presets.s },
		l: { ...params.l, ...presets.l },
		shift: { ...params.shift, ...presets.shift },
		alpha: { ...params.alpha, ...presets.alpha },
		variance: { ...params.variance, ...presets.variance },
		lighting: { ...params.lighting, ...presets.lighting },
	});
}
