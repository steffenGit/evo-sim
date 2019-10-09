"use strict";


function getRecursivly(obj, treeString) {
  let tree = treeString.split('.');
  let val = obj;

  for(let i = 0; i < tree.length; i++) {
    val = val[tree[i]];
  }

  return val;

}



function getDistance(x1, y1, x2, y2) {
  let a = x1-x2;
  let b = y1-y2;
  return Math.sqrt(a**2+b**2);
}