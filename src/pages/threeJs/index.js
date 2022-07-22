import React from 'react'
import * as THREE from 'three'


export default class Demo extends React.Component {
  componentDidMount() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 1000
    )

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    const geometry = new THREE.BoxGeometry(
      1, 1, 1
    )
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    camera.position.z = 5

    function animate() {
      requestAnimationFrame(animate)

      cube.rotation.x += 0.01
      cube.rotation.y += 0.01

      renderer.render(scene, camera)
    }

    animate()
  }

  render() {
    return (
      <div>
        <svg cl="link_svg"  viewBox="0 0 24 24" width="20" height="20">
          <path fill="none" d="M0 0H24V24H0z"/>
          <path fill="#868ca0" d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"/>
        </svg>
      </div>
    )
  }
}
