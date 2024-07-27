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
  import * as Table from "$lib/components/ui/table/index.js";

  import * as Card from "$lib/components/ui/card/index.js";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
	let canvas ={}
	let goFullscreen = console.log
 
  let bookmarks = false;
  let fullUrls = true;
	let states = []

	let checked= true;
 
  const profileRadioValue = "benoit";	
		onMount(async () => {

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


						onkeydown = (event) => {
							console.log(event)
							if(event.ctrlKey && event.code=="KeyF") {
								goFullscreen()
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
									this.name = name;
									this.maps = {};
									this.highlighted = false;
									this.children = []
								}
								setpos(x, y) {
									this.x = x;
									this.y = y;
									this.children = Object.values(this.maps);
									let notfix = this.children;
									let len = notfix.length/2
									console.log(`Log for ${this.name}`)
									console.log(notfix)
									if(notfix.length == 1) {
										this.children.forEach(child => {
											child.setpos(this.x+220, this.y)
											child.relpos = 0
										});
									} else {
									  let at =0;
										notfix.forEach(child => {
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
											if(this.highlighted) {
												ctx.shadowColor = "rgb(200 0 250)";
												ctx.globalAlpha = 0.2;
												ctx.fillStyle = "rgba(255 0 0 0.9)"
											}
											child.relpos = child.relpos || 0
											ctx.bezierCurveTo(this.x, this.y + 50*child.relpos, child.x - 75, child.y, child.x, child.y)
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
									ctx.fillStyle = "hsl(199, 64%, 73%)"
									if(this.highlighted) {
										ctx.shadowColor = "rgb(200 0 250)";
										ctx.globalAlpha = 0.2;
										ctx.fillStyle = "rgba(255 0 0 0.9)"
									}
									ctx.beginPath();
									ctx.arc(this.x, this.y, 40+ this.highlighted * 10, 0, 2 * Math.PI);
									ctx.fill();
										ctx.globalAlpha = 1;
									ctx.beginPath();
									ctx.shadowColor = "rgb(55 55 250)";
									ctx.shadowBlur = 42+ this.highlighted * 10;
									if(this.highlighted) {
										ctx.shadowColor = "rgb(200 0 250)";
									}
									ctx.arc(this.x, this.y, 35 , 0, 2 * Math.PI);
									let gradient = ctx.createLinearGradient(this.x-20, this.y+20, this.x+20, this.y-20);
									// gradient.addColorStop(0.4, "#0000ff");
									// gradient.addColorStop(0.9, "#aaaaaa");
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
									ctx.shadowColor = "rgb(255 255 250)";
									ctx.shadowBlur = 0;

									// ctx.fillText (this.name, this.x-40, this.y);
								}
								connect(input, node) {
									this.maps[input] = node;
									this.children.push(node);
								}
							}
							State.taken = {}
						
							var ctx = canvas.getContext('2d');
							trackTransforms(ctx);

							let l = ['0', '1'];
							// let input = "(01)|((110)|(11)|(1))|(001)"
							let input = "((ab)|(cd))|((ef)|(gh))|(001)"
							// let input = "(01)|(11)"


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

							// let states = [];
							let triverse = (state, head) => {
								if(typeof(head) == 'string') {
									if(head.length == 1) {
										state.name = head;
									}
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
							states[0].setpos(95, 50);

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
									states.forEach(state => {
										if(Math.abs(state.x - pt.x)<80 && Math.abs(state.y - pt.y)<80) {
											state.highlighted = true;
											plight = state
											redraw();
										} else {
											state.highlighted = false;
											redraw();
										}
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
								if(evt.altKey) { if(highlighted) { start.connect(Math.random(), highlighted) }; start=undefined }
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
<div class="h-full flex-col md:flex bg-gradient-to-tr from-[#111038] via-[#000712] to-[#351033]" style="background-image: linear-gradient(var(--angle), var(--tw-gradient-stops)) !important; animation: spin 5s ease infinite">

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



				<div class="absolute right-1 h-full flex flex-col justify-between pointer-events-none">
						<div class="m-0 pt-10">
							<Card.Root class=" p-4 backdrop-blur bg-black/30 max-w-xl w-full shadow-[0px_0px_50px_2px_black] rounded-lg border-none">
							  <Card.Header>
							    <Card.Title>DFA Table</Card.Title>
							  </Card.Header>
							  <Card.Content>
											<Table.Root>
											  <Table.Header>
											    <Table.Row>
											      <Table.Head class="w-[100px]">DFA State</Table.Head>
											      <Table.Head>Type</Table.Head>
											      <Table.Head>0</Table.Head>
											      <Table.Head class="text-right">1</Table.Head>
											    </Table.Row>
											  </Table.Header>
											  <Table.Body>
											{#each states as state}
											      <Table.Row>
											        <Table.Cell class="font-medium">state.name</Table.Cell>
											        <Table.Cell>accept</Table.Cell>
											        <Table.Cell>Q0</Table.Cell>
											        <Table.Cell class="text-right">Q3</Table.Cell>
											      </Table.Row>
											      <Table.Row>
											        <Table.Cell class="font-medium">A</Table.Cell>
											        <Table.Cell>accept</Table.Cell>
											        <Table.Cell>Q0</Table.Cell>
											        <Table.Cell class="text-right">Q3</Table.Cell>
											      </Table.Row>
											      <Table.Row>
											        <Table.Cell class="font-medium">A</Table.Cell>
											        <Table.Cell>accept</Table.Cell>
											        <Table.Cell>Q0</Table.Cell>
											        <Table.Cell class="text-right">Q3</Table.Cell>
											      </Table.Row>
											{/each}		
											  </Table.Body>
											</Table.Root>				
								</Card.Content>
							</Card.Root>
						</div>

						<div class="m-0 pb-10 max-w-xl ">
							<Card.Root class=" w-full  backdrop-blur bg-black/30 shadow-[0px_0px_50px_2px_black] rounded-lg border-none">
							  <Card.Header>
							    <Card.Title>Shortcuts</Card.Title>
							  </Card.Header>
						    <Separator class="mb-2"/>
							  <Card.Content>
									<div class="flex justify-between p-0 m-0">
											        <span class="font-medium text-slate-300 pr-4">Shift + Click</span>
													    <Separator orientation="vertical" />
											        <span class="text-left text-slate-500 w-3/5">Add a new State</span>
									</div>
									<div class="flex justify-between p-0 m-0">
											        <span class="font-medium text-slate-300 pr-4">Alt + Click</span>
													    <Separator orientation="vertical" />
											        <span class="text-left text-slate-500 w-3/5">Add a transfomation</span>
									</div>
									<div class="flex justify-between p-0 m-0">
											        <span class="font-medium text-slate-300 pr-4">Ctrl + Click</span>
													    <Separator orientation="vertical" />
											        <span class="text-left text-slate-500 w-3/5">Removes a State</span>
									</div>
									<div class="flex justify-between p-0 m-0">
											        <span class="font-medium text-slate-300 pr-4">Ctrl + F</span>
													    <Separator orientation="vertical" />
											        <span class="text-left text-slate-500 w-3/5">Toggle Fullscreen</span>
									</div>
									<div class="flex justify-between p-0 m-0">
											        <span class="font-medium text-slate-300 pr-4">Ctrl + R</span>
													    <Separator orientation="vertical" />
											        <span class="text-left text-slate-500 w-3/5">Reset View</span>
									</div>
								</Card.Content>

							  <Card.Footer>
							    <p class="text-slate-500">Press F1 to open documentation</p>
							  </Card.Footer>
							  </Card.Root>
						</div>
				</div>
	<script src="https://cdn.jsdelivr.net/npm/webgl-fluid@0.3"></script>	<canvas id="DFA" style="background-image: none; background: #00000050"></canvas>
	<canvas id="FLUID" class="absolute w-full h-full" style="z-index:-1;"></canvas>
  	<Separator />
</div>
