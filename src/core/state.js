export default class State {
			constructor(x=0, y=0, name='q0') {
				this.x = x;
				this.y = y;
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
			drawSelf(ctx) {
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
			draw(ctx) {
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

						if(this.y == child.y && this.x != child.x) {this.y+=0.1}
						let L = -(this.x-child.x)/(this.y-child.y+0.01);
						let D = Math.sqrt((this.x-child.x)*(this.x-child.x) + (this.y-child.y)*(this.y-child.y))*2/50
						let K = Math.max(Math.sqrt(26*L*L), 3)
						let Y = Math.min(Math.abs(this.y-child.y)/100, 1)

						let red = 1;
						if(child.children.some(([c, n]) => c == this) ) {
							if(this.y < child.y) { red = -1; }
							D=1;
							K=1;
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
					  // console.log(angle*180/Math.PI)
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
						child.drawSelf(ctx)  
				})		
				this.drawSelf(ctx)
			}
			connect(input, node) {
				// this.maps[input].push(node);
				this.children.push([node, input]);
			}
			setchildpos(node) {
				this.children.filter((node) => node == node)[0].relpos = 1;
			}
	}
