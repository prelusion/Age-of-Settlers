<script setup lang="ts">

import {LayoutHelper} from "../layout/LayoutHelper";
import {useStore} from "vuex";
import {ensure} from "../util/TypeHint";
import {Canvas} from "../canvas/Canvas";
import {Layout, LAYOUT_POINTY} from "../layout/Layout";
import {Point} from "../layout/Point";
import {onMounted} from "vue";

const store = useStore();

const selectHexagon = (event: MouseEvent) => {
    const rect = ensure(document.querySelector("#canvas")).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (!store.getters.worldSelected) {
        console.log("No hexagon selected!")
        return;
    }
    console.log("Hexagon selected!")

    let hexagon = store.state.world.getHexagonFromHex(LayoutHelper.PixelToHex(new Point(x, y)));

    store.commit('setSelectedHexagon', hexagon);
}

Layout.setLayout(LAYOUT_POINTY, new Point(50, 50), new Point(2500, 1500));

onMounted(() => {
    store.state.canvas = new Canvas("canvas");
    store.dispatch('drawWorld');
})
</script>

<template>
    <div style="position: relative">
        <canvas
            id="canvas"
            width="5000"
            height="3000"
            style="z-index: 10"
            @click="selectHexagon"
            msg=""
        ></canvas>
        <canvas id="buildings" width="5000" height="3000" style="z-index: 1" msg=""></canvas>
        <canvas id="units" width="5000" height="3000" style="z-index: 2" msg=""></canvas>

        <img id="plains" src="images/plains.png" hidden alt="hidden plains image">
        <img id="forest" src="images/forest.png" hidden alt="hidden forest image">
        <img id="mountain" src="images/mountain.png" hidden alt="hidden mountain image">
        <img id="water" src="images/water.png" hidden alt="hidden water image">
        <img id="hills" src="images/hills.png" hidden>
        <img id="ocean" src="images/ocean.png" hidden>
        <img id="desert" src="images/desert.png" hidden>
        <img id="river" src="images/river.png" hidden>
        <img id="cave" src="images/cave.png" hidden>
        <img id="misty_forest" src="images/forest-misty.png" hidden>
        <img id="dark_oak_forest" src="images/forest-dark-oak.png" hidden>
        <img id="wastelands" src="images/wastelands.png" hidden>
    </div>
</template>

<style scoped lang="scss">
canvas {
    position: absolute;
    left: 0;
    top: 0;
    border: solid 1px red;
}
</style>
