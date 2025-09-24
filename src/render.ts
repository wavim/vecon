import { Face, layout } from "./layout";
import { patterns } from "./pattern";

export interface ParamRange {
	min: number;
	max: number;
}
export type Spec<T extends string> = Record<T, number>;

export interface Params {
	h: ParamRange;
	s: ParamRange;
	l: ParamRange;

	shift: ParamRange;
	alpha: ParamRange;

	variance: ParamRange;
	lighting: Spec<Face>;
}

export function modulo(range: ParamRange, number: number): number {
	return range.min + (number % (range.max - range.min));
}

export function render(hash: Uint16Array, params: Params): string {
	const h = modulo(params.h, hash[0]);
	const s = modulo(params.s, hash[1]);
	const l = modulo(params.l, hash[2]);

	const shift = modulo(params.shift, hash[3]);
	const alpha = modulo(params.alpha, hash[4]);
	
	const mask = patterns[hash[5] % patterns.length];

	const polygons = layout.map(({ face, cell }, i) => {
		const variance = modulo(params.variance, Math.round(hash[6] / (i + 1)));
		const lighting = params.lighting[face];

		let base = `<polygon points="${cell}" fill="hsl(${h + variance} ${s} ${l + lighting})" />`;

		if (mask[i]) {
			base += `<polygon points="${cell}" fill="hsl(${h + variance + shift} ${s} ${l + lighting} / ${
				alpha.toFixed(2)
			})" />`;
		}
		return base;
	});

	return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" shape-rendering="crispEdges">${
		polygons.join("")
	}</svg>`;
}
