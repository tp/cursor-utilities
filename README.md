# Cursor Utilities

## Create CUR File from Canvas

To create a custom cursor for use in any modern browser (Chrome, Firefox, Edge), create a canvas with a dimension of 16x16, 32x32, or 64x64 pixels and then:

```ts
// call the `curObjectURLFromCanvas` function to retrieve an object URL pointing to a `CUR` file containing the canvas' image
const cursorObjectURL = curObjectURLFromCanvas(canvas);

// Use this URL in your inline style (or in a programatically created `StyleSheet`)
body.style.cursor = `url(${cursorObjectURL}), pointer`;
```
