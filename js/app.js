// global variable
let scene;
let camera;
let renderer;
let circle;
let skelet;
let particle;

// main function
function init(){
    // create scene
    scene = new THREE.Scene();

    // camera setup
    const fov = 75;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 400;
    scene.add(camera);

    // create renderer
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true });
    renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;
    renderer.setClearColor(0x000000, 0.0);
    document.getElementById('canvas').appendChild(renderer.domElement);

    // 3d object
    circle = new THREE.Object3D();
    skelet = new THREE.Object3D();
    particle = new THREE.Object3D();

    scene.add(circle);
    scene.add(skelet);
    scene.add(particle);

    // adding geometry
    let geometry = new THREE.TetrahedronGeometry(2, 1);
    let geomet = new THREE.IcosahedronGeometry(7, 1);
    let geomet2 = new THREE.IcosahedronGeometry(15, 4);

    // adding material
    let material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shading: THREE.FlatShading
    });

    let mat = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        side: THREE.DobuleSide,
        wireframe: true
    });

    // create particle
    for (let i = 0; i < 1000; i++) {
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() -  0.5).normalize();
        mesh.position.multiplyScalar(90 + (Math.random() * 700));
        mesh.rotation.set(Math.random() * 2, Math.random() * 2 , Math.random() * 2);
        particle.add(mesh);
    }

    // inner planet
    let innerPlanet = new THREE.Mesh(geomet, material);
    innerPlanet.scale.x = innerPlanet.scale.y = innerPlanet.scale.z = 16;
    circle.add(innerPlanet);

    // outer planet
    let outerPlanet = new THREE.Mesh(geomet2, mat);
    outerPlanet.scale.x = outerPlanet.scale.y = outerPlanet.scale.z = 10;
    skelet.add(outerPlanet);

    // ambient light
    let ambientLight = new THREE.AmbientLight(0x999999);
    scene.add(ambientLight);

    // directional light
    let dLight = [];
    dLight[0] = new THREE.DirectionalLight(0xffffff, 1);
    dLight[0].position.set(1, 0, 0);
    dLight[1] = new THREE.DirectionalLight(0x00dbde, 1);
    dLight[1].position.set(0.75, 1, 0.5);
    dLight[2] = new THREE.DirectionalLight(0xfc00ff, 1);
    dLight[2].position.set(-0.75, -1, 0.5);
    scene.add(dLight[0]);
    scene.add(dLight[1]);
    scene.add(dLight[2]);

    animate();
    window.addEventListener('resize', onWindowResize, false);
    
}

function animate() {
    requestAnimationFrame(animate);

    particle.rotation.x += 0.0000;
    particle.rotation.y -= 0.0040;
    particle.rotation.z -= 0.0020;

    circle.rotation.x -= 0.0030;
    circle.rotation.y -= 0.0030;

    skelet.rotation.x +=  0.0040;
    skelet.rotation.y +=  0.0040;

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = init;
