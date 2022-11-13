import {BiomeType} from "../data/types/BiomeType";
import {ensure} from "./TypeHint";

export class ImageFactory {
    private plains = new Image();
    private forest = new Image();
    private mountain = new Image();
    private water = new Image();
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
        this.plains.src = ensure(ensure(document.querySelector("#plains")).getAttribute("src"));
        this.forest.src = ensure(ensure(document.querySelector("#forest")).getAttribute("src"));
        this.mountain.src = ensure(ensure(document.querySelector("#mountain")).getAttribute("src"));
        this.water.src = ensure(ensure(document.querySelector("#water")).getAttribute("src"));
    }

    public getImage(biome: BiomeType) {
        switch (biome) {
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
