export class CanvasInput {
    constructor(canvas, options = {}) {
        this.canvas = canvas;

        this.focalLength = options.focalLength ? options.focalLength : 18.0;
        this.minFocal = options.minFocal ? options.minFocal : 10.5;
        this.maxFocal = options.maxFocal ? options.maxFocal : 150.0;
        this.zoomSpeed = options.zoomSpeed ? options.zoomSpeed : 0.05;
        this.sensitivity = options.sensitivity ? options.sensitivity : 0.2;

        this.onRotate = options.onRotate ? options.onRotate : (() => { });
        this.onZoom = options.onZoom ? options.onZoom : (() => { });

        this.pointers = [];
        this.lastX = 0;
        this.lastY = 0;
        this.prevDiff = 0;

        this.canvas.style.cursor = "grab";
        this._addListeners();
    }

    _addListeners() {
        this.canvas.addEventListener('pointerdown', (e) => this._pointerDown(e));
        this.canvas.addEventListener('pointerup', (e) => this._pointerUp(e));
        this.canvas.addEventListener('pointermove', (e) => this._pointerMove(e));
        this.canvas.addEventListener('wheel', (e) => this._wheel(e));
    }

    _pointerDown(e) {
        this.canvas.setPointerCapture(e.pointerId);

        if (this.pointers.length < 2) {
            this.pointers.push(e);
            if (this.pointers.length == 1) {
                this.lastX = e.clientX;
                this.lastY = e.clientY;
            } else {
                if (this.pointers.length == 2) {
                    this.prevDiff = this._calcDiff(this.pointers[0], this.pointers[1]);
                }
            }
        }
        this._updateCursor();
    }

    _pointerUp(e) {
        this.canvas.releasePointerCapture(e.pointerId);
        let i = 0;
        while (i < this.pointers.length && this.pointers[i].pointerId != e.pointerId) {
            i++;
        }
        if (i < this.pointers.length) {
            this.pointers.splice(i, 1);
        }

        if (this.pointers.length == 1) {
            this.prevDiff = 0;
            this.lastX = this.pointers[0].clientX;
            this.lastY = this.pointers[0].clientY;
        }
        this._updateCursor();
    }

    _pointerMove(e) {
        // Update the pointer record in our array
        let i = 0;
        while (i < this.pointers.length && this.pointers[i].pointerId != e.pointerId) {
            i++;
        }
        if (i < this.pointers.length) {
            this.pointers[i] = e;
        }

        if (this.pointers.length == 1) {
            // one pointer rotate
            const dX = e.clientX - this.lastX;
            const dY = e.clientY - this.lastY;

            this.lastX = e.clientX;
            this.lastY = e.clientY;

            // jobbra huzza balra mozogjon -> invertalni kell
            const correctZoom = this.minFocal / this.focalLength;
            const rotX = -dY * this.sensitivity * correctZoom;
            const rotY = -dX * this.sensitivity * correctZoom;

            this.onRotate(rotX, rotY);
        } else {
            if (this.pointers.length === 2) {
                // zooming with pinching
                let currDiff = this._calcDiff(this.pointers[0], this.pointers[1]);
                let valtozas = (currDiff - this.prevDiff) * this.sensitivity;

                this.prevDiff = currDiff;
                this._applyZoom(valtozas);
            }
        }
    }

    _wheel(e) {
        e.preventDefault();
        const d = e.deltaY * -this.zoomSpeed;
        this._applyZoom(d);
    }

    _applyZoom(d) {
        this.focalLength += d;

        if (this.focalLength < this.minFocal) {
            this.focalLength = this.minFocal;
        };
        if (this.focalLength > this.maxFocal) {
            this.focalLength = this.maxFocal;
        };

        this.onZoom(this.focalLength);
    }

    _calcDiff(p1, p2) {
        return Math.sqrt(
            Math.pow(p1.clientX - p2.clientX, 2) +
            Math.pow(p1.clientY - p2.clientY, 2)
        );
    }

    _updateCursor() {
        this.canvas.style.cursor = this.pointers.length === 1 ? "grabbing" : "grab";
    }
}