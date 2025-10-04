import { Face, grid } from "./grid";

interface Range {
	min: number;
	max: number;
}
export interface Params {
	H: Range;
	S: Range;
	L: Range;

	count: Range;
	shift: Range;
	alpha: Range;

	variance: Range;
	lighting: Record<Face, number>;

	margin: number;
	styles: string;
}

function fitRange(value: number, range: Range): number {
	return range.min + (value % (range.max - range.min + 1));
}

function fibHash(seed: number, i: number): number {
	return (seed ^ (0x9e3779b9 * i)) >>> 0;
}

export function draw(hash: Uint16Array, params: Params): string {
	const H = fitRange(hash[0], params.H);
	const S = fitRange(hash[1], params.S);
	const L = fitRange(hash[2], params.L);

	const count = fitRange(hash[3], params.count);
	const shift = fitRange(hash[4], params.shift);
	const alpha = fitRange(hash[5], params.alpha);

	const seed1 = hash[6];
	const seed2 = hash[7];

	const mask: boolean[] = Array(24).fill(false).fill(true, -count);

	for (let i = 24 - count; i < 24; i++) {
		const j = fibHash(seed1, i) % (i + 1);
		[mask[i], mask[j]] = [mask[j], mask[i]];
	}

	const polygons = grid.map(({ f, p }, i) => {
		const v = fibHash(seed2, i + 1);
		const variance = fitRange(v, params.variance);

		const lighting = params.lighting[f];

		let poly = `<polygon points="${p}" fill="hsl(${H + variance} ${S} ${L + lighting})" />`;

		if (mask[i]) {
			poly += `<polygon points="${p}" fill="hsl(${H + variance + shift} ${S} ${L + lighting} / ${alpha}%)" />`;
		}
		return poly;
	});

	const m = -params.margin;
	const w = 800 + 2 * params.margin;

	// dprint-ignore
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${m} ${m
			} ${w} ${w}" shape-rendering="crispEdges" style="${params.styles}">${polygons.join("")}</svg>`;
}
