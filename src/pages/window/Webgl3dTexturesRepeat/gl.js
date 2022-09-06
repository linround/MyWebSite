import webglUtils from '../webglCommon/webgl-utils'
import m4 from '../webglCommon/m4'
import { createProgramFromStrings } from '../webglCommon'
import imgTexture from '../webglCommon/texture.png'
const v = `
  attribute vec4 a_position;
  attribute vec2 a_texcoord;
  
  uniform mat4 u_matrix;
  
  varying vec2 v_texcoord;
  
  void main() {
    gl_Position = u_matrix * a_position;
  
    // 将纹理坐标传递给 片元着色器
    v_texcoord = a_texcoord;
  }
`
const f = `
  precision mediump float;
  
  varying vec2 v_texcoord;
  
  // 一个纹理采样器
  uniform sampler2D u_texture;
  
  void main() {
     // 使用纹理采样器，采取颜色进行插值
     gl_FragColor = texture2D(u_texture, v_texcoord);
  }
`

export function render(canvas) {
  const gl = canvas.getContext('webgl', { antialias: false, })
  if (!gl) {
    return
  }

  const program = createProgramFromStrings(
    gl, v, f
  )

  const positionLocation = gl.getAttribLocation(program, 'a_position')
  const texcoordLocation = gl.getAttribLocation(program, 'a_texcoord')
  const matrixLocation = gl.getUniformLocation(program, 'u_matrix')

  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  setGeometry(gl)

  const texcoordBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer)
  setTexcoords(gl)

  /**
   * todo
   * 1.这里默认使用普通的颜色去填充纹理缓冲区间
   * 2.当图片加载完成后，使用图片纹理去填充纹理缓冲区见
   */
  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([255, 2, 255, 255])
  )
  function isPowerOf2(value) {
    return (value & (value - 1)) === 0
  }
  const image = new Image()
  image.src = imgTexture
  image.addEventListener('load', function() {
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image
    )
    //
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

  let wrapS = gl.CLAMP_TO_EDGE
  let wrapT = gl.CLAMP_TO_EDGE

  function change(value, type) {
    if (type === 'T') {
      wrapT = gl[value]
    } else {
      wrapS = gl[value]
    }
    drawScene()
  }


  drawScene()
  return {
    change,
  }

  function drawScene() {
    webglUtils.resizeCanvasToDisplaySize(gl.canvas)

    gl.viewport(
      0, 0, gl.canvas.width, gl.canvas.height
    )

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    gl.enable(gl.CULL_FACE)
    gl.enable(gl.DEPTH_TEST)
    // 缩放
    const tsize = 200
    // 平移
    const x = (gl.canvas.clientWidth / 2) - (tsize / 2)
    const y = gl.canvas.clientHeight - tsize - 60

    gl.useProgram(program)

    gl.enableVertexAttribArray(positionLocation)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    let size = 3
    let  type = gl.FLOAT
    let  normalize = false
    let  stride = 0
    let  offset = 0
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

    // Compute the projection matrix
    const projectionMatrix =
      m4.orthographic(
        0, gl.canvas.clientWidth, gl.canvas.clientHeight, 0, -1, 1
      )

    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(
      gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST
    )
    // 纹理水平填充
    gl.texParameteri(
      gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS
    )
    gl.texParameteri(
      gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT
    )
    let matrix = m4.translate(
      projectionMatrix, x, y, 0
    )
    matrix = m4.scale(
      matrix, tsize, tsize, 1
    )

    gl.uniformMatrix4fv(
      matrixLocation, false, matrix
    )


    gl.drawArrays(
      gl.TRIANGLES, 0, 1 * 6
    )
  }
}

function setGeometry(gl) {
  const positions = new Float32Array([
    -0.5,  0.5,  0.5,
    0.5,  0.5,  0.5,
    -0.5, -0.5,  0.5,
    -0.5, -0.5,  0.5,
    0.5,  0.5,  0.5,
    0.5, -0.5,  0.5
  ])
  gl.bufferData(
    gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW
  )
}

function setTexcoords(gl) {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    // 描述了纹理坐标对应的三角形
    new Float32Array([
      -2, -1,
      2, -1,
      -2,  4,
      -2,  4,
      2, -1,
      2,  4
    ]),
    gl.STATIC_DRAW
  )
}




