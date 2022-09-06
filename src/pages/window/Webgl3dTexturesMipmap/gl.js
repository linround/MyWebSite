
import m4 from '../webglCommon/m4'
import { createProgramFromStrings } from '../webglCommon'

/**
 * tips
 * 纹理图片必须是 2 的 n 次方的方阵
 * 以下是 256*256 的图片纹理
 *
 * 纹理范围
 */
import imgTexture from '../webglCommon/mip-low-res-example.png'

export function render(canvas) {

  // Get A WebGL context
  const gl = canvas.getContext('webgl', { antialias: false, })
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

  let framebufferWidth   // set at render time
  let framebufferHeight  // set at render time
  const framebuffer = gl.createFramebuffer()
  const fbTexture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, fbTexture)
  gl.texParameteri(
    gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE
  )
  gl.texParameteri(
    gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE
  )
  gl.texParameteri(
    gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST
  )
  gl.texParameteri(
    gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST
  )
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fbTexture, 0
  )

  // Create a texture.
  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)
  // Fill the texture with a 1x1 blue pixel.
  gl.texImage2D(
    gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 255, 255])
  )
  // Asynchronously load an image
  const image = new Image()
  image.src = imgTexture
  image.addEventListener('load', function() {
    // Now that the image has loaded make copy it to the texture.
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image
    )

    // Check if the image is a power of 2 in both dimensions.
    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
      // Yes, it's a power of 2. Generate mips.
      gl.generateMipmap(gl.TEXTURE_2D)
    } else {
      // No, it's not a power of 2. Turn of mips and set wrapping to clamp to edge
      gl.texParameteri(
        gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE
      )
      gl.texParameteri(
        gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE
      )
      gl.texParameteri(
        gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR
      )
    }
  })

  function isPowerOf2(value) {
    return (value & (value - 1)) === 0
  }


  function degToRad(d) {
    return d * Math.PI / 180
  }

  const fieldOfViewRadians = degToRad(60)
  const modelXRotationRadians = degToRad(0)
  const modelYRotationRadians = degToRad(0)

  requestAnimationFrame(drawScene)

  // Draw the scene.
  function drawScene(t) {
    const time = t * 0.001  // convert to seconds


    framebufferWidth = gl.canvas.clientWidth
    framebufferHeight = gl.canvas.clientHeight
    gl.bindTexture(gl.TEXTURE_2D, fbTexture)
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA, framebufferWidth, framebufferHeight,
      0, gl.RGBA, gl.UNSIGNED_BYTE, null
    )

    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
    gl.viewport(
      0, 0, framebufferWidth, framebufferHeight
    )

    // Clear the framebuffer texture.
    gl.clearColor(
      0, 0, 0, 1
    )
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
    let  normalize = false // don't normalize the data
    let stride = 0        // 0 = move forward size * sizeof(type) each iteration to get the next position
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
    const zNear  = 1
    const zFar   = 2000
    const projectionMatrix =
      m4.perspective(
        fieldOfViewRadians, aspect, zNear, zFar
      )

    const settings = [
      { x: -1, y: -3, z: -30, filter: gl.NEAREST,               },
      { x: 0, y: -3, z: -30, filter: gl.LINEAR,                },
      { x: 1, y: -3, z: -30, filter: gl.NEAREST_MIPMAP_LINEAR, },
      { x: -1, y: -1, z: -10, filter: gl.NEAREST,               },
      { x: 0, y: -1, z: -10, filter: gl.LINEAR,                },
      { x: 1, y: -1, z: -10, filter: gl.NEAREST_MIPMAP_LINEAR, },
      { x: -1, y: 1, z: 0, filter: gl.NEAREST,               },
      { x: 0, y: 1, z: 0, filter: gl.LINEAR,                },
      { x: 1, y: 1, z: 0, filter: gl.LINEAR_MIPMAP_NEAREST, }
    ]
    const xSpacing = 1.2
    const ySpacing = 0.7
    settings.forEach(function(s) {
      const z = -5 + s.z // Math.cos(time * 0.3) * zDistance - zDistance;
      const r = Math.abs(z) * Math.sin(fieldOfViewRadians * 0.5)
      const x = Math.sin(time * 0.2) * r
      const y = Math.cos(time * 0.2) * r * 0.5
      const r2 = 1 + (r * 0.2)

      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texParameteri(
        gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE
      )
      gl.texParameteri(
        gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE
      )
      gl.texParameteri(
        gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, s.filter
      )
      gl.texParameteri(
        gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR
      )

      let matrix = m4.translate(
        projectionMatrix, x + (s.x * xSpacing * r2), y + (s.y * ySpacing * r2), z
      )
      matrix = m4.xRotate(matrix, modelXRotationRadians)
      matrix = m4.yRotate(matrix, modelYRotationRadians)

      // Set the matrix.
      gl.uniformMatrix4fv(
        matrixLocation, false, matrix
      )

      // Tell the shader to use texture unit 0 for u_texture
      gl.uniform1i(textureLocation, 0)

      // Draw the geometry.
      gl.drawArrays(
        gl.TRIANGLES, 0, 1 * 6
      )
    })

    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    gl.viewport(
      0, 0, gl.canvas.width, gl.canvas.height
    )
    gl.bindTexture(gl.TEXTURE_2D, fbTexture)
    gl.uniformMatrix4fv(
      matrixLocation, false,
      [2, 0, 0, 0,
        0, 2, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1]
    )

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.drawArrays(
      gl.TRIANGLES, 0, 1 * 6
    )

    requestAnimationFrame(drawScene)
  }
}

// Fill the buffer with the values that define a plane.
function setGeometry(gl) {
  var positions = new Float32Array([
    -0.5, -0.5,   0.5,
    0.5, -0.5,   0.5,
    -0.5,  0.5,   0.5,
    -0.5,  0.5,   0.5,
    0.5, -0.5,   0.5,
    0.5,  0.5,   0.5

  ])
  gl.bufferData(
    gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW
  )
}

// Fill the buffer with texture coordinates for a plane.
function setTexcoords(gl) {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      0, 0,
      1, 0,
      0, 1,
      0, 1,
      1, 0,
      1, 1

    ]),
    gl.STATIC_DRAW
  )
}



