# Sniffies TODO

## GitHub Actions release pipeline

Add `.github/workflows/release.yml` to the SniffiesProjects repo. See blog session notes for the full YAML.

- Triggers on `v*` tags
- Builds bookmarklet (`bookmarklet/dist/inject.js`) and Chrome extension (`client/dist.zip`)
- Publishes both as assets on a GitHub Release via `softprops/action-gh-release`
- Decide: standardize on `yarn` or `npm` across subpackages (currently both `yarn.lock` files exist but root has no lockfile)

Once the pipeline is live, release asset URLs will be stable:
```
https://github.com/deckmasterbeam/SniffiesProjects/releases/latest/download/inject.js
https://github.com/deckmasterbeam/SniffiesProjects/releases/latest/download/dist.zip
```

## Blog: update InstallButton

`src/components/ui/InstallButton.tsx` currently points to `/sniffies.user.js` (a placeholder in `public/`).

Once the release pipeline is up:
- Point the iOS install button at the GitHub Release `inject.js` URL
- Add a second button / download link for the Chrome extension zip
- Delete `public/sniffies.user.js`

## Blog: publish the sniffies v1 release post

`src/content/blog/sniffies-v1-release.mdx` is still `draft: true`.

- Fill in the release notes
- Update the `InstallButton` href to the live asset URL
- Flip `draft: false`

## Blog: sniffies project page

`src/content/projects/sniffies.md` doesn't exist yet — there's no sniffies project landing page.

- Create `src/content/projects/sniffies.md` with `projectTag: sniffies` and `repo: https://github.com/deckmasterbeam/SniffiesProjects`
- The page will auto-render the SniffiesProjects README and list release cards
