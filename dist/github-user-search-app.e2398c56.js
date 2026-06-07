(()=>{let e,r,t="dark",a="light";try{e=JSON.parse(localStorage.getItem("devfinder-prefs")||"{}")}catch(r){e={checkErrorMessage:r instanceof Error?r.message:String(r)}}let c=e.theme,s=globalThis.matchMedia("(prefers-color-scheme: dark)");r=c===t||c===a?c:s.matches?t:a,document.documentElement.dataset.theme=r})();
//# sourceMappingURL=github-user-search-app.e2398c56.js.map
