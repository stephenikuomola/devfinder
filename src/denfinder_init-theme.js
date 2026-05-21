// Immediately invoked function expression (IIFE) to set the initial theme before the main application logic runs, preventing a flash of unstyled content (FOUC & FOIT).
(() => {
  let prefsKey = /**@type {string} */ ('devfinder-prefs');
  const darkTheme = /**@type {string} */ ('dark');
  const lightTheme = /**@type {string} */ ('light');
  let storedPrefs;
  try {
    storedPrefs = JSON.parse(localStorage.getItem(prefsKey) || '{}');
  } catch (error) {
    storedPrefs = {
      checkErrorMessage: error instanceof Error ? error.message : String(error)
    }; // Fallback to an empty object if parsing fails or if there are no stored preferences.
  }

  const storedTheme = storedPrefs.theme;

  const preferDarkScheme = globalThis.matchMedia(
    '(prefers-color-scheme: dark)'
  );

  // Determine the initial theme based on stored preference or system preference.
  let initialTheme;

  if (storedTheme === darkTheme || storedTheme === lightTheme) {
    initialTheme = storedTheme;
  } else {
    initialTheme = preferDarkScheme.matches ? darkTheme : lightTheme;
  }

  // Set the initial theme on the root HTML element.
  document.documentElement.dataset.theme = initialTheme;
})();
