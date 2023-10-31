var playerControls;
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
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

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    playerControls = event.target;
    loadPlaylist();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == 0) {
        console.log("TERMINOU!");
        // TODO: suggest a new video
    }

    if (event.data == 1) {
        var player = document.getElementById("player")
        player.classList.add("player-fullscreen");
        player.classList.remove("player-small");

        var elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        } else {
            console.log("FULLSCREEN ERROR");
        }

        HideLeftPanel();
    }
}
function stopVideo() {
    player.stopVideo();
}

function loadPlaylist() {
    var videoIds = ['maZoTHkRYuI', 'BSpZWIuiats', 'gDoVGhOrM28', '6ZIogYd0gSo', 'ZYnsuCt3vLI'];
    // playerControls.loadPlaylist(videoIds);
    playerControls.cuePlaylist(videoIds);
    Init();
}
//----------------------------------------------------------
function Init() {
    var year = localStorage.getItem("album-id");
    if (year == null) {
        year = new Date().getFullYear();
    }
    SelectYear(year);
}

function SelectYear(year) {
    UpdateStyles(year);
    UpdateYearButtons(year);
    localStorage.setItem("album-id", year);
}

function UpdateStyles(year) {
    console.log(year);
    var elem = document.getElementsByTagName("body")[0];
    for (var y = 2018; y <= 2023; y++) {
        if (y == 2020) continue;
        if (year == y) {
            elem.classList.add("body-" + y);
        } else {
            elem.classList.remove("body-" + y);
        }
    }
}

function UpdateYearButtons(year) {
    for (var y = 2018; y <= 2023; y++) {
        if (y == 2020) continue;
        var elem = document.getElementById("btn-" + y);
        if (year == y) {
            elem.classList.add("button-selected-year");
        } else {
            elem.classList.remove("button-selected-year");
        }
    }
}

function HideLeftPanel() {
    document.getElementById("left-panel").classList.add("hidden");
}

function ShowLeftPanel() {
    document.getElementById("left-panel").classList.remove("hidden");
}