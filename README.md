# ChangeLog Safeguard

![CI Tests status](https://github.com/adrien-febvay/changelog/actions/workflows/ci-tests.yml/badge.svg)

This utility makes sure the `CHANGELOG.md` file is updated before issuing a new version with `npm version`.

It requires to have a "# Dev" section at the beginning of the file, and changes it in "# Version x.x.x" according to
the new version number.

## Getting Started

First, install `changelog` as a development dependency using `npm`:

```sh
npm install --save-dev changelog-safeguard
```

Or install it globally:

```sh
npm install --global changelog-safeguard
```

## Add it to your version scripts

In `package.json`:
```
"scripts": {
  "preversion": "changelog check",
  "version": "changelog update && git add CHANGELOG.md"
}
```

The `preversion` script will then reject an obsolete `CHANGELOG.md` file
before `npm version` updates the `package[-lock].json` files.
Then the `version` script will update the file and stage it for the version commit.

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

The update is only for major, minor and patch versions. It ignores any kind of pre-release (version with a dash like 2.0.0-pre).

## Author notes

I just wanted a safeguard to avoid forgetting to keep the change log up-to-date.

Therefore, I kept it as simple as possible. I didn't want to gather Git commit messages either, as they are more relevent for the developers than for the users.
But if it is what you are looking for, there are some packages that can take care of it for you.

I will still improve this tool. Suggestions and contributions are welcome.
