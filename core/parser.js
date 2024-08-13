/**
 * Parses given regular expression and retures a tree.
 */
export function parser(strin) {
  try {
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
  } catch (e) {
    console.error('Invalid regular expression:', e);
    return null;
  }
}
