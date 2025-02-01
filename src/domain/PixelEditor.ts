class PixelEditor {
    /** The underlying <canvas> element */
    #el: HTMLCanvasElement;

    /** The 2D canvas rendering context */
    #ctx: CanvasRenderingContext2D;

    /** The artboard size, in drawable pxiels */
    #artboard: { w: number; h: number };

    /** The underlying pixel data */
    #data = new PixelData();

    /** The selected color */
    #color: RGB = [0, 0, 0];

    /** Listeners for change events */
    #listeners: Array<(state: PixelData["state"]) => void> = [];

    constructor(el: HTMLCanvasElement, artboard: { w: number; h: number }) {
        this.#el = el;

        // get the 2D rendering context
        const ctx = el.getContext("2d");
        if(!ctx) throw new Error("Couldn't get rendering context");
        this.#ctx = ctx;

        // store the artboard size
        this.#artboard = artboard;

        // listen for pointer events. triggered when user interacts with the canvas
        this.#el.addEventListener("pointerdown", this);
        this.#el.addEventListener("pointermove", this);
        this.#el.addEventListener("pointerup", this);

        // resize the canvas
        this.#el.width = this.#el.clientWidth * devicePixelRatio;
        this.#el.height = this.#el.clientHeight * devicePixelRatio;
        this.#ctx.scale(devicePixelRatio, devicePixelRatio);
        this.#ctx.imageSmoothingEnabled = false;
    }

    /**
     * Appends a listener to be called when the state changes.
     * @param listener */
    set onchange(listener: (state: PixelData["state"]) => void) {}

    /** Sets the drawing color. */
    set color(color: RGB) {}

    /**
     * Handles events on the canvas.
     * @param e Pointer event from the canvas element.
     */
    handleEvent(e: PointerEvent) {}

    /**
     * Sets pixel under the mouse cursor with the current color.
     * @param x X coordinate of the destination pixel.
     * @param y Y coordinate of the destination pixel.
     */
    #paint(x: number, y: number) {}

    /** Draws each pixel on the canvas. */
    async #draw() {}

    /** Notify all listeners that the state has changed. */
    #notify() {}

    /**
     * Merge remote state with the current state and redraw the canvas.
     * @param state State to merge into the current state. */
    receive(state: PixelData["state"]) {}
}