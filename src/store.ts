// Create a new store instance.
import {createStore} from "vuex";
import {World} from "./game/World";
import {Hexagon} from "./hexagon/Hexagon";
import {Canvas} from "./canvas/Canvas";
import {toRaw} from "vue";

export const store = createStore({
    state() {
        return {
            world: {} as World,
            canvas: {} as Canvas,
            selectedHexagon: {} as Hexagon,
            debugModeActive: false as boolean,
        }
    },
    getters: {
        worldSelected: (state): boolean => {
            const raw = toRaw(state.world);
            if (raw) {
                return Object.keys(raw).length > 0;
            }
            return false;
        }
    },
    mutations: {
        setWorld(state, world: World) {
            state.world = toRaw(world);
            console.log("World is now: ")
            console.log(state.world)
        },
        setSelectedHexagon(state, hexagon: Hexagon) {
            state.selectedHexagon = hexagon;
        }
    },
    actions: {
        changeWorld(context, values: {world: World}) {
            context.commit('setWorld', values.world);
            context.dispatch('drawWorld').then(() => console.log("Drawing finished!"));
        },
        drawWorld(context) {
            context.state.canvas.clearCanvas();

            if (!context.getters.worldSelected)
                return;

            let counter = 0;
            for (let hexagon of context.state.world.hexagons) {
                context.state.canvas.drawHex(
                    hexagon,
                    context.state.world.getBiomeFromHex(hexagon),
                    counter++,
                    context.state.debugModeActive
                );
            }
        }
    }
})