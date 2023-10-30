var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
var done = false;
var paused = false;
const BAND_NAME = "First of October"
var albums = {
    "2018": [
        { "name": "Ten Hours", "year": "2018", "cover": "2018-ten-hours.jpeg" },
        { "id": "mIx9jBsWCOE", "title": "Woo!" },
        { "id": "X04DiwpTI2M", "title": "Can't Be Stopped" },
        { "id": "1fDrVDgUWLc", "title": "Two Friends" },
        { "id": "BbVH6oiRzQo", "title": "Don't Go to My House" },
        { "id": "8CfHIVXXGLw", "title": "Don't Go" },
        { "id": "iE6B-R6UXSY", "title": "Rollerbladin'" },
        { "id": "pUrzMHzMpBM", "title": "Things to Do" },
        { "id": "xOPRNTu9PsY", "title": "Always" },
        { "id": "LsYsXlB18pE", "title": "Spoilers for Playdead's Inside" },
        { "id": "GQqBzFmSuLY", "title": "Possible Band Names" }

    ],
    "2019": [
        { "name": "Gourmet Ravioli", "year": "2019", "cover": "cover-2019-ravioli.jpeg" },
        { "id": "KMp5dOdyFaY", "title": "First of October" },
        { "id": "pppkzGTvJC0", "title": "Coffee! Yeah!" },
        { "id": "0m-wBGGIBPo", "title": "Ravioli" },
        { "id": "fMVkI8v75_c", "title": "October 1" },
        { "id": "jviB7XYoqYk", "title": "Climb That Mountain!" },
        { "id": "s4wkwJBY_Jw", "title": "Thirty-First of October" },
        { "id": "TmqEZGZiuWI", "title": "Valerie" },
        { "id": "NTvWFmU_ut4", "title": "Ben Wyatt" },
        { "id": "uC5u0_xDz10", "title": "We Didn't Have Time to Get Lyrics on This One" },
        { "id": "5mIiL-o2lQU", "title": "Do You Want To?" },
    ],
    "2021": [
        { "name": "Gotta Record Everything Good", "year": "2021", "cover": "2021-greg.jpeg" },
        { "id": "2iKDK05xLXE", "title": "Miracle" },
        { "id": "aIoRpSqfCIU", "title": "Feels So Right" },
        { "id": "CxM6203NQ7w", "title": "Bookmobile" },
        { "id": "fz6MLi3y0Ig", "title": "I Am Not Afraid" },
        { "id": "TpkAILC0ubQ", "title": "Apology Melody" },
        { "id": "yr66msRAG4k", "title": "Greg!" },
        { "id": "GsnkJPk38xc", "title": "Trick or Treat" },
        { "id": "pUoTfT2S8Y0", "title": "Grandad's Dinner Party" },
        { "id": "F1tdxuXQEpM", "title": "Temporary" },
        { "id": "Ac4qXhFrJVM", "title": "Never Say Goodbye" },
        { "id": "YtBswv40Gxo", "title": "The 11th Song" }
    ],
    "2022": [
        { "name": "CHAOS", "year": "2022", "cover": "2022-chaos.jpeg" },
        { "id": "bPaWa1wuJrI", "title": "Spooky Time" },
        { "id": "2of8Sry8WtE", "title": "Headless" },
        { "id": "PhaQIGf-VzE", "title": "Good Enough" },
        { "id": "aydsBQiG5w0", "title": "Riff Lord" },
        { "id": "HQKRNOVO7LY", "title": "Jangly Bones" },
        { "id": "4vewq_GfXYs", "title": "It's Halloween" },
        { "id": "Tr3Qr1aoA6A", "title": "Left My Pants in Chicago" },
        { "id": "1nuAtrP512Y", "title": "Lonely Angel" },
        { "id": "LCMWd1mBE64", "title": "Love to Say I Love You" },
        { "id": "B8XpIhphbhY", "title": "Find The Way" }
    ],
    "2023": [
        { "name": "Across the Road", "year": "2023", "cover": "2023-road.jpeg" },
        { "id": "dHCdtWlyGfI", "title": "Across The Road" },
        { "id": "5_JIxR7mie0", "title": "Abby Rowed" },
        { "id": "8md5Wp9nkMA", "title": "It's Good to be Back" },
        { "id": "mVGJ7_wPP-0", "title": "Usually" },
        { "id": "aDOgs6J9hf0", "title": "Dorian" },
        { "id": "OI0TLqk8F0Y", "title": "Pretty Raw" },
        { "id": "2KAUVmPTJJU", "title": "Magic" },
        { "id": "9kNjtkVjsYs", "title": "Sunlight, Sunlight" },
        { "id": "SasQXLx-Av0", "title": "Make It Through the Night" },
        { "id": "e53-p_mIt7g", "title": "Live Out Loud" }
    ]
}
var playlist = [];
var albumInfo = {};



function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: '',
        playerVars: { 'controls': 0 },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
        }
    });
}

function onPlayerReady(event) {
    playerControls = event.target;
    loadPlaylist();
}


function onPlayerStateChange(event) {
    if (event.data == 0) {
        console.log("TERMINOU!");
        // TODO: suggest a new video
    }

    if (event.data == 1) {
        // playing
        paused = false;
        UpdateSongInfo();
    }

    if (event.data == 2) {
        // paused
        paused = true;
    }

    if (event.data == -1) {
        // not playing
        paused = true;
    }
}
function stopVideo() {
    player.stopVideo();
}

function loadPlaylist() {
    var albumId = GetAlbumId();
    playlist = [...albums[albumId]];
    albumInfo = playlist.shift();
    var videoIds = [];
    playlist.forEach(song => {
        videoIds.push(song["id"]);
    });
    playerControls.loadPlaylist(videoIds);
    UpdateAlbumArt(albumId);
}

function UpdateAlbumArt(albumId) {
    var albumCover = document.getElementById("album-cover");
    var className = "cover-";
    className += albumId;
    albumCover.classList.add(className);
}

function ChangeAlbum(albumId) {
    localStorage.setItem("album-id", albumId);
    location.reload();
}

function PlayPause() {
    console.log("PlayPause()");
    if (paused) {
        playerControls.playVideo();
    } else {
        playerControls.pauseVideo();
    }

}

function Stop() {
    console.log("Stop()");
    playerControls.stopVideo();
}

function Prev() {
    console.log("Prev()");
    playerControls.previousVideo();
}

function Next() {
    console.log("Next()");
    playerControls.nextVideo();
}

function ToggleAlbumSelection() {
    var playlistSelector = document.getElementById("playlist-selector");

    if (playlistSelector.classList.contains("hidden")) {
        playlistSelector.classList.remove("hidden");
    } else {
        playlistSelector.classList.add("hidden");
    }
}

function LoadAlbumsList() {
    var albumList = document.getElementById("album-list");
    for (const album in albums) {
        var albumElement = document.createElement("button");
        albumElement.classList = "album-button";
        albumElement.classList.add("cover-" + album + "-small");
        albumList.appendChild(albumElement);
        var hoverInfo = document.createElement("div");
        hoverInfo.classList.add("album-button-hover-info");
        if (album != GetAlbumId()) {
            hoverInfo.appendChild(document.createElement("div"));
            albumElement.onclick = function () { ChangeAlbum(album); };
        } else {
            hoverInfo.innerText = "Now playing...";
            albumElement.onclick = ToggleAlbumSelection;
        }
        albumElement.appendChild(hoverInfo);
    }
}

function UpdateSongInfo() {
    var data = playerControls.getVideoData();
    document.getElementById("song-info-text").innerText = data.title + " - " + BAND_NAME;

    document.getElementById("album-info-text").innerText = albumInfo.name + " (" + albumInfo.year + ")";
}

function GetAlbumId() {
    var id = localStorage.getItem("album-id");
    if (id == null) {
        id = new Date().getFullYear();
        localStorage.setItem("album-id", id);
    }

    return id;
}