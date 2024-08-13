import State from './state.js'
/**
 * Parses given regular expression and retures a tree.
 */
export function triverse(state, head, states) {
  try {
		if(typeof(head) == 'string') {
			if(head.length == 1) {
				state.name = head;
			}
			let last = state
			head.substring(1, head.length-1).split('').forEach((child) =>{
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
					last=last.concat(z)
				})
				last.forEach((node) => {
					state.children.forEach((nod) => {
						node.children.push(nod)
					})
				})
				return last;
			}
		}
  } catch (e) {
    console.error('Error generating FA', e);
    return null;
  }
}
