## Release deployment
> To make a release you must be a team member of RPG Paper.

After cloning the repository locally run `make release`.
- The command takes three arguments:
  - `make release [REMOTE] [SEMVER] [DESCRIPTION]`
    - Example: `make release origin v0.0.1 "Release v0.0.1"`
    - The `SEMVER` argument must start with `v`

## Folders description

* **docs**             : Documentation generated with JSDoc.
* **Content**          : All the folders to copy inside the build folder after compilation.
* **Content/Datas**    : All the logic informations about the game.
* **Content/Pictures** : All the graphics used in the game.
* **Content/BR**       : Description needed.
