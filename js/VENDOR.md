# Homepage libraries

The homepage loads these versioned files before `bundle-min.js`:

| Library | Version | Source |
| --- | --- | --- |
| jQuery | 3.7.1 | https://code.jquery.com/jquery-3.7.1.min.js |
| jQuery Migrate | 3.5.2 | https://code.jquery.com/jquery-migrate-3.5.2.min.js |
| jQuery Address | 1.6.0 | `jquery-address@1.6.0`, `src/jquery.address.js` from https://github.com/lgaticaq/jquery-address |

The jQuery Migrate source map is copied from the same package release.
The Address source retains its license header, with the package version
substituted for its unexpanded version placeholder.

Migrate supports the older bundled plugins during the jQuery upgrade. Keep it
until those plugins have been updated and tested without the compatibility layer.
