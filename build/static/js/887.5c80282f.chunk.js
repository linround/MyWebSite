"use strict";(self.webpackChunkmy_app_react=self.webpackChunkmy_app_react||[]).push([[887],{2887:function(t,s,e){e.r(s),e.d(s,{default:function(){return l}});var h=e(5671),i=e(3144),n=e(9340),a=e(4062),r=e(2791),o=e(184),l=function(t){(0,n.Z)(e,t);var s=(0,a.Z)(e);function e(t){var i;return(0,h.Z)(this,e),(i=s.call(this,t)).ref=(0,r.createRef)(),i}return(0,i.Z)(e,[{key:"componentDidMount",value:function(){var t,s=function(){function t(s,e,i){(0,h.Z)(this,t),this.b=1.9*Math.random()+.1,this.x0=s,this.y0=e,this.a=2*Math.random()*Math.PI,this.x1=this.x0+i*Math.cos(this.a),this.y1=this.y0+i*Math.sin(this.a),this.l=i}return(0,i.Z)(t,[{key:"update",value:function(t,s){this.x0=t,this.y0=s,this.a=Math.atan2(this.y1-this.y0,this.x1-this.x0),this.x1=this.x0+this.l*Math.cos(this.a),this.y1=this.y0+this.l*Math.sin(this.a)}}]),t}(),e=function(){function t(e,i,n,a,r,o){(0,h.Z)(this,t),this.res="l"===o?n/2:n/r,this.type=o,this.l=n,this.segm=[],this.segm.push(new s(e,i,this.l/this.res));for(var l=1;l<this.res;l++)this.segm.push(new s(this.segm[l-1].x1,this.segm[l-1].y1,this.l/this.res));this.b=a}return(0,i.Z)(t,[{key:"update",value:function(t){this.segm[0].update(t.x,t.y);for(var s=1;s<this.res;s++)this.segm[s].update(this.segm[s-1].x1,this.segm[s-1].y1)}},{key:"show",value:function(){if("l"===this.type){n.beginPath();for(var t=0;t<this.segm.length;t++)n.lineTo(this.segm[t].x0,this.segm[t].y0);n.lineTo(this.segm[this.segm.length-1].x1,this.segm[this.segm.length-1].y1),n.strokeStyle="white",n.lineWidth=this.b,n.stroke(),n.beginPath(),n.arc(this.segm[0].x0,this.segm[0].y0,1,0,2*Math.PI),n.fillStyle="white",n.fill(),n.beginPath(),n.arc(this.segm[this.segm.length-1].x1,this.segm[this.segm.length-1].y1,2,0,2*Math.PI),n.fillStyle="white",n.fill()}else{for(var s=0;s<this.segm.length;s++)n.beginPath(),n.arc(this.segm[s].x0,this.segm[s].y0,this.segm[s].b,0,2*Math.PI),n.fillStyle="white",n.fill();n.beginPath(),n.arc(this.segm[this.segm.length-1].x1,this.segm[this.segm.length-1].y1,2,0,2*Math.PI),n.fillStyle="white",n.fill()}}}]),t}(),n=null===(t=this.ref.current)||void 0===t?void 0:t.getContext("2d"),a=this.ref.current;a.width=500,a.height=500;for(var r=500,o=500,l=[],u={},g={},f=[],m={x:r/2,y:o/2},y={},c=0,x=[],d="l",M=0;M<100;M++)d=Math.random()>.25?"l":"o",l.push(new e(r/2,o/2,500*(1*Math.random()+.5),.4*Math.random()+.1,15*Math.random()+5,d)),f.push(2*Math.random()-1),x.push(0);function p(){window.requestAnimationFrame(p),n.clearRect(0,0,r,o),function(){u.x?(m.errx=u.x-m.x,m.erry=u.y-m.y):(m.errx=r/2+(o/2-10)*Math.sqrt(2)*Math.cos(c)/(Math.pow(Math.sin(c),2)+1)-m.x,m.erry=o/2+(o/2-10)*Math.sqrt(2)*Math.cos(c)*Math.sin(c)/(Math.pow(Math.sin(c),2)+1)-m.y),m.x+=m.errx/10,m.y+=m.erry/10,c+=.01;for(var t=0;t<l.length;t++)f[t]>0?x[t]+=(1-f[t])/10:x[t]+=(-1-f[t])/10,l[t].update({x:m.x+(50*f[t]*Math.cos(2*t*Math.PI)/l.length+x[t]),y:m.y+(50*f[t]*Math.sin(2*t*Math.PI)/l.length+x[t])}),l[t].show();y.x=m.x,y.y=m.y}()}a.addEventListener("mousemove",(function(t){g.x=u.x,g.y=u.y,u.x=t.pageX-this.offsetLeft,u.y=t.pageY-this.offsetTop}),!1),a.addEventListener("mouseleave",(function(){u.x=!1,u.y=!1})),window.addEventListener("resize",(function(){r=500,o=500,p()})),p()}},{key:"render",value:function(){return(0,o.jsx)("div",{className:"canvas-container",children:(0,o.jsx)("canvas",{ref:this.ref})})}}]),e}(r.Component)}}]);
//# sourceMappingURL=887.5c80282f.chunk.js.map