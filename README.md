# astro blog

![Index](/src/data/images/c3009907.png)
![Lighthouse](/lighthouse.png)

## How to create a new post with abbrlink

`create.cjs` file will help to create a new post with params title and dir, the dir default is drafts.

```bash
 pnpm run new --title='title-test'
```

The command will generate a markdown file under _src/data_ directory, and the markdown file content will look like this:

```yaml
---
title: title-test
date: 2024-04-18T02:50:36.418Z
abbrlink: 21cdefe2
---
```

## How to generate transparent svg

`fix-svg-transparent.mjs` file will help to generate transparent svg.

```bash
 pnpm run svg
```

The command will remove the background rect element from the svg file under _src/assets_ directory

## How to generate icons and favicon

`generate-icons.mjs` file will help to generate icons and favicon.

```bash
 pnpm run icons
 # or
 pnpm run icons --padding # generate icons with padding
```

The command will generate icons under _public_ directory, including pwa-48.png, pwa-64.png, pwa-72.png, pwa-96.png, pwa-192.png, pwa-512.png and favicon.svg.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
