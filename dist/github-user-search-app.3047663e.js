function e(e){return new URL(t+(e=n.i?.[e]||e),import.meta.url).toString()}var a="u">typeof globalThis?globalThis:"u">typeof self?self:"u">typeof window?window:"u">typeof global?global:{},t="./",s={},i={},n=a.parcelRequire2f59;null==n&&((n=function(e){if(e in s)return s[e].exports;if(e in i){var a=i[e];delete i[e];var t={id:e,exports:{}};return s[e]=t,a.call(t.exports,t,t.exports),t.exports}var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,a){i[e]=a},a.parcelRequire2f59=n),n.register,Object.assign(n.i??={},{gdgDo:"icon-location-dark.d31a1b07.svg","2FG8T":"icon-location-light.f4aa6bf1.svg",lsFYJ:"icon-x-dark.03479099.svg",ecJce:"icon-x-light.217b530c.svg","1WByj":"icon-website-dark.8e88e66a.svg",gMco6:"icon-website-light.e35338c0.svg","30D4j":"icon-company-dark.2b2fb165.svg","6pxr6":"icon-company-light.3bb68027.svg"});class l{#e=globalThis.matchMedia("(prefers-color-scheme: dark)");#a=".toggle-theme";#t=document.querySelector(this.#a);#s=document.documentElement;#i="dark";#n="light";#l="devfinder-prefs";constructor(){this.#t?.addEventListener("click",this.#r.bind(this))}#r(e){if(!this.#o(e.target))return;let a=this.#c(this.#s.dataset.theme);this.#s.dataset.theme=a,this.#p(a)}#o(e){return e instanceof Element?e.closest(this.#a):null}#c(e){return this.#e.matches?e===this.#i?this.#n:this.#i:e===this.#n?this.#i:this.#n}#p(e){localStorage.setItem(this.#l,JSON.stringify({theme:e}))}}var r={};r=e("gdgDo");var o={};o=e("2FG8T");var c={};c=e("lsFYJ");var p={};p=e("ecJce");var h={};h=e("1WByj");var d={};d=e("gMco6");var m={};m=e("30D4j");var u={};u=e("6pxr6");class g{#h;#d=document.getElementById("searchForm");#m=document.getElementById("username");#u=document.getElementById("search-error");constructor(e){this.#h=e,this.#d.addEventListener("submit",this.#g.bind(this))}#g(e){if(e.preventDefault(),this.#m.validity.valueMissing||""===this.#m.value.trim())this.#f(this.#u,"Enter a GitHub username");else{this.#v(this.#u,"");let e=this.#m.value.trim();this.#_(e)}}#_(e){return this.#h.render(this.#b()),fetch(`https://api.github.com/users/${e}`).then(function(e){if(404===e.status)throw Error("No results");return e.json()}).then(e=>{this.#h.render(this.#k(e)),this.#h.countStats(e.public_repos,e.followers,e.following)}).catch(e=>{"No results"===e.message?(this.#f(this.#u,e.message),this.#h.render(this.#w())):(this.#f(this.#u,"No connection"),this.#h.render(this.#y()))})}#$(e){if(!e)return'<span class="fade_not-available">Not available</span>';if(!e.startsWith("@"))return`<p class="company-content"><span>${e}</span></p>`;{let a=e.slice(1);return`<a href="https://github.com/${a}" class="link-content" target="_blank" rel="noopener noreferrer"><span>${e}</span></a>`}}#k(e){let a=e.name??e.login,t=new Intl.DateTimeFormat("en-GB",{day:"numeric",month:"short",timeZone:"UTC",year:"numeric"}).format(new Date(e.created_at));return`
    <!-- User Profile UI -->
      <div class="app-profile">
        <div class="app-profile__information">
          <div class="app-profile__information__wrapper">
            <div class="app-profile__information-img">
              <img
                src="${e.avatar_url}"
                alt="${a}'s avatar"
                class="app-profile__img-placeholder"
              />
            </div>
            <section
              class="app-profile__information-header"
              aria-labelledby="profile-heading"
            >
              <h1 id="profile-heading" class="sr-only">Profile</h1>
              <!-- name, username, join date -->
              <div class="user-profile">
              <p class="user-profile__name">${a}</p>
                <p class="user-profile__username">@${e.login}</p>
              </div>
              <p class="join-date">Joined ${t}</p>
            </section>
          </div>
          <section
            class="app-profile__information-bio"
            aria-labelledby="bio-heading"
          >
            <h2 id="bio-heading" class="sr-only">Bio</h2>
            ${e.bio?`<p class="bio-content">${e.bio}</p>`:'<span class="fade_not-available">This profile has no bio</span>'}
          </section>

          <section
            class="app-profile__information-stats"
            aria-labelledby="stats-heading"
          >
            <h2 id="stats-heading" class="sr-only">Stats</h2>
            <!-- repos, followers, following -->
            <ul class="user-stats">
              <li class="user-stats__repos">
                <p>
                  <span>Repos</span>
                  <span>0</span>
                </p>
              </li>
              <li class="user-stats__followers">
                <p>
                  <span>Followers</span>
                  <span>0</span>
                </p>
              </li>
              <li class="user-stats__following">
                <p>
                  <span>Following</span>
                  <span>0</span>
                </p>
              </li>
            </ul>
          </section>
          <section
            class="app-profile__information-links"
            aria-labelledby="links-heading"
          >
            <h2 id="links-heading" class="sr-only">Links</h2>
            <!-- location, website, twitter, company -->
            <ul class="user-links">
              <li class="user-links__location">
                <img
                  class="${e.location?"available":"fade_not-available"}"
                  data-link-icon-theme="dark"
                  alt=""
                  aria-hidden="true"
                  src= "${new URL(r)}"
                  width="14"
                  height="20"
                />
                <img
                  class="${e.location?"available":"fade_not-available"}"
                  data-link-icon-theme="light"
                  alt=""
                  aria-hidden="true"
                  width="14"
                  height="20"
                  src= "${new URL(o)}"
                />
                ${e.location?`<p class="location-content">${e.location}</p>`:'<span class="fade_not-available">Not available</span>'}
              </li>
              <li class="user-links__social-media">
                <img
                  class="${e.twitter_username?"available":"fade_not-available"}"
                  data-link-icon-theme="dark"
                  alt=""
                  aria-hidden="true"
                  src= "${new URL(c)}"
                  width="20"
                  height="20"
                />
                <img
                  class="${e.twitter_username?"available":"fade_not-available"}"
                  data-link-icon-theme="light"
                  alt=""
                  aria-hidden="true"
                  src= "${new URL(p)}"
                  width="20"
                  height="20"
                />
                ${e.twitter_username?`<a href="https://x.com/${e.twitter_username}" class="link-content" target="_blank" rel="noopener noreferrer"><span>@${e.twitter_username}</span></a>`:'<span class="fade_not-available">Not available</span>'}
              </li>
              <li class="user-links__portfolio">
                <img
                  class="${e.blog?"available":"fade_not-available"}"
                  data-link-icon-theme="dark"
                  alt=""
                  aria-hidden="true"
                  src= "${new URL(h)}"
                  width="20"
                  height="20"
                />
                <img
                  class="${e.blog?"available":"fade_not-available"}"
                  data-link-icon-theme="light"
                  alt=""
                  aria-hidden="true"
                  src= "${new URL(d)}"
                  width="20"
                  height="20"
                />
                ${e.blog?`<a href="${e.blog}" class="link-content" target="_blank" rel="noopener noreferrer"><span>${e.blog}</span></a>`:'<span class="fade_not-available">Not available</span>'}
              </li>
              <li class="user-links__company">
                <img
                  class="${e.company?"available":"fade_not-available"}"
                  class="fade_not-available"
                  data-link-icon-theme="dark"
                  alt=""
                  aria-hidden="true"
                  src= "${new URL(m)}"
                  width="20"
                  height="20"
                />
                <img
                  class="${e.company?"available":"fade_not-available"}"
                  data-link-icon-theme="light"
                  alt=""
                  aria-hidden="true"
                  src= "${new URL(u)}"
                  width="20"
                  height="20"
                />
                ${this.#$(e.company)}
              </li>
            </ul>
          </section>
        </div>
      </div>
    `}#w(){return`
    <!-- The No results found HTML structure -->
      <div class="app-no-profile-found">
        <section
          class="app-no-result-found"
          aria-labelledby="no-github-user-found"
        >
          <h1 id="no-github-user-found" class="sr-only">
            We've found no github user
          </h1>
          <p class="app-no-profile-found__summary">No results found!</p>
          <p class="app-no-profile-found__text">
            We couldn\u{2019}t find any GitHub users matching your search. Please
            double-check the username and try again.
          </p>
        </section>
      </div>
    `}#y(){return`
    <!--The HTML structure of app the user has no internet connection -->
      <div class="app-no-internet">
        <section class="app-no-network-connection" aria-labelledby="no-network">
          <h1 id="no-network" class="sr-only">
            Looks like you have lost connection
          </h1>
          <p class="app-no-network-connection__summary">No connection!</p>
          <p class="app-no-network-connection__text">
            Please check and try it again!
          </p>
        </section>
      </div>
    `}#b(){return`
    <!-- The Skeleton Loader UI -->
      <div class="app-skeleton-body">
        <div class="app-skeleton-profile-section">
          <div class="app-skeleton-profile-section__user-profile">
            <div class ="app-skeleton-avatar">
              <div
                class="app-skeleton animate shimmer"
              ></div>
            </div>
            <div class="app-skeleton_username-name-joindate__wrapper">
              <div class="app-skeleton__username-name">
                <div
                  class="app-skeleton animate shimmer app-skeleton-line__name w-name"
                ></div>
                <div
                  class="app-skeleton animate shimmer app-skeleton-line w-username"
                ></div>
              </div>
              <div
                class="app-skeleton animate shimmer app-skeleton-line w-joindate"
              ></div>
            </div>
          </div>
          <div class="app-skeleton-profile-section__bio">
            <div class="app-skeleton animate shimmer app-skeleton-line"></div>
          </div>
          <div class="app-skeleton-profile-section__stats">
            <div
              class="app-skeleton animate shimmer app-skeleton-line__stats"
            ></div>
          </div>
          <div class="app-skeleton-profile-section__links">
            <div
              class="app-skeleton animate shimmer app-skeleton-line w-link"
            ></div>
            <div
              class="app-skeleton animate shimmer app-skeleton-line w-link"
            ></div>
            <div
              class="app-skeleton animate shimmer app-skeleton-line w-link"
            ></div>
            <div
              class="app-skeleton animate shimmer app-skeleton-line w-link"
            ></div>
          </div>
        </div>
      </div>
    `}#v(e,a){e.setAttribute("aria-hidden","true"),e.textContent=a}#f(e,a){e.setAttribute("aria-hidden","false"),e.textContent=a}}class f{app=document.querySelector(".app");render(e){this.#T(),this.app.innerHTML=e}countStats(e,a,t){let s=[e,a,t];Array.from(this.app.querySelectorAll('li[class^="user-stats__"] > p > span:last-child')).forEach((e,a)=>{let t=0,i=s[a],n=setInterval(()=>{t+=1,e.textContent=`${t}`,t===i&&clearInterval(n),t>i&&(t-=1)===i&&(e.textContent=`${t}`,clearInterval(n))},Math.floor(4e3/i))})}#T(){this.app.innerHTML=""}}new l,new g(new f);
//# sourceMappingURL=github-user-search-app.3047663e.js.map
