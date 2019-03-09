(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{19:function(t,e,n){t.exports=n(35)},24:function(t,e,n){},27:function(t,e,n){},35:function(t,e,n){"use strict";n.r(e);var a=n(0),o=n.n(a),s=n(8),i=n.n(s),r=(n(24),n(17)),l=n(3),c=n(4),u=n(6),p=n(5),h=n(7),d=n(9),m=(n(27),["X","Y","Z","Rotation","Opacity"]),f=["X","Y","Time"],b=["Skew (1/0)","Stretch (1/0)","Friction (%)","Timer interval (ms)"],v={bounce:{startState:{position:[150,10,0,0,1],speed:[0,0,0,0,0],acceleration:[0,2,0,0,0]},appliedRules:[{name:"bounce"}]},blackhole:{startState:{position:[150,10,0,0,1],speed:[20,20,0,0,0],acceleration:[0,0,0,0,0]},appliedRules:[{name:"blackhole"}]},cannon:{startState:{position:[150,10,0,0,1],speed:[0,1,0,0,0],acceleration:[0,0,0,0,0]},appliedRules:[{name:"cannon"}]}},S=[1,0,10,50],O={offset:[0,0,0],scale:[100,100,100]},g=n(1),y=n(2),k={bounce:{apply:function(t){var e=t.dimension,n=void 0===e?1:e,a=t.wallPosition,o=void 0===a?250:a,s=t.position,i=t.speed,r=(t.acceleration,t.elapsedTime,t.options);s[n]>o&&(s[n]=o,i[n]=-i[n]*(1-r[2]/100),i[3]=-i[3]*(1-r[2]/100),s[3]=s[3]*(1-r[2]/100))}},blackhole:{apply:function(t){for(var e=t.gravity,n=void 0===e?.01:e,a=t.holePosition,o=void 0===a?[150,150]:a,s=t.position,i=t.speed,r=t.acceleration,l=(t.elapsedTime,t.options),c=0;c<=2;c++)r[c]=(o[c]-s[c])*n,i[c]*=1-l[2]/100/10}},cannon:{apply:function(t){var e=t.dimension,n=void 0===e?0:e,a=t.power,o=void 0===a?5:a,s=t.startTime,i=void 0===s?1e3:s,r=(t.position,t.speed,t.acceleration),l=t.elapsedTime;t.options;l>i&&(r[n]=o)}}};function j(){var t=Object(g.a)(["\n  position: absolute;\n  width: 15em;\n  height: 7.5em;\n  background-color: slateblue;\n  border-radius: 1em;\n"]);return j=function(){return t},t}function w(){var t=Object(g.a)(["\n  position: relative;\n  display: inline-block;\n  overflow: hidden;\n  font-size: 1vmin;\n  width:  60em;\n  height: 60em;\n  background-color: #eee;\n  border: 1px solid gray;\n"]);return w=function(){return t},t}var C=y.a.div(w()),E=y.a.div(j()),T=function(t){return Math.round(1e3*t)/1e3},R=function(t){arguments.length>1&&void 0!==arguments[1]&&arguments[1];return{elapsedTime:t.elapsedTime,left:t.position[0],top:t.position[1],transformScale:1-(t.position[2]||.001)/500,transformRotate:t.position[3],transformSkewX:t.speed[0],transformSkewY:t.speed[1],transformStretchX:1+t.speed[0]/40,transformStretchY:1+t.speed[1]/40,opacity:t.position[4]}},X=function(t,e){return{left:"".concat(T(t.left),"px"),top:"".concat(T(t.top),"px"),transform:"scale(".concat(T(t.transformScale),")")+" rotate(".concat(T(t.transformRotate),"deg)")+(e[0]?" skew(".concat(T(t.transformSkewX),"deg, ").concat(T(t.transformSkewY),"deg)"):"")+(e[1]?" scale(".concat(T(t.transformStretchX),", ").concat(T(t.transformStretchY),")"):""),opacity:T(t.opacity)}},Y=function(t){function e(t){var n;return Object(l.a)(this,e),(n=Object(u.a)(this,Object(p.a)(e).call(this,t))).state=Object.assign({},n.props.startState,{isRunning:!1,timeStarted:Date.now(),elapsedTime:0}),n}return Object(h.a)(e,t),Object(c.a)(e,[{key:"componentDidMount",value:function(){this.timer=setInterval(this.onTimerUpdate.bind(this),this.props.options[3])}},{key:"componentWillUnmount",value:function(){clearInterval(this.timer)}},{key:"onTimerUpdate",value:function(){if(this.state.isRunning){var t=Date.now()-this.state.timeStarted,e=this.state.position.slice(),n=this.state.speed.slice(),a=this.state.acceleration.slice();for(var o in this.props.appliedRules)k[this.props.appliedRules[o].name].apply({elapsedTime:t,position:e,speed:n,acceleration:a,options:this.props.options});for(var s=0;s<e.length;s++)n[s]+=a[s],e[s]+=n[s];this.setState({position:e,speed:n,acceleration:a,elapsedTime:t});var i=R({elapsedTime:t,position:e,speed:n,acceleration:a},this.props.options);this.props.handleOutput({position:e,speed:n,acceleration:a,elapsedTime:t,stylesValues:i,styles:X(i,this.props.options)})}}},{key:"toggleRunning",value:function(){var t=!this.state.isRunning;if(this.setState({isRunning:t}),t){this.props.handleClearOutput();var e=Date.now(),n=Object.assign({},this.props.startState),a=n.position,o=n.speed,s=n.acceleration;this.setState({position:a,speed:o,acceleration:s,timeStarted:e})}}},{key:"render",value:function(){return o.a.createElement(a.Fragment,null,o.a.createElement(C,null,o.a.createElement(E,{style:X(R(this.state,this.props.options),this.props.options)})),o.a.createElement("p",null,o.a.createElement("button",{onClick:this.toggleRunning.bind(this)},this.state.isRunning?"Stop":"Start")))}}]),e}(a.Component),x=function(t,e,n){var a,o=function(t,e){arguments.length>2&&void 0!==arguments[2]&&arguments[2];return{elapsedTime:t.elapsedTime*e.scale[2]/100+e.offset[2],left:t.left*e.scale[0]/100+e.offset[0],top:t.top*e.scale[1]/100+e.offset[1],transformScale:t.transformScale,transformRotate:t.transformRotate,transformSkewX:t.transformSkewX,transformSkewY:t.transformSkewY,transformStretchX:t.transformStretchX,transformStretchY:t.transformStretchY,opacity:t.opacity}}(t,e,n);return"".concat(o.elapsedTime/100,"% { ").concat((a=X(o,n),Object.keys(a).reduce(function(t,e){return t+"".concat(e,": ").concat(a[e],"; ")},""))," }\n")};function F(){var t=Object(g.a)(["\n  min-width: auto;\n\n  &:hover:not(:disabled),\n  &:focus:not(:disabled) {\n  }\n  &:hover:not(:disabled) {\n  }\n  &:active:hover {\n  }\n  &.selected {\n    border: 2px solid blue;\n  }\n"]);return F=function(){return t},t}var D=y.a.button(F()),I=function(t){function e(t){var n;return Object(l.a)(this,e),(n=Object(u.a)(this,Object(p.a)(e).call(this,t))).state={selected:t.selected||t.options[0]},n}return Object(h.a)(e,t),Object(c.a)(e,[{key:"handleSelect",value:function(t,e){this.setState({selected:t}),this.props.onSelect&&this.props.onSelect(t)}},{key:"render",value:function(){var t=this;return o.a.createElement("span",null,this.props.options.map(function(e){return o.a.createElement(D,{key:e,onClick:t.handleSelect.bind(t,e),className:t.state.selected===e?"selected":null},e)}))}}]),e}(a.Component);function M(){var t=Object(g.a)(["\n  width: 4em;\n  margin: 0 0.05em;\n"]);return M=function(){return t},t}var P=y.a.input(M()),U=function(t){var e=t.values,n=t.labels,a=t.onChange;return o.a.createElement("span",null,e.map(function(t,e){return o.a.createElement(P,{key:e,type:"number",placeholder:n[e],title:n[e],value:t,onChange:a.bind(void 0,e)})}))},W=function(t){var e=t.stateObject,n=t.label,a=t.onChange,s=t.labels,i=void 0===s?m:s;return o.a.createElement("p",null,o.a.createElement("label",null,n,":"),o.a.createElement(U,{values:e[n.toLowerCase()],labels:i,onChange:a}))},A=function(t){function e(t){var n;Object(l.a)(this,e);return(n=Object(u.a)(this,Object(p.a)(e).call(this,t))).state={currentTemplate:"bounce",startState:v.bounce.startState,output:[],outputOptions:O,simulationOptions:S},n}return Object(h.a)(e,t),Object(c.a)(e,[{key:"logOutput",value:function(t){t.comment,t.position,t.speed,t.acceleration,t.elapsedTime;var e=t.stylesValues,n=(t.styles,[].concat(Object(r.a)(this.state.output),[e]));this.setState({output:n})}},{key:"renderOutput",value:function(){var t=this;return this.state.output.reduce(function(e,n){return e+x(n,t.state.outputOptions,t.state.simulationOptions)},"")}},{key:"handleClearOutput",value:function(){this.setState({output:[]})}},{key:"handleSelectTemplate",value:function(t){this.setState({currentTemplate:t,startState:v[t].startState})}},{key:"handleChangeStartState",value:function(t,e,n){var a=Object.assign({},this.state.startState);Object(d.set)(a,"".concat(t,".").concat(e),parseFloat(n.target.value)),this.setState({startState:a})}},{key:"handleChangeOutputOptions",value:function(t,e,n){var a=Object.assign({},this.state.outputOptions);Object(d.set)(a,"".concat(t,".").concat(e),parseFloat(n.target.value)),this.setState({outputOptions:a})}},{key:"handleChangeSimulationOptions",value:function(t,e){var n=this.state.simulationOptions.slice();Object(d.set)(n,"".concat(t),parseFloat(e.target.value)),this.setState({simulationOptions:n})}},{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement("h1",null,"CSS Motion Toy"),o.a.createElement("p",null,"Create CSS animations based on physics simulation"),o.a.createElement("h3",null,"Simulation settings"),o.a.createElement(I,{options:["bounce","blackhole","cannon"],onSelect:this.handleSelectTemplate.bind(this)}),o.a.createElement("p",null,o.a.createElement("label",null,"Settings:"),o.a.createElement(U,{values:this.state.simulationOptions,labels:b,onChange:this.handleChangeSimulationOptions.bind(this)})),o.a.createElement("h3",null,"Object start values"),o.a.createElement(W,{label:"Position",stateObject:this.state.startState,onChange:this.handleChangeStartState.bind(this,"position")}),o.a.createElement(W,{label:"Speed",stateObject:this.state.startState,onChange:this.handleChangeStartState.bind(this,"speed")}),o.a.createElement(W,{label:"Acceleration",stateObject:this.state.startState,onChange:this.handleChangeStartState.bind(this,"acceleration")}),o.a.createElement(Y,{startState:this.state.startState,appliedRules:v[this.state.currentTemplate].appliedRules,options:this.state.simulationOptions,handleOutput:this.logOutput.bind(this),handleClearOutput:this.handleClearOutput.bind(this)}),o.a.createElement("h2",null,"Output"),o.a.createElement(W,{label:"Offset",stateObject:this.state.outputOptions,onChange:this.handleChangeOutputOptions.bind(this,"offset"),labels:f}),o.a.createElement(W,{label:"Scale",stateObject:this.state.outputOptions,onChange:this.handleChangeOutputOptions.bind(this,"scale"),labels:f}),o.a.createElement("textarea",{readOnly:!0,value:this.renderOutput()}))}}]),e}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[19,2,1]]]);
//# sourceMappingURL=main.dc091479.chunk.js.map