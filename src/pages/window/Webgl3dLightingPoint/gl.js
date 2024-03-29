import { createProgramFromStrings } from '../webglCommon'
import m4 from '../webglCommon/m4'

export function render(canvas) {
  const gl = canvas.getContext('webgl')
  if (!gl) {
    return
  }
  const vertexShaderSource = `
    // 顶点坐标
    attribute vec4 a_position;
    // 顶点法向量
    attribute vec3 a_normal;
    
    // 光源位置
    uniform vec3 u_lightWorldPosition;
    // 相机位置
    uniform vec3 u_viewWorldPosition;
    
    
    // 世界的矩阵（可能发生旋转）
    uniform mat4 u_world;
    
    uniform mat4 u_worldViewProjection;
    uniform mat4 u_worldInverseTranspose;
    
    varying vec3 v_normal;
    
    varying vec3 v_surfaceToLight;
    varying vec3 v_surfaceToView;
    
    void main() {
      // MVP矩阵乘以顶点坐标 得到新的坐标位置
      gl_Position = u_worldViewProjection * a_position;
    
      // 旋转矩阵本身乘以法向量 得到旋转后的法向量
      v_normal = mat3(u_worldInverseTranspose) * a_normal;
    
      // 世界发生了旋转 所以顶点坐标需要乘以旋转矩阵 得到世界空间中新的顶点坐标
      vec3 surfaceWorldPosition = (u_world * a_position).xyz;
    
      // 世界空间中 (点光源与点的向量值)  旋转的时候 点光源位置在世界空间是不变的
      v_surfaceToLight = u_lightWorldPosition - surfaceWorldPosition;
    
      // 世界空间中观察（相机与点的向量值） 旋转的时候 相机位置在世界空间是不变的
      v_surfaceToView = u_viewWorldPosition - surfaceWorldPosition;
      
    }
  `
  const fragmentShaderSource = `
    precision mediump float;
    //处理光线变化太过急促
    uniform float u_shininess;
    // 设置光照颜色
    uniform vec3 u_lightColor;
    
    // 实现聚光灯
    uniform vec3 u_lightDirection;  // 聚光灯方向
    uniform float u_limit;          // 在点乘空间中
    
    // 顶点的法向量
    varying vec3 v_normal;
    // 顶点到光源的向量
    varying vec3 v_surfaceToLight;
    // 顶点到相机的向量
    varying vec3 v_surfaceToView;
    // 全局设置顶点的颜色
    uniform vec4 u_color;
    
    void main() {
      // 对法向量进行归一化处理
      vec3 normal = normalize(v_normal);
    
      vec3 surfaceToLightDirection = normalize(v_surfaceToLight);
      vec3 surfaceToViewDirection = normalize(v_surfaceToView);
      vec3 halfVector = normalize(surfaceToLightDirection + surfaceToViewDirection);
    
      // 求得每一个顶点的光照值
      // float light = dot(normal, surfaceToLightDirection);
      
      // 光照会有反射
      float specular = 0.0;
      // 光到表面点的向量 乘以指定的聚光灯方向（可以得到两者之间的夹角）
      float dotFromDirection = dot(surfaceToLightDirection, -u_lightDirection);
      float inLight = step(u_limit, dotFromDirection);
      float light = inLight * dot(normal, surfaceToLightDirection);
      specular = inLight * pow(dot(normal, halfVector), u_shininess);
      gl_FragColor = u_color;
    
      // 通过光照值调整颜色
      gl_FragColor.rgb *= light * u_lightColor;
    
      // 调整之后的颜色信息加上反射的光照值，即可得到新的光照值
      gl_FragColor.rgb += specular;
    }
  `
  const program = createProgramFromStrings(
    gl, vertexShaderSource, fragmentShaderSource
  )

  const positionLocation = gl.getAttribLocation(program, 'a_position')
  const normalLocation = gl.getAttribLocation(program, 'a_normal')
  const shininessLocation = gl.getUniformLocation(program, 'u_shininess')
  const lightColorLocation =
    gl.getUniformLocation(program, 'u_lightColor')
  const worldViewProjectionLocation = gl.getUniformLocation(program, 'u_worldViewProjection')
  const worldInverseTransposeLocation = gl.getUniformLocation(program, 'u_worldInverseTranspose')
  const colorLocation = gl.getUniformLocation(program, 'u_color')
  const lightWorldPositionLocation =
    gl.getUniformLocation(program, 'u_lightWorldPosition')
  const viewWorldPositionLocation =
    gl.getUniformLocation(program, 'u_viewWorldPosition')
  const worldLocation =
    gl.getUniformLocation(program, 'u_world')

  // 顶点坐标
  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  setGeometry(gl)

  // 法向量
  const normalBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer)
  setNormals(gl)


  function degToRad(d) {
    return d * Math.PI / 180
  }

  const fieldOfViewRadians = degToRad(60)
  let fRotationRadians = 0


  gl.useProgram(program)
  gl.uniform4fv(colorLocation, [0.8, 0.5, 0.4, 1]) // 顶点颜色
  // 设置光照颜色
  gl.uniform3fv(lightColorLocation, m4.normalize([0.5, 0.5, 0.3]))  // 红光
  let shininess = 2  // 缓和光强
  gl.uniform1f(shininessLocation, shininess)

  const lightDirection = [0, 0, -1]
  let limit = 160
  const lightDirectionLocation = gl.getUniformLocation(program, 'u_lightDirection')
  const limitLocation = gl.getUniformLocation(program, 'u_limit')
  gl.uniform3fv(lightDirectionLocation, lightDirection)
  gl.uniform1f(limitLocation, Math.cos(degToRad(limit)))

  drawScene()
  function updateLimit(ui) {
    limit = ui.value
    gl.uniform1f(limitLocation, Math.cos(degToRad(limit)))
    drawScene()
  }
  function updateShininess(ui) {
    shininess = ui.value
    gl.uniform1f(shininessLocation, shininess)
    drawScene()
  }

  function updateRotation(ui) {
    fRotationRadians = degToRad(ui.value)
    drawScene()
  }
  return {
    updateRotation,
    updateShininess,
    updateLimit,
  }
  function drawScene() {

    gl.viewport(
      0, 0, gl.canvas.width, gl.canvas.height
    )
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.enable(gl.CULL_FACE)
    gl.enable(gl.DEPTH_TEST)

    gl.enableVertexAttribArray(positionLocation)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    let size = 3
    let type = gl.FLOAT
    let normalize = false
    let stride = 0
    let offset = 0
    gl.vertexAttribPointer(
      positionLocation, size, type, normalize, stride, offset
    )


    gl.enableVertexAttribArray(normalLocation)
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer)
    size = 3
    type = gl.FLOAT
    normalize = false
    stride = 0
    offset = 0
    gl.vertexAttribPointer(
      normalLocation, size, type, normalize, stride, offset
    )

    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
    const zNear = 1
    const zFar = 2000

    // 透视投影空间矩阵 对观察空间中的点进行裁剪
    const projectionMatrix = m4.perspective(
      fieldOfViewRadians, aspect, zNear, zFar
    )

    const camera = [100, 150, 200]
    const target = [0, 35, 0]
    const up = [0, 1, 0]
    // 观察空间矩阵 这个矩阵描述了相机空间在世界空间中的位置，通过这个矩阵可以将相机空间转换为世界空间矩阵
    const cameraMatrix = m4.lookAt(
      camera, target, up
    )

    // cameraMatrix 该矩阵是为了将相机空间中的点转换到世界空间中
    // 因此求cameraMatrix的逆矩阵，就可以得到将世界空间转换到观察空间的 观察矩阵
    const viewMatrix = m4.inverse(cameraMatrix)

    // 将世界空间中的点传递到观察空间后，还需要进行裁剪，以便该点是在视锥体中
    const viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix)

    // 这里添加了一个世界空间旋转矩阵
    const worldMatrix = m4.yRotation(fRotationRadians)

    // 得到最终的MVP矩阵
    const worldViewProjectionMatrix = m4.multiply(viewProjectionMatrix, worldMatrix)

    // 旋转矩阵的逆
    const worldInverseMatrix = m4.inverse(worldMatrix)
    // 旋转矩阵逆的转置就是矩阵本身
    const worldInverseTransposeMatrix = m4.transpose(worldInverseMatrix)

    // 这只MVP矩阵（）
    gl.uniformMatrix4fv(
      worldViewProjectionLocation, false, worldViewProjectionMatrix
    )
    gl.uniformMatrix4fv(
      worldInverseTransposeLocation, false, worldInverseTransposeMatrix
    )
    gl.uniformMatrix4fv(
      worldLocation, false, worldMatrix
    )
    // 光线位置
    gl.uniform3fv(lightWorldPositionLocation, [-90, 30, 60])

    gl.uniform3fv(viewWorldPositionLocation, camera)

    const  primitiveType = gl.TRIANGLES
    offset = 0
    const  count = 16 * 6
    gl.drawArrays(
      primitiveType, offset, count
    )
  }
}

// F 顶点坐标
function setGeometry(gl) {
  const positions = new Float32Array([
    // left column front
    0,   0,  0,
    0, 150,  0,
    30,   0,  0,
    0, 150,  0,
    30, 150,  0,
    30,   0,  0,

    // top rung front
    30,   0,  0,
    30,  30,  0,
    100,   0,  0,
    30,  30,  0,
    100,  30,  0,
    100,   0,  0,

    // middle rung front
    30,  60,  0,
    30,  90,  0,
    67,  60,  0,
    30,  90,  0,
    67,  90,  0,
    67,  60,  0,

    // left column back
    0,   0,  30,
    30,   0,  30,
    0, 150,  30,
    0, 150,  30,
    30,   0,  30,
    30, 150,  30,

    // top rung back
    30,   0,  30,
    100,   0,  30,
    30,  30,  30,
    30,  30,  30,
    100,   0,  30,
    100,  30,  30,

    // middle rung back
    30,  60,  30,
    67,  60,  30,
    30,  90,  30,
    30,  90,  30,
    67,  60,  30,
    67,  90,  30,

    // top
    0,   0,   0,
    100,   0,   0,
    100,   0,  30,
    0,   0,   0,
    100,   0,  30,
    0,   0,  30,

    // top rung right
    100,   0,   0,
    100,  30,   0,
    100,  30,  30,
    100,   0,   0,
    100,  30,  30,
    100,   0,  30,

    // under top rung
    30,   30,   0,
    30,   30,  30,
    100,  30,  30,
    30,   30,   0,
    100,  30,  30,
    100,  30,   0,

    // between top rung and middle
    30,   30,   0,
    30,   60,  30,
    30,   30,  30,
    30,   30,   0,
    30,   60,   0,
    30,   60,  30,

    // top of middle rung
    30,   60,   0,
    67,   60,  30,
    30,   60,  30,
    30,   60,   0,
    67,   60,   0,
    67,   60,  30,

    // right of middle rung
    67,   60,   0,
    67,   90,  30,
    67,   60,  30,
    67,   60,   0,
    67,   90,   0,
    67,   90,  30,

    // bottom of middle rung.
    30,   90,   0,
    30,   90,  30,
    67,   90,  30,
    30,   90,   0,
    67,   90,  30,
    67,   90,   0,

    // right of bottom
    30,   90,   0,
    30,  150,  30,
    30,   90,  30,
    30,   90,   0,
    30,  150,   0,
    30,  150,  30,

    // bottom
    0,   150,   0,
    0,   150,  30,
    30,  150,  30,
    0,   150,   0,
    30,  150,  30,
    30,  150,   0,

    // left side
    0,   0,   0,
    0,   0,  30,
    0, 150,  30,
    0,   0,   0,
    0, 150,  30,
    0, 150,   0])

  // Center the F around the origin and Flip it around. We do this because
  // we're in 3D now with and +Y is up where as before when we started with 2D
  // we had +Y as down.

  // We could do by changing all the values above but I'm lazy.
  // We could also do it with a matrix at draw time but you should
  // never do stuff at draw time if you can do it at init time.
  let matrix = m4.xRotation(Math.PI)
  matrix = m4.translate(
    matrix, -50, -75, -15
  )

  for (let ii = 0; ii < positions.length; ii += 3) {
    const vector = m4.transformPoint(matrix, [positions[ii + 0], positions[ii + 1], positions[ii + 2], 1])
    positions[ii + 0] = vector[0]
    positions[ii + 1] = vector[1]
    positions[ii + 2] = vector[2]
  }

  gl.bufferData(
    gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW
  )
}

function setNormals(gl) {
  const normals = new Float32Array([
    // left column front
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,

    // top rung front
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,

    // middle rung front
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,

    // left column back
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,

    // top rung back
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,

    // middle rung back
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,

    // top
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,

    // top rung right
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    // under top rung
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,

    // between top rung and middle
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    // top of middle rung
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,

    // right of middle rung
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    // bottom of middle rung.
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,

    // right of bottom
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    // bottom
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,

    // left side
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0])
  gl.bufferData(
    gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW
  )
}
