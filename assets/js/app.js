/* Gesper Slepet — App: i18n toggle, menu, render, filter, detail */
(function(){
  const LANG_KEY = "gs_lang";
  let lang = localStorage.getItem(LANG_KEY) || "id";

  function applyLang(l){
    lang = l;
    localStorage.setItem(LANG_KEY, l);
    document.documentElement.lang = l === "id" ? "id" : "en";
    document.querySelectorAll("[data-i18n]").forEach(el=>{
      const k = el.getAttribute("data-i18n");
      const v = TRANSLATIONS[k];
      if(v) el.textContent = v[l] || v.id;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(el=>{
      const k = el.getAttribute("data-i18n-ph");
      const v = TRANSLATIONS[k];
      if(v) el.placeholder = v[l] || v.id;
    });
    document.querySelectorAll(".lang-btn").forEach(b=>{
      b.classList.toggle("active", b.dataset.lang === l);
    });
    if(typeof renderDynamic === "function") renderDynamic();
    if(typeof renderCatalog === "function") renderCatalog();
    if(typeof renderDetail === "function") renderDetail();
    if(typeof renderFeatured === "function") renderFeatured();
  }

  function productCard(p){
    const badge = p.badge ? `<span class="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider bg-[#1C1917] text-[#E8C86A] px-3 py-1 rounded-full">${p.badge[lang]}</span>` : "";
    return `
    <article class="card-hover bg-white rounded-2xl overflow-hidden border border-[#E7DCC3] flex flex-col">
      <a href="produk-detail.html?id=${p.id}" class="relative block overflow-hidden">
        ${badge}
        <img src="${p.img}" alt="${p.name[lang]}" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/600x600/B87333/FAF6EF?text=${encodeURIComponent(p.sku)}'"
          class="w-full gallery-img hover:scale-105 transition duration-500">
      </a>
      <div class="p-5 flex flex-col flex-1">
        <p class="text-xs tracking-widest uppercase text-[#B87333] font-semibold">${p.sku} • ${p.motif} • ${p.size}</p>
        <a href="produk-detail.html?id=${p.id}" class="font-serif-display text-xl font-bold mt-1 hover:text-[#B87333] transition">${p.name[lang]}</a>
        <p class="text-sm text-stone-500 mt-1 flex-1">${p.short[lang]}</p>
        <p class="font-serif-display text-2xl font-bold text-[#8C5A2B] mt-3">${formatIDR(p.price)}</p>
        <div class="grid grid-cols-2 gap-2 mt-4">
          <a href="${waLink(p,lang)}" target="_blank" rel="noopener" class="btn-gold text-center text-sm rounded-xl px-3 py-2.5">✆ <span data-i18n="cat.order">${TRANSLATIONS["cat.order"][lang]}</span></a>
          <a href="produk-detail.html?id=${p.id}" class="btn-outline text-center text-sm rounded-xl px-3 py-2.5 font-semibold"><span data-i18n="cat.detail">${TRANSLATIONS["cat.detail"][lang]}</span></a>
        </div>
      </div>
    </article>`;
  }

  /* Landing: featured (4) + gallery + testimonials */
  window.renderFeatured = function(){
    const wrap = document.getElementById("featuredGrid");
    if(!wrap) return;
    wrap.innerHTML = PRODUCTS.filter(p=>p.featured).map(productCard).join("");
  };

  /* Catalog page */
  let fMotif = "all", fSize = "all", fQuery = "";
  window.setCatalogFilter = function(type, val){ if(type==="motif") fMotif=val; if(type==="size") fSize=val; renderCatalog(); markFilterButtons(); };
  window.setCatalogQuery = function(v){ fQuery = v.toLowerCase(); renderCatalog(); };
  function markFilterButtons(){
    const allM = document.querySelector('[data-fmotif="all"]');
    if(allM) allM.textContent = TRANSLATIONS["cat.allMotif"][lang];
    const allS = document.querySelector('[data-fsize="all"]');
    if(allS) allS.textContent = TRANSLATIONS["cat.allSize"][lang];
    document.querySelectorAll("[data-fmotif]").forEach(b=>{
      const on = b.dataset.fmotif===fMotif;
      b.className = "px-4 py-2 rounded-full text-sm font-semibold border transition " + (on ? "bg-[#1C1917] text-[#FAF6EF] border-[#1C1917]" : "bg-white text-stone-600 border-[#E7DCC3] hover:border-[#C9A227]");
    });
    document.querySelectorAll("[data-fsize]").forEach(b=>{
      const on = b.dataset.fsize===fSize;
      b.className = "px-4 py-2 rounded-full text-sm font-semibold border transition " + (on ? "bg-[#B87333] text-white border-[#B87333]" : "bg-white text-stone-600 border-[#E7DCC3] hover:border-[#C9A227]");
    });
  }
  window.renderCatalog = function(){
    const wrap = document.getElementById("catalogGrid");
    if(!wrap) return;
    markFilterButtons();
    const list = PRODUCTS.filter(p=>{
      const okM = fMotif==="all" || p.motif===fMotif;
      const okS = fSize==="all" || p.size===fSize;
      const q = fQuery.trim();
      const okQ = !q || (p.name.id+" "+p.name.en+" "+p.motif+" "+p.sku).toLowerCase().includes(q);
      return okM && okS && okQ;
    });
    document.getElementById("resultCount").textContent = list.length + (lang==="id" ? " produk" : " products");
    wrap.innerHTML = list.length ? list.map(productCard).join("")
      : `<p class="col-span-full text-center text-stone-500 py-12">${TRANSLATIONS["cat.empty"][lang]}</p>`;
  };

  /* Detail page */
  window.renderDetail = function(){
    const wrap = document.getElementById("detailWrap");
    if(!wrap) return;
    const id = new URLSearchParams(location.search).get("id") || PRODUCTS[0].id;
    const p = PRODUCTS.find(x=>x.id===id) || PRODUCTS[0];
    document.title = `${p.name[lang]} (${p.sku}) — Gesper Slepet`;
    const T = TRANSLATIONS;
    wrap.innerHTML = `
      <div class="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div class="rounded-3xl overflow-hidden ukir-border bg-white">
            <img src="${p.img}" alt="${p.name[lang]}" onerror="this.onerror=null;this.src='https://placehold.co/800x800/B87333/FAF6EF?text=${p.sku}'" class="w-full aspect-square object-cover">
          </div>
          <div class="grid grid-cols-3 gap-3 mt-4">
            ${[0,1,2].map(i=>`<img src="${p.img}" alt="detail ${i+1}" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/300x300/8C5A2B/FAF6EF?text=${p.sku}-${i+1}'" class="rounded-xl aspect-square object-cover border border-[#E7DCC3]">`).join("")}
          </div>
        </div>
        <div>
          <p class="text-xs tracking-widest uppercase text-[#B87333] font-bold">${p.sku} • ${p.motif} • Size ${p.size}</p>
          <h1 class="font-serif-display text-3xl md:text-5xl font-black mt-2 leading-tight">${p.name[lang]}</h1>
          <p class="mt-3 text-stone-600 leading-relaxed">${p.desc[lang]}</p>
          <p class="font-serif-display text-4xl font-black text-[#8C5A2B] mt-5">${formatIDR(p.price)}</p>
          <p class="text-sm mt-1 text-emerald-700 font-semibold">● ${T["detail.stock"][lang]}: ${p.stock} pcs</p>
          <div class="flex flex-wrap gap-3 mt-6">
            <a href="${waLink(p,lang)}" target="_blank" rel="noopener" class="btn-gold rounded-xl px-6 py-3.5">✆ ${T["cat.order"][lang]} — WhatsApp</a>
            <a href="katalog.html" class="btn-outline rounded-xl px-6 py-3.5 font-semibold">${T["detail.back"][lang]}</a>
          </div>
          <div class="mt-8 bg-white rounded-2xl border border-[#E7DCC3] overflow-hidden">
            <h2 class="font-serif-display font-bold text-lg px-5 py-3 border-b border-[#E7DCC3] bg-[#FAF6EF]">${T["detail.specs"][lang]}</h2>
            <dl class="divide-y divide-[#F0E6D2] text-sm">
              ${[[T["detail.material"][lang],p.material[lang]],[T["detail.dimension"][lang],p.dimension],[T["detail.weight"][lang],p.weight],[T["detail.finishing"][lang],p.finishing[lang]],[T["detail.size"][lang],"S/M/L — Size "+p.size]].map(([k,v])=>`<div class="flex justify-between gap-4 px-5 py-3"><dt class="text-stone-500">${k}</dt><dd class="font-semibold text-right">${v}</dd></div>`).join("")}
            </dl>
          </div>
          <div class="mt-4 text-xs text-stone-500 leading-relaxed">SKU: ${p.sku} • Garansi seumur hidup untuk reparasi ukir & pin / Lifetime warranty on carving & pin repairs.</div>
        </div>
      </div>
      <h2 class="font-serif-display text-2xl md:text-3xl font-bold mt-16 mb-6">${T["detail.related"][lang]}</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">${PRODUCTS.filter(x=>x.id!==p.id && x.motif===p.motif).concat(PRODUCTS.filter(x=>x.id!==p.id && x.motif!==p.motif)).slice(0,4).map(productCard).join("")}</div>`;
  };

  /* Testimonials (static bilingual via JS) */
  window.renderDynamic = function(){
    const t = document.getElementById("testiGrid");
    if(t){
      const data = [
        {n:"H. Bambang Sutrisno — Solo", img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80", id:"\"Ukirannya tajam persis seperti gesper almarhum bapak saya. Beratnya mantap, kuningan asli bukan cor murahan.\"", en:"\"The carving is sharp, just like my late father's buckle. Solid weight — real brass, not cheap casting.\""},
        {n:"Sarah Wijaya — Jakarta", img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80", id:"\"Pesan custom nama untuk wedding gift 20 pcs, hasilnya rapi semua. Admin fast respon, dikirim dengan box batik cantik.\"", en:"\"Ordered 20 custom-name pieces as wedding gifts, all neat. Fast-response admin, shipped in lovely batik boxes.\""},
        {n:"Johan van Dijk — Belanda", img:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80", id:"\"Saya kolektor sabuk etnografis. Detail Gatotkaca ini museum-grade. Pengiriman ke Amsterdam hanya 9 hari.\"", en:"\"I'm an ethnographic belt collector. This Gatotkaca detail is museum-grade. Shipping to Amsterdam took only 9 days.\""}
      ];
      t.innerHTML = data.map(x=>`
        <figure class="bg-white rounded-2xl p-6 border border-[#E7DCC3] card-hover">
          <div class="text-[#C9A227] text-xl tracking-widest">★★★★★</div>
          <blockquote class="mt-3 text-stone-700 italic leading-relaxed">${lang==="id"?x.id:x.en}</blockquote>
          <figcaption class="flex items-center gap-3 mt-5">
            <img src="${x.img}" alt="${x.n}" loading="lazy" class="w-11 h-11 rounded-full object-cover">
            <span class="font-semibold text-sm">${x.n}</span>
          </figcaption>
        </figure>`).join("");
    }
    const g = document.getElementById("galleryRow");
    if(g){
      const imgs = PRODUCTS.slice(0,6);
      g.innerHTML = imgs.map(p=>`
        <a href="produk-detail.html?id=${p.id}" class="snap-start shrink-0 w-64 md:w-72 card-hover bg-white rounded-2xl overflow-hidden border border-[#E7DCC3]">
          <img src="${p.img}" alt="${p.name[lang]}" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/600x600/B87333/FAF6EF?text=${p.sku}'" class="w-full gallery-img">
          <p class="p-3 font-serif-display font-bold text-center">${p.name[lang]}</p>
        </a>`).join("");
    }
  };

  document.addEventListener("DOMContentLoaded", ()=>{
    applyLang(lang);
    document.querySelectorAll(".lang-btn").forEach(b=>b.addEventListener("click",()=>applyLang(b.dataset.lang)));
    const menuBtn = document.getElementById("menuBtn"), mMenu = document.getElementById("mobileMenu");
    if(menuBtn && mMenu) menuBtn.addEventListener("click",()=>mMenu.classList.toggle("hidden"));
    const obs = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("visible"); obs.unobserve(e.target);} }),{threshold:.12});
    document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));
    const y = document.getElementById("year"); if(y) y.textContent = new Date().getFullYear();
  });
})();
