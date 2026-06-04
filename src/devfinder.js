// Detect the user's preferred color scheme, set the theme accordingly, and store the users preference.
class ThemeComponent {
  // Private class fields to store references to the relevant DOM elements and theme values.
  #preferDarkScheme = /** @type {MediaQueryList}*/ (
    globalThis.matchMedia('(prefers-color-scheme: dark)')
  );
  #themeToggleSelector = /**@type {string} */ ('.toggle-theme');
  #btn = /** @type {HTMLButtonElement } */ (
    document.querySelector(this.#themeToggleSelector)
  );
  #htmlRootElement = /**@type {HTMLElement} */ (document.documentElement);
  #darkTheme = /**@type {string} */ ('dark');
  #lightTheme = /**@type {string} */ ('light');
  #prefsKey = /**@type {string} */ ('devfinder-prefs');

  constructor() {
    this.#btn?.addEventListener('click', this.#toggleTheme.bind(this));
  }

  /**
   * Toggle the theme between light and dark mode, and store the users preference in localStorage.
   * @param {Event} evtObj - The click event object passed from the toggle button listener.
   * @returns {void} - Returns nothing.
   */
  #toggleTheme(evtObj) {
    const targetEl = this.#getThemeToggleElement(evtObj.target);

    if (!targetEl) return;

    const nextTheme = this.#getNextTheme(this.#htmlRootElement.dataset.theme);

    this.#htmlRootElement.dataset.theme = nextTheme;
    this.#saveThemePreference(nextTheme);
  }

  /**
   * Find the theme toggle element from the event target.
   * @param {EventTarget | null} target - The original event target.
   * @returns {Element | null} - The toggle element, or null when the target is outside the toggle.
   */
  #getThemeToggleElement(target) {
    if (!(target instanceof Element)) return null;

    return target.closest(this.#themeToggleSelector);
  }

  /**
   * Get the next theme value based on the current page theme and system preference.
   * @param {string | undefined} currentTheme - The current theme stored on the root element.
   * @returns {string} - The next theme to apply.
   */
  #getNextTheme(currentTheme) {
    if (this.#preferDarkScheme.matches) {
      return currentTheme === this.#darkTheme
        ? this.#lightTheme
        : this.#darkTheme;
    }

    return currentTheme === this.#lightTheme
      ? this.#darkTheme
      : this.#lightTheme;
  }

  /**
   * Save the selected theme in localStorage.
   * @param {string} theme - The selected theme.
   * @returns {void} - Returns nothing.
   */
  #saveThemePreference(theme) {
    localStorage.setItem(this.#prefsKey, JSON.stringify({ theme }));
  }
}

/* Steps and Features to implement */
// 1. When the user clicks search or uses the enter key on the keyboard we want to check and see if the user has entered a value in the search input field. If they have not then we want to display a message saying "Enter GitHub username"

// Create a component called 'SearchComponent'
class SearchComponent {
  // Private class fields to store references to the relevant DOM elements and theme values.
  /** @type {UIComponent} */
  #ui;
  #form = /**@type {HTMLFormElement} */ (document.getElementById('searchForm'));
  #search = /**@type {HTMLInputElement}*/ (document.getElementById('username'));
  #errorMessage = /**@type {HTMLSpanElement} */ (
    document.getElementById('search-error')
  );

  /**
   * Create a search component and connect it to the UI renderer
   * @param {UIComponent} ui - The UI component used to render the app content.
   */
  constructor(ui) {
    this.#ui = ui; // new UIComponent()
    this.#form.addEventListener('submit', this.#isUsernameEntered.bind(this));
  }

  /**
   * Check if the user has entered a username in the input field. If not then show the error message
   * @param {Event} evtObj - The click event object passed from the submit eventListener
   */
  #isUsernameEntered(evtObj) {
    evtObj.preventDefault();

    if (
      this.#search.validity.valueMissing ||
      this.#search.value.trim() === ''
    ) {
      // Here we want to display a message saying "Enter GitHub username"
      this.#showErrorMessage(this.#errorMessage, 'Enter a GitHub username');
    } else {
      // Here we want to remove the message saying "Enter GitHub username"
      this.#removeErrorMessage(this.#errorMessage, '');
      // Then we want to make make the fetch request based on the query that the user has passed in
      const query = this.#search.value.trim();
      this.#fetchGitHubUser(query);
    }
  }

  /**
   *  Fetch a GitHub user by username from the GitHub REST API. `fetch()` only rejects on network errors; HTTP 404 still resolves. This function explicitly treats HTTP 404 as an error by throwing.
   * @param {string} query - The GitHub username to look query and look up
   * @returns {Promise<void | object>} - A Promise object that resolves with the parsed JSON user object or rejects if the response status is '404'
   * @throws {Error} Rejects the returned Promise when the user is not found (404).
   */
  #fetchGitHubUser(query) {
    this.#ui.render(this.#getSkeletonUI());
    const url = `https://api.github.com/users/${query}`;
    return fetch(url)
      .then(function (response) {
        const HTTP_ERROR_NOT_FOUND = 404;
        if (response.status === HTTP_ERROR_NOT_FOUND) {
          throw new Error(`No results`);
        }
        return response.json();
      })
      .then((data) => {
        this.#ui.render(this.#getUserProfileUI(data));
        // After rendering the users details then we want to animate the users followers, following and repos count from 0 to the actual value.
        this.#ui.countStats(data.public_repos, data.followers, data.following);
      })
      .catch((error) => {
        if (error.message === 'No results') {
          this.#showErrorMessage(this.#errorMessage, error.message);
          this.#ui.render(this.#getNoResultsUI());
        } else {
          this.#showErrorMessage(this.#errorMessage, 'No connection');
          // TODO Load something on the UI related to this
        }
      });
  }

  /**
   * This method checks if the company value is a URL or not, and returns the appropriate HTML string to be rendered on the UI.
   * @param {string | null } company - The company value from the GitHub user data, which can be a string or null.
   * @returns {string} - The HTML string to be rendered for the company information on the user profile.
   */
  #checkIfCompanyIsUrl(company) {
    if (!company) {
      return `<span class="fade_not-available">Not available</span>`;
    } else if (company.startsWith('@')) {
      const INDEX_ONE = /**@type {number} */ 1;
      const companyUsername = company.slice(INDEX_ONE);
      return `<a href="https://github.com/${companyUsername}" class="link-content" target="_blank" rel="noopener noreferrer"><span>${company}</span></a>`;
    } else {
      return `<p class="company-content"><span>${company}</span></p>`;
    }
  }

  /**
   * This method gets the JavaScript value(an object) produced by parsing the JSON from the HTTP response body
   * @param {{public_repos: number, followers: number, following: number, avatar_url: string, bio: string | null, location: string | null, twitter_username: string | null, blog: string | null, created_at: string, login: string, name: string | null, company: string | null}} data - The produced JavaScript value parsed from the HTTP response body
   * @returns {string} -  The HTL structure of the User Profile as a string
   */

  #getUserProfileUI(data) {
    const displayName = data.name ?? data.login;
    const ZERO = /**@type {number} */ 0;
    const joinedDate = new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      timeZone: 'UTC',
      year: 'numeric'
    }).format(new Date(data.created_at));

    const userProfileUI = `
    <!-- User Profile UI -->
      <div class="app-profile">
        <div class="app-profile__information">
          <div class="app-profile__information__wrapper">
            <div class="app-profile__information-img">
              <img
                src="${data.avatar_url}"
                alt="${displayName}'s avatar"
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
                ${data.name ? `<p class="user-profile__name">${data.name}</p>` : `<span class="fade_not-available">Name not available</span>`}
                <p class="user-profile__username">@${data.login}</p>
              </div>
              <p class="join-date">Joined ${joinedDate}</p>
            </section>
          </div>
          <section
            class="app-profile__information-bio"
            aria-labelledby="bio-heading"
          >
            <h2 id="bio-heading" class="sr-only">Bio</h2>
            ${data.bio ? `<p class="bio-content">${data.bio}</p>` : `<span class="fade_not-available">This profile has no bio</span>`}
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
                  <span>${ZERO}</span>
                </p>
              </li>
              <li class="user-stats__followers">
                <p>
                  <span>Followers</span>
                  <span>${ZERO}</span>
                </p>
              </li>
              <li class="user-stats__following">
                <p>
                  <span>Following</span>
                  <span>${ZERO}</span>
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
                  class="${data.location ? 'available' : 'fade_not-available'}"
                  data-link-icon-theme="dark"
                  alt=""
                  aria-hidden="true"
                  src= "${new URL('../assets/images/icon-location-dark.svg', import.meta.url)}"
                  width="14"
                  height="20"
                />
                <img
                  class="${data.location ? 'available' : 'fade_not-available'}"
                  data-link-icon-theme="light"
                  alt=""
                  aria-hidden="true"
                  width="14"
                  height="20"
                  src= "${new URL('../assets/images/icon-location-light.svg', import.meta.url)}"
                />
                ${data.location ? `<p class="location-content">${data.location}</p>` : `<span class="fade_not-available">Not available</span>`}
              </li>
              <li class="user-links__social-media">
                <img
                  class="${data.twitter_username ? 'available' : 'fade_not-available'}"
                  data-link-icon-theme="dark"
                  alt=""
                  aria-hidden="true"
                  src= "${new URL('../assets/images/icon-x-dark.svg', import.meta.url)}"
                  width="20"
                  height="20"
                />
                <img
                  class="${data.twitter_username ? 'available' : 'fade_not-available'}"
                  data-link-icon-theme="light"
                  alt=""
                  aria-hidden="true"
                  src= "${new URL('../assets/images/icon-x-light.svg', import.meta.url)}"
                  width="20"
                  height="20"
                />
                ${data.twitter_username ? `<a href="https://x.com/${data.twitter_username}" class="link-content" target="_blank" rel="noopener noreferrer"><span>@${data.twitter_username}</span></a>` : `<span class="fade_not-available">Not available</span>`}
              </li>
              <li class="user-links__portfolio">
                <img
                  class="${data.blog ? 'available' : 'fade_not-available'}"
                  data-link-icon-theme="dark"
                  alt=""
                  aria-hidden="true"
                  src= "${new URL('../assets/images/icon-website-dark.svg', import.meta.url)}"
                  width="20"
                  height="20"
                />
                <img
                  class="${data.blog ? 'available' : 'fade_not-available'}"
                  data-link-icon-theme="light"
                  alt=""
                  aria-hidden="true"
                  src= "${new URL('../assets/images/icon-website-light.svg', import.meta.url)}"
                  width="20"
                  height="20"
                />
                ${data.blog ? `<a href="${data.blog}" class="link-content" target="_blank" rel="noopener noreferrer"><span>${data.blog}</span></a>` : `<span class="fade_not-available">Not available</span>`}
              </li>
              <li class="user-links__company">
                <img
                  class="${data.company ? 'available' : 'fade_not-available'}"
                  class="fade_not-available"
                  data-link-icon-theme="dark"
                  alt=""
                  aria-hidden="true"
                  src= "${new URL('../assets/images/icon-company-dark.svg', import.meta.url)}"
                  width="20"
                  height="20"
                />
                <img
                  class="${data.company ? 'available' : 'fade_not-available'}"
                  data-link-icon-theme="light"
                  alt=""
                  aria-hidden="true"
                  src= "${new URL('../assets/images/icon-company-light.svg', import.meta.url)}"
                  width="20"
                  height="20"
                />
                ${this.#checkIfCompanyIsUrl(data.company)}
              </li>
            </ul>
          </section>
        </div>
      </div>
    `;
    return userProfileUI;
  }

  /**
   * This method simply returns the No results UI stored in a variable
   * @returns {string} - The HTML structure of the No results UI as a string
   */
  #getNoResultsUI() {
    const noResultsUI = `
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
            We couldn’t find any GitHub users matching your search. Please
            double-check the username and try again.
          </p>
        </section>
      </div>
    `;
    return noResultsUI;
  }

  // UI for the loaded content from the value of the fulfilled promise

  /**
   * This method simply returns the skeleton UI stored in the variable
   * @returns {string} - The HTML structure of the skeleton loader UI as a string.
   */
  #getSkeletonUI() {
    const skeletonUI = `
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
    `;
    return skeletonUI;
  }

  // Create a method that returns the HTML strings
  /**
   * Show the error message to the user
   * @param {HTMLSpanElement} message - The span element that would be used to show the error message to the user.
   * @param {string} content - The content that would be seen on the screen
   * @returns {void}
   */

  #removeErrorMessage(message, content) {
    message.setAttribute('aria-hidden', 'true');
    message.textContent = content;
  }

  /**
   * Show the error message to the user
   * @param {HTMLSpanElement} message - The span element that would be used to show the error message to the user.
   * @param {string} content - The content that would be seen on the screen
   * @returns {void}
   */
  #showErrorMessage(message, content) {
    message.setAttribute('aria-hidden', 'false');
    message.textContent = content;
  }
}

class UIComponent {
  app = /**@type {HTMLElement} */ (document.querySelector('.app'));

  /**
   * The constructor function simply clear the current UI and then updates it will render a new UI and needed on demand.
   * @param {string} renderedUI - The HTMLElement structure to be rendered
   */
  render(renderedUI) {
    this.#clearUI();
    this.app.innerHTML = renderedUI;
  }

  /**
   * The method is used to count the followers, following and repos count from 0 to the actual value after the users details have been rendered on the UI.
   * @param {number} currentRepoStat - The current repos count value to be animated to on the UI
   * @param {number} currentFollowersStat - The current followers value to be animated to on the UI
   * @param {number} currentFollowingStat - The current following value to be animated to on the UI
   * @returns {void}
   */
  countStats(currentRepoStat, currentFollowersStat, currentFollowingStat) {
    const interval = /**@type {number} */ (4000); // 4seconds
    const UPDATE_HOURS_BY = /**@type {number} */ (1);

    const loadedUserStats = /**@type {number[]} */ ([
      currentRepoStat,
      currentFollowersStat,
      currentFollowingStat
    ]);
    const statsElements = /** @type {NodeList} */ (
      this.app.querySelectorAll(
        'li[class^="user-stats__"] > p > span:last-child'
      )
    );
    const arrayOfStatsElements = Array.from(statsElements);
    arrayOfStatsElements.forEach((statElement, statElementIndex) => {
      // Hold to we will for sure come back to this);
      let startStat = 0;
      const endStat = loadedUserStats[statElementIndex];
      const duration = Math.floor(interval / endStat);
      console.log(startStat, interval, UPDATE_HOURS_BY, endStat);

      const counter = setInterval(() => {
        startStat += UPDATE_HOURS_BY;
        statElement.textContent = `${startStat}`;

        if (startStat === endStat) {
          clearInterval(counter);
        }

        if (startStat > endStat) {
          startStat -= UPDATE_HOURS_BY;
          if (startStat === endStat) {
            statElement.textContent = `${startStat}`;
            clearInterval(counter);
          }
        }
      }, duration);
    });
  }

  #clearUI() {
    this.app.innerHTML = ``;
  }
}

/**
 * This function initializes the entire devfinder application
 * @param {ThemeComponent} themeComponent - The theme component instantiation
 * @param {SearchComponent} searchComponent - The search component instantiation
 * @returns {Array<ThemeComponent|SearchComponent>}  - The array of Components
 */
function devfinderOnIt(themeComponent, searchComponent) {
  const arrayOfComponents = [themeComponent, searchComponent];
  return arrayOfComponents;
}

devfinderOnIt(new ThemeComponent(), new SearchComponent(new UIComponent()));
