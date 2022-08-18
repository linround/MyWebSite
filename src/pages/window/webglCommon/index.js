

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
