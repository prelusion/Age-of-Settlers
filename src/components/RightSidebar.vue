<script setup lang="ts">
import {computed, Ref, ref, toRaw, watch} from "vue";
import {Game} from "../game/Game";
import {ProceduralType} from "../data/types/ProceduralType";
import {World} from "../game/World";
import {Obj} from "../util/TypeHint";
import {useStore} from "vuex";
import doc = Mocha.reporters.doc;
import {LayoutHelper} from "../layout/LayoutHelper";

const store = useStore();

const selectedButton = ref(-1);

const debugModeActive = ref(false);
const debugInfoActive = ref(false);
const debugInfoLoc: Ref<[number, number]> = ref([-1, -1]) as Ref<[number, number]>;
const debugInfoText = ref([]) as Ref<[string, string][]>;

watch(debugModeActive, () => {
    store.state.debugModeActive = debugModeActive.value;
    store.dispatch('drawWorld')
})

const worlds: Record<string, World> = {
    map_random: Game.generateProceduralWorld(ProceduralType.RANDOM),
    map_small_biome: Game.generateProceduralWorld(ProceduralType.SMALL_BIOME),
    map_big_biome: Game.generateProceduralWorld(ProceduralType.BIG_BIOME),
    map_single_biome: Game.generateProceduralWorld(ProceduralType.SINGLE_BIOME),
};

watch(() => store.state.selectedHexagon, () => showInfoHexagon());
const showInfoHexagon = () => {
    const hexagon = store.state.selectedHexagon;

    if (!hexagon) {
        debugInfoActive.value = false;
        return;
    }

    debugInfoActive.value = true;
    debugInfoText.value = [
        [`Hex`, hexagon.hex.toString()],
        // [`QRS`, `Q: ${hexagon.hex.q} R: ${hexagon.hex.r} S: ${hexagon.hex.s}`],
        [`Has player`, hexagon.hasPlayer],
        [`InCombat`, hexagon.inCombat],
        [`Buildings`, hexagon.connectedBuildings],
        [`ActiveBy`, hexagon.activeBy],
        [`EngagedBy`, hexagon.engagedBy],
        [`Biome`, `${hexagon.biome.name}, Type: ${hexagon.biome.type}`],
    ];

    // Show stationary debug info box
    const point = LayoutHelper.hexToPixel(hexagon.hex)
    debugInfoLoc.value = [point.x - 230, point.y - 340];
}

// Todo disable if not showing debuginfo
// const onMouseMoveHexInfo = (e: MouseEvent) => {
//     debugInfoLoc.value = [e.pageX - 480, e.pageY - 350];
// };
// window.addEventListener('mousemove', onMouseMoveHexInfo);
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        debugInfoActive.value = false;
    }
})


const shouldShowDebugInfo = computed(() => {
    return store.state.selectedHexagon
        && debugInfoActive.value
        && debugModeActive.value
});

const buttonClick = (worldName: string, index:number) => {
    selectedButton.value = index;
    console.log(worlds[worldName]);
    store.dispatch('changeWorld', {world: worlds[worldName]});
}


</script>

<template>
    <div class="right-sidebar" style="z-index: 99;">
        <div class="debug-btn"
             v-bind:class="{'debug-selected': debugModeActive}"
             @click="debugModeActive = !debugModeActive">
            Debug
        </div>

        <div
            v-for="(worldName, index) of Obj.keys(worlds)"
            class="procedure-btn"
            v-bind:class="{'selected-procedure': index === selectedButton}"
            @click="buttonClick(worldName + '', index)"
        >
            {{ worldName }}
        </div>
    </div>

    <div
        id="debug-info-hover"
        v-bind:class="{'hidden': !shouldShowDebugInfo}"
        :style="{left: debugInfoLoc[0] + 'px', top: debugInfoLoc[1] + 'px'}"
    >
        <table class="debug-info">
            <tr v-for="line of debugInfoText">
                <td>
                    {{ line[0] }}:
                </td>
                <td>
                    {{ line[1] }}
                </td>
            </tr>
        </table>
    </div>
</template>

<style scoped lang="scss">
#debug-info-hover {
    padding: 10px;
    position: absolute;
    z-index: 12;
    height: 300px;
    width: 450px;
    border: 1px solid darkmagenta;
    font-size: 2em;
    border-radius: 15px;
    background-color: rgba(33, 33, 33, 90%);
    color: gold;

    &.hidden {
        display: none;
    }

    table.debug-info {
        font-family: monospace;

        tr {
            td:nth-child(2) {
                padding-left: 20px;
            }
        }
    }
}

.right-sidebar {
    position: fixed;
    z-index: 5;
    right: 20px;
    top: 20px;
    display: flex;
    flex-direction: row;

    .debug-btn {
        font-size: 3em;
        color: white;
        z-index: 4;
        background-color: #666;
        padding: 10px 30px 10px 10px;
        cursor: pointer;
        margin: 5px 0;
        height: 50px;

        &:hover {
            background-color: white;
            color: black;
        }
    }

    .procedure-btn {
        font-size: 3em;
        color: white;
        z-index: 4;
        background-color: #666;
        padding: 10px 30px 10px 10px;
        cursor: pointer;
        margin: 5px 0;
        height: 50px;

        &:hover {
            background-color: white;
            color: black;
        }
    }
}

// Todo: Isn't there a better way than "!important"?
.selected-procedure {
    background-color: gold !important;
    color: black !important;
}

.debug-selected {
    background-color: gold !important;
    color: black !important;
}
</style>
