import webglUtils from '../webglCommon/webgl-utils'
import primitives from '../webglCommon/primitives'
import m4 from '../webglCommon/m4'

export function render(canvas) {
  // Get A WebGL context
  /** @type {HTMLCanvasElement} */
  const vertexShaderSource = `
    attribute vec4 a_position;
    attribute vec4 a_color;
    
    uniform mat4 u_matrix;
    
    varying vec4 v_color;
    
    void main() {
      // Multiply the position by the matrix.
      gl_Position = u_matrix * a_position;
    
      // Pass the color to the fragment shader.
      v_color = a_color;
    }
  `
  const fragmentShaderSource = `
    precision mediump float;
  
    // Passed in from the vertex shader.
    varying vec4 v_color;
    
    uniform vec4 u_colorMult;
    
    void main() {
       gl_FragColor = v_color * u_colorMult;
    }
  `
  const gl = canvas.getContext('webgl')
  if (!gl) {
    return
  }

  // creates buffers with position, normal, texcoord, and vertex color
  // data for primitives by calling gl.createBuffer, gl.bindBuffer,
  // and gl.bufferData
  const sphereBufferInfo = primitives.createSphereWithVertexColorsBufferInfo(
    gl, 10, 12, 6
  )
  const cubeBufferInfo   = primitives.createCubeWithVertexColorsBufferInfo(gl, 20)
  const coneBufferInfo   = primitives.createTruncatedConeWithVertexColorsBufferInfo(
    gl, 10, 0, 20, 12, 1, true, false
  )

  // setup GLSL program
  const programInfo = webglUtils.createProgramInfo(gl, [vertexShaderSource, fragmentShaderSource])
  function degToRad(d) {
    return d * Math.PI / 180
  }

  const fieldOfViewRadians = degToRad(60)

  // Uniforms for each object.
  const sphereUniforms = {
    u_colorMult: [0.5, 1, 0.5, 1],
    u_matrix: m4.identity(),
  }
  const cubeUniforms = {
    u_colorMult: [1, 0.5, 0.5, 1],
    u_matrix: m4.identity(),
  }
  const coneUniforms = {
    u_colorMult: [0.5, 0.5, 1, 1],
    u_matrix: m4.identity(),
  }
  const sphereTranslation = [0, 0, 0]
  const cubeTranslation   = [-40, 0, 0]
  const coneTranslation   = [40, 0, 0]

  const objectsToDraw = [
    {
      programInfo: programInfo,
      bufferInfo: sphereBufferInfo,
      uniforms: sphereUniforms,
    },
    {
      programInfo: programInfo,
      bufferInfo: cubeBufferInfo,
      uniforms: cubeUniforms,
    },
    {
      programInfo: programInfo,
      bufferInfo: coneBufferInfo,
      uniforms: coneUniforms,
    }
  ]

  function computeMatrix(
    viewProjectionMatrix, translation, xRotation, yRotation
  ) {
    let matrix = m4.translate(
      viewProjectionMatrix,
      translation[0],
      translation[1],
      translation[2]
    )
    matrix = m4.xRotate(matrix, xRotation)
    return m4.yRotate(matrix, yRotation)
  }

  requestAnimationFrame(drawScene)

  // Draw the scene.
  function drawScene(t) {
    const time  = t * 0.0005

    webglUtils.resizeCanvasToDisplaySize(gl.canvas)

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(
      0, 0, gl.canvas.width, gl.canvas.height
    )

    gl.enable(gl.CULL_FACE)
    gl.enable(gl.DEPTH_TEST)

    // Clear the canvas AND the depth buffer.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    // Compute the projection matrix
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
    const projectionMatrix =
      m4.perspective(
        fieldOfViewRadians, aspect, 1, 2000
      )

    // Compute the camera's matrix using look at.
    const cameraPosition = [0, 0, 100]
    const target = [0, 0, 0]
    const up = [0, 1, 0]
    const cameraMatrix = m4.lookAt(
      cameraPosition, target, up
    )

    // Make a view matrix from the camera matrix.
    const viewMatrix = m4.inverse(cameraMatrix)

    const viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix)

    const sphereXRotation =  time
    const sphereYRotation =  time
    const cubeXRotation   = -time
    const cubeYRotation   =  time
    const coneXRotation   =  time
    const coneYRotation   = -time

    // Compute the matrices for each object.
    sphereUniforms.u_matrix = computeMatrix(
      viewProjectionMatrix,
      sphereTranslation,
      sphereXRotation,
      sphereYRotation
    )

    cubeUniforms.u_matrix = computeMatrix(
      viewProjectionMatrix,
      cubeTranslation,
      cubeXRotation,
      cubeYRotation
    )
    // 锥形
    coneUniforms.u_matrix = computeMatrix(
      viewProjectionMatrix,
      coneTranslation,
      coneXRotation,
      coneYRotation
    )

    // ------ Draw the objects --------

    objectsToDraw.forEach(function(object) {
      const programInfo = object.programInfo
      const bufferInfo = object.bufferInfo

      gl.useProgram(programInfo.program)

      // Setup all the needed attributes.
      webglUtils.setBuffersAndAttributes(
        gl, programInfo, bufferInfo
      )

      // Set the uniforms.
      webglUtils.setUniforms(programInfo, object.uniforms)

      // Draw
      gl.drawArrays(
        gl.TRIANGLES, 0, bufferInfo.numElements
      )
    })

    requestAnimationFrame(drawScene)
  }
}

