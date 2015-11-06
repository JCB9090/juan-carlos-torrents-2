var MINUTE = 60 * 1000;
var HOUR = 60 * MINUTE;

var CATS = ["tv","movies"];

module.exports = {
	dbId: "juanCarlos crawls torrents",

	dbPath: process.env.HOME+"/juancarlos-multipass",

	retrieverSources: [process.env.RETRIEVER ? { url: process.env.RETRIEVER } : null].filter(function(x) { return x }).concat([
	    { url: "http://torcache.net/torrent/%s.torrent" },
	    { url: "http://torrage.com/torrent/%s.torrent" },
	]),

	peers: [ /* TODO; maybe put them in a local network, like MongoDB replica sets */ ],

	// can update popularity data from trackers as frequently as 4 hours
	// keep in mind some sources carry uploaders/downloaders info with them, so every time we hit them, we're going to have popularity filled in
	popularityTTL: 4*60*60*1000, 

	processingConcurrency: 8,
	
	stremioManifest: {
		id: "org.juancarlos.torrentstream",
		name: "Juan Carlos Torrents 2",
		description: "Streaming torrents collected from KAT.cr and others"
	},

	// TODO think of the trackers to get popularity from
	//  also consider rate limiting seedleech function to 1
	
	stremioAddon: 7025, // port to run stremio addon

	sources: [

		// Torrentz - seeded - this source is important
		// TODO: make sure if a torrent is hit here, we update seed/leech
		// TODO: maybe use important flag?
		{ url: "https://torrentz.eu/search?q=", interval: 10*MINUTE, important: true, category: CATS },
		{ url: "https://torrentz.eu/search?f=&p=1", interval: 10*MINUTE, important: true, category: CATS },
		//{ url: "https://torrentz.eu/search?f=&p=2", interval: 10*MINUTE, important: true, category: CATS },

		// Torrentz - recent - also important source
		{ url: "http://torrentz.eu/feed_verified?q=", interval: 5*MINUTE, important: true, stats: "torrentz" },

		// KAT - recent
		{ url: "https://kat.cr/movies/?rss=1", interval: 8*MINUTE, important: true, stats: "katrss" },
		{ url: "https://kat.cr/tv/?rss=1", interval: 8*MINUTE, important: true, stats: "katrss" },
		{ url: "https://kat.cr/highres-movies/?rss=1", interval: 8*MINUTE, important: true, stats: "katrss" },

		// JC dumps
		{ url: "http://juan-backup.herokuapp.com/top-torrents.csv", important: true },

		// KAT - dumps
		/*{ fn: 
			function(mp, callback) { 
				console.log("importing from kickass")
			},
			interval: 4*HOUR 
		}, */

		// Bitsnoop dumps 
		// see http://bitsnoop.com/info/api.html
		/*
		{ 
			url: "http://ext.bitsnoop.com/export/b3_verified.txt.gz", 
			// tracker dump is BROKEN; it returns some very crappy torrents as highly seeded
			//minSeedersUrl: "http://ext.bitsnoop.com/export/b3_e003_torrents.txt.gz", minSeeders: 5,
			category: ["tv", "movies"], type: "dump", stats: "bitsnoop",
			interval: 24*HOUR
		},
		*/

		// KAT - html scraping
		// Be smart here - maybe scale seeders to age
		// https://kat.cr/tv/{0-250}/?field=seeders&sorder=desc
		// https://kat.cr/movies/{0-300}/?field=seeders&sorder=desc
		// https://kat.cr/highres-movies/{0-300}/?field=seeders&sorder=desc

		// THESE ARE ALL DOWN
		// EZTV source 
		//{ url: "http://eztvapi.re/", type: "json", stats: "eztv" },
		//{ url: "http://api.popcorntime.io/", type: "json", stats: "eztv" },

		// We start with YTS because it's a quick way to get some quality torrents - we let the others be first though because it's a very quick way of getting the most demanded stuff
		// YTS source
		//{ url: "http://yts.to/tz_daily.txt.gz", important: true, category: true, stats: "yts" }, // category true denotes that category doesn't matter
		// TODO: backup endpoints

		// think of how to retrieve high volumes of HTML pages without getting blocked
	]
}

