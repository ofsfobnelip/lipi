class लिपिquery{constructor(e){this.sel=e,this.elm=[],this.init()}init(){let e=this.sel,t=[];t="object"==typeof e?"innerHTML"in e?[e]:e:document.querySelectorAll(e),this.length=t.length;for(let e=0;e<this.length;e++)this[e]=t[e];return this.elm=t,this}html(){let e=arguments;if(0!=this.length){if(0==e.length)return this[0].innerHTML;if(1==e.length){for(let t of this.elm)t.innerHTML=e[0];return this}}}text(){let e=arguments;if(0!=this.length){if(0==e.length)return this[0].innerText;if(1==e.length){for(let t of this.elm)t.innerText=e[0];return this}}}val(){let e=arguments;if(0!=this.length){if(0==e.length)return this[0].value;if(1==e.length){for(let t of this.elm)t.value=e[0];return this}}}attr(){let e=arguments;if(0!=this.length){if(1==e.length){if("object"==typeof e[0]){for(let t of this.elm)for(let r in e[0])t.setAttribute(r,e[0][r]);return this}return this[0].getAttribute(e[0])}if(2==e.length){for(let t of this.elm)t.setAttribute(e[0],e[1]);return this}}}removeAttr(){let e=arguments;for(let t of this.elm)t.removeAttribute(e[0]);return this}trigger(){let e=arguments;for(let t of this.elm)t.dispatchEvent(new Event(e[0]));return this}on(){let e=arguments;for(let t of this.elm)t.addEventListener(e[0],e[1]);return this}append(){let e=arguments;for(let t of this.elm)t.insertAdjacentHTML("beforeend",e[0]);return this}appendHTML(){let e=arguments,t=$lf.make(e[0]);for(let e of this.elm)e.insertAdjacentElement("beforeend",t);return $l(t)}afterHTML(){let e=arguments,t=$lf.make(e[0]);for(let e of this.elm)e.insertAdjacentElement("afterend",t);return $l(t)}after(){let e=arguments;for(let t of this.elm)t.insertAdjacentHTML("afterend",e[0]);return this}before(){let e=arguments;for(let t of this.elm)t.insertAdjacentHTML("beforebegin",e[0]);return this}addClass(){let e=arguments;for(let t of this.elm)t.classList.add(e[0]);return this}removeClass(){let e=arguments;for(let t of this.elm)t.classList.remove(e[0]);return this}toggleClass(){let e=arguments;for(let t of this.elm)t.classList.toggle(e[0]);return this}focus(){if(0!=this.length)return this[0].focus(),this}css(){let e=arguments;if(0!=this.length){if(1==e.length){if("object"==typeof e[0]){for(let t of this.elm)Object.assign(t.style,e[0]);return this}return getComputedStyle(this[0])[e[0]]}if(2==e.length){for(let t of this.elm)t.style[e[0]]=e[1];return this}}}removeCss(){let e=arguments;for(let t of this.elm)t.style.removeProperty(e[0]);return this}check(){let e=arguments;if(0!=this.length)if(0==e.length)this[0].checked;else if(1==e.length){for(let t of this.elm)t.checked=e[0];return this}}show(){let e={div:"block",span:"inline"};for(let t of this.elm){let r=$l(t);if(r.removeCss("display"),"none"==r.css("display")){let l=t.tagName.toLowerCase();if(l in e)r.css("display",e[l]);else{let e=$l("body").appendHTML(`<${l}></${l}>`);r.css("display",e.css("display")),e.remove()}}}return this}hide(){for(let e of this.elm)e.style.display="none";return this}children(){let e=[];for(let t of this.elm)for(let r of t.children)e.push(r);return e}remove(){for(let e of this.elm)e.remove()}find(){let e=arguments;if(0==this.length)return;let t=$l($lf.make("<div></div>")),r=this[0].querySelectorAll(e[0]);t.length=r.length;for(let e=0;e<t.length;e++)t[e]=r[e];return t.elm=r,t}width(){if(0!=this.length)return this[0].offsetWidth}height(){if(0!=this.length)return this[0].offsetHeight}parent(){if(0!=this.length)return this[0].parentElement}parents(){if(0==this.length)return $l([]);for(var e=this[0],t=[];e;)t.push(e),e=e.parentNode;return t}offset(e){if(0==this.length)return{top:0,left:0};var t,r,l=this[0];return l?l.getClientRects().length?(t=l.getBoundingClientRect(),r=l.ownerDocument.defaultView,{top:t.top+r.pageYOffset,left:t.left+r.pageXOffset}):{top:0,left:0}:void 0}scrollLeft(){return 0==this.length?0:this[0].scrollLeft}scrollTop(){return 0==this.length?0:this[0].scrollTop}prop(){let e=arguments;return this.attr(e)}position(e=null){if(0==this.length)return{top:0,left:0};let t=this[0].getBoundingClientRect();e=this[0].parentElement.getBoundingClientRect();return{top:t.top-e.top,left:t.left-e.left}}}class लिपिutil{make(e){var t=document.createElement("div");return t.innerHTML=e.trim(),t.firstChild}ajax(e,t={}){let r=t.xhr||new XMLHttpRequest,l=!("async"in t)||t.async;if(r.open(t.type||"GET",e,l),r.send(null),"dataType"in t&&(r.responseType=t.dataType),"headers"in t)for(let e in t.headers)r.setRequestHeader(e,t.headers[e]);let i=function(){if(200==r.status){let l=r.response;return"application/json"==(e="content-type",r.getResponseHeader(e).split(";")[0])&&"json"!=r.responseType&&(l=JSON.parse(r.response)),"success"in t&&t.success(l,r),l}return"error"in t&&t.error(r),null;var e};return l?new Promise(e=>{r.onerror=(()=>e("Network Error")),r.onload=(()=>e(i()))}):i()}get(e,t={}){return t.type="GET",this.ajax(e,t)}post(e,t={}){return t.type="POST",this.ajax(e,t)}getScript(e){let t=document.createElement("script");t.src=e,$l("body")[0].appendChild(t),t.remove()}isPlainObject(e){return"object"==typeof e&&e.constructor==Object}}null!=$l&&($l=void 0);var $l=function(e){let t=new लिपिquery(e);return t.init(),t};null!=$lf&&($lf=void 0);var $lf=new लिपिutil;