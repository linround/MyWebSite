"use strict";(self.webpackChunkmy_app_react=self.webpackChunkmy_app_react||[]).push([[793],{5793:function(n,e,r){r.r(e),r.d(e,{default:function(){return u}});var a=r(2791),o=r(7193),t=r(415);function i(n){return Math.floor(Math.random()*n)}function c(n,e,r,a,o){var t=e,i=e+a,c=r,s=r+o;n.bufferData(n.ARRAY_BUFFER,new Float32Array([t,c,i,c,t,s,t,s,i,c,i,s]),n.STATIC_DRAW)}var s=r(184);function u(){var n=(0,a.useRef)(null);return(0,s.jsxs)("div",{children:[(0,s.jsx)("canvas",{className:o.Z.canvasContainer,ref:n,width:400,height:300}),(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{className:o.Z.canvasButton,onClick:function(){!function(n){var e=n.getContext("webgl");if(e){var r=(0,t.ef)(e,e.VERTEX_SHADER,"\n        // \u4e00\u4e2a\u5c5e\u6027\u503c\uff0c\u4ece\u7f13\u51b2\u533a\u83b7\u53d6\u6570\u636e\n        // a_position\u5c5e\u6027\u7684\u6570\u636e\u7c7b\u578b\u662fvec4\n        // vec4\u662f\u4e00\u4e2a\u6709\u56db\u4e2a\u6d6e\u70b9\u6570\u636e\u7684\u6570\u636e\u7c7b\u578b\u3002\n        // \u5728JavaScript\u4e2d\u4f60\u53ef\u4ee5\u628a\u5b83\u60f3\u8c61\u6210 a_position = {x: 0, y: 0, z: 0, w: 0}\u3002\u4e4b\u524d\u6211\u4eec\u8bbe\u7f6e\u7684size = 2\uff0c\n        // \u5c5e\u6027\u9ed8\u8ba4\u503c\u662f0, 0, 0, 1\uff0c\u7136\u540e\u5c5e\u6027\u5c06\u4f1a\u4ece\u7f13\u51b2\u4e2d\u83b7\u53d6\u524d\u4e24\u4e2a\u503c\uff08 x \u548c y \uff09\u3002 z\u548cw\u8fd8\u662f\u9ed8\u8ba4\u503c 0 \u548c 1 \u3002\n        \n        attribute vec4 a_position;\n    \n        // \u6240\u6709\u7684\u7740\u8272\u5668\u90fd\u6709\u4e00\u4e2amain\u51fd\u6570\n        void main() {\n    \n        // gl_Position \u662f\u4e00\u4e2a\u9876\u70b9\u7740\u8272\u5668\u4e3b\u8981\u8bbe\u7f6e\u7684\u53d8\u91cf\n        gl_Position = a_position;\n      }\n          "),a=(0,t.ef)(e,e.FRAGMENT_SHADER,"\n        \n    \n        // \u7247\u65ad\u7740\u8272\u5668\u6ca1\u6709\u9ed8\u8ba4\u7cbe\u5ea6\uff0c\u6240\u4ee5\u6211\u4eec\u9700\u8981\u8bbe\u7f6e\u4e00\u4e2a\u7cbe\u5ea6\n        // mediump\u662f\u4e00\u4e2a\u4e0d\u9519\u7684\u9ed8\u8ba4\u503c\uff0c\u4ee3\u8868\u201cmedium precision\u201d\uff08\u4e2d\u7b49\u7cbe\u5ea6\uff09\n        precision mediump float;\n    \n        void main() {\n        // gl_FragColor \u662f\u4e00\u4e2a\u7247\u65ad\u7740\u8272\u5668\u4e3b\u8981\u8bbe\u7f6e\u7684\u53d8\u91cf\n        // \u8fd9\u91cc\u7684\u989c\u8272\u53ef\u53c2\u8003rgba\u683c\u5f0f\u8fdb\u884c\u8bbe\u7f6e\n        gl_FragColor = vec4(0, 0, 0, 1); // \u8fd4\u56de\u201c\u745e\u8fea\u65bd\u7d2b\u8272\u201d\n      }\n          "),o=(0,t.HO)(e,r,a),i=e.getAttribLocation(o,"a_position"),c=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,c),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,0,1,-1,0,-1,1,0,1,-1,0]),e.STATIC_DRAW),e.viewport(0,0,e.canvas.width,e.canvas.height),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(o),e.enableVertexAttribArray(i),e.bindBuffer(e.ARRAY_BUFFER,c);var s=e.FLOAT;e.vertexAttribPointer(i,2,s,!1,0,0);var u=e.TRIANGLES;e.drawArrays(u,0,6)}}(n.current)},children:"\u7ed8\u5236\u4e09\u89d2\u5f62"}),(0,s.jsx)("div",{className:o.Z.canvasButton,onClick:function(){!function(n){var e=n.getContext("webgl");if(e){var r=(0,t.ST)(e,"\n          // \u4e00\u4e2a\u5c5e\u6027\u503c\uff0c\u4ece\u7f13\u51b2\u533a\u83b7\u53d6\u6570\u636e\n        attribute vec2 a_position;\n        // \u6dfb\u52a0\u4e86\u4e00\u4e2auniform\uff08\u5168\u5c40\u53d8\u91cf\uff09\u53eb\u505au_resolution\n        //\n        uniform vec2 u_resolution;\n        \n        // \u6240\u6709\u7684\u7740\u8272\u5668\u90fd\u6709\u4e00\u4e2amain\u51fd\u6570\n        void main() {\n    \n        // \u4ece\u50cf\u7d20\u5750\u6807\u8f6c\u6362\u5230 0 -> 1\n        vec2 zeroToOne = a_position / u_resolution;\n     \n        // \u518d\u628a 0->1 \u8f6c\u6362 0->2\n        vec2 zeroToTwo = zeroToOne * 2.0;\n     \n        // \u628a 0->2 \u8f6c\u6362\u5230 -1->+1 (\u88c1\u526a\u7a7a\u95f4)\n        vec2 clipSpace = zeroToTwo - 1.0;\n        \n        // \u4ee5\u4e0b\u672a\u7ffb\u8f6c\u7b49\u540c\u4e8e gl_Position = vec4(clipSpace*vec2(1,1), 0, 1);\n        gl_Position = vec4(clipSpace, 0, 1);\n        // \u9700\u7ffb\u8f6cy\u8f74\n        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);\n      }\n          ","\n        \n    \n        // \u7247\u65ad\u7740\u8272\u5668\u6ca1\u6709\u9ed8\u8ba4\u7cbe\u5ea6\uff0c\u6240\u4ee5\u6211\u4eec\u9700\u8981\u8bbe\u7f6e\u4e00\u4e2a\u7cbe\u5ea6\n        // mediump\u662f\u4e00\u4e2a\u4e0d\u9519\u7684\u9ed8\u8ba4\u503c\uff0c\u4ee3\u8868\u201cmedium precision\u201d\uff08\u4e2d\u7b49\u7cbe\u5ea6\uff09\n        precision mediump float;\n    \n        void main() {\n        // gl_FragColor \u662f\u4e00\u4e2a\u7247\u65ad\u7740\u8272\u5668\u4e3b\u8981\u8bbe\u7f6e\u7684\u53d8\u91cf\n        // \u8fd9\u91cc\u7684\u989c\u8272\u53ef\u53c2\u8003rgba\u683c\u5f0f\u8fdb\u884c\u8bbe\u7f6e\n        gl_FragColor = vec4(0, 0, 0, 1); // \u8fd4\u56de\u201c\u745e\u8fea\u65bd\u7d2b\u8272\u201d\n      }\n          "),a=e.getUniformLocation(r,"u_resolution"),o=e.getAttribLocation(r,"a_position"),i=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,i),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,0,100,100,100,100,100,100,0,0,0]),e.STATIC_DRAW),e.viewport(0,0,e.canvas.width,e.canvas.height),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(r),e.enableVertexAttribArray(o),e.bindBuffer(e.ARRAY_BUFFER,i);var c=e.FLOAT;e.vertexAttribPointer(o,2,c,!1,0,0),e.uniform2f(a,e.canvas.width,e.canvas.height);var s=e.TRIANGLES;e.drawArrays(s,0,6)}}(n.current)},children:"\u7ed8\u5236\u77e9\u5f62"}),(0,s.jsx)("div",{className:o.Z.canvasButton,onClick:function(){!function(n){if(n){var e=(0,t.ST)(n,"\n          // \u4e00\u4e2a\u5c5e\u6027\u503c\uff0c\u4ece\u7f13\u51b2\u533a\u83b7\u53d6\u6570\u636e\n        attribute vec2 a_position;\n        // \u6dfb\u52a0\u4e86\u4e00\u4e2auniform\uff08\u5168\u5c40\u53d8\u91cf\uff09\u53eb\u505au_resolution\n        uniform vec2 u_resolution;\n        \n        // \u6240\u6709\u7684\u7740\u8272\u5668\u90fd\u6709\u4e00\u4e2amain\u51fd\u6570\n        void main() {\n    \n        // \u4ece\u50cf\u7d20\u5750\u6807\u8f6c\u6362\u5230 0 -> 1\n        vec2 zeroToOne = a_position / u_resolution;\n     \n        // \u518d\u628a 0->1 \u8f6c\u6362 0->2\n        vec2 zeroToTwo = zeroToOne * 2.0;\n     \n        // \u628a 0->2 \u8f6c\u6362\u5230 -1->+1 (\u88c1\u526a\u7a7a\u95f4)\n        vec2 clipSpace = zeroToTwo - 1.0;\n     \n        gl_Position = vec4(clipSpace, 0, -1);\n        // \u9700\u7ffb\u8f6cy\u8f74\n        // gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);\n      }\n          ","\n        \n    \n        // \u7247\u65ad\u7740\u8272\u5668\u6ca1\u6709\u9ed8\u8ba4\u7cbe\u5ea6\uff0c\u6240\u4ee5\u6211\u4eec\u9700\u8981\u8bbe\u7f6e\u4e00\u4e2a\u7cbe\u5ea6\n        // mediump\u662f\u4e00\u4e2a\u4e0d\u9519\u7684\u9ed8\u8ba4\u503c\uff0c\u4ee3\u8868\u201cmedium precision\u201d\uff08\u4e2d\u7b49\u7cbe\u5ea6\uff09\n        precision mediump float;\n        uniform vec4 u_color;\n        void main() {\n        // gl_FragColor \u662f\u4e00\u4e2a\u7247\u65ad\u7740\u8272\u5668\u4e3b\u8981\u8bbe\u7f6e\u7684\u53d8\u91cf\n        // \u8fd9\u91cc\u7684\u989c\u8272\u53ef\u53c2\u8003rgba\u683c\u5f0f\u8fdb\u884c\u8bbe\u7f6e\n        gl_FragColor = u_color;\n      }\n          "),r=n.getAttribLocation(e,"a_position"),a=n.getUniformLocation(e,"u_resolution"),o=n.getUniformLocation(e,"u_color"),s=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,s),n.viewport(0,0,n.canvas.width,n.canvas.height),n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT),n.useProgram(e),n.enableVertexAttribArray(r),n.bindBuffer(n.ARRAY_BUFFER,s);var u=n.FLOAT;n.vertexAttribPointer(r,2,u,!1,0,0),n.uniform2f(a,n.canvas.width,n.canvas.height);for(var l=0;l<50;++l)c(n,i(300),i(300),i(300),i(300)),n.uniform4f(o,Math.random(),Math.random(),Math.random(),1),n.drawArrays(n.TRIANGLES,0,6)}}(n.current.getContext("webgl"))},children:"\u7ed8\u523650\u4e2a\u77e9\u5f62"})]})]})}},415:function(n,e,r){function a(n,e,r){var a=n.createShader(e);if(n.shaderSource(a,r),n.compileShader(a),n.getShaderParameter(a,n.COMPILE_STATUS))return a;console.log("getShaderInfoLog",n.getShaderInfoLog(a)),n.deleteShader(a)}function o(n,e,r){var a=n.createProgram();if(n.attachShader(a,e),n.attachShader(a,r),n.linkProgram(a),n.getProgramParameter(a,n.LINK_STATUS))return a;console.log(n.getProgramInfoLog(a)),n.deleteProgram(a)}function t(n,e,r){return o(n,a(n,n.VERTEX_SHADER,e),a(n,n.FRAGMENT_SHADER,r))}r.d(e,{ef:function(){return a},HO:function(){return o},ST:function(){return t},lw:function(){return i},Sz:function(){return c}});var i={normal:[0,0,0,0,1,0,0,0,0],gaussianBlur:[.045,.122,.045,.122,.332,.122,.045,.122,.045],gaussianBlur2:[1,2,1,2,4,2,1,2,1],gaussianBlur3:[0,1,0,1,1,1,0,1,0],unsharpen:[-1,-1,-1,-1,9,-1,-1,-1,-1],sharpness:[0,-1,0,-1,5,-1,0,-1,0],sharpen:[-1,-1,-1,-1,16,-1,-1,-1,-1],edgeDetect:[-.125,-.125,-.125,-.125,1,-.125,-.125,-.125,-.125],edgeDetect2:[-1,-1,-1,-1,8,-1,-1,-1,-1],edgeDetect3:[-5,0,0,0,0,0,0,0,5],edgeDetect4:[-1,-1,-1,0,0,0,1,1,1],edgeDetect5:[-1,-1,-1,2,2,2,-1,-1,-1],edgeDetect6:[-5,-5,-5,-5,39,-5,-5,-5,-5],sobelHorizontal:[1,2,1,0,0,0,-1,-2,-1],sobelVertical:[1,0,-1,2,0,-2,1,0,-1],previtHorizontal:[1,1,1,0,0,0,-1,-1,-1],previtVertical:[1,0,-1,1,0,-1,1,0,-1],boxBlur:[.111,.111,.111,.111,.111,.111,.111,.111,.111],triangleBlur:[.0625,.125,.0625,.125,.25,.125,.0625,.125,.0625],emboss:[-2,-1,0,-1,1,1,0,1,2]},c=[{name:"gaussianBlur3",on:!0},{name:"gaussianBlur3",on:!0},{name:"gaussianBlur3",on:!0},{name:"sharpness"},{name:"sharpness"},{name:"sharpness"},{name:"sharpen"},{name:"sharpen"},{name:"sharpen"},{name:"unsharpen"},{name:"unsharpen"},{name:"unsharpen"},{name:"emboss",on:!0},{name:"edgeDetect"},{name:"edgeDetect"},{name:"edgeDetect3"},{name:"edgeDetect3"}]},7193:function(n,e){e.Z={canvasContainer:"canvasContainer_AroEJ",canvasUi:"canvasUi_B_Bta",canvasButton:"canvasButton_l2P0H"}}}]);
//# sourceMappingURL=793.327cd565.chunk.js.map