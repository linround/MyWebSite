
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

const zDepth = 20

export function render(canvas) {
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
  const program = createProgramFromStrings(
    gl, v, f
  )

  const positionLocation = gl.getAttribLocation(program, 'a_position')
  const texcoordLocation = gl.getAttribLocation(program, 'a_texcoord')

  const matrixLocation = gl.getUniformLocation(program, 'u_matrix')
  const textureLocation = gl.getUniformLocation(program, 'u_texture')
  /**
   * todo
   *
   *
   */
  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  setGeometry(gl)

  const texcoordBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer)
  setTexcoords(gl)

  // Create a texture with different colored mips
  const mipTexture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, mipTexture)
  const c = document.createElement('canvas')
  const ctx = c.getContext('2d')
  const mips = [
    { size: 64, color: 'rgb(128,0,255)', },
    { size: 32, color: 'rgb(0,0,255)', },
    { size: 16, color: 'rgb(255,0,0)', },
    { size: 8, color: 'rgb(255,255,0)', },
    { size: 4, color: 'rgb(0,255,0)', },
    { size: 2, color: 'rgb(0,255,255)', },
    { size: 1, color: 'rgb(255,0,255)', }
  ]
  mips.forEach(function(s, level) {
    const size = s.size
    c.width = size
    c.height = size
    ctx.fillStyle = 'rgb(255,255,255)'
    ctx.fillRect(
      0, 0, size, size
    )
    ctx.fillStyle = s.color
    ctx.fillRect(
      0, 0, size / 2, size / 2
    )
    ctx.fillRect(
      size / 2, size / 2, size / 2, size / 2
    )
    // 这里设置了多层纹理
    gl.texImage2D(
      gl.TEXTURE_2D, level, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, c
    )
  })

  // 創建紋理
  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)
  // 使用1x1的像素填充纹理
  gl.texImage2D(
    gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 255, 255])
  )

  const image = new Image()
  image.src = imgTexture
  image.addEventListener('load', function() {
    // 将图片数据放到纹理上
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image
    )
    gl.texParameteri(
      gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE
    )


    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
      gl.generateMipmap(gl.TEXTURE_2D)
    } else {
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
    drawScene()
  })

  const textures = [
    texture,
    mipTexture
  ]
  let textureIndex = 0

  function update() {
    textureIndex = (textureIndex + 1) % textures.length
    drawScene()
  }
  function isPowerOf2(value) {
    return (value & (value - 1)) === 0
  }


  function degToRad(d) {
    return d * Math.PI / 180
  }

  const fieldOfViewRadians = degToRad(60)

  drawScene()
  return {
    update,
  }
  // Draw the scene.
  function drawScene() {

    gl.viewport(
      0, 0, gl.canvas.width, gl.canvas.height
    )

    gl.enable(gl.CULL_FACE)
    gl.enable(gl.DEPTH_TEST)

    gl.clearColor(
      0, 0, 0, 1
    )
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    gl.useProgram(program)

    gl.enableVertexAttribArray(positionLocation)

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)


    let size = 3
    let type = gl.FLOAT
    let  normalize = false
    let  stride = 0
    let offset = 0
    gl.vertexAttribPointer(
      positionLocation, size, type, normalize, stride, offset
    )


    gl.enableVertexAttribArray(texcoordLocation)


    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer)


    size = 2
    type = gl.FLOAT
    normalize = false
    stride = 0
    offset = 0
    gl.vertexAttribPointer(
      texcoordLocation, size, type, normalize, stride, offset
    )

    // 计算透视矩阵
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
    const zNear  = 1
    const zFar   = 2000
    const projectionMatrix =
      m4.perspective(
        fieldOfViewRadians, aspect, zNear, zFar
      )

    const cameraPosition = [0, 0, 2]
    const up = [0, 1, 0]
    const target = [0, 0, 0]

    const cameraMatrix = m4.lookAt(
      cameraPosition, target, up
    )

    const viewMatrix = m4.inverse(cameraMatrix)

    const viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix)

    const settings = [
      { x: -1, y: 1, zRot: 0, magFilter: gl.NEAREST, minFilter: gl.NEAREST,                 },
      { x: 0, y: 1, zRot: 0, magFilter: gl.LINEAR,  minFilter: gl.LINEAR,                  },
      { x: 1, y: 1, zRot: 0, magFilter: gl.LINEAR,  minFilter: gl.NEAREST_MIPMAP_NEAREST,  },
      { x: -1, y: -1, zRot: 1, magFilter: gl.LINEAR,  minFilter: gl.LINEAR_MIPMAP_NEAREST,   },
      { x: 0, y: -1, zRot: 1, magFilter: gl.LINEAR,  minFilter: gl.NEAREST_MIPMAP_LINEAR,   },
      { x: 1, y: -1, zRot: 1, magFilter: gl.LINEAR,  minFilter: gl.LINEAR_MIPMAP_LINEAR,    }
    ]
    const xSpacing = 1.2
    const ySpacing = 0.7
    settings.forEach(function(s) {
      gl.bindTexture(gl.TEXTURE_2D, textures[textureIndex])
      gl.texParameteri(
        gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, s.minFilter
      )
      gl.texParameteri(
        gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, s.magFilter
      )

      let matrix = m4.translate(
        viewProjectionMatrix, s.x * xSpacing, s.y * ySpacing, -zDepth * 0.5
      )
      matrix = m4.zRotate(matrix, s.zRot * Math.PI)
      matrix = m4.scale(
        matrix, 1, 1, zDepth
      )

      // 根据不同图像的需求 设置不同的矩阵
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
  }
}

// Fill the buffer with the values that define a plane.
function setGeometry(gl) {
  const positions = new Float32Array([
    -0.5,  0.5, -0.5,
    0.5,  0.5, -0.5,
    -0.5,  0.5,  0.5,
    -0.5,  0.5,  0.5,
    0.5,  0.5, -0.5,
    0.5,  0.5,  0.5

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
      0, zDepth,
      0, zDepth,
      1, 0,
      1, zDepth

    ]),
    gl.STATIC_DRAW
  )
}




