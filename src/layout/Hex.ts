export class Hex {
    public q: number;
    public s: number;
    public r: number;

    constructor(q: number, s: number, r: number) {
        if (q + s + r !== 0) throw Error("Hex must be equal to 0")

        this.q = q;
        this.s = s;
        this.r = r;
    }

    public static Zero(): Hex {
        return new Hex(0, 0, 0);
    }

    /**
     * Expects something like >  Hex[-1,0,1]
     * @param hex
     * @constructor
     */
    public static FromHexString(hex: string): Hex {
        if(!hex) {
            return Hex.Zero();
        }
        let h = JSON.parse(hex.split("Hex")[1]);
        return new Hex(h[0], h[1], h[2]);
    }

    public toString(): string {
        return `Hex[${this.q},${this.s},${this.r}]`;
    }

    public equals(other: Hex): boolean {
        return this.q === other.q && this.s === other.s && this.r === other.r;
    }

    public round(): Hex {
        this.q = Math.round(this.q);
        this.s = Math.round(this.s);
        this.r = Math.round(this.r);
        return this;
    }
}
