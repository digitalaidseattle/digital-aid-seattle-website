# Accessibility practices

Documenting implementation choices for improving accessibility of the website.

## **Put the navigation links inside a `<nav>` and `<ul>`**

- Improves screen reader use: semantic HTML elements like `<nav>` help screen readers understand what the section represents, so it can tell users that the following links are for navigation. The `<ul>` announces how many links there are in the list. [Source: w3.org](https://www.w3.org/WAI/tutorials/menus/structure/)

## Use semantic HTML for MUI components

- Heading elements (`h1`, `h2`, etc.) are important for making websites easy to navigate for screen readers. They also need to be used in a hierarchical way, where there is one top-level `h1` and heading levels aren't skipped! [Source: w3.org](https://www.w3.org/WAI/WCAG21/Understanding/headings-and-labels)
  - This is why it's recommended to separate styling from semantics: so we can label the page elements accurately, without causing styling conflicts.
- By default, `Typography` renders as `span`. In order to make sure the document knows to render a component as a heading, pass it the `component` prop, which is accessible to any MUI component! (like `component="h1"`) [See MUI docs](https://mui.com/material-ui/react-typography/#changing-the-semantic-element)
- I also made sure to add `component="ul"` to sections that have a long list, so screen readers can recognize those sections as a list.

## **Navigation links are a single `Link`**, instead of being a `Button` with a `Link` inside it.

- Improves screen reader use: before, each link was announced as 'clickable button link', instead of just 'link'.
- Improves keyboard navigation: before, keyboard-only users would have to 'tab' each link twice, since buttons and links are both individually keyboard-focusable. with this change, tabbing through the site is smoother.

## **Decorative images are given empty alt tag** `alt=""`

- Images that are solely for aesthetic purposes (like the circuit lines in the homepage hero) should be given an `alt=""`, which signals the screen reader to skip over it. Doing away with the alt entirely can cause screen readers to read the file path, which we don't want either. [Source: w3.org](https://www.w3.org/WAI/tutorials/images/decorative/)

**TLDR; always use semantic HTML! When using a library with Material UI, inspect the page to make sure that the elements are being rendered semantically. Screen reader testing is helpful for catching weird behavior you otherwise wouldn't know about.**

## Notes

- for `CardMedia` images, I tested out the alt tag, and it seems to work. Whether we should use them depends on if we decide if the image is informative or decorative, which I'm still unsure about.
- The screen reader I used was [NVDA](https://www.nvaccess.org/), which is free and open source. I found it simple enough to pick up for the purpose of testing a website.

### Future considerations

- A 'skip to main content' option for keyboard users/screen reader users is a nice-to-have.
