(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(e,t,n){e.exports=n(32)},22:function(e,t,n){},24:function(e,t,n){},32:function(e,t,n){"use strict";n.r(t);var i=n(0),a=n.n(i),o=n(1),r=n.n(o),c=(n(22),n(2)),s=n(3),l=n(5),u=n(4),p=n(6),d=(n(24),n(8)),h=n(9);function m(){var e=Object(d.a)(["\n  position: absolute;\n  width: 20em;\n  height: 10em;\n  background-color: slateblue;\n  border-radius: 1em;\n"]);return m=function(){return e},e}function f(){var e=Object(d.a)(["\n  position: relative;\n  display: inline-block;\n  overflow: hidden;\n  font-size: 1vmin;\n  width:  60em;\n  height: 60em;\n  background-color: #eee;\n  border: 1px solid gray;\n"]);return f=function(){return e},e}var b=h.a.div(f()),v=h.a.div(m()),g={position:[100,0,0,0,1],speed:[0,0,0,10,0],acceleration:[0,2,0,0,0]},w=function(e){return Math.round(1e3*e)/1e3},y=function(e){return{left:"".concat(w(e.position[0]),"px"),top:"".concat(w(e.position[1]),"px"),transform:"rotate(".concat(w(e.position[3]),"deg)"),opacity:w(e.position[4])}},j=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state=Object.assign({},g,{isRunning:!1,timeStarted:Date.now(),elapsedTime:0}),n}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.timer=setInterval(this.onTimerUpdate.bind(this),50)}},{key:"componentWillUnmount",value:function(){clearInterval(this.timer)}},{key:"onTimerUpdate",value:function(){if(this.state.isRunning){for(var e=this.state.position.slice(),t=this.state.speed.slice(),n=this.state.acceleration.slice(),i=0;i<e.length;i++)t[i]+=n[i],e[i]+=t[i];e[1]>200&&(t[1]=.9*-t[1],t[3]=.9*-t[3],e[3]=.9*e[3],e[1]=200);var a=Date.now()-this.state.timeStarted;this.setState({position:e,speed:t,acceleration:n,elapsedTime:a}),console.log("".concat(a/100,"% { ").concat((o=y({position:e,speed:t,acceleration:n}),Object.keys(o).reduce(function(e,t){return e+"".concat(t,": ").concat(o[t],"; ")},"")),"}"))}var o}},{key:"toggleRunning",value:function(){var e=!this.state.isRunning;if(this.setState({isRunning:e}),e){var t=Date.now(),n=Object.assign({},g),i=n.position,a=n.speed,o=n.acceleration;this.setState({position:i,speed:a,acceleration:o,timeStarted:t})}}},{key:"render",value:function(){return a.a.createElement(i.Fragment,null,a.a.createElement(b,null,a.a.createElement(v,{style:y(this.state)})),a.a.createElement("p",null,a.a.createElement("button",{onClick:this.toggleRunning.bind(this)},this.state.isRunning?"Stop":"Start")))}}]),t}(i.Component),k=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return a.a.createElement("div",{className:"App"},a.a.createElement("h1",null,"CSS Motion Toy"),a.a.createElement("p",null,"Create CSS animations based on physics simulation"),a.a.createElement(j,null))}}]),t}(i.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(a.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[16,2,1]]]);
//# sourceMappingURL=main.a7e29e26.chunk.js.map