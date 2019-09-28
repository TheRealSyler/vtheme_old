const TransitionControl = {
  removeAfter: 230,
  loops: 3,
  drawInterval: 20,
  maxSmallShapes: 600,
  maxLargeShapes: 30,
  minSmallShapes: 50,
  minLargeShapes: 10,
  noiseOpacity: 0.1,
  noiseMaxBrightness: 200,
  minShapesOpacity: 0.3,
  maxShapesOpacity: 0.8
};

export function ThemeTransition() {
  const canvas = document.createElement('canvas');
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  canvas.id = 'THEME_TRANSITION_CANVAS_ID';
  canvas.style.position = 'absolute';
  canvas.style.top = '0px';
  canvas.style.zIndex = '10000000';

  if (canvas.getContext) {
    window.requestAnimationFrame(draw);
    let loop = -2;
    const ctx = canvas.getContext('2d');
    // @ts-ignore
    function draw() {
      if (ctx !== null) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        DrawSmallShapes();
        DrawLargeShapes();
        generateNoise(TransitionControl.noiseOpacity);
        if (loop <= TransitionControl.loops) {
          loop++;
          setTimeout(() => draw(), TransitionControl.drawInterval);
        }
      }
    }
    // @ts-ignore
    function DrawSmallShapes() {
      if (ctx !== null) {
        const elementNum = Math.round(Math.max(Math.random() * TransitionControl.maxSmallShapes, TransitionControl.minLargeShapes));
        for (let i = 0; i < elementNum; i++) {
          ctx.fillStyle = randomRgb();
          const height = Math.max(Math.random() * 14, 5);
          const width = Math.max(Math.random() * 150, 20);
          const x = Math.random() * window.innerWidth + (window.innerWidth / 2) * loop;
          const y = Math.random() * window.innerHeight;
          ctx.fillRect(x, y, width, height);
        }
      }
    }
    // @ts-ignore
    function DrawLargeShapes() {
      if (ctx !== null) {
        const elementNum = Math.round(Math.max(Math.random() * TransitionControl.maxLargeShapes, TransitionControl.minLargeShapes));
        for (let i = 0; i < elementNum; i++) {
          ctx.fillStyle = randomRgb();
          const height = Math.max(Math.random() * 120, 60);
          const width = Math.max(Math.random() * 600, 100);
          const x = Math.random() * window.innerWidth + (window.innerWidth / 2) * loop;
          const y = Math.random() * window.innerHeight;
          ctx.fillRect(x, y, width, height);
        }
      }
    }
    // @ts-ignore
    function generateNoise(opacity?: number) {
      const noiseCanvas = document.createElement('canvas');
      const noiseCtx = noiseCanvas.getContext('2d');
      if (noiseCtx !== null) {
        let x: number;
        let y: number;
        let r: number;
        let g: number;
        let b: number;
        opacity = opacity || 0.2;
        noiseCanvas.width = 100;
        noiseCanvas.height = 100;

        for (x = 0; x < noiseCanvas.width; x++) {
          for (y = 0; y < noiseCanvas.height; y++) {
            r = Math.floor(Math.random() * TransitionControl.noiseMaxBrightness);
            g = Math.floor(Math.random() * TransitionControl.noiseMaxBrightness);
            b = Math.floor(Math.random() * TransitionControl.noiseMaxBrightness);

            noiseCtx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
            noiseCtx.fillRect(x, y, 1, 1);
          }
        }
        canvas.style.backgroundImage = 'url(' + noiseCanvas.toDataURL('image/png') + ')';
      }
    }

    document.body.appendChild(canvas);
    setTimeout(() => {
      canvas.remove();
    }, TransitionControl.removeAfter);
  } else {
    canvas.remove();
  }
}
function randomRgb() {
  return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${Math.max(
    Math.random() * TransitionControl.maxShapesOpacity,
    TransitionControl.minShapesOpacity
  )})`;
}
