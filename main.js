import * as THREE from 'three';
import './style.css'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import gsap from "gsap"
//scene
const scene = new THREE.Scene()
const geometry = new THREE.SphereGeometry( 3, 64, 64 );
const material = new THREE.MeshStandardMaterial( { 
  color: "#00ff83" ,
  roughness:0.5,

  
} );
const mesh = new THREE.Mesh( geometry, material );
scene.add(mesh)

//sizes
const sizes = {
  width : window.innerWidth,
  height : window.innerHeight
}


//light
const light = new THREE.PointLight(0xffffff, 1,100)
light.position.set(0,10,10)
light.intensity = 1.25
scene.add(light)

// camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1 ,100)
camera.position.z= 15
scene.add(camera)


//render 
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGL1Renderer({canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
renderer.setPixelRatio(2)

//controls
const controls = new OrbitControls(camera, canvas)
controls.enablePan= false
controls.enableDamping = true
controls.enableZoom = false
controls.autoRotate =true
controls.autoRotateSpeed = 1

//resize

window.addEventListener("resize", ()=>{

 //sizes
  // console.log(window.innerWidth)
  sizes.width = window.innerWidth
 sizes.height = window.innerHeight

 //camera
camera.aspect = sizes.width / sizes.height;
camera.updateProjectionMatrix()
renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()

//timeline magic

const tl = gsap.timeline({ defaults : {duration:1}})
tl.fromTo(mesh.scale, {x:100 , y:100, }, {z:1 , x:1 , y:1} )
tl.fromTo("nav", {sy: "-100%"} , {y:"0%"})
tl.fromTo(".title", { opacity: 0 }, { opacity:1})

//mouse animation color
 let mouseDown = false
 let rgb =[]
 window.addEventListener("mousedown", () =>{ mouseDown=true})
 window.addEventListener("mouseup", () =>{ mouseDown=false})

window.addEventListener("mousemove", (e)=>{
  if(mouseDown){
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.height) * 255),
      150,
    ]
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.color, {
       r: newColor.r,
       g: newColor.g,
       b: newColor.b

      } )
  }
})