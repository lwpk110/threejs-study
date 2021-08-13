import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as THREE from 'three';


function initThree() {
  var scene = new THREE.Scene();
  /**
   * 创建网格模型
   */
  // var geometry = new THREE.SphereGeometry(60, 20, 40); //创建一个球体几何对象
  var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
  var material = new THREE.MeshLambertMaterial({
    color: "#F5F5DC", specular: 0x4488ee,
    shininess: 80
  }); //材质对象Material
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  scene.add(mesh); //网格模型添加到场景中
  /**
   * 光源设置
   */
  //点光源
  var point = new THREE.PointLight(0xffffff);
  point.position.set(400, 200, 300); //点光源位置
  scene.add(point); //点光源添加到场景中
  //环境光
  var ambient = new THREE.AmbientLight(0x444444);
  scene.add(ambient);
  /**
   * 相机设置
   */
  var width = window.innerWidth; //窗口宽度
  var height = window.innerHeight; //窗口高度
  var k = width / height; //窗口宽高比
  var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
  //创建相机对象
  var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
  camera.position.set(200, 300, 200); //设置相机位置
  camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
  /**
   * 创建渲染器对象
   */
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);//设置渲染区域尺寸

  let caves_color = new THREE.Color('black');
  renderer.setClearColor(caves_color, 1); //设置背景颜色
  renderer.render(scene, camera);

  // document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
  //执行渲染操作   指定场景、相机作为参数
  // renderer.render(scene, camera);

  //自动旋转
  function render() {
    renderer.render(scene, camera);//执行渲染操作
    mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
    mesh.rotateX(0.01);//每次绕y轴旋转0.01弧度
    mesh.rotateZ(0.01);//每次绕y轴旋转0.01弧度
    requestAnimationFrame(render);//请求再次执行渲染函数render
  }
  render();
  let container = document.getElementById("three-output");
  container.appendChild(renderer.domElement);
}

function ThreeObj() {
  /**
       * 创建场景对象Scene
       */
  React.useEffect(() => {
    initThree();
    console.log("每次更新后对会执行");
  });

  return (
    <div id="three-output"></div>
  );
}

ReactDOM.render(
  <ThreeObj />,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
