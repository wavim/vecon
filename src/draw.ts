import { Face, grid } from "./grid";

interface Range {
	min: number;
	max: number;
}
export interface Params {
	h: Range;
	s: Range;
	l: Range;

	count: Range;
	shift: Range;
	alpha: Range;

	variance: Range;
	lighting: Record<Face, number>;

	margin: number;
	styles: string;
}

function fitRange(value: number, range: Range): number {
	return range.min + value % (range.max - range.min);
}

function goldHash(seed: number, i: number): number {
	return (seed ^ 0x9e3779b9 * i) >>> 0;
}

export function draw(hash: Uint16Array, params: Params): string {
	const h = fitRange(hash[0], params.h);
	const s = fitRange(hash[1], params.s);
	const l = fitRange(hash[2], params.l);

	const count = fitRange(hash[3], params.count);
	const shift = fitRange(hash[4], params.shift);
	const alpha = fitRange(hash[5], params.alpha);

	const seed = hash[6];
	const mask = Array(24).fill(false).fill(true, -count) as boolean[];

	for (let i = 1; i < 24; i++) {
		const j = goldHash(seed, i) % (i + 1);
		[mask[i], mask[j]] = [mask[j], mask[i]];
	}

	const polygons = grid.map(({ f, p }, i) => {
		const seed = goldHash(hash[7], i + 1);

		const variance = fitRange(seed, params.variance);
		const lighting = params.lighting[f];

		let poly = `<polygon points="${p}" fill="hsl(${h + variance} ${s} ${l + lighting})" />`;

		if (mask[i]) {
			poly += `<polygon points="${p}" fill="hsl(${h + variance + shift} ${s} ${l + lighting} / ${alpha}%)" />`;
		}

		return poly;
	});

	const m = -params.margin;
	const w = 800 + 2 * params.margin;

	// dprint-ignore
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${m} ${m
			} ${w} ${w}" shape-rendering="crispEdges" style="${params.styles}">${polygons.join("")}</svg>`;
}
