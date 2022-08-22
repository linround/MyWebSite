

// 创建着色器方法，输入参数：渲染上下文，着色器类型，数据源
export function createShader(
  gl, type, source
) {
  const shader = gl.createShader(type) // 创建着色器对象
  gl.shaderSource(shader, source) // 提供数据源
  gl.compileShader(shader) // 编译 -> 生成着色器
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (success) {
    return shader
  }

  console.log('getShaderInfoLog', gl.getShaderInfoLog(shader))
  gl.deleteShader(shader)
}


// 然后我们将这两个着色器 link（链接）到一个 program（着色程序）
export function createProgram(
  gl, vertexShader, fragmentShader
) {
  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  const success = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (success) {
    return program
  }

  console.log(gl.getProgramInfoLog(program))
  gl.deleteProgram(program)
}

export function createProgramFromStrings(
  gl, vertexShaderSource, fragmentShaderSource
) {
// 创建顶点着色器
  const vertexShader = createShader(
    gl, gl.VERTEX_SHADER, vertexShaderSource
  )
  // 创建片段着色器
  const fragmentShader = createShader(
    gl, gl.FRAGMENT_SHADER, fragmentShaderSource
  )
  // 将两个着色器链接在一起
  return createProgram(
    gl, vertexShader, fragmentShader
  )
}




// 定义卷积核
export const kernels = {
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


export const effects = [
  { name: 'gaussianBlur3', on: true, },
  { name: 'gaussianBlur3', on: true, },
  { name: 'gaussianBlur3', on: true, },
  { name: 'sharpness', },
  { name: 'sharpness', },
  { name: 'sharpness', },
  { name: 'sharpen', },
  { name: 'sharpen', },
  { name: 'sharpen', },
  { name: 'unsharpen', },
  { name: 'unsharpen', },
  { name: 'unsharpen', },
  { name: 'emboss', on: true, },
  { name: 'edgeDetect', },
  { name: 'edgeDetect', },
  { name: 'edgeDetect3', },
  { name: 'edgeDetect3', }
]
