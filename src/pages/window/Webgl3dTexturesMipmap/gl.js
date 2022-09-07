
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

  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  setGeometry(gl)

  const texcoordBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer)
  // 纹理坐标与顶点坐标映射关系
  setTexcoords(gl)

  let framebufferWidth   // set at render time
  let framebufferHeight  // set at render time
  /**
   * 首先创建一个 framebuffer
   * 然后创建这个 fbTexture 的纹理
   * 设置 fbTexture 纹理参数
   * 将 framebuffer 绑定到绑定点 将 fbTexture 纹理数据填充到 framebuffer
   */
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

  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)
  // 使用1x1的蓝色像素填充默认纹理
  gl.texImage2D(
    gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
    new Uint8Array([150, 166, 245, 255])
  )
  const image = new Image()
  image.src = imgTexture

  /**
   * todo
   * 这里异步加载完成后 会使用图像数据替换之前的纹理缓冲
   */
  image.addEventListener('load', function() {
    // 图片加载完成后，对之前的纹理进行覆盖
    gl.bindTexture(gl.TEXTURE_2D, texture)
    // 使用image 数据进行纹理填充
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image
    )

    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
      // 对于是2的n次幂的图像，可以使用mipmap（贴图）
      gl.generateMipmap(gl.TEXTURE_2D)
    } else {
      /**
       * todo
       *  对于非2的n次幂的图像
       */
      // 水平方向不重复，使用边缘像素拉伸
      gl.texParameteri(
        gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE
      )
      // 水平方向不重复，使用边缘像素拉伸
      gl.texParameteri(
        gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE
      )
      // 使用线性插值的方式进行像素渲染
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

  const fieldOfViewRadians = degToRad(90)
  const modelXRotationRadians = degToRad(0)
  const modelYRotationRadians = degToRad(0)

  requestAnimationFrame(drawScene)

  function drawScene(t) {
    const time = t * 0.001


    framebufferWidth = gl.canvas.clientWidth
    framebufferHeight = gl.canvas.clientHeight
    /**
     * todo
     * 这里重新设置了 fbTexture 纹理数据
      */
    gl.bindTexture(gl.TEXTURE_2D, fbTexture)
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA, framebufferWidth, framebufferHeight,
      0, gl.RGBA, gl.UNSIGNED_BYTE, null
    )

    // 再次将绑定点 绑定到了 framebuffer
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
    gl.viewport(
      0, 0, framebufferWidth, framebufferHeight
    )

    gl.clearColor(
      0, 0, 0, 1
    )
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

    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
    const zNear  = 1
    const zFar   = 2000
    const projectionMatrix =
      m4.perspective(
        fieldOfViewRadians, aspect, zNear, zFar
      )

    // z 表示了
    const settings = [
      // 纹理坐标不依赖于分辨率，但可以是任何浮点值，因此 OpenGL 必须确定哪个纹理像素（也称为纹素)
      // 设置为GL_NEAREST时，OpenGL 选择中心最接近纹理坐标的纹素
      { x: -1, y: -3, z: -30, filter: gl.NEAREST,               },
      // GL_LINEAR（也称为(双)线性滤波) 从纹理坐标的相邻纹素中获取一个插值，近似于纹素之间的颜色
      { x: 0, y: -3, z: -30, filter: gl.LINEAR,                },
      { x: 1, y: -3, z: -30, filter: gl.NEAREST_MIPMAP_LINEAR, },
      { x: -1, y: -1, z: -10, filter: gl.NEAREST,               },
      { x: 0, y: -1, z: -10, filter: gl.LINEAR,                },
      { x: 1, y: -1, z: -10, filter: gl.NEAREST_MIPMAP_LINEAR, },
      { x: -1, y: 1, z: 0, filter: gl.NEAREST,               },
      { x: 0, y: 1, z: 1, filter: gl.LINEAR,                },
      { x: 1, y: 1, z: 2, filter: gl.LINEAR_MIPMAP_NEAREST, }
    ]
    const xSpacing = 1.2
    const ySpacing = 0.7
    /**
     * 以下 在一帧内渲染了六个图像
     * 通过偏移旋转 缩放的方式得到六个不同的图像
     */
    settings.forEach(function(s) {
      const z = -5 + s.z // Math.cos(time * 0.3) * zDistance - zDistance;
      const r = Math.abs(z) * Math.sin(fieldOfViewRadians * 0.5)
      const x = Math.sin(time)
      const y = Math.cos(time)
      const r2 = 1 + (r * 0.2)
      /**
       * todo
       * 将texture缓冲区  b绑定到纹理绑定点
       * 设置纹理映射的关系
       */
      gl.bindTexture(gl.TEXTURE_2D, texture)
      // 水平
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

      gl.uniformMatrix4fv(
        matrixLocation, false, matrix
      )

      // 这个与多级纹理相关
      // 以下设置表示 始终使用第一层纹理
      gl.uniform1i(textureLocation, 0)
      //
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
      [
        2, 0, 0, 0,
        0, 2, 0, 0,
        0, 0, 2, 0,
        0, 0, 0, 1]
    )

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.drawArrays(
      gl.TRIANGLES, 0, 1 * 6
    )

    requestAnimationFrame(drawScene)
  }
}


function setGeometry(gl) {
  const positions = new Float32Array([
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



