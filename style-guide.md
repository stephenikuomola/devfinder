# User Search App Style Guide

The devfinder app should be responsive across all devices

- Mobile - 320px
- Tablet - 768px
- Desktop - 1440px

## Colors

```css
--neutral-0: hsl(0, 0%, 100%); 
--neutral-100: hsl(227, 100%, 98%);
--neutral-200:hsl(222, 44%, 70%);
--neutral-500: hsl(217, 35%, 45%);
--neutral-700:hsl(217, 21%, 21%);
--neutral-800: hsl(222, 41%, 20%)
--neutral-900: hsl(220, 40%, 13%);
--neutral-300: hsl(217, 20%, 51%);
--blue-300: hsl(212, 100%, 69%);
--blue-500: hsl(212, 100%, 50%);
--red-500: hsl(0, 92%, 62%); 
```

## Size

```css
--size-0:0; 
--size-025: 2px;
--size-075: 6px;
--size-125: 10px;  
--size-500: 40px;

```

## Display

```css
--hidden: none;
--block: block;
--inline: inline;
--inline-block: inline-block;
--flex: flex;
--inline-flex: inline-flex;
--grid: grid;
--inline-grid: inline-grid;
```

## Radius

```css
--radius-0: 0; 
--radius-7: 4px;
--radius-8: 6px;
--radius-9: 8px;
--radius-10:10px;
--radius-11: 12px;
--radius-12: 15px;
--radius-13: 20px;
--radius-14: 24px;
--radius-15: 26px;
--radius-16: 28px;
--radius-17: 30px;
--radius-18: 34px;
--radius-19: 36px;
--radius-20: 38px;
--radius-21: 40px;
--radius-full: 999px; 

/* Comes from Open-Props package */
--radius-1: 2px;
--radius-2: 5px;
--radius-3: 1rem; /* 16px */
--radius-4: 2rem; /* 32px */
--radius-5: 4rem; /* 64px */
--radius-6: 8rem; /* 128px */
```

## Favicon Links

```html
<link
  rel="apple-touch-icon"
  sizes="180x180"
  href="/assets/favicons/apple-touch-icon.png"
/>
<link
  rel="icon"
  type="image/png"
  sizes="32x32"
  href="/assets/favicons/favicon-32x32.png"
/>
<link
  rel="icon"
  type="image/png"
  sizes="16x16"
  href="/assets/favicons/favicon-16x16.png"
/>
<link rel="manifest" href="/assets/favicons/site.webmanifest" />
```

## Typography

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

```css
--ff-space-mono-monospace: var(--ff-manrope), monospace;
--ff-space-mono: 'Space Mono';
--font-size-9: 1.625rem;
--font-size-10: 1.375rem; 
--font-size-11: 1.125rem; 
--font-size-12: 0.8125rem;
--font-size-13: 0.9375rem;
--font-lineheight-6: 1.2;
--font-lineheight-7: 1.4;
 
 
.space-mono-regular {
  font-family: "Space Mono", monospace;
  font-weight: 400;
  font-style: normal;
}

.space-mono-bold {
  font-family: "Space Mono", monospace;
  font-weight: 700;
  font-style: normal;
}

```

## Resets

```css
* {
  margin: 0;
  padding: 0;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  overflow: hidden;
  /* The style below prevents font-style inflation */
  text-size-adjust: none;
  -moz-text-size-adjust: none;
  -webkit-text-size-adjust: none;
}

/* Set core root defaults */
html:focus-within {
  scroll-behavior: smooth;
}

/* Avoid text overflow */
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

/* Balance text wrappings on the heading */
h1,
h2,
h3,
h4,
h5,
h6 {
  text-wrap: balance;
}

/* Improve line wrapping */
p {
  text-wrap: pretty;
}

h1,
h2,
h3,
h4,
button,
input,
label {
  line-height: 1.1;
}

/* Improve media defaults */
img,
picture,
video,
canvas,
svg {
  max-width: 100%;
  height: auto;
  display: var(--block);
}

body {
  width: 100%;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}

/* All buttons should have this style */
button {
  appearance: none;
  background: none;
  border: none;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
}

/* Inherits fonts for input and buttons */
input,
button,
textarea,
select {
  font: inherit;
}

/* Remove the text-decoration style for all anchor elements */
a {
  text-decoration: none;
  color: inherit;
}

/* Remove the mark of the list items */
li {
  list-style-type: none;
  color: inherit;
}

/* We make sure that the text areas without rows are not tiny */
textarea:not([rows]) {
  min-height: 10em;
}

/* All anchor and button elements have an outline of none when focused */
a:focus,
button:focus {
  outline: none;
}

/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
  color: currentColor;
}

/* Anything that has been anchored to should have an extra scroll margin */
:target {
  scroll-margin-block: 5ex;
}

/* Remove all animations and transitions for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```