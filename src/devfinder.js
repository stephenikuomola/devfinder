// Detect the user's preferred color scheme, set the theme accordingly, and store the users preference.
class ThemeComponent {
  // Private class fields to store references to the relevant DOM elements and theme values.
  #preferDarkScheme = /** @type {MediaQueryList}*/ (
    globalThis.matchMedia('(prefers-color-scheme: dark)')
  );
  #btn = /** @type {HTMLButtonElement } */ (
    document.querySelector('.toggle-theme')
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
   */
  #toggleTheme(evtObj) {
    // evtObj.target is an EventTarget which may not have `closest`.
    // Narrow to Element before calling `closest` to satisfy type checks.
    const targetEl =
      evtObj.target instanceof Element
        ? evtObj.target.closest('.toggle-theme')
        : null;

    // If the click event is not from the toggle button, do nothing.
    if (!targetEl?.classList.contains('toggle-theme')) return;

    let theme = this.#htmlRootElement.dataset.theme;

    if (this.#preferDarkScheme.matches) {
      // If the page has its OS system color theme as "dark"
      // We want to add the light theme
      this.#htmlRootElement.dataset.theme =
        theme === this.#darkTheme ? this.#lightTheme : this.#darkTheme;
    } else {
      // If the page has its OS system color theme as "light"
      // We want to add the dark theme
      this.#htmlRootElement.dataset.theme =
        theme === this.#lightTheme ? this.#darkTheme : this.#lightTheme;
    }

    const userPrefs = {
      theme: this.#htmlRootElement.dataset.theme
    };

    // Covert the JavaScript object to a JSON-formatted string and store it in localStorage under the key 'devfinder-prefs'.
    localStorage.setItem(this.#prefsKey, JSON.stringify(userPrefs));
  }
}
console.log(new ThemeComponent());

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
        if (!response.ok) throw new Error(`No results`);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.#ui.render(this.#getUserProfileUI(data));
      })
      .catch((error) => {
        if (error.message === 'No results') {
          this.#showErrorMessage(this.#errorMessage, error.message);
          this.#ui.render(this.#getNoResultsUI());
        } else {
          // TODO Load something on the UI related to this
        }
      });
  }

  /**
   * This method gets the JavaScript value(an object) produced by parsing the JSON from the HTTP response body
   * @param {{avatar_url: string, login: string, name: string | null}} data - The produced JavaScript value parsed from the HTTP response body
   * @returns {string} -  The HTL structure of the User Profile as a string
   */

  #getUserProfileUI(data) {
    const displayName = data.name ?? data.login;
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
                <p class="user-profile__name">
                  The Octocat
                </p>
                <p class="user-profile__username">@octocat</p>
              </div>
              <p class="join-date">Joined 25 Jan 2021</p>
            </section>
          </div>
          <section
            class="app-profile__information-bio"
            aria-labelledby="bio-heading"
          >
            <h2 id="bio-heading" class="sr-only">Bio</h2>
            <span class="fade_not-available">This profile has no bio</span>
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
                  <span>8</span>
                </p>
              </li>
              <li class="user-stats__followers">
                <p>
                  <span>Followers</span>
                  <span>3938</span>
                </p>
              </li>
              <li class="user-stats__following">
                <p>
                  <span>Following</span>
                  <span>9</span>
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
                  class="fade_not-available"
                  data-link-icon-theme="dark"
                  alt=""
                  aria-hidden="true"
                  src="./assets/images/icon-location-dark.svg"
                  width="14"
                  height="20"
                />
                <img
                  class="fade_not-available"
                  data-link-icon-theme="light"
                  alt=""
                  aria-hidden="true"
                  width="14"
                  height="20"
                  src="./assets/images/icon-location-light.svg"
                />
                <p class="location-content">San Francisco</p>
              </li>
              <li class="user-links__social-media">
                <img
                  class="fade_not-available"
                  data-link-icon-theme="dark"
                  alt=""
                  aria-hidden="true"
                  src="./assets/images/icon-x-dark.svg"
                  width="20"
                  height="20"
                />
                <img
                  class="fade_not-available"
                  data-link-icon-theme="light"
                  alt=""
                  aria-hidden="true"
                  src="./assets/images/icon-x-light.svg"
                  width="20"
                  height="20"
                />
                <span class="fade_not-available">Not Available</span>
              </li>
              <li class="user-links__portfolio">
                <img
                  class="fade_not-available"
                  data-link-icon-theme="dark"
                  alt=""
                  aria-hidden="true"
                  src="./assets/images/icon-website-dark.svg"
                  width="20"
                  height="20"
                />
                <img
                  class="fade_not-available"
                  data-link-icon-theme="light"
                  alt=""
                  aria-hidden="true"
                  src="./assets/images/icon-website-light.svg"
                  width="20"
                  height="20"
                />
                <a href="#" class="link-content">
                  <span> https://github.blog</span>
                </a>
              </li>
              <li class="user-links__company">
                <img
                  class="fade_not-available"
                  data-link-icon-theme="dark"
                  alt=""
                  aria-hidden="true"
                  src="./assets/images/icon-company-dark.svg"
                  width="20"
                  height="20"
                />
                <img
                  class="fade_not-available"
                  data-link-icon-theme="light"
                  alt=""
                  aria-hidden="true"
                  src="./assets/images/icon-company-light.svg"
                  width="20"
                  height="20"
                />
                <a href="#" class="link-content">
                  <span>@github</span>
                </a>
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
        <div class="app-skeleton animate shimmer app-skeleton-avatar"></div>
        <div class="app-skeleton-profile-section">
          <div class="app-skeleton-profile-section__user-profile">
            <div class="app-skeleton_wrapper-username-name">
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
  #app = /**@type {HTMLElement} */ (document.querySelector('.app'));
  /**
   * The constructor function simply clear the current UI and then updates it will render a new UI and needed on demand.
   * @param {string} renderedUI - The HTMLElement structure to be rendered
   */
  render(renderedUI) {
    this.#clearUI();
    this.#app.innerHTML = renderedUI;
  }

  #clearUI() {
    this.#app.innerHTML = ``;
  }
}

console.log(new SearchComponent(new UIComponent()));
