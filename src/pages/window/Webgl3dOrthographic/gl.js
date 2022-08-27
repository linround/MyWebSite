import { createProgramFromStrings } from '../webglCommon'

export function render(canvas) {
  // Get A WebGL context
  /** @type {HTMLCanvasElement} */
  const  gl = canvas.getContext('webgl')
  if (!gl) {
    return
  }
  const vertexShaderSource = `
  attribute vec4 a_position;

  uniform mat4 u_matrix;
  
  void main() {
    // Multiply the position by the matrix.
    gl_Position = u_matrix * a_position;
  }
  `
  const fragmentShaderSource = `
  precision mediump float;

  uniform vec4 u_color;
  
  void main() {
     gl_FragColor = u_color;
  }
  `
  // setup GLSL program
  const program = createProgramFromStrings(
    gl, vertexShaderSource, fragmentShaderSource
  )

  // look up where the vertex data needs to go.
  const positionLocation = gl.getAttribLocation(program, 'a_position')

  // lookup uniforms
  const colorLocation = gl.getUniformLocation(program, 'u_color')
  const matrixLocation = gl.getUniformLocation(program, 'u_matrix')

  // Create a buffer to put positions in
  const positionBuffer = gl.createBuffer()
  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  // Put geometry data into buffer
  setGeometry(gl)

  // function radToDeg(r) {
  //   return r * 180 / Math.PI
  // }

  function degToRad(d) {
    return d * Math.PI / 180
  }

  const translation = [45, 150, 0]
  const rotation = [degToRad(40), degToRad(25), degToRad(325)]
  const scale = [1, 1, 1]
  const color = [Math.random(), Math.random(), Math.random(), 1]

  drawScene()

  function updatePosition(index, value) {
    translation[index] = value
    drawScene()
  }

  function updateRotation(index, value) {
    const angleInRadians = value * Math.PI / 180
    rotation[index] = angleInRadians
    drawScene()
  }

  function updateScale(index, value) {
    scale[index] = value
    drawScene()
  }
  return {
    updateScale,
    updatePosition,
    updateRotation,
  }
  // Draw the scene.
  function drawScene() {

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(
      0, 0, gl.canvas.width, gl.canvas.height
    )

    // Clear the canvas.
    gl.clear(gl.COLOR_BUFFER_BIT)

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program)

    // Turn on the attribute
    gl.enableVertexAttribArray(positionLocation)

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    const size = 3           // 3 components per iteration
    const  type = gl.FLOAT   // the data is 32bit floats
    const normalize = false // don't normalize the data
    const stride = 0        // 0 = move forward size * sizeof(type) each iteration to get the next position
    let offset = 0        // start at the beginning of the buffer
    gl.vertexAttribPointer(
      positionLocation, size, type, normalize, stride, offset
    )

    // set the color
    gl.uniform4fv(colorLocation, color)

    // Compute the matrices
    let matrix = m4.projection(
      gl.canvas.clientWidth, gl.canvas.clientHeight, 400
    )
    matrix = m4.translate(
      matrix, translation[0], translation[1], translation[2]
    )
    matrix = m4.xRotate(matrix, rotation[0])
    matrix = m4.yRotate(matrix, rotation[1])
    matrix = m4.zRotate(matrix, rotation[2])
    matrix = m4.scale(
      matrix, scale[0], scale[1], scale[2]
    )

    // Set the matrix.
    gl.uniformMatrix4fv(
      matrixLocation, false, matrix
    )

    // Draw the geometry.
    const primitiveType = gl.TRIANGLES
    offset = 0
    const  count = 18  // 6 triangles in the 'F', 3 points per triangle
    gl.drawArrays(
      primitiveType, offset, count
    )
  }
}

var m4 = {

  projection: function(
    width, height, depth
  ) {
    // Note: This matrix flips the Y axis so 0 is at the top.
    return [
      2 / width, 0, 0, 0,
      0, -2 / height, 0, 0,
      0, 0, 2 / depth, 0,
      -1, 1, 0, 1
    ]
  },

  multiply: function(a, b) {

    // eslint-disable-next-line no-mixed-operators
    const a00 = a[(0 * 4) + 0]

    // eslint-disable-next-line no-mixed-operators
    const a01 = a[(0 * 4) + 1]

    // eslint-disable-next-line no-mixed-operators
    const a02 = a[(0 * 4) + 2]

    // eslint-disable-next-line no-mixed-operators
    const a03 = a[(0 * 4) + 3]

    // eslint-disable-next-line no-mixed-operators
    const a10 = a[(1 * 4) + 0]

    // eslint-disable-next-line no-mixed-operators
    const a11 = a[1 * 4 + 1]

    // eslint-disable-next-line no-mixed-operators
    const a12 = a[1 * 4 + 2]

    // eslint-disable-next-line no-mixed-operators
    const a13 = a[1 * 4 + 3]

    // eslint-disable-next-line no-mixed-operators
    const a20 = a[2 * 4 + 0]
    // eslint-disable-next-line no-mixed-operators
    const a21 = a[2 * 4 + 1]
    // eslint-disable-next-line no-mixed-operators
    const a22 = a[2 * 4 + 2]
    // eslint-disable-next-line no-mixed-operators
    const a23 = a[2 * 4 + 3]
    // eslint-disable-next-line no-mixed-operators
    const a30 = a[3 * 4 + 0]
    // eslint-disable-next-line no-mixed-operators
    const a31 = a[3 * 4 + 1]
    // eslint-disable-next-line no-mixed-operators
    const a32 = a[3 * 4 + 2]
    // eslint-disable-next-line no-mixed-operators
    const a33 = a[3 * 4 + 3]
    // eslint-disable-next-line no-mixed-operators
    const b00 = b[0 * 4 + 0]
    // eslint-disable-next-line no-mixed-operators
    const b01 = b[0 * 4 + 1]
    // eslint-disable-next-line no-mixed-operators
    const b02 = b[0 * 4 + 2]
    // eslint-disable-next-line no-mixed-operators
    const b03 = b[0 * 4 + 3]
    // eslint-disable-next-line no-mixed-operators
    const b10 = b[1 * 4 + 0]
    // eslint-disable-next-line no-mixed-operators
    const b11 = b[1 * 4 + 1]
    // eslint-disable-next-line no-mixed-operators
    // eslint-disable-next-line no-mixed-operators
    const b12 = b[1 * 4 + 2]
    // eslint-disable-next-line no-mixed-operators
    const b13 = b[1 * 4 + 3]
    // eslint-disable-next-line no-mixed-operators
    const b20 = b[2 * 4 + 0]
    // eslint-disable-next-line no-mixed-operators
    const b21 = b[2 * 4 + 1]
    // eslint-disable-next-line no-mixed-operators
    const b22 = b[2 * 4 + 2]
    // eslint-disable-next-line no-mixed-operators
    const b23 = b[2 * 4 + 3]
    // eslint-disable-next-line no-mixed-operators
    const b30 = b[3 * 4 + 0]
    // eslint-disable-next-line no-mixed-operators
    const b31 = b[3 * 4 + 1]
    // eslint-disable-next-line no-mixed-operators
    const b32 = b[3 * 4 + 2]
    // eslint-disable-next-line no-mixed-operators
    const b33 = b[3 * 4 + 3]
    // eslint-disable-next-line no-mixed-operators
    return [

      // eslint-disable-next-line no-mixed-operators
      b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,

      // eslint-disable-next-line no-mixed-operators
      b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,

      // eslint-disable-next-line no-mixed-operators
      b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,

      // eslint-disable-next-line no-mixed-operators
      b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,

      // eslint-disable-next-line no-mixed-operators
      b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,

      // eslint-disable-next-line no-mixed-operators
      b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,

      // eslint-disable-next-line no-mixed-operators
      b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,

      // eslint-disable-next-line no-mixed-operators
      b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,

      // eslint-disable-next-line no-mixed-operators
      b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
      // eslint-disable-next-line no-mixed-operators
      b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,

      // eslint-disable-next-line no-mixed-operators
      b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,

      // eslint-disable-next-line no-mixed-operators
      b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,

      // eslint-disable-next-line no-mixed-operators
      b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,

      // eslint-disable-next-line no-mixed-operators
      b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,

      // eslint-disable-next-line no-mixed-operators
      b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,


      // eslint-disable-next-line no-mixed-operators
      b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33
    ]
  },

  translation: function(
    tx, ty, tz
  ) {
    return [
      1,  0,  0,  0,
      0,  1,  0,  0,
      0,  0,  1,  0,
      tx, ty, tz, 1
    ]
  },

  xRotation: function(angleInRadians) {
    const c = Math.cos(angleInRadians)
    const s = Math.sin(angleInRadians)

    return [
      1, 0, 0, 0,
      0, c, s, 0,
      0, -s, c, 0,
      0, 0, 0, 1
    ]
  },

  yRotation: function(angleInRadians) {
    const c = Math.cos(angleInRadians)
    const s = Math.sin(angleInRadians)

    return [
      c, 0, -s, 0,
      0, 1, 0, 0,
      s, 0, c, 0,
      0, 0, 0, 1
    ]
  },

  zRotation: function(angleInRadians) {
    const c = Math.cos(angleInRadians)
    const s = Math.sin(angleInRadians)

    return [
      c, s, 0, 0,
      -s, c, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]
  },

  scaling: function(
    sx, sy, sz
  ) {
    return [
      sx, 0,  0,  0,
      0, sy,  0,  0,
      0,  0, sz,  0,
      0,  0,  0,  1
    ]
  },

  translate: function(
    m, tx, ty, tz
  ) {
    return m4.multiply(m, m4.translation(
      tx, ty, tz
    ))
  },

  xRotate: function(m, angleInRadians) {
    return m4.multiply(m, m4.xRotation(angleInRadians))
  },

  yRotate: function(m, angleInRadians) {
    return m4.multiply(m, m4.yRotation(angleInRadians))
  },

  zRotate: function(m, angleInRadians) {
    return m4.multiply(m, m4.zRotation(angleInRadians))
  },

  scale: function(
    m, sx, sy, sz
  ) {
    return m4.multiply(m, m4.scaling(
      sx, sy, sz
    ))
  },

}
// Fill the buffer with the values that define a letter 'F'.
function setGeometry(gl) {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      // left column
      0,   0,  0,
      30,   0,  0,
      0, 150,  0,
      0, 150,  0,
      30,   0,  0,
      30, 150,  0,

      // top rung
      30,   0,  0,
      100,   0,  0,
      30,  30,  0,
      30,  30,  0,
      100,   0,  0,
      100,  30,  0,

      // middle rung
      30,  60,  0,
      67,  60,  0,
      30,  90,  0,
      30,  90,  0,
      67,  60,  0,
      67,  90,  0]),
    gl.STATIC_DRAW
  )
}

