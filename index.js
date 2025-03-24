var g=e=>{throw TypeError(e)};var w=(e,r,t)=>r.has(e)||g("Cannot "+t);var h=(e,r,t)=>(w(e,r,"read from private field"),t?t.call(e):r.get(e)),f=(e,r,t)=>r.has(e)?g("Cannot add the same private member more than once"):r instanceof WeakSet?r.add(e):r.set(e,t);import{a as v,S as P,i as M}from"./assets/vendor-C9cSbYTW.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function t(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(o){if(o.ep)return;o.ep=!0;const a=t(o);fetch(o.href,a)}})();var d,u;class S{constructor(){f(this,d,"https://pixabay.com/api/");f(this,u,"49429251-c344791abe1bae313073c39aa");this.page=1,this.query="",this.per_page=15}async fetchImages(){try{const r={key:h(this,u),q:this.query,image_type:"photo",orientation:"horizontal",safesearch:!0,page:this.page,per_page:this.per_page};return(await v.get(h(this,d),{params:r})).data}catch(r){throw r}}resetPage(){this.page=1}incrementPage(){this.page+=1}}d=new WeakMap,u=new WeakMap;function m(e){return Array.isArray(e)?e.map(({webformatURL:r,largeImageURL:t,tags:i,likes:o,views:a,comments:l,downloads:L})=>`
    <div class="photo-card">
      <a href="${t}">
        <img src="${r}" alt="${i}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          ${o}
        </p>
        <p class="info-item">
          <b>Views</b>
          ${a}
        </p>
        <p class="info-item">
          <b>Comments</b>
          ${l}
        </p>
        <p class="info-item">
          <b>Downloads</b>
          ${L}
        </p>
      </div>
    </div>
  `).join(""):""}const s={form:document.querySelector("#search-form"),gallery:document.querySelector(".gallery"),loadMore:document.querySelector(".load-more")},n=new S,p=new P(".gallery a");function c(e,r="error"){M.show({message:e,messageColor:"#FFFFFF",position:"topRight",timeout:3e3,close:!1,backgroundColor:r==="error"?"#EF4040":"#4CAF50"})}function y(){const e=document.createElement("div");e.classList.add("loader"),e.textContent="Loading images, please wait...",s.loadMore.after(e)}function b(){const e=document.querySelector(".loader");e&&e.remove()}async function q(e){e.preventDefault();const r=e.currentTarget.elements.searchQuery.value.trim();if(!r){c("Please enter a search query");return}n.query=r,n.resetPage(),s.gallery.innerHTML="",s.loadMore.classList.add("is-hidden"),y();try{const{hits:t,totalHits:i}=await n.fetchImages();if(t.length===0){c("Sorry, there are no images matching your search query. Please try again.");return}s.gallery.innerHTML=m(t),p.refresh(),c(`Hooray! We found ${i} images.`,"success"),t.length<i&&s.loadMore.classList.remove("is-hidden"),s.form.reset()}catch{c("Something went wrong. Please try again.")}finally{b()}}async function A(){n.incrementPage(),s.loadMore.classList.add("is-hidden"),y();try{const{hits:e,totalHits:r}=await n.fetchImages();s.gallery.insertAdjacentHTML("beforeend",m(e)),p.refresh();const t=Math.ceil(r/n.per_page);n.page>=t?(s.loadMore.classList.add("is-hidden"),c("We're sorry, but you've reached the end of search results.","error")):s.loadMore.classList.remove("is-hidden");const{height:i}=s.gallery.firstElementChild.getBoundingClientRect();window.scrollBy({top:i*2,behavior:"smooth"})}catch{c("Something went wrong. Please try again.")}finally{b()}}s.form.addEventListener("submit",q);s.loadMore.addEventListener("click",A);
//# sourceMappingURL=index.js.map
