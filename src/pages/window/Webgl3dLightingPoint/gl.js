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
    //
    uniform mat4 u_worldViewProjection;
    uniform mat4 u_worldInverseTranspose;
    
    varying vec3 v_normal;
    
    varying vec3 v_surfaceToLight;
    varying vec3 v_surfaceToView;
    
    void main() {
      // Multiply the position by the matrix.
      gl_Position = u_worldViewProjection * a_position;
    
      // orient the normals and pass to the fragment shader
      v_normal = mat3(u_worldInverseTranspose) * a_normal;
    
      // compute the world position of the surfoace
      vec3 surfaceWorldPosition = (u_world * a_position).xyz;
    
      // compute the vector of the surface to the light
      // and pass it to the fragment shader
      v_surfaceToLight = u_lightWorldPosition - surfaceWorldPosition;
    
      // compute the vector of the surface to the view/camera
      // and pass it to the fragment shader
      v_surfaceToView = u_viewWorldPosition - surfaceWorldPosition;
    }
  `
  const fragmentShaderSource = `
    precision mediump float;
  
    // Passed in from the vertex shader.
    varying vec3 v_normal;
    varying vec3 v_surfaceToLight;
    varying vec3 v_surfaceToView;
    
    uniform vec4 u_color;
    
    void main() {
      // because v_normal is a varying it's interpolated
      // so it will not be a unit vector. Normalizing it
      // will make it a unit vector again
      vec3 normal = normalize(v_normal);
    
      vec3 surfaceToLightDirection = normalize(v_surfaceToLight);
      vec3 surfaceToViewDirection = normalize(v_surfaceToView);
      vec3 halfVector = normalize(surfaceToLightDirection + surfaceToViewDirection);
    
      float light = dot(normal, surfaceToLightDirection);
      float specular = dot(normal, halfVector);
    
      gl_FragColor = u_color;
    
      // Lets multiply just the color portion (not the alpha)
      // by the light
      gl_FragColor.rgb *= light;
    
      // Just add in the specular
      gl_FragColor.rgb += specular;
    }
  `
  // setup GLSL program
  const program = createProgramFromStrings(
    gl, vertexShaderSource, fragmentShaderSource
  )

  // look up where the vertex data needs to go.
  const positionLocation = gl.getAttribLocation(program, 'a_position')
  const normalLocation = gl.getAttribLocation(program, 'a_normal')

  // lookup uniforms
  const worldViewProjectionLocation = gl.getUniformLocation(program, 'u_worldViewProjection')
  const worldInverseTransposeLocation = gl.getUniformLocation(program, 'u_worldInverseTranspose')
  const colorLocation = gl.getUniformLocation(program, 'u_color')
  const lightWorldPositionLocation =
    gl.getUniformLocation(program, 'u_lightWorldPosition')
  const viewWorldPositionLocation =
    gl.getUniformLocation(program, 'u_viewWorldPosition')
  const worldLocation =
    gl.getUniformLocation(program, 'u_world')

  // Create a buffer to put positions in
  const positionBuffer = gl.createBuffer()
  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  // Put geometry data into buffer
  setGeometry(gl)

  // Create a buffer to put normals in
  const normalBuffer = gl.createBuffer()
  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = normalBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer)
  // Put normals data into buffer
  setNormals(gl)


  function degToRad(d) {
    return d * Math.PI / 180
  }

  const fieldOfViewRadians = degToRad(60)
  let fRotationRadians = 0

  drawScene()

  function updateRotation(ui) {
    fRotationRadians = degToRad(ui.value)
    drawScene()
  }
  return {
    updateRotation,
  }
  // Draw the scene.
  function drawScene() {

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(
      0, 0, gl.canvas.width, gl.canvas.height
    )

    // Clear the canvas AND the depth buffer.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    // Turn on culling. By default backfacing triangles
    // will be culled.
    gl.enable(gl.CULL_FACE)

    // Enable the depth buffer
    gl.enable(gl.DEPTH_TEST)

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program)

    // Turn on the position attribute
    gl.enableVertexAttribArray(positionLocation)

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    let size = 3          // 3 components per iteration
    let type = gl.FLOAT   // the data is 32bit floats
    let normalize = false // don't normalize the data
    let stride = 0        // 0 = move forward size * sizeof(type) each iteration to get the next position
    let offset = 0        // start at the beginning of the buffer
    gl.vertexAttribPointer(
      positionLocation, size, type, normalize, stride, offset
    )

    // Turn on the normal attribute
    gl.enableVertexAttribArray(normalLocation)

    // Bind the normal buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer)

    // Tell the attribute how to get data out of normalBuffer (ARRAY_BUFFER)
    size = 3          // 3 components per iteration
    type = gl.FLOAT   // the data is 32bit floating point values
    normalize = false // normalize the data (convert from 0-255 to 0-1)
    stride = 0        // 0 = move forward size * sizeof(type) each iteration to get the next position
    offset = 0        // start at the beginning of the buffer
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

    // Set the color to use
    gl.uniform4fv(colorLocation, [0.2, 1, 0.2, 1]) // green

    // set the light position
    gl.uniform3fv(lightWorldPositionLocation, [20, 30, 60])

    // set the camera/view position
    gl.uniform3fv(viewWorldPositionLocation, camera)

    // Draw the geometry.
    const  primitiveType = gl.TRIANGLES
    offset = 0
    const  count = 16 * 6
    gl.drawArrays(
      primitiveType, offset, count
    )
  }
}

// Fill the buffer with the values that define a letter 'F'.
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