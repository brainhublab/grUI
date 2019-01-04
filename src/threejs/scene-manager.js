import * as THREE from 'three';
import SceneSubject from './scene-subject.js';
import 'three/examples/js/controls/OrbitControls.js';


export default canvas => {
    const clock = new THREE.Clock();

    const screenDimentions = {
        width: canvas.width,
        height: canvas.height
    };

    const scene = buildScene();
    const renderer = buildRenderer(screenDimentions);
    const camera = buildCamera(screenDimentions);
    const axisHelper = new THREE.AxisHelper(2);
    scene.add(axisHelper);
    const controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.enableKeys = false;
    const ambientLight = new THREE.AmbientLight( 0xcccccc );
    scene.add( ambientLight );
    const directionalLight = new THREE.DirectionalLight( 0xffffff );
    directionalLight.position.set( 0, 1, 1 ).normalize();
    scene.add( directionalLight );
    const sceneSubjects = createSceneSubjects(scene);

    bindKeys();

    // const cube = addCube();

    function buildScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#000');

        return scene;
    }

    function buildRenderer({ width, height }) {
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: false
        });
        const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;

        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);

        renderer.gammaImput = true;
        renderer.gammaOutput = true;

        return renderer;
    }

    function buildCamera({ width, height }) {
        const aspectRatio = width / height;
        const fieldOfView = 60;
        const nearPlaane = 0.1;
        const farPlane = 20000;
        const camera = new THREE.PerspectiveCamera(
            fieldOfView,
            aspectRatio,
            nearPlaane,
            farPlane
        );

        // camera.position.z = 0;
        camera.position.set(1, -20, 1);
        camera.up.set(0, 0, 1);

        return camera;
    }

    function createSceneSubjects(scene) {
        const sceneSubjects = [
            new SceneSubject(scene)
        ];

        return sceneSubjects;
    }

    function bindKeys() {
        const onDocumentKeyDown = (e) => {
            let keyCode = e.which;
            let angle = -0.1;

            switch (keyCode) {
            case 37:
                if (e.shiftKey) angle = -angle;
                sceneSubjects[0].curlWristBy(angle, 0, 0);
            case 49:
                if (e.shiftKey) angle = -angle;
                sceneSubjects[0].curlFingerBy('thumb', angle);
                break;
            case 50:
                if (e.shiftKey) angle = -angle;
                sceneSubjects[0].curlFingerBy('index', angle);
                break;
            case 51:
                if (e.shiftKey) angle = -angle;
                sceneSubjects[0].curlFingerBy('middle', angle);
                break;
            case 52:
                if (e.shiftKey) angle = -angle;
                sceneSubjects[0].curlFingerBy('ring', angle);
                break;
            case 53:
                if (e.shiftKey) angle = -angle;
                sceneSubjects[0].curlFingerBy('pinky', angle);
                break;
            default:
                break;
            }
        };

        document.addEventListener('keydown', onDocumentKeyDown, false);

        renderer.render(scene, camera);
    }

    function update(time) {
        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;
        // sceneSubjects[0].update(time);
        renderer.render(scene, camera);
    }

    function onWindowResize() {
        const { width, height } = canvas;

        screenDimentions.width = width;
        screenDimentions.height = height;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    }

    function moveHand(data) {
        let subject = sceneSubjects[0];

        for (var k in data) {
            if(data.hasOwnProperty(k)) {
                if (k == 'palm') {
                    subject.curlWrist(data[k][0], data[k][1], data[k][2]);
                } else {
                    subject.curlFinger(k, data[k]);
                }
            }
        }
    }

    return {
        update,
        onWindowResize,
        moveHand
    };
};
