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
