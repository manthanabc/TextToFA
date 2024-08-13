
	let canvas ={}
	let goFullscreen = console.log
	let open = false; 
  let bookmarks = false;
  let fullUrls = true;
	// let states = []
	let input = ""
	let theme = "lover"
	let running = true;
  
  $: (() => {
     (input);
     if(!checked) {return}
     resetState()
     inputchanged(input)
  }) ()

  let checked= true;
 	let inputchanged = console.log
 	let redraw = console.log
 	let resetState = console.log
	load(async () => {

				window.onSpotifyIframeApiReady = (IFrameAPI) => {
				  const element = document.getElementById('embed-iframe');
				  const options = {
				  		height: '80px',
				      uri: (Math.random()>0.5)? 'spotify:artist:06HL4z0CvFAxyc27GXpf02':'spotify:track:1tuNqJOtRQVHvONR8Lg3MZ' 
				    };
				  const callback = (EmbedController) => {
				  	console.log(EmbedController)
				  	EmbedController.iframeElement.height = '80px'
				  };
				  IFrameAPI.createController(element, options, callback);
				};					
					
				document.addEventListener("keydown", function (e) {
						  if (
						    e.ctrlKey &&
						    (e.keyCode == "61" ||
						      e.keyCode == "107" ||
						      e.keyCode == "173" ||
						      e.keyCode == "109" ||
						      e.keyCode == "187" ||
						      e.keyCode == "189")
						  ) {
						    e.preventDefault();
						  }
						});

						document.addEventListener(
						  "wheel",
						  function (e) {
						    if (e.ctrlKey) {
						      e.preventDefault();
						    }
						  },
						  {
						    passive: false
						  }
						);

						resetState = () => {
							// if($FA_states.length==0) { return }
							// FA_states.update(states => {
							// 	State.taken = []
							// 	// states.forEach((n) =>{ n.x = 0; n.y=0 })
							// 	// if(states.length == 0) {
							// 	// 	states.push(new State(95, 50, "t"+low[0]));
							// 	// }
							// 	// states[0].setpos(0, 0)
							// 	// let frst = states[0]
							// 	states =[]
							// 	// states.push(frst)
							// 	return states;
							// })
							// inputchanged(input)
						}

						onkeydown = (event) => {
							// console.log(event)
							if(event.ctrlKey && event.code=="KeyF") {
								goFullscreen()
							}
							if(event.altKey && event.code=="KeyG") {
					     redraw();
							}
						};
					
						canvas = document.getElementById('DFA');
						let app = document.getElementById('APP');
						canvas.width = 1100; canvas.height = 600;
						canvas.width = window.innerWidth;
						canvas.height = window.innerHeight;
						let low = '₀₁₂₃₄₅₆₇₈₉';

						goFullscreen = async () => {
							if(!document.fullscreenElement) {
								canvas.width = 1100; canvas.height = 600;
								await app.requestFullscreen();
								canvas.width = window.innerWidth;
								canvas.height = window.innerHeight;
								init()
								trackTransforms(ctx)
								redraw()
							} else {
								await document.exitFullscreen()
							}
						}

						let siz = 80;
						let mar = 20;

							class State {
								constructor(x=0, y=0, name='q0') {
									this.x = x;
									this.y = y;
									// this.l = 0
									this.name = name;
									this.maps = {};
									this.highlighted = false;
									this.final = false;
									this.children = []
								}
								setpos(x, y) {
									this.x = x || this.x;
									this.y = y || this.y;
									//this.children = this.children; //Object.values(this.maps);
									let notfix = this.children.filter(([ty, u]) => ty.x==0);
									console.log(this)
									console.log('fixing child')
									console.log(notfix)
									let len = notfix.length/2
									if(notfix.length == 1) {
										console.log("one child")
										notfix.forEach(([child, conn]) => {
											child.setpos(this.x+220, this.y)
											child.relpos = 0
										});
									} else {
									  let at =0;
										console.log("two child")
										notfix.forEach(([child, conn]) => {
											while(State.taken[[this.x+140, this.y+(  len)*300 + 150]]) { console.log("TAKEN"); len-- }
											State.taken[[this.x+140, this.y+(  len)*300 + 150]] = true
											child.relpos = len
											child.x = this.x+200;
											child.y = this.y+(--len)*300 + 150
										});
										notfix.forEach(([child, conn]) => {
											child.setpos()
										})
									}
								}
								drawSelf() {
									ctx.fillStyle = "hsl(199, 64%, 73%)"
									if(this.highlighted) {
										ctx.shadowColor = "rgb(200 0 250)";
										ctx.globalAlpha = 0.2;
										ctx.fillStyle = "rgba(255 0 0 0.9)"
									}
									ctx.beginPath();
									if(this.final) {
										ctx.fillStyle = "black"
									} else {		ctx.fillStyle = "hsl(199, 50%, 50%)"
									}
									ctx.arc(this.x, this.y, 40+ this.highlighted * 10, 0, 2 * Math.PI);
									ctx.fill();
									ctx.globalAlpha = 1;
									ctx.beginPath();
									if(this.final) {
										ctx.shadowColor = "rgb(55 55 155)"
									} else {
										ctx.shadowColor = "rgb(55 55 250)";
									}
									ctx.shadowBlur = 21+ this.highlighted * 10;
									if(this.highlighted) {
										ctx.shadowColor = "rgb(200 0 250)";
									}
									ctx.fillStyle = "hsl(199, 50%, 50%)"
									ctx.arc(this.x, this.y, 35 , 0, 2 * Math.PI);
									let gradient = ctx.createLinearGradient(this.x-20, this.y+20, this.x+20, this.y-20);
									//Fill styles and gradients are reserved for future themeing
									// gradient.addColorStop(0.4, "#0000ff");
									// gradient.addColorStop(0.9, "#aaaaaa");
									if(this.final) {
										gradient.addColorStop(1, "#dfdfff");
									} else {
										gradient.addColorStop(1, "#ffffff");
									}
									ctx.fillStyle  = gradient;
									// ctx.fillStyle = "hsl(43, 100%, 51%)"
									// ctx.fillStyle = "hsl(192, 70%, 43%)"
									// ctx.filter = "blur(1px)";
									ctx.fill();
									ctx.fillStyle  = "";
									// ctx.shadowBlur = 0;
									// ctx.filter = ""

									ctx.font = '30px Verdana';
									ctx.fillStyle = "rgb(70 10 170)"
									ctx.fillText(this.name, this.x-15, this.y+5);  
									ctx.shadowColor = "rgb(255 255 250)";
									ctx.shadowBlur = 0;

									// ctx.fillText (this.name, this.x-40, this.y);
								}
								draw() {
									ctx.lineWidth = 3;
									ctx.strokeStyle = "hsl(199, 50%, 50%)";
									// Object.keys(this.maps).forEach((key) => {
									this.children.forEach(([child, con]) => {
											// let child = this.maps[key];
									    ctx.beginPath();
									    ctx.moveTo(this.x, this.y);
											if(this.highlighted) {
												ctx.shadowColor = "rgb(200 0 250)";
												ctx.globalAlpha = 0.2;
												ctx.fillStyle = "rgba(255 0 0 0.9)"
											}
											child.relpos = child.relpos || 0
											let tangslop = -(child.x-this.x)/(child.y-this.y);
											// tangslop = 1/tangslop
											// ctx.bezierCurveTo(this.x, this.y + 50*child.relpos, child.x - 75, child.y, child.x, child.y)
											let L = -(this.x-child.x)/(this.y-child.y+0.01);
											let D = Math.sqrt((this.x-child.x)*(this.x-child.x) + (this.y-child.y)*(this.y-child.y))*2/50
											let K = Math.max(Math.sqrt(26*L*L), 3)
											let Y = Math.min(Math.abs(this.y-child.y)/100, 1)

											let red = 1;
											if(child.children.some(([c, n]) => c == this) ) {
												if(this.y < child.y) { red = -1; }
												D=1;
												K=1;
												// L=1
											}

											let mx = - red*15*Y*D/K
											let my = - red*15*L*Y*D/K
	
											let controllpointx = (this.x+child.x)/2  
											let controllpointy = (this.y+child.y)/2 
											
											// ctx.quadraticCurveTo((this.x+child.x)/2 - 150, (this.y+child.y)/2 - 150*tangslop, child.x, child.y);
											ctx.quadraticCurveTo(controllpointx + mx, controllpointy + my, child.x, child.y);
											ctx.stroke();

											let rp = child.relpos;
											let de = -rp*30

											let cx = controllpointx + mx
											let cy = controllpointy + my
											

											// Unused compute point at t=l of the quadratic bezier (will use when better arrows) /
											ctx.beginPath()
											// this.l+=0.001
											var l=0; //this.l;
											// setInterval(() => { l+=0.1 }, 500)
											let il=1-l;
											let ocx=l*cx + il*this.x
											let ocy=l*cy + il*this.y
											let ccx=l*child.x + il*cx
											let ccy=l*child.y + il*cy
											let px=ocx*il + ccx*l
											let py=ocy*il + ccy*l


											// create a vector from child to controll point of bezier
											let vx = cx - child.x
											let vy = cy - child.y

											// ctx.arc(px, py, 50, 50, 100)
											let uvx = vx / Math.sqrt(vx*vx + vy*vy)
											let uvy = vy / Math.sqrt(vx*vx + vy*vy)
											uvx =Math.min(uvx, 1);
											uvy = Math.min(uvy, 1);


											let size = 15;
											let distance = 40;
										  let angle = Math.atan(vx/vy)
										  angle += (this.y>=child.y)?0:135
										  let delx=0;
											if(child == this && this.highlighted) {
												// Loop about the input states
												ctx.arc(35 +this.x, -35  +this.y, 30, 30, 100)
												size = 20;
												child.x+=30;
												angle = 135;
												uvx =1/Math.sqrt(2);
												uvy =-1/Math.sqrt(2);
												distance = 50
											}
											ctx.moveTo(uvx*distance +child.x, uvy*distance  +child.y)
											ctx.lineTo((uvx*distance+child.x)+ size*Math.sin(angle-45), (uvy*distance+child.y)+size*Math.cos(angle-45))
											ctx.moveTo(uvx*distance +child.x, uvy*distance  +child.y)
											ctx.lineTo((uvx*distance+child.x)+ size*Math.sin(angle+45), (uvy*distance+child.y)+size*Math.cos(angle+45))
											ctx.stroke()
											if(child == this && this.highlighted) {
												child.x-=30
											}
											// Static Arrows
									    ctx.beginPath();
											let sx = child.x - 40
											let sy = child.y - 10*rp
									    ctx.moveTo(sx, sy);
											// ctx.lineTo(sx + Math.sin((-90-45+de)*Math.PI/180)*10, sy + Math.cos((-90-45+de)*Math.PI/180)*10);
											ctx.closePath();
											ctx.stroke();
									    ctx.beginPath();
									    ctx.moveTo(sx, sy);
											// ctx.lineTo(sx + Math.sin((-45+de)*Math.PI/180)*10, sy + Math.cos((-45+de)*Math.PI/180)*10);
											ctx.closePath();
											ctx.stroke();
											
											ctx.stroke();
											ctx.font = '15px Verdana';
											ctx.fillStyle = "hsl(199, 50%, 50%)"
											ctx.fillText(con.toString()[0], (this.x + child.x)/2 + mx/4, (this.y + child.y)/2 + my/3);
											child.drawSelf()  
									})		
									this.drawSelf()
								}
								connect(input, node) {
									// this.maps[input].push(node);
									this.children.push([node, input]);
								}
								setchildpos(node) {
									this.children.filter((node) => node == node)[0].relpos = 1;
								}
							}
							State.taken = {}
						
							var ctx = canvas.getContext('2d');
							trackTransforms(ctx);

							let l = ['0', '1'];
							// let input = "(01)|((110)|(11)|(1))|(001)"
							// let input = "(011)^((110)|(11)|(1))"
							// let input = "(11)^(((11)^((00)|(ok)))|((01)*))"
							input = "(11)^(((11)^((00)|(ok)))|(01))"
							input = "(11)|(00)"

							let parser = (strin) => {
									let i=0
									let bc = 0;
									let head = {}
									let strt = 0;
									head.children = []
									while(i<strin.length) {
										if(strin[i] == ')'){ bc--; }
										else if(strin[i] == '('){ bc++; }
											if(bc == 0) {
											  let child = strin.substring(strt, i+1)
												console.log("shades of grey " + child)
												if(child == '|') { head.type = "or" }
												if(child == '^') { head.type = "and" }
												if(child == '*') { head.type = "muti" }
												if(child[1] == '(') {
													head.children.push(parser(child.substring(1, child.length-1)))
												} else if (child.length > 3){
													head.children.push(child)
												}
												strt = i+1
											}
										i++
									}
								return head;
							}
							console.log(parser(input));

							let states = [];
							let triverse = (state, head, states) => {
								if(typeof(head) == 'string') {
									if(head.length == 1) {
										state.name = head;
									}
									let last = state
									head.substring(1, head.length-1).split('').forEach((child) =>{
										console.log(states)
										console.log("FUCK")
									  let cstate =new State(undefined, undefined, name=child) 
										states.push(cstate)
										// state.connect(head, states[states.length-1])
										last.connect(child, cstate)
										last = cstate
										// triverse(cstate, child)
									})
									const laste = states[states.length-1];
									return [laste]
								} else {
									if(head.type == "or") {
										let last = []
										head.children.forEach((child) =>{
											let p = triverse(state, child, states)
											last=last.concat(p)
										})
										console.log("retered")
										console.log(last)
										return last
									} else if(head.type == "and") {

										let sg = new State(undefined, undefined, name="t")
										// states.push(sg) // not pushing the intermediatory state probably should delete after this function
										let u = triverse(sg, head.children[1], states)
										let g = triverse(state, head.children[0], states);
										g.forEach((n) => {
											sg.children.forEach((child)=> {
												n.children.push(child)
											})
										})
										return u;
									} else {
										let last = []
										head.children.forEach((child) =>{
											let z=triverse(state, child, states)
											console.log("INCODIn")
											console.log(z)
											last=last.concat(z)
										})
										console.log("BA")
										console.log(last)
										last.forEach((node) => {
											state.children.forEach((nod) => {
											console.log(nod[0])
												node.children.push(nod)
											})
										})
										return last;
									}
								}
							} 

							// resetState();
							let p = new State(95, 50, "t"+low[0]);
							let tempstates = []
							tempstates.push(p)
							let finals = triverse(p, parser(input), tempstates)
							console.log(finals)
							tempstates[0].setpos(200, 450);
							// console.log(tempstates)
							console.log("UP")

							FA_states.update((states) => states = tempstates)
							console.log($FA_states)

							inputchanged = (input) => {
								State.taken=[]
								tempstates = []
								let p = new State(95, 50, "t"+low[0]);
								tempstates.push(p)
								triverse(p, parser(input), tempstates)
								tempstates[0].setpos(200, 450);
								FA_states.update((states) => states = tempstates );
							}

							redraw = () =>{
						
								var p1 = ctx.transformedPoint(0,0);
								var p2 = ctx.transformedPoint(canvas.width, canvas.height);
								ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);
								ctx.clearRect(0, 0, canvas.width, canvas.height);

								// p.draw();
								FA_states.update((states) => {
									for(let i=0; i<states.length; i++) {
										states[i].draw();
									}
									return states;
								})

								ctx.save();
  							ctx.restore();
								}
							redraw();

							let init = () => {
										
							var lastX=canvas.width/2, lastY=canvas.height/2;
							var dragStart,dragged;
							let highlighted = false;
							let start = undefined;
							canvas.addEventListener('mousedown',function(evt){
							  let pt = ctx.transformedPoint(evt.offsetX, evt.offsetY);
								document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
								lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
								lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
								dragged = false;
								if(evt.shiftKey) {
									dragged = true;
									states.push(new State(pt.x, pt.y, "w"))
								}
								// console.log(evt)
								if(evt.altKey) { start = highlighted; return }
								dragStart = ctx.transformedPoint(lastX,lastY);
								checkhighlight(dragStart)
							},false);
							
							let checkhighlight = (pt) => {
									let plight = false;
									FA_states.update(states => {
										states.forEach(state => {
											if(Math.abs(state.x - pt.x)<80 && Math.abs(state.y - pt.y)<80) {
												state.highlighted = true;
												plight = state
												redraw();
											} else {
												if(highlighted) {state.highlighted = false; redraw();
												}
											}
										})
										return states;
									})
									highlighted= plight
							}
							canvas.addEventListener('mousemove', function(evt){
							  let pt = ctx.transformedPoint(evt.offsetX, evt.offsetY);
								if(!dragStart) {checkhighlight(pt) } else { redraw() }
								if(highlighted && dragStart ) {
									highlighted.x = pt.x//-dragStart.x;
									highlighted.y = pt.y//-dragStart.y;
									dragged = true;
									return
								}
								
								lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
								lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
								dragged = true;
								if (dragStart){
									// var pt = ctx.transformedPoint(lastX,lastY);
									ctx.translate(pt.x-dragStart.x, pt.y-dragStart.y);
									redraw();
								}
							},false);

							canvas.addEventListener('mouseup',function(evt){
								dragStart = null;
								console.log(start)
								if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
								if(evt.altKey) { if(highlighted) { start.connect(Math.random(), highlighted); start.setchildpos(highlighted) }; start=undefined }
							},false);


							// Hard limiting the scale
							var scaleFactor = 1.1;
							var zoom = function(clicks){
								if(clicks<0) {
								 if(ctx.getTransform().a > 0.1) {
										var pt = ctx.transformedPoint(lastX,lastY);
										ctx.translate(pt.x,pt.y);
										var factor = Math.pow(scaleFactor,clicks);
										ctx.scale(factor,factor);
										ctx.translate(-pt.x,-pt.y);
										redraw();
									}
								} else {
									if(ctx.getTransform().a < 4) {
										var pt = ctx.transformedPoint(lastX,lastY);
										ctx.translate(pt.x,pt.y);
										var factor = Math.pow(scaleFactor,clicks);
										ctx.scale(factor,factor);
										ctx.translate(-pt.x,-pt.y);
										redraw();
									}
								}
							}

							var handleScroll = function(evt){
								var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
								if (delta) zoom(delta);
								return evt.preventDefault() && false;
							};
							canvas.addEventListener('DOMMouseScroll',handleScroll,false);
							canvas.addEventListener('mousewheel',handleScroll,false);
						}
						init()

						function trackTransforms(ctx){
							var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
							var xform = svg.createSVGMatrix();
							ctx.getTransform = function(){ return xform; };
		
							var savedTransforms = [];
							var save = ctx.save;
							ctx.save = function(){
								savedTransforms.push(xform.translate(0,0));
								return save.call(ctx);
							};
							var restore = ctx.restore;
							ctx.restore = function(){
								xform = savedTransforms.pop();
								return restore.call(ctx);
							};

							var scale = ctx.scale;
							ctx.scale = function(sx,sy){
								xform = xform.scaleNonUniform(sx,sy);
								return scale.call(ctx,sx,sy);
							};
							var rotate = ctx.rotate;
							ctx.rotate = function(radians){
								xform = xform.rotate(radians*180/Math.PI);
								return rotate.call(ctx,radians);
							};
							var translate = ctx.translate;
							ctx.translate = function(dx,dy){
								xform = xform.translate(dx,dy);
								return translate.call(ctx,dx,dy);
							};
							var transform = ctx.transform;
							ctx.transform = function(a,b,c,d,e,f){
								var m2 = svg.createSVGMatrix();
								m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
								xform = xform.multiply(m2);
								return transform.call(ctx,a,b,c,d,e,f);
							};
							var setTransform = ctx.setTransform;
							ctx.setTransform = function(a,b,c,d,e,f){
								xform.a = max(1, a);
								xform.b = b;
								xform.c = c;
								xform.d = d;
								xform.e = e;
								xform.f = f;
								return setTransform.call(ctx,a,b,c,d,e,f);
							};
							var pt  = svg.createSVGPoint();
							ctx.transformedPoint = function(x,y){
								pt.x=x; pt.y=y;
								return pt.matrixTransform(xform.inverse());
							}
						}

    });
