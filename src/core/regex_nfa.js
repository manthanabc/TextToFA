// Minimal JS-like regex parser to postfix + Thompson NFA -> existing State graph
import State from './state.js'

const EPS = 'ε';

// Tokenize regex, handling escapes and quantifiers {m,n}
function tokenize(pattern){
  const tokens = [];
  let i=0;
  const push = (t)=>tokens.push(t);
  while(i<pattern.length){
    const c = pattern[i];
    if(c==='\\'){
      if(i+1<pattern.length){ push({type:'LIT', val: pattern[i+1]}); i+=2; continue; }
      push({type:'LIT', val:'\\'}); i++; continue;
    }
    if(c==='('){ push({type:'LP'}); i++; continue; }
    if(c===')'){ push({type:'RP'}); i++; continue; }
    if(c==='|'){ push({type:'ALT'}); i++; continue; }
    if(c==='*'){ push({type:'STAR'}); i++; continue; }
    if(c==='+'){ push({type:'PLUS'}); i++; continue; }
    if(c==='?'){ push({type:'QMARK'}); i++; continue; }
    if(c==='.'){ push({type:'DOT'}); i++; continue; }
    if(c==='{'){
      const j = pattern.indexOf('}', i+1);
      if(j===-1) throw new Error('Unclosed quantifier');
      const body = pattern.slice(i+1, j);
      const m = body.split(',').map(s=>s.trim());
      let min,max;
      if(m.length===1){ min=+m[0]; max=min; }
      else { min = m[0]===''?0:+m[0]; max = m[1]===''?Infinity:+m[1]; }
      if(Number.isNaN(min) || Number.isNaN(max)) throw new Error('Invalid quantifier');
      push({type:'BRACE', min, max}); i=j+1; continue;
    }
    if(c==='^' || c==='$') { // anchors: ignore for now
      i++; continue;
    }
    if(c==='['){
      throw new Error('Character classes [] not supported yet');
    }
    push({type:'LIT', val:c}); i++;
  }
  return tokens;
}

// Insert explicit CONCAT operators
function withConcat(tokens){
  const out=[];
  const isAtom = (t)=>['LIT','DOT','RP'].includes(t.type);
  const canStart = (t)=>['LIT','DOT','LP'].includes(t.type);
  for(let i=0;i<tokens.length;i++){
    const t=tokens[i]; out.push(t);
    const n=tokens[i+1]; if(!n) break;
    if( (isAtom(t) || ['STAR','PLUS','QMARK','BRACE'].includes(t.type)) && canStart(n) ){
      out.push({type:'CONCAT'});
    }
  }
  return out;
}

// Shunting yard to postfix
function toPostfix(tokens){
  const prec = { ALT:1, CONCAT:2, STAR:3, PLUS:3, QMARK:3, BRACE:3 };
  const out=[]; const stack=[];
  for(const t of tokens){
    if(['LIT','DOT'].includes(t.type)) out.push(t);
    else if(t.type==='LP') stack.push(t);
    else if(t.type==='RP'){
      while(stack.length && stack[stack.length-1].type!=='LP') out.push(stack.pop());
      if(!stack.length) throw new Error('Mismatched )');
      stack.pop();
    } else if(['ALT','CONCAT','STAR','PLUS','QMARK','BRACE'].includes(t.type)){
      while(stack.length){
        const top = stack[stack.length-1];
        if(top.type==='LP') break;
        if((prec[top.type]||0) >= (prec[t.type]||0)) out.push(stack.pop()); else break;
      }
      stack.push(t);
    } else {
      throw new Error('Unknown token '+t.type);
    }
  }
  while(stack.length){
    const t = stack.pop();
    if(t.type==='LP') throw new Error('Mismatched (');
    out.push(t);
  }
  return out;
}

// Thompson construction helpers returning fragments {start, accepts:Set}
function litFragment(ch){
  const s = new State(0,0,'');
  const e = new State(0,0,''); e.final=true;
  s.connect(ch, e);
  return { start:s, accepts:new Set([e]), states:[s,e] };
}
function concatFrag(a,b){
  for(const acc of a.accepts){
    acc.final=false;
    acc.connect(EPS, b.start);
  }
  return { start:a.start, accepts:b.accepts, states:[...a.states, ...b.states] };
}
function altFrag(a,b){
  const s=new State(0,0,'');
  const e=new State(0,0,''); e.final=true;
  s.connect(EPS,a.start); s.connect(EPS,b.start);
  for(const acc of a.accepts){ acc.final=false; acc.connect(EPS,e); }
  for(const acc of b.accepts){ acc.final=false; acc.connect(EPS,e); }
  return { start:s, accepts:new Set([e]), states:[s,e, ...a.states, ...b.states] };
}
function starFrag(a){
  const s=new State(0,0,'');
  const e=new State(0,0,''); e.final=true;
  s.connect(EPS, a.start); s.connect(EPS, e);
  for(const acc of a.accepts){ acc.final=false; acc.connect(EPS, a.start); acc.connect(EPS, e); }
  return { start:s, accepts:new Set([e]), states:[s,e, ...a.states] };
}
function plusFrag(a){
  // A+ = A A*
  return concatFrag(a, starFrag(a));
}
function qmarkFrag(a){
  // A? = A | ε
  return altFrag(a, litFragment(EPS));
}
function repeatFrag(a, min, max){
  if(max===Infinity){
    // A{m,} = A^m A*
    let cur = a;
    for(let i=1;i<min;i++){ cur = concatFrag(cur, a); }
    return concatFrag(cur, starFrag(a));
  }
  // build up to max with optional tails
  let cur = null;
  for(let i=0;i<min;i++) cur = cur? concatFrag(cur, a) : a;
  for(let i=min;i<max;i++){
    cur = altFrag(concatFrag(cur, a), litFragment(EPS));
  }
  return cur;
}

export function buildNFAFromRegex(pattern){
  const tokens = withConcat(tokenize(pattern));
  const postfix = toPostfix(tokens);
  const stack=[];
  for(const t of postfix){
    if(t.type==='LIT') stack.push(litFragment(t.val));
    else if(t.type==='DOT') stack.push(litFragment('.'));
    else if(t.type==='CONCAT'){
      const b=stack.pop(); const a=stack.pop();
      stack.push(concatFrag(a,b));
    } else if(t.type==='ALT'){
      const b=stack.pop(); const a=stack.pop();
      stack.push(altFrag(a,b));
    } else if(t.type==='STAR'){
      const a=stack.pop(); stack.push(starFrag(a));
    } else if(t.type==='PLUS'){
      const a=stack.pop(); stack.push(plusFrag(a));
    } else if(t.type==='QMARK'){
      const a=stack.pop(); stack.push(qmarkFrag(a));
    } else if(t.type==='BRACE'){
      const a=stack.pop(); stack.push(repeatFrag(a, t.min, t.max));
    } else {
      throw new Error('Unhandled op '+t.type);
    }
  }
  if(stack.length!==1) throw new Error('Invalid regex');
  const frag = stack[0];
  // Name states for display
  let idx=0;
  const allStates = frag.states;
  const namesMap = new Map();
  for(const s of allStates){ namesMap.set(s, `q${idx++}`); s.name = namesMap.get(s); }
  return { start: frag.start, states: allStates, EPS };
}

