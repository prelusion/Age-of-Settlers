import {BiomeType} from "../data/types/BiomeType";
import {ensure} from "./TypeHint";

export class ImageFactory {
    private plains = new Image();
    private forest = new Image();
    private mountain = new Image();
    private water = new Image();
    private hills = new Image();
    private ocean = new Image();
    private desert = new Image();
    private river = new Image();
    private cave = new Image();
    private misty_forest = new Image();
    private dark_oak_forest = new Image();
    private wastelands = new Image();

    private static instance: ImageFactory;

    private constructor() {
    }

    public static singleton() {
        if(!ImageFactory.instance) {
            ImageFactory.instance = new ImageFactory();
        }
        return ImageFactory.instance;
    }

    public initialize() {
        // Todo : Don't need to add these to the HTML, probably only 1 helper?
        this.plains.src = ensure(ensure(document.querySelector("#plains")).getAttribute("src"));
        this.forest.src = ensure(ensure(document.querySelector("#forest")).getAttribute("src"));
        this.mountain.src = ensure(ensure(document.querySelector("#mountain")).getAttribute("src"));
        this.water.src = ensure(ensure(document.querySelector("#water")).getAttribute("src"));
        this.hills.src = ensure(ensure(document.querySelector("#hills")).getAttribute("src"));
        this.ocean.src = ensure(ensure(document.querySelector("#ocean")).getAttribute("src"));
        this.desert.src = ensure(ensure(document.querySelector("#desert")).getAttribute("src"));
        this.river.src = ensure(ensure(document.querySelector("#river")).getAttribute("src"));
        this.cave.src = ensure(ensure(document.querySelector("#cave")).getAttribute("src"));
        this.misty_forest.src = ensure(ensure(document.querySelector("#misty_forest")).getAttribute("src"));
        this.dark_oak_forest.src = ensure(ensure(document.querySelector("#dark_oak_forest")).getAttribute("src"));
        this.wastelands.src = ensure(ensure(document.querySelector("#wastelands")).getAttribute("src"));
    }

    public getImage(biome: BiomeType) {
        switch (biome) {
            case BiomeType.HILLS:
                return this.hills;
            case BiomeType.DARK_OAK_FOREST:
                return this.dark_oak_forest;
            case BiomeType.MISTY_FOREST:
                return this.misty_forest;
            case BiomeType.CAVE:
                return this.cave;
            case BiomeType.RIVER:
                return this.river;
            case BiomeType.DESERT:
                return this.desert;
            case BiomeType.OCEAN:
                return this.ocean;
            case BiomeType.WASTELANDS:
                return this.wastelands;
            case BiomeType.FOREST:
                return this.forest;
            case BiomeType.MOUNTAIN:
                return this.mountain;
            case BiomeType.PLAINS:
                return this.plains;
            case BiomeType.WATER:
                return this.water;
        }
    }

}
