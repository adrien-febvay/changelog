# ChangeLog

![Tests status](https://github.com/adrien-febvay/changelog/actions/workflows/test.yml/badge.svg)

This utility makes sure the `CHANGELOG.md` file is updated before issuing a new version with `npm version`.

It requires to have a "# Dev" section at the beginning of the file, and changes it in "# Version x.x.x" according to
the new version number.

It doesn't do much as it is only meant as a safeguard to avoid forgetting to keep the change log up-to-date.
Other packages are available to generate content, most often by importing Git commit messages.

## Getting Started

First, install `changelog` as a development dependency using `npm`:

```sh
npm install --save-dev @adrien/changelog
```

Or install it globally:

```sh
npm install --global @adrien/changelog
```

## Add it to your version scripts in `package.json`

```
"scripts": {
  "preversion": "changelog check",
  "version": "changelog update && git add CHANGELOG.md"
}
```

## Issuing new versions of your project

Before using `npm version`, make sure your `CHANGELOG.md` file has a "DEV" section at the beginning, otherwise it will be rejected.
```
# Dev
- The new changes

# Version 1.0.0
- The previous changes
```

Afterwards, `CHANGELOG.md` will be updated with the new version number and added to the version commit (if the version script contains `git add CHANGELOG.md` like recommended above):
```
# Version 2.0.0
- The new changes

# Version 1.0.0
- The previous changes
```

This works for major, minor and patch versions, and will ignore any kind of pre-release (version with a dash like 2.0.0-pre).
