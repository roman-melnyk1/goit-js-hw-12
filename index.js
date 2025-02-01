import{a as f,S as w,i}from"./assets/vendor-Dpd1z_xS.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const y=async(e,r=1)=>{const s=new URLSearchParams({key:"48414882-2ceb04708685b14a14771b53a",q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15});try{return(await f.get(`https://pixabay.com/api/?${s}`)).data}catch(a){throw new Error(`HTTP error! Status: ${a.response.status}`)}},L=e=>`<li class="gallery-item">
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
  </li>`,b=document.querySelector(".search-form"),h=document.querySelector(".gallery"),l=document.querySelector(".load-more"),p=document.querySelector(".loading-message");let n=1,c="",m=new w(".gallery a",{captionsData:"alt",captionDelay:250});const u=document.querySelector(".loader-container");b.addEventListener("submit",async e=>{if(e.preventDefault(),c=e.target.query.value.trim(),n=1,h.innerHTML="",l.style.display="none",u.classList.remove("loader-off"),!c){u.classList.add("loader-off"),i.error({message:"Please enter a search term.",position:"topRight"});return}try{const r=await y(c,n);if(r.hits.length===0){i.info({message:"Sorry, there are no images matching your search query.",position:"topRight"});return}g(r.hits),m.refresh(),r.totalHits>15&&(l.style.display="block")}catch{i.error({message:"Something went wrong. Please try again later.",position:"topRight"})}finally{u.classList.add("loader-off")}});l.addEventListener("click",async()=>{l.style.display="none",p.style.display="block";try{n+=1;const e=await y(c,n);g(e.hits),m.refresh();const r=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"}),n*15>=e.totalHits?i.info({message:"You've reached the end of search results.",position:"topRight"}):l.style.display="block"}catch{i.error({message:"Failed to load more images.",position:"topRight"})}finally{p.style.display="none"}});function g(e){const r=e.map(s=>L(s)).join("");h.insertAdjacentHTML("beforeend",r)}
//# sourceMappingURL=index.js.map
