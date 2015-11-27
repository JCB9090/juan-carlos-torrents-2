# JCT2


### This is a successor to Juan Carlos Torrents. It's not finished yet, but when it is, it's supposed to work better than the original

This project uses multipass-torrent to collect and index torrents from KAT.cr, torrentz.eu and provide streaming of Movies / TV Shows in Stremio.

Please look at the multipass.cfg.js file to see how it works

## To run:
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

## How do stremio add-ons work?
Stremio add-ons, unlike XBMC or Plex plug-ins, don't run locally. They are called remotely through HTTP, using the protocol implemented & documented at Stremio/stremio-addons.

Using --services or --servicesPrio arguments to stremio, you can make it load other add-ons, but none of them will be downloaded, instead they will be accessed when stremio requests the catalogue, or streams.

### Torcache fix
If you're getting a lot of errors from torcache, that's because not all their servers work all the time. Browsers and wget do well with falling back on the next A record, but multipass does not. So, do a wget on a torcache torrent, and add the IP of the successful resolution to /etc/hosts

#### Example:
What we get in multipass
```
  { [Error: connect ECONNREFUSED]
    code: 'ECONNREFUSED',
    errno: 'ECONNREFUSED',
    syscall: 'connect',
    source: 'http://torrage.com/torrent/1F5E88F043E0EF05DDC93BEF585EBAAF13387518.torrent' }
```

What we do:
```
wget http://torcache.net/torrent/1F5E88F043E0EF05DDC93BEF585EBAAF13387518.torrent
--2015-11-27 19:35:27--  http://torcache.net/torrent/1F5E88F043E0EF05DDC93BEF585EBAAF13387518.torrent
Resolving torcache.net... 94.242.255.194, 95.215.61.199, 109.163.226.148
Connecting to torcache.net|94.242.255.194|:80... 
failed: Operation timed out.
Connecting to torcache.net|95.215.61.199|:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: 54282 (53K) [application/x-bittorrent]
Saving to: '1F5E88F043E0EF05DDC93BEF585EBAAF13387518.torrent'
```

So we see, the first A record failed but the second is OK. So we add:
```
95.215.61.199 torcache.net
```
To /etc/hosts
