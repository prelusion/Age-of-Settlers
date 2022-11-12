/**
 * The direction relative to a Hex. Useful in for example: `Hex.neighbour(HexDirection.RIGHT)`)
 */
enum HexDirection {
    RIGHT = 0,
    RIGHT_TOP = 1,
    LEFT_TOP = 2,
    LEFT = 3,
    LEFT_BOTTOM = 4,
    RIGHT_BOTTOM = 5,
}

export class Hex {
    public static neighboursRelativeHex = [
        new Hex(+1, 0, -1), new Hex(+1, -1, 0), new Hex(0, -1, +1),
        new Hex(-1, 0, +1), new Hex(-1, +1, 0), new Hex(0, +1, -1),
    ];

    public q: number;
    public r: number;
    public s: number;

    // ---------< Constructors >--------- \\

    constructor(q: number, r: number, s: number) {
        if (q + r + s !== 0) throw Error("Hex must be equal to 0")

        this.q = q;
        this.r = r;
        this.s = s;
    }

    public static Zero(): Hex {
        return new Hex(0, 0, 0);
    }

    // ---------< Methods >--------- \\

    public neighbours(): Hex[] {
        return Hex.neighboursRelativeHex.map(h => Hex.add(this, h));
    }

    public neighbour(direction: HexDirection | number): Hex {
        return Hex.add(this, Hex.neighboursRelativeHex[direction]);
    }

    public distanceTo(other: Hex) {
        return Hex.distanceFromZero(Hex.subtract(this, other));
    }

    public coordinates(): number[] {
        return [this.q, this.r, this.s];
    }

    // ---------< Static Helpers >--------- \\

    public static distanceFromZero(hex: Hex): number {
        return Math.max(Math.abs(hex.q), Math.abs(hex.r), Math.abs(hex.s));
    }

    public static distanceFromZeroW(hex: Hex): number {
        return Math.max(Math.abs(hex.q), Math.abs(hex.s));
    }

    public static distanceFromZeroH(hex: Hex): number {
        return Math.abs(hex.r);
    }

    public static add(a: Hex, b: Hex): Hex {
        return new Hex(a.q + b.q, a.r + b.r, a.s + b.s);
    }

    public static subtract(a: Hex, b: Hex): Hex {
        return new Hex(a.q - b.q, a.r - b.r, a.s - b.s);
    }

    public static multiply(a: Hex, n: number): Hex {
        return new Hex(a.q * n, a.r * n, a.s * n);
    }

    /**
     * Expects something like >  Hex[-1,0,1]
     * @param hex
     * @constructor
     */
    public static FromHexString(hex: string): Hex {
        if (!hex) {
            return Hex.Zero();
        }
        let h = JSON.parse(hex.split("Hex")[1]);
        return new Hex(h[0], h[1], h[2]);
    }

    public toString(): string {
        return `Hex[${this.q},${this.r},${this.s}]`;
    }

    public equals(other: Hex): boolean {
        return this.q === other.q && this.r === other.r && this.s === other.s;
    }

    public round(): Hex {
        this.q = Math.round(this.q);
        this.r = Math.round(this.r);
        this.s = Math.round(this.s);
        return this;
    }
}
