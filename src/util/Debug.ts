import {LayoutHelper} from "../layout/LayoutHelper";
import {debug, selectedHexagon, world} from "../index";
import $ from "jquery";
import MouseMoveEvent = JQuery.MouseMoveEvent;


/**
 * Makes a clicked hexagon show its information inside the #selected_hexagon element.
 * @param canvas
 * @param event
 */
export function showInfoHexagon(canvas: HTMLCanvasElement, event:MouseEvent) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    let hexagon = world.getHexagonFromHex(LayoutHelper.PixelToHex({x, y}))
    if(!hexagon || !debug) {
        selectedHexagon.hide();
        return;
    }
    console.log(hexagon);
    selectedHexagon.show();
    selectedHexagon.find("#hex").html("hex: " + hexagon.hex.toString() + "<br />" + "q:" + hexagon.hex.q + " r:" + hexagon.hex.r + " s:" + hexagon.hex.s)
    selectedHexagon.find("#hasPlayer").html("hasPlayer: " + hexagon.hasPlayer)
    selectedHexagon.find("#inCombat").html("inCombat: " + hexagon.inCombat)
    selectedHexagon.find("#connectedBuildings").html("connectedBuildings: " + hexagon.connectedBuildings)
    selectedHexagon.find("#activeBy").html("activeBy: " + hexagon.activeBy)
    selectedHexagon.find("#engagedBy").html("engagedBy: " + hexagon.engagedBy)
    selectedHexagon.find("#biome").html("biome: " + hexagon.biome.name + ", type: " + hexagon.biome.type)
}

/**
 * Moves the Hexagon information with the mouse
 */
const onMouseMoveHexInfo = (e: MouseMoveEvent) => {
    selectedHexagon.css({
        "left": e.pageX - 500 + 'px',
        "top":  e.pageY - 600 + 'px'
    })
}

/**
 * Event listener for moving the mouse on the HTML element <body>
 */
$("body").on("mousemove", onMouseMoveHexInfo);
