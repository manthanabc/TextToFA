<script lang="ts">

	// import {
	// 	CodeViewer,
	// 	PresetShare,
	// } from "./(components)/index.js";	
	import { Button } from "$lib/components/ui/button/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { Separator } from "$lib/components/ui/separator/index.js";
	import * as Tabs from "$lib/components/ui/tabs/index.js";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
	import * as HoverCard from "$lib/components/ui/hover-card/index.js";
  import * as Menubar from "$lib/components/ui/menubar/index.js";
	import { onMount } from 'svelte';

// import WebGLFluid from 'webgl-fluid'
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
	let canvas ={}
	let goFullscreen = console.log
 
  let bookmarks = false;
  let fullUrls = true;

	let checked= true;
 
  const profileRadioValue = "benoit";	
		onMount(async () => {


							// WebGLFluid(document.getElementById('FLUID'), {

							// 	  TRIGGER: 'hover',
							// 	  IMMEDIATE: true,
							// 	  AUTO: true,
							// 	  INTERVAL: 3000,
							// 	  SIM_RESOLUTION: 128,
							// 	  DYE_RESOLUTION: 1024,
							// 	  CAPTURE_RESOLUTION: 512,
							// 	  DENSITY_DISSIPATION: 1,
							// 	  VELOCITY_DISSIPATION: 0.3,
							// 	  PRESSURE: 0.8,
							// 	  PRESSURE_ITERATIONS: 20,
							// 	  CURL: 30,
							// 	  SPLAT_RADIUS: 0.35,
							// 	  SPLAT_FORCE: 6000,
							// 	  SPLAT_COUNT: Number.parseInt(Math.random() * 20) + 5,
							// 	  SHADING: true,
							// 	  COLORFUL: true,
							// 	  COLOR_UPDATE_SPEED: 10,
							// 	  PAUSED: false,
							// 	  BACK_COLOR: { r: 0, g: 0, b: 0 },
							// 	  TRANSPARENT: false,
							// 	  BLOOM: true,
							// 	  BLOOM_ITERATIONS: 8,
							// 	  BLOOM_RESOLUTION: 256,
							// 	  BLOOM_INTENSITY: 0.8,
							// 	  BLOOM_THRESHOLD: 0.6,
							// 	  BLOOM_SOFT_KNEE: 0.7,
							// 	  SUNRAYS: true,
							// 	  SUNRAYS_RESOLUTION: 196,
							// 	  SUNRAYS_WEIGHT: 1.0,						
							// })

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

						canvas = document.getElementById('DFA');
						let app = document.getElementById('APP');
						canvas.width = 1100; canvas.height = 600;
						canvas.width = window.innerWidth;
						canvas.height = window.innerHeight;
						let low = '₀₁₂₃₄₅₆₇₈₉';

						goFullscreen = async () => {
							await app.requestFullscreen();
							canvas.width = window.innerWidth;
							canvas.height = window.innerHeight;
							init()
							// redraw()
							draw()
						}
						// addEventListener("fullscreenchange", async (event) => {
						// 	if(!Document.fullscreenElement) {
						// 		canvas.width = 1100; canvas.height = 600;
						// 	}else {
								
						// 	await canvas.requestFullscreen();
						// 	canvas.width = window.innerWidth;
						// 	canvas.height = window.innerHeight;
						// 	init()
						// 	redraw()
						// 	}
						// });

						let siz = 80;
						let mar = 20;
						// let low = '0123456789'

						// Construct the graph
						/**
							Create a base node
								Create child nodes
								Define connections ( via algorithm )
								Base node creates the positions of the first degree children which recursivly do the same 
						*/

							class State {
								constructor(x=0, y=0, name='q0') {
									this.x = x;
									this.y = y;
									this.name = name;
									this.maps = {};
								}
								// constructor(name='q0') {
								// 	this.x = 0;
								// 	this.y = 0;
								// 	this.name = name;
								// 	this.maps = {};
								// }
								setpos(x, y) {
									this.x = x;
									this.y = y;
									this.children = Object.values(this.maps);
									// let notfix = this.children.filter((key) => key.x == 0);
									let notfix = this.children;
									// let len = this.children.length/2
									let len = notfix.length/2
									console.log(`Log for ${this.name}`)
									console.log(notfix)
									if(notfix.length == 1) {
										this.children.forEach(child => {
											child.setpos(this.x+220, this.y)
											child.relpos = 0
										});
									} else {
									// len--;
									  let at =0;
										notfix.forEach(child => {
										  // len--;
											while(State.taken[[this.x+140, this.y+(  len)*300 + 150]]) { console.log("TAKEN"); len-- }
											State.taken[[this.x+140, this.y+(  len)*300 + 150]] = true
											child.setpos(this.x+200, this.y+(--len)*300 + 150)
											child.relpos = len
											if(child.relpos >= 0) { child.relpos++; }
										});
									}
								}
								draw() {
									ctx.lineWidth = 3;
									ctx.strokeStyle = "hsl(199, 50%, 50%)";
									Object.keys(this.maps).forEach((key) => {
											let child = this.maps[key];
									    ctx.beginPath();
									    ctx.moveTo(this.x, this.y);
									    // ctx.lineTo(this.maps[key].x, this.maps[key].y);
											ctx.bezierCurveTo(this.x, this.y + 50*child.relpos, child.x - 75, child.y, child.x, child.y)
									    // ctx.closePath();
											ctx.stroke();

											let rp = child.relpos;
											let de = -rp*30
											
									    ctx.beginPath();
											let sx = this.maps[key].x - 40
											let sy = this.maps[key].y - 10*rp
									    ctx.moveTo(sx, sy);
											ctx.lineTo(sx + Math.sin((-90-45+de)*Math.PI/180)*10, sy + Math.cos((-90-45+de)*Math.PI/180)*10);
											ctx.closePath();
											ctx.stroke();
									    ctx.beginPath();
									    ctx.moveTo(sx, sy);
											ctx.lineTo(sx + Math.sin((-45+de)*Math.PI/180)*10, sy + Math.cos((-45+de)*Math.PI/180)*10);
											ctx.closePath();
											ctx.stroke();
											
											ctx.stroke();
											ctx.font = '15px Verdana';
											ctx.fillStyle = "hsl(199, 50%, 50%)"
											ctx.fillText(key, (this.x + this.maps[key].x)/2 , (this.y + this.maps[key].y)/2 -5);  
									})		
									ctx.beginPath();
									ctx.fillStyle = "hsl(199, 64%, 73%)"
									ctx.arc(this.x, this.y, 40, 0, 2 * Math.PI);
									ctx.fill();
									ctx.beginPath();
									// ctx.fillStyle = "hsl(32, 100%, 49%)"
									// ctx.fillStyle = "hsl(192, 70%, 43%)"
									// ctx.filter = "blur(4px)";
									ctx.shadowColor = "rgb(200 0 250)";
									ctx.shadowBlur = 20;
									// ctx.fill();
									// ctx.beginPath();
									ctx.arc(this.x, this.y, 35, 0, 2 * Math.PI);
									let gradient = ctx.createLinearGradient(this.x-20, this.y+20, this.x+20, this.y-20);
									// gradient.addColorStop(0.4, "#0000ff");
									gradient.addColorStop(0.5, "#5a5aff");
									gradient.addColorStop(0.9, "#aaaaaa");
									gradient.addColorStop(1, "#ffffff");
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

									// ctx.fillText (this.name, this.x-40, this.y);
								}
								connect(input, node) {
									this.maps[input] = node;
								}
							}
							State.taken = {}
						
							var ctx = canvas.getContext('2d');
							trackTransforms(ctx);

							// function init() {
								let l = ['0', '1'];
								let input = "(01)|((110)|(11)|(1))|(001)"
								// let input = "((ab)|(cd))|((ef)|(gh))|(001)"
								// input = "(a|(b(z(g|(t(f|a)))|e))|(ce(z|e(aa|b)))|d)"
								// let input = "(01)|(11)"


								let parser = (strin) => {
								let i=0
								let bc = 0;
								let head = {}
								let strt = 0;
								head.children = []
									// if(strin[0] == '(') {
										while(i<strin.length) {
											if(strin[i] == ')'){ bc--; }
											else if(strin[i] == '('){ bc++; }
											// if(strin[i] == '|') { strt++ }
											// else {
												if(bc == 0) {
												  let child = strin.substring(strt, i+1)
													console.log("shades of grey " + child)
													if(child[1] == '(') {
														head.children.push(parser(child.substring(1, child.length-1)))
													} else if (child.length > 3){
														head.children.push(child)
													}
													strt = i+1
												}
											// }
											i++
										}
										// while(strin[i]!=')') {
										// 	i++
										// }

										// let right = strin.substr(1, i-1);
										// if(!right.startsWith('(')) {
										// 	head.children.push(right);
										// } else {
										// 	head.children.push(parser(right));
										// }
										// head.operator = strin[i+1];
										// let left = strin.substring(i+3, strin.length - 1);
										// console.log(left)
										// if(!left.startsWith('(')) {
										// 	head.children.push(left);
										// } else {
										// 	head.children.push(parser(left));
										// }
									// }
									return head;
								}
								console.log(parser(input));
								// console.log(head);

								let states = [];
								let triverse = (state, head) => {
									if(typeof(head) == 'string') {
										if(head.length == 1) {
											state.name = head;
										}
										// states.push(new State(undefined, undefined, name=head))
										// state.connect(Math.random(), states[states.length-1])
										// return state
										// state.name = head;
										let last = state
										head.substring(1, head.length-1).split('').forEach((child) =>{
											// console.log("sd " + child)
										  let cstate =new State(undefined, undefined, name=child) 
											states.push(cstate)
											// state.connect(head, states[states.length-1])
											last.connect(head[1], cstate)
											last = cstate
											// triverse(cstate, child)
										})
									} else {
										head.children.forEach((child) =>{
											console.log("sd " + child)
										  let cstate =new State(undefined, undefined, name='q') 
											states.push(cstate)
											// state.connect(head, states[states.length-1])
											state.connect(Math.random(), cstate)
											triverse(cstate, child)
										})
									}
								} 
								let p = new State(95, 50, "t"+low[0]);
								states.push(p)
								triverse(p, parser(input))
								
								// states.push(new State( undefined, undefined, name= 'q'+low['0'] ))
								// let at=0;
								// for(let i=0; i<input.length-1; i++) {
								//  if(l.some(c => c==input[i])) {
								// 		let p = new State( undefined, undefined, name= 'q'+low[i.toString()] )
								// 		let label = input[i];
								// 		if(input[i+1] == '|') { label = input[i] + ', ' + input[i+2]}
								// 		states[at++].connect(label, p);
								// 		states.push(p);
								// 	}
								// }

								// Parse Recursively All the Nodes
								// each node gets required input  <-- MAYBE
								// Convert tree to 
								// LR splitting the branches

						
								// states[0].connect('0', states[1]);
								// states[0].connect('1', states[2]);
								// states[1].connect('0', states[3]);
								// states[1].connect('1', states[4]);
								// states[2].connect('0', states[5]);
								// states[4].connect('0', states[2]);
								// states[4].connect('1', states[6]);
								// states[2].connect('1', states[6]);

								states[0].setpos(95, 50);

								// console.log(p)
							// }
							function redraw(){

							
								var p1 = ctx.transformedPoint(0,0);
								var p2 = ctx.transformedPoint(canvas.width, canvas.height);
								ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);
								ctx.clearRect(0, 0, canvas.width, canvas.height);

								p.draw();
								for(let i=0; i<states.length; i++) {
									states[i].draw();
								}

								ctx.save();
								ctx.restore();

			
							}
							redraw();

							let init = () => {
		
											var lastX=canvas.width/2, lastY=canvas.height/2;
											var dragStart,dragged;
											canvas.addEventListener('mousedown',function(evt){
												document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
												lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
												lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
												dragStart = ctx.transformedPoint(lastX,lastY);
												dragged = false;
											},false);
											canvas.addEventListener('mousemove',function(evt){
												lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
												lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
												dragged = true;
												if (dragStart){
													var pt = ctx.transformedPoint(lastX,lastY);
													ctx.translate(pt.x-dragStart.x,pt.y-dragStart.y);
													redraw();
												}
											},false);
											canvas.addEventListener('mouseup',function(evt){
												dragStart = null;
												if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
											},false);

											var scaleFactor = 1.1;
											var zoom = function(clicks){
												var pt = ctx.transformedPoint(lastX,lastY);
												ctx.translate(pt.x,pt.y);
												var factor = Math.pow(scaleFactor,clicks);
												ctx.scale(factor,factor);
												ctx.translate(-pt.x,-pt.y);
												redraw();
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
						// };
						// gkhead.src = 'http://phrogz.net/tmp/gkhead.jpg';
						// ball.src   = 'http://phrogz.net/tmp/alphaball.png';
	
						// Adds ctx.getTransform() - returns an SVGMatrix
						// Adds ctx.transformedPoint(x,y) - returns an SVGPoint
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
								xform.a = a;
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

	
</script>
<div class="h-full flex-col md:flex bg-gradient-to-tr from-[#111038] via-[#000712] to-[#351033]" style="background-image: linear-gradient(var(--angle), var(--tw-gradient-stops)) !important; animation: spin 5s ease infinite" id="APP">

				<Menubar.Root class="backdrop-blur bg-black/30 w-full absolute border-none shadow-[0px_0px_50px_2px_black]">
				  <Menubar.Menu >
				    <Menubar.Trigger>File</Menubar.Trigger>
				    <Menubar.Content>
				      <Menubar.Item >
				        New Tab <Menubar.Shortcut>⌘T</Menubar.Shortcut>
				      </Menubar.Item>
				      <Menubar.Item>
				        New Window <Menubar.Shortcut>⌘N</Menubar.Shortcut>
				      </Menubar.Item>
				      <Menubar.Item>New Incognito Window</Menubar.Item>
				      <Menubar.Separator />
				      <Menubar.Sub>
				        <Menubar.SubTrigger>Share</Menubar.SubTrigger>
				        <Menubar.SubContent>
				          <Menubar.Item>Email link</Menubar.Item>
				          <Menubar.Item>Messages</Menubar.Item>
				          <Menubar.Item>Notes</Menubar.Item>
				        </Menubar.SubContent>
				      </Menubar.Sub>
				      <Menubar.Separator />
				      <Menubar.Item>
				        Print... <Menubar.Shortcut>⌘P</Menubar.Shortcut>
				      </Menubar.Item>
				    </Menubar.Content>
				  </Menubar.Menu>
				  <Menubar.Menu>
				    <Menubar.Trigger>Edit</Menubar.Trigger>
				    <Menubar.Content>
				      <Menubar.Item>
				        Undo <Menubar.Shortcut>⌘Z</Menubar.Shortcut>
				      </Menubar.Item>
				      <Menubar.Item>
				        Redo <Menubar.Shortcut>⇧⌘Z</Menubar.Shortcut>
				      </Menubar.Item>
				      <Menubar.Separator />
				      <Menubar.Sub>
				        <Menubar.SubTrigger>Find</Menubar.SubTrigger>
				        <Menubar.SubContent>
				          <Menubar.Item>Search the web</Menubar.Item>
				          <Menubar.Separator />
				          <Menubar.Item>Find...</Menubar.Item>
				          <Menubar.Item>Find Next</Menubar.Item>
				          <Menubar.Item>Find Previous</Menubar.Item>
				        </Menubar.SubContent>
				      </Menubar.Sub>
				      <Menubar.Separator />
				      <Menubar.Item>Cut</Menubar.Item>
				      <Menubar.Item>Copy</Menubar.Item>
				      <Menubar.Item>Paste</Menubar.Item>
				    </Menubar.Content>
				  </Menubar.Menu>
				  <Menubar.Menu>
				    <Menubar.Trigger>View</Menubar.Trigger>
				    <Menubar.Content>
				      <Menubar.CheckboxItem bind:checked={bookmarks}
				        >Always Show Bookmarks Bar</Menubar.CheckboxItem
				      >
				      <Menubar.CheckboxItem bind:checked={fullUrls}>
				        Always Show Full URLs
				      </Menubar.CheckboxItem>
				      <Menubar.Separator />
				      <Menubar.Item inset>
				        Reload <Menubar.Shortcut>⌘R</Menubar.Shortcut>
				      </Menubar.Item>
				      <Menubar.Item inset>
				        Force Reload <Menubar.Shortcut>⇧⌘R</Menubar.Shortcut>
				      </Menubar.Item>
				      <Menubar.Separator />
				      <Menubar.Item inset>Toggle Fullscreen</Menubar.Item>
				      <Menubar.Separator />
				      <Menubar.Item inset>Hide Sidebar</Menubar.Item>
				    </Menubar.Content>
				  </Menubar.Menu>
				  <Menubar.Menu>
				    <Menubar.Trigger>Profiles</Menubar.Trigger>
				    <Menubar.Content>
				      <Menubar.RadioGroup value={profileRadioValue}>
				        <Menubar.RadioItem value="andy">Andy</Menubar.RadioItem>
				        <Menubar.RadioItem value="benoit">Benoit</Menubar.RadioItem>
				        <Menubar.RadioItem value="Luis">Luis</Menubar.RadioItem>
				      </Menubar.RadioGroup>
				      <Menubar.Separator />
				      <Menubar.Item inset>Edit...</Menubar.Item>
				      <Menubar.Separator />
				      <Menubar.Item inset>Add Profile...</Menubar.Item>
				    </Menubar.Content>
				  </Menubar.Menu>
				</Menubar.Root>        
				<div class="absolute max-width-300 items-top flex-col bottom-1 p-4 backdrop-blur bg-black/30 max-w-xl w-full shadow-[0px_0px_50px_2px_black] m-4 rounded-lg">

				<Tabs.Root value="account" class="w-full-[400px]">
				  <Tabs.List>
				    <Tabs.Trigger value="account">Text</Tabs.Trigger>
				    <Tabs.Trigger value="password">Regex</Tabs.Trigger>
				  </Tabs.List>
				  <Tabs.Content value="account">
						<Textarea placeholder="Design a DFA to match 001 or 011 ocurring anywhere in the given string" class="backdrop-blur bg-black/10 resize-none border-none" />
				  </Tabs.Content>
				  <Tabs.Content value="password">
						<Textarea placeholder="(001)|((10)|(aa)|(bc))" class="backdrop-blur bg-black/10 resize-none border-none" />
					</Tabs.Content>
				</Tabs.Root>
				<div class="flex items-center m-0 p-0">
					<Button class="bg-black/30 backdrop-blur text-slate-400 bg-gradient-to-r from-purple-900 to-pink-900 rounded-lg shadow-[0px_0px_50px_2px_black] my-4 mr-2">
						Generate
					</Button>
				  <Checkbox id="terms" class="m-2" bind:checked />
				  <Label
				    for="terms"
				    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				  >
				    Auto Generate
				  </Label>				
				</div>
				</div>
				<Button on:click={goFullscreen} class="bg-black/20 backdrop-blur absolute bottom-1 right-1 m-4 p-4 rounded-lg shadow-[0px_0px_50px_2px_black]">
						<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 2L4.87935 2C4.47687 1.99999 4.14469 1.99999 3.87409 2.0221C3.59304 2.04506 3.33469 2.09434 3.09202 2.21799C2.7157 2.40973 2.40973 2.7157 2.21799 3.09202C2.09434 3.33469 2.04506 3.59304 2.0221 3.87409C1.99999 4.14468 1.99999 4.47686 2 4.87933V4.87935V5.5C2 5.77614 2.22386 6 2.5 6C2.77614 6 3 5.77614 3 5.5V4.9C3 4.47171 3.00039 4.18056 3.01878 3.95552C3.03669 3.73631 3.06915 3.62421 3.10899 3.54601C3.20487 3.35785 3.35785 3.20487 3.54601 3.10899C3.62421 3.06915 3.73631 3.03669 3.95552 3.01878C4.18056 3.00039 4.47171 3 4.9 3H5.5C5.77614 3 6 2.77614 6 2.5C6 2.22386 5.77614 2 5.5 2ZM13 9.5C13 9.22386 12.7761 9 12.5 9C12.2239 9 12 9.22386 12 9.5V10.1C12 10.5283 11.9996 10.8194 11.9812 11.0445C11.9633 11.2637 11.9309 11.3758 11.891 11.454C11.7951 11.6422 11.6422 11.7951 11.454 11.891C11.3758 11.9309 11.2637 11.9633 11.0445 11.9812C10.8194 11.9996 10.5283 12 10.1 12H9.5C9.22386 12 9 12.2239 9 12.5C9 12.7761 9.22386 13 9.5 13H10.1206C10.5231 13 10.8553 13 11.1259 12.9779C11.407 12.9549 11.6653 12.9057 11.908 12.782C12.2843 12.5903 12.5903 12.2843 12.782 11.908C12.9057 11.6653 12.9549 11.407 12.9779 11.1259C13 10.8553 13 10.5232 13 10.1207V10.1207V10.1207V10.1206V9.5ZM2.5 9C2.77614 9 3 9.22386 3 9.5V10.1C3 10.5283 3.00039 10.8194 3.01878 11.0445C3.03669 11.2637 3.06915 11.3758 3.10899 11.454C3.20487 11.6422 3.35785 11.7951 3.54601 11.891C3.62421 11.9309 3.73631 11.9633 3.95552 11.9812C4.18056 11.9996 4.47171 12 4.9 12H5.5C5.77614 12 6 12.2239 6 12.5C6 12.7761 5.77614 13 5.5 13H4.87935C4.47687 13 4.14469 13 3.87409 12.9779C3.59304 12.9549 3.33469 12.9057 3.09202 12.782C2.7157 12.5903 2.40973 12.2843 2.21799 11.908C2.09434 11.6653 2.04506 11.407 2.0221 11.1259C1.99999 10.8553 1.99999 10.5231 2 10.1207V10.1206V10.1V9.5C2 9.22386 2.22386 9 2.5 9ZM10.1 3C10.5283 3 10.8194 3.00039 11.0445 3.01878C11.2637 3.03669 11.3758 3.06915 11.454 3.10899C11.6422 3.20487 11.7951 3.35785 11.891 3.54601C11.9309 3.62421 11.9633 3.73631 11.9812 3.95552C11.9996 4.18056 12 4.47171 12 4.9V5.5C12 5.77614 12.2239 6 12.5 6C12.7761 6 13 5.77614 13 5.5V4.87935V4.87934C13 4.47686 13 4.14468 12.9779 3.87409C12.9549 3.59304 12.9057 3.33469 12.782 3.09202C12.5903 2.7157 12.2843 2.40973 11.908 2.21799C11.6653 2.09434 11.407 2.04506 11.1259 2.0221C10.8553 1.99999 10.5231 1.99999 10.1206 2L10.1 2H9.5C9.22386 2 9 2.22386 9 2.5C9 2.77614 9.22386 3 9.5 3H10.1Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>				
				</Button>
<script src="https://cdn.jsdelivr.net/npm/webgl-fluid@0.3"></script>	<canvas id="DFA" style="background-image: none; background: #00000050"></canvas>
	<canvas id="FLUID" class="absolute w-full h-full" style="z-index:-1;"></canvas>
  	<Separator />
</div>