
import m4 from '../webglCommon/m4'
import { createProgramFromStrings } from '../webglCommon'

/**
 * tips
 * 纹理图片必须是 2 的 n 次方的方阵
 * 以下是 256*256 的图片纹理
 *
 * 纹理范围
 */


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
  // Multiply the position by the matrix.
  gl_Position = u_matrix * a_position;

  // Pass the texcoord to the fragment shader.
  v_texcoord = a_texcoord;
}
`
  const f = `
  precision mediump float;

// Passed in from the vertex shader.
varying vec2 v_texcoord;

// The texture.
uniform sampler2D u_texture;

void main() {
   gl_FragColor = texture2D(u_texture, v_texcoord);
}
  `
  // setup GLSL program
  const program = createProgramFromStrings(
    gl, v, f
  )

  // look up where the vertex data needs to go.
  const positionLocation = gl.getAttribLocation(program, 'a_position')
  const texcoordLocation = gl.getAttribLocation(program, 'a_texcoord')

  // lookup uniforms
  const matrixLocation = gl.getUniformLocation(program, 'u_matrix')
  const textureLocation = gl.getUniformLocation(program, 'u_texture')

  // Create a buffer for positions
  const positionBuffer = gl.createBuffer()
  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  // Put the positions in the buffer
  setGeometry(gl)

  // provide texture coordinates for the rectangle.
  const texcoordBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer)
  // Set Texcoords.
  setTexcoords(gl)

  // Create a texture.
  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)

  // fill texture with 3x2 pixels
  const level = 0
  // 格式	            数据类型	                   通道数	   单像素字节数
  // RGBA	             UNSIGNED_BYTE	             4	          4
  // RGB	             UNSIGNED_BYTE	             3	          3
  // RGBA	             UNSIGNED_SHORT_4_4_4_4	     4            2
  // RGBA	             UNSIGNED_SHORT_5_5_5_1	     4	          2
  // RGB	             UNSIGNED_SHORT_5_6_5	       3	          2
  // LUMINANCE_ALPHA	 UNSIGNED_BYTE	             2	          2
  // LUMINANCE	       UNSIGNED_BYTE	             1	          1
  // ALPHA	           UNSIGNED_BYTE	             1	          1
  const internalFormat = gl.LUMINANCE
  const width = 3
  const height = 2
  const border = 0
  const format = gl.LUMINANCE
  const type = gl.UNSIGNED_BYTE
  const data = new Uint8Array([
    128,  64, 128, // 0-255 比特一位  所以一行三字节
    0, 192,   0
  ])

  /**
   * todo
   * 计算机有时在数据为某些特定大小时速度会快一些，
   * 例如一次拷贝2，4 或 8 个字节比一次拷贝 1 个字节要快，
   * WebGL默认使用 4 字节长度，所以它期望每一行数据是多个 4 字节数据（最后一行除外）。
   *
   * 我们之前的数据每行只有 3 个字节，总共为 6 字节，
   * 但是 WebGL 试图在第一行获取 4 个字节，第二行获取 3 个字节，
   * 总共 7 个字节，所以会出现这样的报错。
   *
   * 我们可以告诉WebGL一次处理 1 个字节
   */
  const alignment = 1
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, alignment)
  gl.texImage2D(
    gl.TEXTURE_2D, level, internalFormat, width, height, border,
    format, type, data
  )

  // set the filtering so we don't need mips
  gl.texParameteri(
    gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST
  )
  gl.texParameteri(
    gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST
  )
  gl.texParameteri(
    gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE
  )
  gl.texParameteri(
    gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE
  )

  function degToRad(d) {
    return d * Math.PI / 180
  }

  const fieldOfViewRadians = degToRad(60)
  let modelXRotationRadians = degToRad(0)
  let modelYRotationRadians = degToRad(0)

  // Get the starting time.
  let then = 0

  requestAnimationFrame(drawScene)

  // Draw the scene.
  function drawScene(t) {
    // convert to seconds
    const time  = t * 0.001
    // Subtract the previous time from the current time
    const deltaTime = time - then
    // Remember the current time for the next frame.
    then = time

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(
      0, 0, gl.canvas.width, gl.canvas.height
    )

    gl.enable(gl.CULL_FACE)
    gl.enable(gl.DEPTH_TEST)

    // Animate the rotation
    modelYRotationRadians += -0.7 * deltaTime
    modelXRotationRadians += -0.4 * deltaTime

    // Clear the canvas AND the depth buffer.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program)

    // Turn on the position attribute
    gl.enableVertexAttribArray(positionLocation)

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    let size = 3          // 3 components per iteration
    let type = gl.FLOAT   // the data is 32bit floats
    let normalize = false // don't normalize the data
    let stride = 0       // 0 = move forward size * sizeof(type) each iteration to get the next position
    let offset = 0        // start at the beginning of the buffer
    gl.vertexAttribPointer(
      positionLocation, size, type, normalize, stride, offset
    )

    // Turn on the texcoord attribute
    gl.enableVertexAttribArray(texcoordLocation)

    // bind the texcoord buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer)

    // Tell the texcoord attribute how to get data out of texcoordBuffer (ARRAY_BUFFER)
    size = 2          // 2 components per iteration
    type = gl.FLOAT   // the data is 32bit floats
    normalize = false // don't normalize the data
    stride = 0        // 0 = move forward size * sizeof(type) each iteration to get the next position
    offset = 0        // start at the beginning of the buffer
    gl.vertexAttribPointer(
      texcoordLocation, size, type, normalize, stride, offset
    )

    // Compute the projection matrix
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
    const projectionMatrix =
      m4.perspective(
        fieldOfViewRadians, aspect, 1, 2000
      )

    const cameraPosition = [0, 0, 2]
    const up = [0, 1, 0]
    const target = [0, 0, 0]

    // Compute the camera's matrix using look at.
    const cameraMatrix = m4.lookAt(
      cameraPosition, target, up
    )

    // Make a view matrix from the camera matrix.
    const viewMatrix = m4.inverse(cameraMatrix)

    const viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix)

    let matrix = m4.xRotate(viewProjectionMatrix, modelXRotationRadians)
    matrix = m4.yRotate(matrix, modelYRotationRadians)

    // Set the matrix.
    gl.uniformMatrix4fv(
      matrixLocation, false, matrix
    )

    // Tell the shader to use texture unit 0 for u_texture
    gl.uniform1i(textureLocation, 0)

    // Draw the geometry.
    gl.drawArrays(
      gl.TRIANGLES, 0, 6 * 6
    )

    requestAnimationFrame(drawScene)
  }
}

// Fill the buffer with the values that define a cube.
function setGeometry(gl) {
  const positions = new Float32Array([
    -0.5, -0.5,  -0.5,
    -0.5,  0.5,  -0.5,
    0.5, -0.5,  -0.5,
    -0.5,  0.5,  -0.5,
    0.5,  0.5,  -0.5,
    0.5, -0.5,  -0.5,

    -0.5, -0.5,   0.5,
    0.5, -0.5,   0.5,
    -0.5,  0.5,   0.5,
    -0.5,  0.5,   0.5,
    0.5, -0.5,   0.5,
    0.5,  0.5,   0.5,

    -0.5,   0.5, -0.5,
    -0.5,   0.5,  0.5,
    0.5,   0.5, -0.5,
    -0.5,   0.5,  0.5,
    0.5,   0.5,  0.5,
    0.5,   0.5, -0.5,

    -0.5,  -0.5, -0.5,
    0.5,  -0.5, -0.5,
    -0.5,  -0.5,  0.5,
    -0.5,  -0.5,  0.5,
    0.5,  -0.5, -0.5,
    0.5,  -0.5,  0.5,

    -0.5,  -0.5, -0.5,
    -0.5,  -0.5,  0.5,
    -0.5,   0.5, -0.5,
    -0.5,  -0.5,  0.5,
    -0.5,   0.5,  0.5,
    -0.5,   0.5, -0.5,

    0.5,  -0.5, -0.5,
    0.5,   0.5, -0.5,
    0.5,  -0.5,  0.5,
    0.5,  -0.5,  0.5,
    0.5,   0.5, -0.5,
    0.5,   0.5,  0.5

  ])
  gl.bufferData(
    gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW
  )
}

// Fill the buffer with texture coordinates the cube.
function setTexcoords(gl) {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      0, 0,
      0, 1,
      1, 0,
      0, 1,
      1, 1,
      1, 0,

      0, 0,
      0, 1,
      1, 0,
      1, 0,
      0, 1,
      1, 1,

      0, 0,
      0, 1,
      1, 0,
      0, 1,
      1, 1,
      1, 0,

      0, 0,
      0, 1,
      1, 0,
      1, 0,
      0, 1,
      1, 1,

      0, 0,
      0, 1,
      1, 0,
      0, 1,
      1, 1,
      1, 0,

      0, 0,
      0, 1,
      1, 0,
      1, 0,
      0, 1,
      1, 1

    ]),
    gl.STATIC_DRAW
  )
}




