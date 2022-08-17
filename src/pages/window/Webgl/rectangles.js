import { createShader, createProgram } from './triangles'


export function rectangles(gl) {
  // 创建上下文
  if (!gl) {
    return
  }
  // 顶点着色器源
  const vertexShaderSource = `
          // 一个属性值，从缓冲区获取数据
        attribute vec2 a_position;
        // 添加了一个uniform（全局变量）叫做u_resolution
        //
        uniform vec2 u_resolution;
        
        // 所有的着色器都有一个main函数
        void main() {
    
        // 从像素坐标转换到 0 -> 1
        vec2 zeroToOne = a_position / u_resolution;
     
        // 再把 0->1 转换 0->2
        vec2 zeroToTwo = zeroToOne * 2.0;
     
        // 把 0->2 转换到 -1->+1 (裁剪空间)
        vec2 clipSpace = zeroToTwo - 1.0;
     
        gl_Position = vec4(clipSpace, 0, 1);
        // 需翻转y轴
        // gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
      }
          `
  // 片段着色器
  const fragmentShaderSource = `
        
    
        // 片断着色器没有默认精度，所以我们需要设置一个精度
        // mediump是一个不错的默认值，代表“medium precision”（中等精度）
        precision mediump float;
        uniform vec4 u_color;
        void main() {
        // gl_FragColor 是一个片断着色器主要设置的变量
        // 这里的颜色可参考rgba格式进行设置
        gl_FragColor = u_color;
      }
          `

  // 创建顶点着色器
  const vertexShader = createShader(
    gl, gl.VERTEX_SHADER, vertexShaderSource
  )
  // 创建片段着色器
  const fragmentShader = createShader(
    gl, gl.FRAGMENT_SHADER, fragmentShaderSource
  )

  // 将两个着色器链接在一起
  const program = createProgram(
    gl, vertexShader, fragmentShader
  )


  // 创建好了着色程序，我们还需要对他提供数据
  // glsl着色程序唯一输入是一个属性值a_position，从刚创建的着色程序找到这个属性值所在位置
  // 寻找属性值位置应该在初始化的时候完成，而不是在渲染时完成
  const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')

  // 为了设置它的值我们需要找到它的位置。
  const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution')
  // 找到全局颜色变量的位置
  const colorUniformLocation = gl.getUniformLocation(program, 'u_color')

  // 属性值从缓冲区获取，所以创建一个缓冲
  const positionBuffer = gl.createBuffer()

  // webgl可以通过绑定点操控全局范围内的许多数据，可以吧绑定点想象成一个全局变量
  // 首先绑定一个数据源到绑定点，然后引用绑定点指向该数据源
  // 以下我们绑定位置信息缓冲（下面的绑定点就是ARRAY_BUFFER）
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)




  // 告诉webgl怎样吧提供的gl_Position裁剪空间坐标对应到画布像素坐标（通常画布像素坐标也叫屏幕坐标）
  // 需要调用gl.viewport 方法并传递画布的当前尺寸
  // 这样就告诉webgl裁剪空间的-1=>+1分别对应到X轴的0=>gl.canvas.width 和y轴的 0 -> gl.canvas.height
  gl.viewport(
    0, 0, gl.canvas.width, gl.canvas.height
  )

  // 用0, 0, 0, 0清空画布，分别对应 r, g, b, alpha （红，绿，蓝，阿尔法）值
  gl.clearColor(
    0, 0, 0, 0
  )
  gl.clear(gl.COLOR_BUFFER_BIT)

  // 告诉webgl运行哪个着色程序
  gl.useProgram(program)

  // 告诉webgl怎么从我们之前准备的缓冲中获取数据给着色器中的属性
  // 首先需要启用对应的属性
  gl.enableVertexAttribArray(positionAttributeLocation)

  // 将绑定点绑定到缓冲数据（positionBuffer）
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

  // 告诉属性怎么从positionBuffer中读取数据 (ARRAY_BUFFER)
  const size = 2          // 每次迭代运行提取两个单位数据
  const type = gl.FLOAT   // 每个单位的数据类型是32位浮点型
  const normalize = false // 不需要归一化数据
  const stride = 0        // 0 = 移动单位数量 * 每个单位占用内存（sizeof(type)）每次迭代运行运动多少内存到下一个数据开始点
  const offset = 0        // 从缓冲起始位置开始读取
  // 一个额外的信息是gl.vertexAttribPointer是将属性绑定到当前的ARRAY_BUFFER。
  // 换句话说就是绑定到 positionBuffer上。
  // 这也意味着现在利用绑定点随意将 ARRAY_BUFFER绑定到其它数据上后，该属性依然从positionBuffer上读取数据
  gl.vertexAttribPointer(
    positionAttributeLocation, size, type, normalize, stride, offset
  )

  // 设置全局变量 分辨率
  gl.uniform2f(
    resolutionUniformLocation, gl.canvas.width, gl.canvas.height
  )

  // 绘制50个随机颜色矩形
  for (let ii = 0; ii < 50; ++ii) {
    // 创建一个随机矩形
    // 并将写入位置缓冲
    // 因为位置缓冲是我们绑定在
    // `ARRAY_BUFFER`绑定点上的最后一个缓冲
    setRectangle(
      gl, randomInt(300), randomInt(300), randomInt(300), randomInt(300)
    )

    // 设置一个随机颜色
    gl.uniform4f(
      colorUniformLocation, Math.random(), Math.random(), Math.random(), 1
    )

    // 绘制矩形
    gl.drawArrays(
      gl.TRIANGLES, 0, 6
    )
  }
}

// 返回 0 到 range 范围内的随机整数
function randomInt(range) {
  return Math.floor(Math.random() * range)
}

// 用参数生成矩形顶点并写进缓冲

function setRectangle(
  gl, x, y, width, height
) {
  const x1 = x
  const x2 = x + width
  const y1 = y
  const y2 = y + height

  // 注意: gl.bufferData(gl.ARRAY_BUFFER, ...) 将会影响到
  // 当前绑定点`ARRAY_BUFFER`的绑定缓冲
  // 目前我们只有一个缓冲，如果我们有多个缓冲
  // 我们需要先将所需缓冲绑定到`ARRAY_BUFFER`

  gl.bufferData(
    gl.ARRAY_BUFFER, new Float32Array([
      x1, y1,
      x2, y1,
      x1, y2,
      x1, y2,
      x2, y1,
      x2, y2]), gl.STATIC_DRAW
  )
}

