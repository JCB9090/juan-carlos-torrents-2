# JCT2


### This is a successor to Juan Carlos Torrents. It's not finished yet, but when it is, it's supposed to work better than the original

This project uses multipass-torrent to collect and index torrents from KAT.cr, torrentz.eu and provide streaming of Movies / TV Shows in Stremio.

Please look at the multipass.cfg.js file to see how it works

To run:
```
npm install
node ./node_modules/multipass-torrent/cli/multipass.js --config ./multipass.cfg.js
```

To run stremio with this add-on:
```
/Applications/Stremio.app/Contents/MacOS/Electron . --servicesPrio=http://localhost:7025
# or stremio.exe
# --servicesPrio to override the upstream one which can be activated by default because it's popular in your area
```

