import{a as p,i as s,S as m}from"./assets/vendor-Dpd1z_xS.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const d of t.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function n(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(r){if(r.ep)return;r.ep=!0;const t=n(r);fetch(r.href,t)}})();const u=async(e,o=1)=>{const n=new URLSearchParams({key:"48414882-2ceb04708685b14a14771b53a",q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:15});try{return(await p.get(`https://pixabay.com/api/?${n}`)).data}catch(a){throw new Error(`HTTP error! Status: ${a.response.status}`)}},h=e=>`<li class="gallery-item">
    <a href="${e.largeImageURL}" class="gallery-link">
      <img src="${e.webformatURL}" alt="${e.tags}" width="360" class="gallery-img" loading="lazy" />
    </a>
    <ul class="gallery-list">
      <li>
        <h3>Likes</h3>
        <p>${e.likes}</p>
      </li>
      <li>
        <h3>Views</h3>
        <p>${e.views}</p>
      </li>
      <li>
        <h3>Comments</h3>
        <p>${e.comments}</p>
      </li>
      <li>
        <h3>Downloads</h3>
        <p>${e.downloads}</p>
      </li>
    </ul>
  </li>`,b=document.querySelector(".search-form"),y=document.querySelector(".gallery"),f=document.querySelector(".load-more"),l=document.querySelector(".loader-container");let i=1,c="";b.addEventListener("submit",async e=>{if(e.preventDefault(),c=e.currentTarget.elements.query.value.trim(),i=1,y.innerHTML="",l.style.display="block",f.style.display="none",!c){l.style.display="none",s.error({title:"",message:"Please complete the form",messageColor:"#fafafb",icon:"fas fa-keyboard",iconColor:"#fafafb",position:"topRight",backgroundColor:"#ef4040",color:"#fafafb"});return}try{const o=await u(c,i);if(o.total===0){s.error({title:"",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#fafafb",icon:"far fa-file-image",iconColor:"#fafafb",position:"topRight",backgroundColor:"#ef4040",color:"#fafafb"});return}g(o.hits),o.totalHits>15&&(f.style.display="block")}catch(o){s.error({message:"Something went wrong. Please try again later.",messageColor:"#fafafb",icon:"fas fa-exclamation-triangle",iconColor:"#fafafb",position:"topRight",backgroundColor:"#ef4040",color:"#fafafb"}),console.error(o)}finally{l.style.display="none",e.target.reset()}});f.addEventListener("click",async()=>{i+=1,l.style.display="block";try{const e=await u(c,i);g(e.hits),e.hits.length<15&&(f.style.display="none",s.info({message:"We're sorry, but you've reached the end of search results.",messageColor:"#fafafb",icon:"fas fa-info-circle",iconColor:"#fafafb",position:"topRight",backgroundColor:"#4e75ff",color:"#fafafb"}))}catch(e){s.error({message:"Something went wrong. Please try again later.",messageColor:"#fafafb",icon:"fas fa-exclamation-triangle",iconColor:"#fafafb",position:"topRight",backgroundColor:"#ef4040",color:"#fafafb"}),console.error(e)}finally{l.style.display="none"}});function g(e){const o=e.map(a=>h(a)).join("");y.insertAdjacentHTML("beforeend",o),new m(".gallery a",{captionsData:"alt",captions:!0,captionDelay:250}).refresh(),i>1&&setTimeout(()=>{const a=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:a*2,behavior:"smooth"})},500)}
//# sourceMappingURL=index.js.map
