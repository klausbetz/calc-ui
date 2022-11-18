import{d as A,y as B,l as F,a as u,o as f,c as p,w as o,b as l,g as m,f as c,t as r,h as i,e as R,A as T,F as V,at as z}from"./vendor.d800d42e.js";import{i as P}from"./queries.3f5bc15e.js";const $=i(" Calculator "),D=i("settings"),E={class:"flex flex-col relative flex-1 pb-4"},L={class:"flex"},M={class:"text-2xl font-bold text-center mt-6 mb-4 flex-1"},O={class:"flex items-center"},j=i("replay"),q={class:"relative flex-1"},G={class:"absolute top-0 bottom-0 left-0 right-0 overflow-y-auto"},H=["onClick"],J={class:"grow-0 mt-2"},W=A({__name:"home",setup(K){const h=z(),x=[{text:"",value:"name"},{text:"Stk.",value:"count"},{text:"\u20AC/Stk",value:"price"},{text:"\u20AC",value:"priceTotal"}],a=B([]),v=P,w=F(()=>{const e=a.value.map(t=>t.count*parseInt(t.lineItem.priceInCents)).reduce((t,s)=>t+s,0);return d(e)});function d(e){return typeof e=="string"?(parseInt(e)/100).toFixed(2).toString():(e/100).toFixed(2).toString()}function g(e,t){return d(typeof e=="string"?parseInt(e)*t:e*t)}function C(e){const t=a.value.find(s=>s.lineItem===e);if(!t){a.value.push({lineItem:e,count:1});return}t.count++}function I(){a.value=[]}function k(e){const t=a.value.find(s=>e===s);if(!!t){if(t.count===1){a.value.splice(a.value.indexOf(t),1);return}t.count--}}return(e,t)=>{const s=u("dw-mat-icon"),_=u("dw-btn"),b=u("dw-page-header"),S=u("dw-data-table"),y=u("dw-container");return f(),p(y,{class:"flex flex-col h-full"},{default:o(()=>[l(b,null,{append:o(()=>[l(_,{to:m(h).resolveSettings().fullPath,class:"touch-manipulation"},{default:o(()=>[l(s,{variant:"two-tone"},{default:o(()=>[D]),_:1})]),_:1},8,["to"])]),default:o(()=>[$]),_:1}),c("main",E,[c("div",L,[c("p",M,r(m(w))+" \u20AC",1),c("div",O,[l(_,{class:"grow-0 touch-manipulation",onClick:I,size:"xs"},{default:o(()=>[l(s,{variant:"round"},{default:o(()=>[j]),_:1})]),_:1})])]),c("div",q,[c("div",G,[l(S,{"hide-pagination":"",headers:x,items:a.value,class:"flex-1"},{"item:name":o(({item:n})=>[c("span",{onClick:N=>k(n),class:"touch-manipulation"},r(n.lineItem.name),9,H)]),"item:count":o(({item:n})=>[i(r(n.count),1)]),"item:price":o(({item:n})=>[i(r(d(n.lineItem.priceInCents)),1)]),"item:priceTotal":o(({item:n})=>[i(r(g(n.lineItem.priceInCents,n.count)),1)]),_:1},8,["items"])])]),c("div",J,[(f(!0),R(V,null,T(m(v),n=>(f(),p(_,{onClick:N=>C(n),class:"mt-1 mr-1 touch-manipulation text-xl",size:"xl"},{default:o(()=>[i(r(n.name),1)]),_:2},1032,["onClick"]))),256))])])]),_:1})}}});export{W as default};