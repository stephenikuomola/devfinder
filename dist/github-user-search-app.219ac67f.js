// Detect the user's preferred color scheme, set the theme accordingly, and store the users preference.
class ThemeComponent {
    // Detect the users current theme
    #currentTheme = /**@type {string | null}*/ localStorage.getItem('theme');
    #preferDarkScheme = /** @type {MediaQueryList}*/ globalThis.matchMedia('(prefers-color-scheme: dark)');
    #btn = /** @type {HTMLButtonElement } */ document.querySelector('.toggle-theme');
    #htmlRootElement = /**@type {HTMLElement} */ document.documentElement;
    #colorTheme = /**@type {HTMLSpanElement} */ document.querySelector('.color-theme');
    #darkTheme = /**@type {string} */ 'dark';
    #lightTheme = /**@type {string} */ 'light';
    constructor(){
        this.#initTheme();
        this.#btn?.addEventListener('click', this.#toggleTheme.bind(this));
        console.log(this.#currentTheme);
    }
    /**
   * Toggle the theme between light and dark mode, and store the users preference in localStorage.
   * @param {Event} evtObj - The click event object passed from the toggle button listener.
   */ #toggleTheme(evtObj) {
        // evtObj.target is an EventTarget which may not have `closest`.
        // Narrow to Element before calling `closest` to satisfy type checks.
        const targetEl = evtObj.target instanceof Element ? evtObj.target.closest('.toggle-theme') : null;
        // If the click event is not from the toggle button, do nothing.
        if (!targetEl?.classList.contains('toggle-theme')) return;
        let theme = this.#htmlRootElement.dataset.theme;
        if (this.#preferDarkScheme.matches) // If the page has its OS system color theme as "dark"
        // We want to add the light theme
        this.#htmlRootElement.dataset.theme = theme === this.#darkTheme ? this.#lightTheme : this.#darkTheme;
        else // If the page has its OS system color theme as "light"
        // We want to add the dark theme
        this.#htmlRootElement.dataset.theme = theme === this.#lightTheme ? this.#darkTheme : this.#lightTheme;
        // Set the theme to the opposite of the current theme, and store the users preference in localStorage.
        localStorage.setItem('theme', this.#htmlRootElement.dataset.theme);
    // this.#colorTheme.textContent = this.#htmlRootElement.dataset.theme;
    }
    // Run an if check based on the users current theme, and set the theme accordingly.
    #initTheme() {
        if (this.#currentTheme === this.#darkTheme) // Toggle the theme to dark mode if the users current theme is dark, and store the users preference in localStorage.
        this.#htmlRootElement.dataset.theme = this.#darkTheme;
        if (this.#currentTheme === this.#lightTheme) // Toggle the theme to light mode if the users current theme is light, and store the users preference in localStorage.
        this.#htmlRootElement.dataset.theme = this.#lightTheme;
    }
}
console.log(new ThemeComponent());

//# sourceMappingURL=github-user-search-app.219ac67f.js.map
