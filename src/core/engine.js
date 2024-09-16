import State from '../core/state.js'
import { FA_states, canvas_contex, reload ,input } from '../store.js';  
import { triverse  } from '../core/traverser.js'
import { parser } from '../core/parser.js'

let engine = {};
let canvas = {};
let ctx = {}
let low = '₀₁₂₃₄₅₆₇₈₉';

let sub_input;

engine.inputchanged = (input) => {
	State.taken=[]
	let tempstates = []
	let p = new State(95, 50, "t");
	tempstates.push(p)
	triverse(p, parser(input), tempstates)
	tempstates[0].setpos(200, 450);
	FA_states.update((states) => states = tempstates );
	redraw();
}

let goFullscreen = async () => {
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

let onkeydown = (event) => {
	if(event.ctrlKey && event.code=="KeyF") {
		goFullscreen()
	}
	if(event.altKey && event.code=="KeyG") {
   redraw();
	}
};

let redraw = () =>{
	if(!ctx.transformedPoint) return;
	var p1 = ctx.transformedPoint(0,0);
	var p2 = ctx.transformedPoint(canvas.width, canvas.height);
	ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	FA_states.update((states) => {
		for(let i=0; i<states.length; i++) {
			states[i].draw(ctx);
		}
		return states;
	})

	ctx.save();
	ctx.restore();
}

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

engine.load= async() => {
		let goFullscreen = console.log
		let open = false; 
		let bookmarks = false;
		let fullUrls = true;
		let theme = "lover"
		let running = true;

		let checked= true;
		let redraw = console.log
		let resetState = console.log
		
		// Canvas code
		canvas = document.getElementById('DFA');
	
		canvas.width = 1100; canvas.height = 600;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		// Subscribe in order to read form input		
		input.subscribe((value) => (sub_input = value));

		// Event Listneres for Shortcuts			
		document.addEventListener(
			"keydown", 
			function (e) {
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
	  });

		ctx = canvas.getContext('2d');
		trackTransforms(ctx);
		State.taken = {}
		
		// resetState();
		let p = new State(95, 50, "t"+low[0]);
		let tempstates = []
		tempstates.push(p)
		let finals = triverse(p, parser(sub_input), tempstates)
		console.log(finals)
		tempstates[0].setpos(200, 450);
		FA_states.update((states) => states = tempstates)

		redraw();
		init();

		console.log(sub_input)
}

export default engine;
