
import { createProgramFromStrings } from '../webglCommon'

/**
 * tips
 * 纹理图片必须是 2 的 n 次方的方阵
 * 以下是 256*256 的图片纹理
 *
 * 纹理范围
 */
import imgTexture from '../webglCommon/noodles.jpg'




export function render(canvas) {
  const gl = canvas.getContext('webgl')
  if (!gl) {
    return
  }
  const v =  `
    attribute vec4 a_position;
    attribute vec2 a_texcoord;
    
    uniform mat4 u_matrix;
    
    varying vec2 v_texcoord;
    
    void main() {
      gl_Position = a_position;
    
      // 传入给片元的纹理坐标点
      v_texcoord = a_texcoord;
    }
  `
  const f = `
    precision mediump float;
  
    varying vec2 v_texcoord;
    
    uniform sampler2D u_texture;
    
    void main() {
       // 从对应的层级采集 对应的纹理坐标的颜色 默认就是从第0层采集  即 u_texture = 0
       gl_FragColor = texture2D(u_texture, v_texcoord);
    }
  `
  const program = createProgramFromStrings(
    gl, v, f
  )

  const positionLocation = gl.getAttribLocation(program, 'a_position')
  const texcoordLocation = gl.getAttribLocation(program, 'a_texcoord')

  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  setGeometry(gl)

  const texcoordBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer)
  setTexcoords(gl)

  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)
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
  })

  function isPowerOf2(value) {
    return (value & (value - 1)) === 0
  }



  requestAnimationFrame(drawScene)

  function drawScene() {

    gl.viewport(
      0, 0, gl.canvas.width, gl.canvas.height
    )

    gl.enable(gl.CULL_FACE)
    gl.enable(gl.DEPTH_TEST)


    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    gl.useProgram(program)

    gl.enableVertexAttribArray(positionLocation)

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    let size = 3
    let type = gl.FLOAT
    let  normalize = false
    let stride = 0
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




    gl.drawArrays(
      gl.TRIANGLES, 0, 6 * 6
    )

    requestAnimationFrame(drawScene)
  }
}

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

function setTexcoords(gl) {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      // select the top left image
      0, 0,
      0, 0.5,
      0.25, 0,
      0, 0.5,
      0.25, 0.5,
      0.25, 0,
      // select the top middle image
      0.25, 0,
      0.5, 0,
      0.25, 0.5,
      0.25, 0.5,
      0.5, 0,
      0.5, 0.5,
      // select to top right image
      0.5, 0,
      0.5, 0.5,
      0.75, 0,
      0.5, 0.5,
      0.75, 0.5,
      0.75, 0,
      // select the bottom left image
      0, 0.5,
      0.25, 0.5,
      0, 1,
      0, 1,
      0.25, 0.5,
      0.25, 1,
      // select the bottom middle image
      0.25, 0.5,
      0.25, 1,
      0.5, 0.5,
      0.25, 1,
      0.5, 1,
      0.5, 0.5,
      // select the bottom right image
      0.5, 0.5,
      0.75, 0.5,
      0.5, 1,
      0.5, 1,
      0.75, 0.5,
      0.75, 1

    ]),
    gl.STATIC_DRAW
  )
}




