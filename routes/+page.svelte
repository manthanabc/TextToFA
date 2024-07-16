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
	import { onMount } from 'svelte';

	
		onMount(async () => {

						var canvas = document.getElementById('DFA');
						console.log(canvas)
						canvas.width = 1100; canvas.height = 600;
						let low = '₀₁₂₃₄₅₆₇₈₉';

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
										notfix.forEach(child => {
											child.setpos(this.x+140, this.y+(--len)*300 + 150)
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
									ctx.arc(this.x, this.y, 40, 0, 2 * Math.PI);
									ctx.fillStyle = "hsl(32, 100%, 49%)"
									ctx.fillStyle = "hsl(192, 70%, 43%)"
									ctx.fillStyle = "hsl(199, 64%, 73%)"
									ctx.fill();
									ctx.beginPath();
									ctx.arc(this.x, this.y, 35, 0, 2 * Math.PI);
									ctx.fillStyle = "hsl(43, 100%, 51%)"
									ctx.fillStyle = "hsl(192, 70%, 43%)"
									ctx.fill();

									ctx.font = '30px Verdana';
									ctx.fillStyle = "black"
									ctx.fillText(this.name, this.x-15, this.y+5);  

									// ctx.fillText (this.name, this.x-40, this.y);
								}
								connect(input, node) {
									this.maps[input] = node;
								}
							}
						
							var ctx = canvas.getContext('2d');
							trackTransforms(ctx);

							// function init() {
								let l = ['0', '1'];
								// let input = "(01)|((110)|(11)|(1))|(001)"
								let input = "(01)|((11)|(00))|(001)"
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
										states.push(new State(undefined, undefined, name='q'))
										state.connect(head, states[states.length-1])
										return state
									} else {
										head.children.forEach((child) =>{
										states.push(new State(undefined, undefined, name='q'))
										// state.connect(head, states[states.length-1])
										 triverse(states[states.length-1], child)
										})
									}
								} 
								let p = new State(95, 50, "t"+low[0]);
								// triverse(p, parser(input))

								// for(let i=0; i<input.length; i++) {
									// states.push(new State(95+i*220, 50, 'q'+low[i.toString()]));
								states.push(new State( undefined, undefined, name= 'q'+low['0'] ))//.toString()] ));
								// }
								let at=0;
								for(let i=0; i<input.length-1; i++) {
								 if(l.some(c => c==input[i])) {
										let p = new State( undefined, undefined, name= 'q'+low[i.toString()] )
										let label = input[i];
										if(input[i+1] == '|') { label = input[i] + ', ' + input[i+2]}
										states[at++].connect(label, p);
										states.push(p);
									// } else {
									// 	at--
									}
								}
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

								console.log(states[1])
							// }
							function redraw(){

							
								var p1 = ctx.transformedPoint(0,0);
								var p2 = ctx.transformedPoint(canvas.width,canvas.height);
								ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);

								p.draw();
								// ctx.stroke();
								// drawState(95, 50);
								for(let i=0; i<states.length; i++) {
									states[i].draw();
								}

								ctx.save();
								ctx.restore();

			
							}
							redraw();
		
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
<div class="hidden h-full flex-col md:flex">
	<div
		class="container flex flex-col items-start justify-between space-y-4 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16"
	>
		<h2 class="text-lg font-semibold">Text to DFA</h2>
	</div>
	<Separator />
	<Tabs.Root value="complete" class="flex-1">
		<div class="container h-full py-6">
			<div class="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
				<div class="md:order-1">
						<div class="flex flex-col space-y-4">
							<div class="grid h-full gap-6 lg:grid-cols-1">
								<div class="flex flex-col space-y-4">
									<div class="flex flex-1 flex-col space-y-2">
										<Label for="input">Input</Label>
										<Textarea
											id="input"
											placeholder="We is going to the market."
											class="flex-1"
										/>
									</div>

									<div class="flex">
										<div class="grid gap-2">
											<HoverCard.Root openDelay={200}>
												<HoverCard.Trigger asChild let:builder>
													<span
														class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
														use:builder.action
														{...builder}
													>
														Controlls
													</span>
												</HoverCard.Trigger>
												<HoverCard.Content class="w-[320px] text-sm" side="left">
													Choose the interface that best suits your task. You can provide: a
													simple prompt to complete, starting and ending text to insert a
													completion within, or some text with instructions to edit it.
												</HoverCard.Content>
											</HoverCard.Root>
											<Tabs.List class="grid grid-cols-3">
												<Tabs.Trigger value="complete">
													<span class="sr-only">Complete</span>hi
												</Tabs.Trigger>
												<Tabs.Trigger value="insert">
													<span class="sr-only">Complete</span>kai
												</Tabs.Trigger>
												<Tabs.Trigger value="edit">
													<span class="sr-only">Edit</span>bye
												</Tabs.Trigger>
											</Tabs.List>
										</div>
									</div>

									<div class="flex-col space-y-2">
										<Label for="instructions">D.F.A</Label>
										<canvas id="DFA" class="bg-background border" ></canvas>
									</div>
								</div>
							</div>
						</div>
				</div>
			</div>
		</div>
	</Tabs.Root>


</div>