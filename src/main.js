import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import model from "./demo/Sphere.js";

let camera, scene, renderer, stats;

function init(){
    //场景
    scene = new THREE.Scene();

    //添加物体
    scene.add(model)

    //相机
    camera = new THREE.PerspectiveCamera(
        90,  // 视野角度
        window.innerWidth / window.innerHeight,  //长宽比
        0.1,  //近截面
        1000,  //远截面
    );
    camera.position.set(50,50,50);
    camera.lookAt(0,0,0);

    //光源
    const pointLight = new THREE.PointLight(0xffffff, 1);
    scene.add(pointLight);

    //环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    //渲染器
    renderer = new THREE.WebGLRenderer({antialias:true,});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.render(scene,camera);
    
    document.body.appendChild(renderer.domElement);

    window.onresize = onWindowResize;

    //视图辅助
    initHelper();

    initGUI(pointLight,ambientLight);
}

function animate(){
    //浏览器刷新的时候浏览器重新渲染
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
    // 立方体旋转
    model.rotation.y += 0.01;
    stats.update();
}

//窗口被调整大小时发生
function onWindowResize(){
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

//视图辅助
function initHelper(){
    //坐标轴辅助线
    const axesHelper = new THREE.AxesHelper(50);
    scene.add(axesHelper);
    //轨道控制器
    const constrols = new OrbitControls(camera,renderer.domElement);
    constrols.addEventListener('change',() => {
        renderer.render(scene,camera);
    })

    const gridHelper=new THREE.GridHelper(300, 25, 0x004444, 0x004444)
    scene.add(gridHelper);

    //创建stats对象
    stats = new Stats();
    document.body.appendChild(stats.domElement);
}

function initGUI(pointLight,ambientLight){
    const gui = new GUI();

    const positionFolder = gui.addFolder("位置");
    positionFolder.add(model.position,'x',-100,100,1).name('X坐标');
    positionFolder.add(model.position,'y',-100,100,1).name('Y坐标');
    positionFolder.add(model.position,'z',-100,100,1).name('Z坐标');

    
}

init();
animate();