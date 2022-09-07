import webglUtils from '../webglCommon/webgl-utils'
import primitives from '../webglCommon/primitives'
import m4 from '../webglCommon/m4'

export function render(canvas) {
  const vertexShaderSource = `
    attribute vec4 a_position;
    attribute vec4 a_color;
    
    uniform mat4 u_matrix;
    
    varying vec4 v_color;
    
    void main() {
      // 模型坐标转换通过矩阵转换到视锥体空间
      gl_Position = u_matrix * a_position;
    
      // 将顶点颜色传给片段着色器
      v_color = a_color;
    }
  `
  const fragmentShaderSource = `
    precision mediump float;
  
    // 传入的顶点着色器颜色
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


  // 生成顶点、法向量、纹理坐标、顶点颜色
  const sphereBufferInfo = primitives.createSphereWithVertexColorsBufferInfo(
    gl, 10, 12, 6
  )
  const cubeBufferInfo   = primitives.createCubeWithVertexColorsBufferInfo(gl, 20)
  const coneBufferInfo   = primitives.createTruncatedConeWithVertexColorsBufferInfo(
    gl, 10, 0, 20, 12, 1, true, false
  )
  // 创建一个着色器程序
  const programInfo = webglUtils.createProgramInfo(gl, [vertexShaderSource, fragmentShaderSource])
  function degToRad(d) {
    return d * Math.PI / 180
  }

  const fieldOfViewRadians = degToRad(60)

  // 设置全局变量.
  const sphereUniforms = {
    // eslint-disable-next-line camelcase
    u_colorMult: [0.5, 1, 0.5, 1],
    // eslint-disable-next-line camelcase
    u_matrix: m4.identity(),
  }
  const cubeUniforms = {
    // eslint-disable-next-line camelcase
    u_colorMult: [1, 0.5, 0.5, 1],
    // eslint-disable-next-line camelcase
    u_matrix: m4.identity(),
  }
  const coneUniforms = {
    // eslint-disable-next-line camelcase
    u_colorMult: [0.5, 0.5, 1, 1],
    // eslint-disable-next-line camelcase
    u_matrix: m4.identity(),
  }
  const sphereTranslation = [0, 0, 0]
  const cubeTranslation   = [-80, 0, 0]
  const coneTranslation   = [80, 0, 0]

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
    matrix = m4.scale(
      matrix, 2, 2, 2
    )
    return m4.yRotate(matrix, yRotation)
  }

  requestAnimationFrame(drawScene)

  function drawScene(t) {
    const time  = t * 0.001


    gl.viewport(
      0, 0, gl.canvas.width, gl.canvas.height
    )

    gl.enable(gl.CULL_FACE)
    gl.enable(gl.DEPTH_TEST)

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    // 透视投影空间矩阵 对观察空间中的点进行裁剪
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
    const projectionMatrix =
      m4.perspective(
        fieldOfViewRadians, aspect, 1, 2000
      )


    const cameraPosition = [0, 0, 100]
    const target = [0, 0, 0]
    const up = [0, 1, 0]
    // 观察空间矩阵，这个矩阵描述了相机空间在世界空间的位置，通过这个矩阵可以将相机空间里的点转换到世界空间
    const cameraMatrix = m4.lookAt(
      cameraPosition, target, up
    )

    // 在这里对相机矩阵求逆，即可得到由世界空间到相机空间的转换矩阵
    const viewMatrix = m4.inverse(cameraMatrix)
    // 裁剪矩阵乘以 观察矩阵得到一个转换到裁剪空间的矩阵
    const viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix)

    const sphereXRotation =  time
    const sphereYRotation =  time
    const cubeXRotation   = -time
    const cubeYRotation   =  time
    const coneXRotation   =  time
    const coneYRotation   = -time
    /**
     * todo
     * 坐标点转换到到相机空间后，需要进行平移或者缩放以及旋转
     * @type {Matrix4}
     */
    // 球体
    // eslint-disable-next-line camelcase
    sphereUniforms.u_matrix = computeMatrix(
      viewProjectionMatrix,
      sphereTranslation,
      sphereXRotation,
      sphereYRotation
    )
    // 立方体
    // eslint-disable-next-line camelcase
    cubeUniforms.u_matrix = computeMatrix(
      viewProjectionMatrix,
      cubeTranslation,
      cubeXRotation,
      cubeYRotation
    )
    // 锥形
    // eslint-disable-next-line camelcase
    coneUniforms.u_matrix = computeMatrix(
      viewProjectionMatrix,
      coneTranslation,
      coneXRotation,
      coneYRotation
    )


    objectsToDraw.forEach(function(object) {
      const programInfo = object.programInfo
      const bufferInfo = object.bufferInfo

      gl.useProgram(programInfo.program)

      webglUtils.setBuffersAndAttributes(
        gl, programInfo, bufferInfo
      )

      webglUtils.setUniforms(programInfo, object.uniforms)

      gl.drawArrays(
        gl.TRIANGLES, 0, bufferInfo.numElements
      )
    })

    requestAnimationFrame(drawScene)
  }
}

