JCT
====

This repository uses multipass-torrent to collect and index torrents from KAT.cr, torrentz.eu and provide streaming of Movies / TV Shows in Stremio.

Please look at the multipass.cfg.js file to see how it works

To run:
```
npm install
node ./node_modules/multipass-torrent/cli/multipass.js --config ./multipass.cfg.js
```

To run stremio with this add-on:
```
/Applications/Stremio.app/Contents/MacOS/Electron . --service=http://localhost:7025
# or stremio.exe
```
