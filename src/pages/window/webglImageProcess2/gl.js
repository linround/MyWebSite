import { createProgramFromStrings } from '../webglCommon'
// eslint-disable-next-line no-duplicate-imports
import { kernels, effects } from '../webglCommon'

export function render(
  canvas, image, ui
) {
  // Get A WebGL context
  const vertexShaderSource = `
  // 一个buffer缓存区，存储大小为图片宽高
  attribute vec2 a_position;
  // 一个纹理缓冲区
  attribute vec2 a_texCoord;
  // 一个全局变量 内容为图片的宽高
  uniform vec2 u_resolution;
  uniform float u_flipY;
  
  varying vec2 v_texCoord;
  
  void main() {
     // convert the rectangle from pixels to 0.0 to 1.0
     // 将矩形
     vec2 zeroToOne = a_position / u_resolution;
  
     // convert from 0->1 to 0->2
     vec2 zeroToTwo = zeroToOne * 2.0;
  
     // convert from 0->2 to -1->+1 (clipspace)
     vec2 clipSpace = zeroToTwo - 1.0;
  
     gl_Position = vec4(clipSpace * vec2(1, u_flipY), 0, 1);
  
     // pass the texCoord to the fragment shader
     // The GPU will interpolate this value between points.
     v_texCoord = a_texCoord;
  }
  `
  const fragmentShaderSource = `
  precision mediump float;

  // our texture
  uniform sampler2D u_image;
  uniform vec2 u_textureSize;
  uniform float u_kernel[9];
  uniform float u_kernelWeight;
  
  // the texCoords passed in from the vertex shader.
  varying vec2 v_texCoord;
  
  void main() {
     vec2 onePixel = vec2(1.0, 1.0) / u_textureSize;
     vec4 colorSum =
         texture2D(u_image, v_texCoord + onePixel * vec2(-1, -1)) * u_kernel[0] +
         texture2D(u_image, v_texCoord + onePixel * vec2( 0, -1)) * u_kernel[1] +
         texture2D(u_image, v_texCoord + onePixel * vec2( 1, -1)) * u_kernel[2] +
         texture2D(u_image, v_texCoord + onePixel * vec2(-1,  0)) * u_kernel[3] +
         texture2D(u_image, v_texCoord + onePixel * vec2( 0,  0)) * u_kernel[4] +
         texture2D(u_image, v_texCoord + onePixel * vec2( 1,  0)) * u_kernel[5] +
         texture2D(u_image, v_texCoord + onePixel * vec2(-1,  1)) * u_kernel[6] +
         texture2D(u_image, v_texCoord + onePixel * vec2( 0,  1)) * u_kernel[7] +
         texture2D(u_image, v_texCoord + onePixel * vec2( 1,  1)) * u_kernel[8] ;
     gl_FragColor = vec4((colorSum / u_kernelWeight).rgb, 1);
  }
  `
  const gl = canvas.getContext('webgl')
  if (!gl) {
    return
  }

  // 启动一个着色器程序
  const program = createProgramFromStrings(
    gl, vertexShaderSource, fragmentShaderSource
  )

  // 找到程序中的位置变量和纹理变量
  const positionLocation = gl.getAttribLocation(program, 'a_position')
  const texcoordLocation = gl.getAttribLocation(program, 'a_texCoord')

  // Create a buffer to put three 2d clip space points in
  const positionBuffer = gl.createBuffer()
  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  // Set a rectangle the same size as the image.
  setRectangle(
    gl, 0, 0, image.width, image.height
  )

  // provide texture coordinates for the rectangle.
  const texcoordBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer)
  gl.bufferData(
    gl.ARRAY_BUFFER, new Float32Array([
      0.0,  0.0,
      1.0,  0.0,
      0.0,  1.0,
      0.0,  1.0,
      1.0,  0.0,
      1.0,  1.0
    ]), gl.STATIC_DRAW
  )

  function createAndSetupTexture(gl) {
    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)

    // Set up texture so we can render any size image and so we are
    // working with pixels.
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
    return texture
  }

  // Create a texture and put the image in it.
  const originalImageTexture = createAndSetupTexture(gl)
  gl.texImage2D(
    gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image
  )

  // create 2 textures and attach them to framebuffers.
  const textures = []
  const framebuffers = []
  for (let ii = 0; ii < 2; ++ii) {
    const texture = createAndSetupTexture(gl)
    textures.push(texture)

    // make the texture the same size as the image
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA, image.width, image.height, 0,
      gl.RGBA, gl.UNSIGNED_BYTE, null
    )

    // Create a framebuffer
    const fbo = gl.createFramebuffer()
    framebuffers.push(fbo)
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)

    // Attach a texture to it.
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0
    )
  }

  // lookup uniforms
  const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
  const textureSizeLocation = gl.getUniformLocation(program, 'u_textureSize')
  const kernelLocation = gl.getUniformLocation(program, 'u_kernel[0]')
  const kernelWeightLocation = gl.getUniformLocation(program, 'u_kernelWeight')
  const flipYLocation = gl.getUniformLocation(program, 'u_flipY')



  // Setup a ui.
  const table = document.createElement('table')
  const tbody = document.createElement('tbody')
  for (let ii = 0; ii < effects.length; ++ii) {
    const effect = effects[ii]
    const tr = document.createElement('tr')
    const td = document.createElement('td')
    const chk = document.createElement('input')
    chk.value = effect.name
    chk.type = 'checkbox'
    if (effect.on) {
      chk.checked = 'true'
    }
    chk.onchange = drawEffects
    td.appendChild(chk)
    td.appendChild(document.createTextNode('≡ ' + effect.name))
    tr.appendChild(td)
    tbody.appendChild(tr)
  }
  table.appendChild(tbody)
  ui.appendChild(table)

  function computeKernelWeight(kernel) {
    const weight = kernel.reduce(function(prev, curr) {
      return prev + curr
    })
    return weight <= 0 ? 1 : weight
  }

  function drawEffects() {

    // Clear the canvas
    gl.clearColor(
      0, 0, 0, 0
    )
    gl.clear(gl.COLOR_BUFFER_BIT)

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program)

    // Turn on the position attribute
    gl.enableVertexAttribArray(positionLocation)

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    let size = 2          // 2 components per iteration
    let type = gl.FLOAT   // the data is 32bit floats
    let normalize = false // don't normalize the data
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
    size = 2         // 2 components per iteration
    type = gl.FLOAT  // the data is 32bit floats
    normalize = false// don't normalize the data
    stride = 0    // 0 = move forward size * sizeof(type) each iteration to get the next position
    offset = 0        // start at the beginning of the buffer
    gl.vertexAttribPointer(
      texcoordLocation, size, type, normalize, stride, offset
    )

    // set the size of the image
    gl.uniform2f(
      textureSizeLocation, image.width, image.height
    )

    // start with the original image
    gl.bindTexture(gl.TEXTURE_2D, originalImageTexture)

    // don't y flip images while drawing to the textures
    gl.uniform1f(flipYLocation, 1)

    // loop through each effect we want to apply.
    let count = 0
    for (let ii = 0; ii < tbody.rows.length; ++ii) {
      const checkbox = tbody.rows[ii].firstChild.firstChild
      if (checkbox.checked) {
        // Setup to draw into one of the framebuffers.
        setFramebuffer(
          framebuffers[count % 2], image.width, image.height
        )

        drawWithKernel(checkbox.value)

        // for the next draw, use the texture we just rendered to.
        gl.bindTexture(gl.TEXTURE_2D, textures[count % 2])

        // increment count so we use the other texture next time.
        count += 1
      }
    }

    // finally draw the result to the canvas.
    gl.uniform1f(flipYLocation, -1)  // need to y flip for canvas
    setFramebuffer(
      null, gl.canvas.width, gl.canvas.height
    )
    drawWithKernel('normal')
  }

  function setFramebuffer(
    fbo, width, height
  ) {
    // make this the framebuffer we are rendering to.
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)

    // Tell the shader the resolution of the framebuffer.
    gl.uniform2f(
      resolutionLocation, width, height
    )

    // Tell webgl the viewport setting needed for framebuffer.
    gl.viewport(
      0, 0, width, height
    )
  }


  function drawWithKernel(name) {
    // set the kernel and it's weight
    gl.uniform1fv(kernelLocation, kernels[name])
    gl.uniform1f(kernelWeightLocation, computeKernelWeight(kernels[name]))

    // Draw the rectangle.
    const primitiveType = gl.TRIANGLES
    const offset = 0
    const count = 6
    gl.drawArrays(
      primitiveType, offset, count
    )
  }
}

function setRectangle(
  gl, x, y, width, height
) {
  const x1 = x
  const x2 = x + width
  const y1 = y
  const y2 = y + height
  gl.bufferData(
    gl.ARRAY_BUFFER, new Float32Array([
      x1, y1,
      x2, y1,
      x1, y2,
      x1, y2,
      x2, y1,
      x2, y2
    ]), gl.STATIC_DRAW
  )
}

