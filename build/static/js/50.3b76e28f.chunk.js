"use strict";(self.webpackChunkmy_app_react=self.webpackChunkmy_app_react||[]).push([[50],{1050:function(n,e,a){a.r(e),a.d(e,{default:function(){return c}});var t=a(885),r=a(2791),o=a(7193),i=a(415);function u(n){var e=n.getContext("webgl");if(e){var a=(0,i.ST)(e,"\n      // \u5b58\u50a8\u4e09\u89d2\u5f62\u7684\u9876\u70b9\u6570\u636e\n      attribute vec2 a_position;\n      // \u5b58\u50a8\u6620\u5c04\u7a7a\u95f4\u7684\u5bbd\u9ad8\u6570\u636e\n      uniform vec2 u_resolution;\n      // \u8bbe\u7f6e\u65cb\u8f6c\u7684\u89d2\u5ea6\n      uniform vec2 u_rotation;\n      // \u9876\u70b9\u7684\u4f4d\u79fb\u4fe1\u606f\n      uniform vec2 u_translation;\n      // \u7f29\u653e\u503c\n      uniform vec2 u_scale;\n      void main() {\n         // \u65cb\u8f6c\u4f4d\u7f6e\n         vec2 rotatedPosition = vec2(\n           a_position.x * u_rotation.y + a_position.y * u_rotation.x,\n           a_position.y * u_rotation.y - a_position.x * u_rotation.x);\n           // \u5bf9\u65cb\u8f6c\u540e\u7684\u5750\u6807\u8fdb\u884c\u7f29\u653e\n           vec2 scaledPosition = rotatedPosition * u_scale;\n         // \u4f4d\u7f6e=\u539f\u6765\u7684\u4f4d\u7f6e\u4fe1\u606f+\u4f4d\u7f6e\u4fe1\u606f\n         vec2 position = scaledPosition + u_translation;\n      \n         // \u5c06\u56fe\u50cf\u4fe1\u606f\u5f52\u4e00\u5316\u5230\u88c1\u526a\u7a7a\u95f4 \u5373\u4f4d\u7f6e\u4fe1\u606f/\u5bbd\u9ad8\u4fe1\u606f \u8f6c\u6362\u5230\uff080\uff0c1\uff09\u8303\u56f4\n         vec2 zeroToOne = position / u_resolution;\n      \n         // \u4ece\uff080\uff0c1\uff09=> \uff080\uff0c2\uff09\n         vec2 zeroToTwo = zeroToOne * 2.0;\n      \n         // \u4ece 0->2 to -1->+1 (\u88c1\u526a\u7a7a\u95f4)\n         vec2 clipSpace = zeroToTwo - 1.0;\n         // \u6700\u7ec8\u5f97\u5230\u88c1\u526a\u7a7a\u95f4\u7684\u9876\u70b9\u5750\u6807\u503c\uff0c\u5e76\u4e14\u5bf9y\u8f74\u505a\u4e86\u53cd\u8f6c\n         gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);\n      }\n  ","\n      precision mediump float;\n      // \u7247\u5143\u7684\u989c\u8272\u503c\n      uniform vec4 u_color;\n      \n      void main() {\n         gl_FragColor = u_color;\n      }\n  ");e.useProgram(a);var t=e.getAttribLocation(a,"a_position"),r=e.getUniformLocation(a,"u_scale"),o=e.getUniformLocation(a,"u_rotation"),u=e.getUniformLocation(a,"u_resolution"),s=e.getUniformLocation(a,"u_color"),c=e.getUniformLocation(a,"u_translation"),l=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,l),function(n){n.bufferData(n.ARRAY_BUFFER,new Float32Array([0,0,30,0,0,150,0,150,30,0,30,150,30,0,100,0,30,30,30,30,100,0,100,30,30,60,67,60,30,90,30,90,67,60,67,90]),n.STATIC_DRAW)}(e);var v=[0,0],f=[0,1],m=[1,1],g=[Math.random(),Math.random(),Math.random(),1];return d(),function(n,e,a){n&&(v[0]=n[0],v[1]=n[1]),e&&(f[0]=e[0],f[1]=e[1]),a&&(m[0]=a[0],m[1]=a[1]),d()}}function d(){e.viewport(0,0,e.canvas.width,e.canvas.height),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(a),e.enableVertexAttribArray(t),e.bindBuffer(e.ARRAY_BUFFER,l);var n=e.FLOAT,i=0;e.vertexAttribPointer(t,2,n,!1,0,i),e.uniform2f(u,e.canvas.width,e.canvas.height),e.uniform4fv(s,g),e.uniform2fv(r,m),e.uniform2fv(c,v),e.uniform2fv(o,f);var d=e.TRIANGLES;i=0;e.drawArrays(d,i,18)}}var s=a(184);function c(){var n=(0,r.useRef)(null),e=(0,r.useState)(0),a=(0,t.Z)(e,2),i=a[0],c=a[1],l=(0,r.useState)(0),v=(0,t.Z)(l,2),f=v[0],m=v[1],g=(0,r.useState)(0),d=(0,t.Z)(g,2),h=d[0],p=d[1],_=(0,r.useState)(50),S=(0,t.Z)(_,2),x=S[0],A=S[1],B={update:function(){return{}}},P=(0,r.useState)(B),T=(0,t.Z)(P,2),R=T[0],b=T[1];(0,r.useEffect)((function(){var n=Math.sin(+h/360*Math.PI*2),e=Math.cos(+h/360*Math.PI*2);R.update([+f,+i],[n,e],[+x/50,+x/50])}),[i,f,h,x]);return(0,s.jsxs)("div",{children:[(0,s.jsx)("canvas",{className:o.Z.canvasContainer,ref:n,width:400,height:300}),(0,s.jsxs)("div",{children:[(0,s.jsxs)("div",{children:["X\uff1a",(0,s.jsx)("input",{type:"range",max:400,min:0,onChange:function(n){var e=n.target.value;m(e)},value:f})]}),(0,s.jsxs)("div",{children:["Y\uff1a",(0,s.jsx)("input",{type:"range",max:300,min:0,onChange:function(n){var e=n.target.value;c(e)},value:i})]}),(0,s.jsxs)("div",{children:["\u65cb\u8f6c\uff1a",(0,s.jsx)("input",{type:"range",max:360,min:0,onChange:function(n){var e=n.target.value;p(e)},value:h})]}),(0,s.jsxs)("div",{children:["\u7f29\u653e\uff1a",(0,s.jsx)("input",{type:"range",max:100,min:0,onChange:function(n){var e=n.target.value;A(+e)},value:x})]}),(0,s.jsx)("div",{className:o.Z.canvasButton,onClick:function(){var e=u(n.current);B.update=e,b({update:e})},children:"\u7ed8\u5236\u56fe\u5f62"})]})]})}},415:function(n,e,a){function t(n,e,a){var t=n.createShader(e);if(n.shaderSource(t,a),n.compileShader(t),n.getShaderParameter(t,n.COMPILE_STATUS))return t;console.log("getShaderInfoLog",n.getShaderInfoLog(t)),n.deleteShader(t)}function r(n,e,a){var t=n.createProgram();if(n.attachShader(t,e),n.attachShader(t,a),n.linkProgram(t),n.getProgramParameter(t,n.LINK_STATUS))return t;console.log(n.getProgramInfoLog(t)),n.deleteProgram(t)}function o(n,e,a){return r(n,t(n,n.VERTEX_SHADER,e),t(n,n.FRAGMENT_SHADER,a))}a.d(e,{ef:function(){return t},HO:function(){return r},ST:function(){return o},lw:function(){return i},Sz:function(){return u}});var i={normal:[0,0,0,0,1,0,0,0,0],gaussianBlur:[.045,.122,.045,.122,.332,.122,.045,.122,.045],gaussianBlur2:[1,2,1,2,4,2,1,2,1],gaussianBlur3:[0,1,0,1,1,1,0,1,0],unsharpen:[-1,-1,-1,-1,9,-1,-1,-1,-1],sharpness:[0,-1,0,-1,5,-1,0,-1,0],sharpen:[-1,-1,-1,-1,16,-1,-1,-1,-1],edgeDetect:[-.125,-.125,-.125,-.125,1,-.125,-.125,-.125,-.125],edgeDetect2:[-1,-1,-1,-1,8,-1,-1,-1,-1],edgeDetect3:[-5,0,0,0,0,0,0,0,5],edgeDetect4:[-1,-1,-1,0,0,0,1,1,1],edgeDetect5:[-1,-1,-1,2,2,2,-1,-1,-1],edgeDetect6:[-5,-5,-5,-5,39,-5,-5,-5,-5],sobelHorizontal:[1,2,1,0,0,0,-1,-2,-1],sobelVertical:[1,0,-1,2,0,-2,1,0,-1],previtHorizontal:[1,1,1,0,0,0,-1,-1,-1],previtVertical:[1,0,-1,1,0,-1,1,0,-1],boxBlur:[.111,.111,.111,.111,.111,.111,.111,.111,.111],triangleBlur:[.0625,.125,.0625,.125,.25,.125,.0625,.125,.0625],emboss:[-2,-1,0,-1,1,1,0,1,2]},u=[{name:"gaussianBlur3",on:!0},{name:"gaussianBlur3",on:!0},{name:"gaussianBlur3",on:!0},{name:"sharpness"},{name:"sharpness"},{name:"sharpness"},{name:"sharpen"},{name:"sharpen"},{name:"sharpen"},{name:"unsharpen"},{name:"unsharpen"},{name:"unsharpen"},{name:"emboss",on:!0},{name:"edgeDetect"},{name:"edgeDetect"},{name:"edgeDetect3"},{name:"edgeDetect3"}]},7193:function(n,e){e.Z={canvasContainer:"canvasContainer_AroEJ",canvasUi:"canvasUi_B_Bta",canvasButton:"canvasButton_l2P0H"}}}]);
//# sourceMappingURL=50.3b76e28f.chunk.js.map