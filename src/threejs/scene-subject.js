import * as THREE from 'three';
import 'three/examples/js/loaders/GLTFLoader';
import 'three/examples/js/loaders/DRACOLoader.js';
import gltfFile from '../resources/gltf/right_hand.gltf';


export default scene => {
    const loader = new THREE.GLTFLoader();
    THREE.DRACOLoader.setDecoderPath('/examples/js/libs/draco');
    loader.setDRACOLoader(new THREE.DRACOLoader());

    let gltf_obj = null;
    const speed = 0.002;

    let skeleton = {
        palm: null,
        thumb: [],
        index: [],
        middle: [],
        ring: [],
        pinky: []
    };

    loader.parse(
        gltfFile,
        '',
        function ( gltf ) {
            console.log(gltf);
            // gltf.scene.scale.set( 1, 1, 1 );
            // gltf.scene.position.x = 0;				    //Position (x = right+ left-)
            // gltf.scene.position.y = 0;				    //Position (y = up+, down-)
            // gltf.scene.position.z = 0;
            // gltf.scene.children[0].rotation.y = 0;
            // gltf.scene.children[0].rotation.x = 1.5;
            // gltf.scene.children[0].rotation.z = 2;

            // gltf.scene.applyMatrix(new THREE.Matrix4().makeRotationZ(2));
            gltf.scene.applyMatrix(new THREE.Matrix4().makeRotationX(1.57));

            gltf.scene.children[0].children[0].skeleton.bones.forEach((bone) => {
                if (bone.name == 'Armature_Bone001') {
                    skeleton.palm = bone;
                } else if (bone.name == 'Armature_Bone007' || bone.name == 'Armature_Bone008') {
                    skeleton.thumb.push(bone);
                } else if (bone.name == 'Armature_Bone009' || bone.name == 'Armature_Bone010' || bone.name == 'Armature_Bone011') {
                    skeleton.index.push(bone);
                } else if (bone.name == 'Armature_Bone012' || bone.name == 'Armature_Bone013' || bone.name == 'Armature_Bone014') {
                    skeleton.middle.push(bone);
                } else if (bone.name == 'Armature_Bone015' || bone.name == 'Armature_Bone016' || bone.name == 'Armature_Bone017') {
                    skeleton.ring.push(bone);
                } else if (bone.name == 'Armature_Bone018' || bone.name == 'Armature_Bone019' || bone.name == 'Armature_Bone020') {
                    skeleton.pinky.push(bone);
                }

                if (bone.name == 'Armature_Bone019' || bone.name == 'Armature_Bone020') {
                    bone.rotation.set(0, 0, 0);
                }
            });

            let skeletonHelper = new THREE.SkeletonHelper(gltf.scene.children[0]);
            scene.add(skeletonHelper);

            let boxHelper = new THREE.BoxHelper(gltf.scene.children[0].children[1]);
            scene.add(boxHelper);

            gltf_obj = gltf;
            scene.add( gltf.scene );
        },
        // called while loading is progressing
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            console.log(xhr);
        },
        // called when loading has errors
        function ( error ) {
            alert( 'An error happened' + error );
        }
    );

    function curlFinger(key, angle) {
        if (skeleton[key].length == 0) {
            return;
        }

        skeleton[key].forEach((el) => {
            if (key == 'thumb') {
                el.rotation.x = angle / 2;
                el.rotation.z = -0.2;
                // el.rotation.z = 0.15;
            } else {
                el.rotation.x = angle / 3;
            }
        });
    }

    function curlFingerBy(key, angle) {
        if (skeleton[key].length == 0) {
            return;
        }

        skeleton[key].forEach((el) => {
            if (key == 'thumb') {
                el.rotation.x += angle / 2;
                el.rotation.z = -0.2;
            } else {
                el.rotation.x += angle / 3;
            }
        });
    }

    function curlWrist(x, y, z) {
        if (skeleton.palm == null) {
            return;
        }
        skeleton.palm.rotation.x = x;
        skeleton.palm.rotation.y = y;
        skeleton.palm.rotation.z = z;
    }

    function curlWristBy(x, y, z) {
        if (skeleton.palm == null) {
            return;
        }
        skeleton.palm.rotation.x += x;
        skeleton.palm.rotation.y += y;
        skeleton.palm.rotation.z += z;
    }

    function update(time) {
        // console.log(time);
        curlFinger('index', -2 + Math.sin(time * speed), 0, 0);
        curlFinger('thumb', -2 + Math.sin(time * speed), 0, 0);
        curlFinger('middle', -2 + Math.sin(time * speed), 0, 0);
        curlFinger('ring', -2 + Math.sin(time * speed), 0, 0);
        curlFinger('pinky', -2 + Math.sin(time * speed), 0, 0);

        curlWrist(0, Math.sin(time * speed), 0);
    }

    return {
        update,
        curlFinger,
        curlFingerBy,
        curlWrist,
        curlWristBy
    };
};
