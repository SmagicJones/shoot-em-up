export class ResponsiveCanvas {
  constructor(container, canvas, aspectRatio = null) {
    this.container = container;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.aspectRatio = aspectRatio; // width / height or null for free scale

    this.resize = this.resize.bind(this);
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  resize() {
    const dpr = window.devicePixelRatio || 1;
    const containerWidth = this.container.clientWidth;
    const containerHeight = this.container.clientHeight;

    let width, height;

    if (this.aspectRatio) {
      // Lock aspect ratio and fit inside container
      if (containerWidth / containerHeight > this.aspectRatio) {
        height = containerHeight;
        width = height * this.aspectRatio;
      } else {
        width = containerWidth;
        height = width / this.aspectRatio;
      }
    } else {
      // Free scale to container size
      width = containerWidth;
      height = containerHeight;
    }

    // Set canvas CSS size (controls displayed size)
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    // Set canvas internal pixel size (for sharpness)
    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);

    if (this.onResize) this.onResize(width, height);
  }

  // Optional: hook for redraw on resize
  setResizeHandler(callback) {
    this.onResize = callback;
  }

  destroy() {
    window.removeEventListener("resize", this.resize);
  }
}
