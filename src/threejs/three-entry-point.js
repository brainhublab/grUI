import SceneManager from './scene-manager.js';


export default container => {
    const canvas = createCanvas(document, container);
    const sceneManager = SceneManager(canvas);

    // let canvasHalfWidth;
    // let canvasHalfHeight;

    bindEventListeners();
    render();

    function createCanvas(document, container) {
        const canvas = document.createElement('canvas');
        container.appendChild(canvas);
        return canvas;
    }

    function bindEventListeners() {
        window.onresize = resizeCanvas;
        resizeCanvas();
    }

    function resizeCanvas() {
        canvas.style.width = '100%';
        canvas.style.height = '100%';

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        // canvasHalfWidth = Math.round(canvas.offsetWidth / 2);
        // canvasHalfHeight = Math.round(canvas.offsetHeight / 2);

        sceneManager.onWindowResize();
    }

    function render(time) {  // eslint-disable-line
        requestAnimationFrame(render);
        sceneManager.update(time);
    }

    return sceneManager;
};
