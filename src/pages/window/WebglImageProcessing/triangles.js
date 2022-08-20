import { createProgramFromStrings } from '../webglCommon'

export function triangles(canvas, image) {
  // Get A WebGL context
  const gl = canvas.getContext('webgl')
  if (!gl) {
    return
  }
  const vertexShaderSource = `
        attribute vec2 a_position;
        attribute vec2 a_texCoord;
        
        uniform vec2 u_resolution;
        
        varying vec2 v_texCoord;
        
        void main() {
           // convert the rectangle from pixels to 0.0 to 1.0
           vec2 zeroToOne = a_position / u_resolution;
        
           // convert from 0->1 to 0->2
           vec2 zeroToTwo = zeroToOne * 2.0;
        
           // convert from 0->2 to -1->+1 (clipspace)
           vec2 clipSpace = zeroToTwo - 1.0;
        
           gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
        
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
  // setup GLSL program
  const program = createProgramFromStrings(
    gl, vertexShaderSource, fragmentShaderSource
  )

  // look up where the vertex data needs to go.
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

  // Create a texture.
  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)

  // Set the parameters so we can render any size image.
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

  // Upload the image into the texture.
  gl.texImage2D(
    gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image
  )

  // lookup uniforms
  const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
  const textureSizeLocation = gl.getUniformLocation(program, 'u_textureSize')
  const kernelLocation = gl.getUniformLocation(program, 'u_kernel[0]')
  const kernelWeightLocation = gl.getUniformLocation(program, 'u_kernelWeight')

  // Define several convolution kernels
  const kernels = {
    normal: [
      0, 0, 0,
      0, 1, 0,
      0, 0, 0
    ],
    gaussianBlur: [
      0.045, 0.122, 0.045,
      0.122, 0.332, 0.122,
      0.045, 0.122, 0.045
    ],
    gaussianBlur2: [
      1, 2, 1,
      2, 4, 2,
      1, 2, 1
    ],
    gaussianBlur3: [
      0, 1, 0,
      1, 1, 1,
      0, 1, 0
    ],
    unsharpen: [
      -1, -1, -1,
      -1,  9, -1,
      -1, -1, -1
    ],
    sharpness: [
      0, -1, 0,
      -1, 5, -1,
      0, -1, 0
    ],
    sharpen: [
      -1, -1, -1,
      -1, 16, -1,
      -1, -1, -1
    ],
    edgeDetect: [
      -0.125, -0.125, -0.125,
      -0.125,  1,     -0.125,
      -0.125, -0.125, -0.125
    ],
    edgeDetect2: [
      -1, -1, -1,
      -1,  8, -1,
      -1, -1, -1
    ],
    edgeDetect3: [
      -5, 0, 0,
      0, 0, 0,
      0, 0, 5
    ],
    edgeDetect4: [
      -1, -1, -1,
      0,  0,  0,
      1,  1,  1
    ],
    edgeDetect5: [
      -1, -1, -1,
      2,  2,  2,
      -1, -1, -1
    ],
    edgeDetect6: [
      -5, -5, -5,
      -5, 39, -5,
      -5, -5, -5
    ],
    sobelHorizontal: [
      1,  2,  1,
      0,  0,  0,
      -1, -2, -1
    ],
    sobelVertical: [
      1,  0, -1,
      2,  0, -2,
      1,  0, -1
    ],
    previtHorizontal: [
      1,  1,  1,
      0,  0,  0,
      -1, -1, -1
    ],
    previtVertical: [
      1,  0, -1,
      1,  0, -1,
      1,  0, -1
    ],
    boxBlur: [
      0.111, 0.111, 0.111,
      0.111, 0.111, 0.111,
      0.111, 0.111, 0.111
    ],
    triangleBlur: [
      0.0625, 0.125, 0.0625,
      0.125,  0.25,  0.125,
      0.0625, 0.125, 0.0625
    ],
    emboss: [
      -2, -1,  0,
      -1,  1,  1,
      0,  1,  2
    ],
  }
  const initialSelection = 'edgeDetect2'

  // Setup UI to pick kernels.
  const ui = document.querySelector('#ui')
  const select = document.createElement('select')
  for (const name in kernels) {
    const option = document.createElement('option')
    option.value = name
    if (name === initialSelection) {
      option.selected = true
    }
    option.appendChild(document.createTextNode(name))
    select.appendChild(option)
  }
  select.onchange = function() {
    drawWithKernel(this.options[this.selectedIndex].value)
  }
  ui.appendChild(select)
  drawWithKernel(initialSelection)

  function computeKernelWeight(kernel) {
    const weight = kernel.reduce(function(prev, curr) {
      return prev + curr
    })
    return weight <= 0 ? 1 : weight
  }

  function drawWithKernel(name) {

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(
      0, 0, gl.canvas.width, gl.canvas.height
    )

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
    size = 2          // 2 components per iteration
    type = gl.FLOAT   // the data is 32bit floats
    normalize = false // don't normalize the data
    stride = 0       // 0 = move forward size * sizeof(type) each iteration to get the next position
    offset = 0        // start at the beginning of the buffer
    gl.vertexAttribPointer(
      texcoordLocation, size, type, normalize, stride, offset
    )

    // set the resolution
    gl.uniform2f(
      resolutionLocation, gl.canvas.width, gl.canvas.height
    )

    // set the size of the image
    gl.uniform2f(
      textureSizeLocation, image.width, image.height
    )

    // set the kernel and it's weight
    gl.uniform1fv(kernelLocation, kernels[name])
    gl.uniform1f(kernelWeightLocation, computeKernelWeight(kernels[name]))

    // Draw the rectangle.
    const primitiveType = gl.TRIANGLES
    offset = 0
    const  count = 6
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



