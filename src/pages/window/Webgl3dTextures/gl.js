import webglUtils from '../webglCommon/webgl-utils'
import m4 from '../webglCommon/m4'
import { createProgramFromStrings } from '../webglCommon'

/**
 * tips
 * 纹理图片必须是 2 的 n 次方的方阵
 * 以下是 256*256 的图片纹理
 *
 * 纹理范围
 */
import imgTexture from '../webglCommon/texture.png'

export function render(canvas) {
  const gl = canvas.getContext('webgl')
  if (!gl) {
    return
  }

  const v = `
      attribute vec4 a_position;
      attribute vec2 a_texcoord;
      
      uniform mat4 u_matrix;
      
      varying vec2 v_texcoord;
      
      void main() {
        // MVP矩阵 乘以坐标点，得到模型在视图里面的位置坐标
        gl_Position = u_matrix * a_position;
      
        // 将纹理坐标传入片元着色器
        v_texcoord = a_texcoord;
      }
  `
  const f = `
      precision mediump float;
      
      varying vec2 v_texcoord;
      
      // 纹理采样器
      uniform sampler2D u_texture;
      
      void main() {
         // 从默认读取第一层纹理
         gl_FragColor = texture2D(u_texture, v_texcoord);
         // 再次读取纹理 这个时候读取第二层
         gl_FragColor = texture2D(u_texture, v_texcoord);
      }
  `
  const program = createProgramFromStrings(
    gl, v, f
  )

  const positionLocation = gl.getAttribLocation(program, 'a_position')
  const texcoordLocation = gl.getAttribLocation(program, 'a_texcoord')
  const matrixLocation = gl.getUniformLocation(program, 'u_matrix')
  const textureLocation = gl.getUniformLocation(program, 'u_texture')

  // 设置模型顶点坐标
  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  setGeometry(gl)
  // 设置每个面的顶点与对应的纹理坐标点的映射关系
  const texcoordBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer)
  setTexcoords(gl)


  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)
  // Fill the texture with a 1x1 blue pixel.
  gl.texImage2D(
    gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 255, 255])
  )

  const image = new Image()
  image.src = imgTexture
  image.addEventListener('load', function() {
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image
    )
    gl.generateMipmap(gl.TEXTURE_2D)
  })


  function degToRad(d) {
    return d * Math.PI / 180
  }

  const fieldOfViewRadians = degToRad(60)
  let modelXRotationRadians = degToRad(0)
  let modelYRotationRadians = degToRad(0)

  let then = 0

  requestAnimationFrame(drawScene)

  function drawScene(now) {
    const deltaTime = (now - then) * 0.00
    then = now

    webglUtils.resizeCanvasToDisplaySize(gl.canvas)

    gl.viewport(
      0, 0, gl.canvas.width, gl.canvas.height
    )

    gl.enable(gl.CULL_FACE)
    gl.enable(gl.DEPTH_TEST)

    // 沿XY分别旋转的角度
    modelXRotationRadians += 1.2 * deltaTime
    modelYRotationRadians += 0.7 * deltaTime

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.useProgram(program)

    gl.enableVertexAttribArray(positionLocation)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    let size = 3
    let  type = gl.FLOAT
    let normalize = false
    let stride = 0
    let offset = 0
    gl.vertexAttribPointer(
      positionLocation, size, type, normalize, stride, offset
    )


    gl.enableVertexAttribArray(texcoordLocation)
    // 纹理坐标是二维的
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer)
    size = 2
    type = gl.FLOAT
    normalize = false
    stride = 0
    offset = 0
    gl.vertexAttribPointer(
      texcoordLocation, size, type, normalize, stride, offset
    )

    // 计算这个裁剪矩阵
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
    const projectionMatrix =
      m4.perspective(
        fieldOfViewRadians, aspect, 1, 2000
      )

    const cameraPosition = [0, 0, 150]
    const up = [0, 1, 0]
    const target = [0, 0, 0]

    // 计算这个观察矩阵（即观察空间到世界空间的转换矩阵）
    const cameraMatrix = m4.lookAt(
      cameraPosition, target, up
    )

    // 对官差矩阵进行转置即可求得 世界空间到观察空间的转换矩阵
    const viewMatrix = m4.inverse(cameraMatrix)
    // 对观察矩阵进行裁剪 得到对应的视锥体所形成的矩阵（裁剪矩阵）
    const viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix)
    // 对最终的转换结果进行平移和旋转
    let matrix = m4.xRotate(viewProjectionMatrix, modelXRotationRadians)
    matrix = m4.yRotate(matrix, modelYRotationRadians)


    gl.uniformMatrix4fv(
      matrixLocation, false, matrix
    )

    /**
     * todo
     * 这里可以使用 gl.activeTexture(gl.TEXTURE1) 激活突出纹理 1
     * 使用 gl.bindTexture(gl.TEXTURE_2D, textures[0]); 对图层纹理进行绑定
     * 当使用 sampler2D 对gl纹理进行采样的时候，默认是从0 到尾进行一层层的读取采样
     */
    gl.uniform1i(textureLocation, 0)
    gl.drawArrays(
      gl.TRIANGLES, 0, 16 * 6
    )

    requestAnimationFrame(drawScene)
  }
}

//  'F'.
function setGeometry(gl) {
  const positions = new Float32Array([
    // left column front
    0,   0,  0,
    0, 150,  0,
    30,   0,  0,
    0, 150,  0,
    30, 150,  0,
    30,   0,  0,

    // top rung front
    30,   0,  0,
    30,  30,  0,
    100,   0,  0,
    30,  30,  0,
    100,  30,  0,
    100,   0,  0,

    // middle rung front
    30,  60,  0,
    30,  90,  0,
    67,  60,  0,
    30,  90,  0,
    67,  90,  0,
    67,  60,  0,

    // left column back
    0,   0,  30,
    30,   0,  30,
    0, 150,  30,
    0, 150,  30,
    30,   0,  30,
    30, 150,  30,

    // top rung back
    30,   0,  30,
    100,   0,  30,
    30,  30,  30,
    30,  30,  30,
    100,   0,  30,
    100,  30,  30,

    // middle rung back
    30,  60,  30,
    67,  60,  30,
    30,  90,  30,
    30,  90,  30,
    67,  60,  30,
    67,  90,  30,

    // top
    0,   0,   0,
    100,   0,   0,
    100,   0,  30,
    0,   0,   0,
    100,   0,  30,
    0,   0,  30,

    // top rung right
    100,   0,   0,
    100,  30,   0,
    100,  30,  30,
    100,   0,   0,
    100,  30,  30,
    100,   0,  30,

    // under top rung
    30,   30,   0,
    30,   30,  30,
    100,  30,  30,
    30,   30,   0,
    100,  30,  30,
    100,  30,   0,

    // between top rung and middle
    30,   30,   0,
    30,   60,  30,
    30,   30,  30,
    30,   30,   0,
    30,   60,   0,
    30,   60,  30,

    // top of middle rung
    30,   60,   0,
    67,   60,  30,
    30,   60,  30,
    30,   60,   0,
    67,   60,   0,
    67,   60,  30,

    // right of middle rung
    67,   60,   0,
    67,   90,  30,
    67,   60,  30,
    67,   60,   0,
    67,   90,   0,
    67,   90,  30,

    // bottom of middle rung.
    30,   90,   0,
    30,   90,  30,
    67,   90,  30,
    30,   90,   0,
    67,   90,  30,
    67,   90,   0,

    // right of bottom
    30,   90,   0,
    30,  150,  30,
    30,   90,  30,
    30,   90,   0,
    30,  150,   0,
    30,  150,  30,

    // bottom
    0,   150,   0,
    0,   150,  30,
    30,  150,  30,
    0,   150,   0,
    30,  150,  30,
    30,  150,   0,

    // left side
    0,   0,   0,
    0,   0,  30,
    0, 150,  30,
    0,   0,   0,
    0, 150,  30,
    0, 150,   0])

  // Center the F around the origin and Flip it around. We do this because
  // we're in 3D now with and +Y is up where as before when we started with 2D
  // we had +Y as down.

  // We could do by changing all the values above but I'm lazy.
  // We could also do it with a matrix at draw time but you should
  // never do stuff at draw time if you can do it at init time.
  let matrix = m4.identity()// m4.xRotation(Math.PI);
  matrix = m4.translate(
    matrix, -50, -75, -15
  )

  for (let ii = 0; ii < positions.length; ii += 3) {
    const vector = m4.transformVector(matrix, [positions[ii + 0], positions[ii + 1], positions[ii + 2], 1])
    positions[ii + 0] = vector[0]
    positions[ii + 1] = vector[1]
    positions[ii + 2] = vector[2]
  }

  gl.bufferData(
    gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW
  )
}

//  F.
function setTexcoords(gl) {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      // left column front
      -38 / 255,  44 / 255,
      38 / 255, 223 / 255,
      113 / 255,  44 / 255,
      38 / 255, 223 / 255,
      113 / 255, 223 / 255,
      113 / 255,  44 / 255,

      // top rung front
      -113 / 255, 44 / 255,
      113 / 255, 85 / 255,
      218 / 255, 44 / 255,
      113 / 255, 85 / 255,
      218 / 255, 85 / 255,
      218 / 255, 44 / 255,

      // middle rung front
      -113 / 255, 112 / 255,
      113 / 255, 151 / 255,
      203 / 255, 112 / 255,
      113 / 255, 151 / 255,
      203 / 255, 151 / 255,
      203 / 255, 112 / 255,

      // left column back
      38 / 255,  44 / 255,
      113 / 255,  44 / 255,
      38 / 255, 223 / 255,
      38 / 255, 223 / 255,
      113 / 255,  44 / 255,
      113 / 255, 223 / 255,

      // top rung back
      113 / 255, 44 / 255,
      218 / 255, 44 / 255,
      113 / 255, 85 / 255,
      113 / 255, 85 / 255,
      218 / 255, 44 / 255,
      218 / 255, 85 / 255,

      // middle rung back
      113 / 255, 112 / 255,
      203 / 255, 112 / 255,
      113 / 255, 151 / 255,
      113 / 255, 151 / 255,
      203 / 255, 112 / 255,
      203 / 255, 151 / 255,

      // top
      0, 0,
      1, 0,
      1, 1,
      0, 0,
      1, 1,
      0, 1,

      // top rung right
      0, 0,
      1, 0,
      1, 1,
      0, 0,
      1, 1,
      0, 1,

      // under top rung
      0, 0,
      0, 1,
      1, 1,
      0, 0,
      1, 1,
      1, 0,

      // between top rung and middle
      0, 0,
      1, 1,
      0, 1,
      0, 0,
      1, 0,
      1, 1,

      // top of middle rung
      0, 0,
      1, 1,
      0, 1,
      0, 0,
      1, 0,
      1, 1,

      // right of middle rung
      0, 0,
      1, 1,
      0, 1,
      0, 0,
      1, 0,
      1, 1,

      // bottom of middle rung.
      0, 0,
      0, 1,
      1, 1,
      0, 0,
      1, 1,
      1, 0,

      // right of bottom
      0, 0,
      1, 1,
      0, 1,
      0, 0,
      1, 0,
      1, 1,

      // bottom
      0, 0,
      0, 1,
      1, 1,
      0, 0,
      1, 1,
      1, 0,

      // left side
      0, 0,
      0, 1,
      1, 1,
      0, 0,
      1, 1,
      1, 0
    ]),
    gl.STATIC_DRAW
  )
}


