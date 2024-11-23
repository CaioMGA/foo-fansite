var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
var done = false;
var paused = false;
const BAND_NAME = "First of October"
var albums = {
    //2 second video for testing
    // { "id": "TK4N5W22Gts", "title": "TEST" },
    "2018": [
        { "name": "Ten Hours", "year": "2018", "cover": "2018/album-cover.jpeg" },
        { "id": "mIx9jBsWCOE", "title": "Woo!" },
        { "id": "X04DiwpTI2M", "title": "Can't Be Stopped" },
        { "id": "1fDrVDgUWLc", "title": "Two Friends" },
        { "id": "BbVH6oiRzQo", "title": "Don't Go to My House" },
        { "id": "8CfHIVXXGLw", "title": "Don't Go" },
        { "id": "iE6B-R6UXSY", "title": "Rollerbladin'" },
        { "id": "pUrzMHzMpBM", "title": "Things to Do" },
        { "id": "xOPRNTu9PsY", "title": "Always" },
        { "id": "LsYsXlB18pE", "title": "Spoilers for Playdead's Inside" },
        { "id": "GQqBzFmSuLY", "title": "Possible Band Names" },

    ],
    "2019": [
        { "name": "Gourmet Ravioli", "year": "2019", "cover": "2019/album-cover.jpeg" },
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
        { "name": "Gotta Record Everything Good", "year": "2021", "cover": "2021/album-cover.jpeg" },
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
        { "name": "CHAOS", "year": "2022", "cover": "2022/album-cover.jpeg" },
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
        { "name": "Across the Road", "year": "2023", "cover": "2023/album-cover.jpeg" },
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
    ],
    "2024": [
        {"name": "Round 6", "year":"2024", "cover":"2024/album-cover.jpeg"},
        { "id": "oQZ-gYk5Th0", "title": "Start!" },
        { "id": "EWcik3HMwaE", "title": "Round 6" },
        { "id": "Dbe58jAt7C8", "title": "Dungeoun Man" },
        { "id": "BBZpSPkjRys", "title": "Day Old Milk" },
        { "id": "uNt41oLNhOk", "title": "Final Boss" },
        { "id": "hh7Q2Dm4rHo", "title": "Infinite Lives" },
        { "id": "jlBnWxufs08", "title": "Same Old Game" },
        { "id": "3JcRXj3r_iQ", "title": "I Am a Full Grown Man and I'm Wearing a Retainer" },
        { "id": "PshWLo0MMns", "title": "Let's Fight!" },
        { "id": "J8o0Z9Vp258", "title": "Infinite Knives" },
        { "id": "KZCUyYlASw8", "title": "It's Time to Move On" }
    ],
    "funny": [
        {"name": "Funny Playlist", "year":"2024", "cover":"msc/playlist-cover-funny.jpeg"},
        { "id": "1fDrVDgUWLc", "title": "Two Friends", "year": "2018"},
        { "id": "BbVH6oiRzQo", "title": "Don't Go to My House", "year": "2018"},
        { "id": "s4wkwJBY_Jw", "title": "Thirty-First of October", "year": "2019"},
        { "id": "fz6MLi3y0Ig", "title": "I Am Not Afraid", "year": "2021"},
        { "id": "GsnkJPk38xc", "title": "Trick or Treat", "year": "2021"},
        { "id": "Tr3Qr1aoA6A", "title": "Left My Pants in Chicago", "year": "2022"},
        { "id": "5_JIxR7mie0", "title": "Abby Rowed", "year": "2023"},
        { "id": "SasQXLx-Av0", "title": "Make It Through the Night", "year": "2023"},
        { "id": "3JcRXj3r_iQ", "title": "I Am a Full Grown Man and I'm Wearing a Retainer", "year": "2024"},
    ],
    "editors-picks": [
        {"name": "Editor Picks", "year":"2024", "cover":"msc/playlist-cover-editors-picks.jpeg"},
        { "id": "BbVH6oiRzQo", "title": "Don't Go to My House", "year": "2018"},
        { "id": "fMVkI8v75_c", "title": "October 1", "year":"2019" },
        { "id": "fz6MLi3y0Ig", "title": "I Am Not Afraid", "year":"2021"  },
        { "id": "HQKRNOVO7LY", "title": "Jangly Bones", "year":"2022" },
        { "id": "9kNjtkVjsYs", "title": "Sunlight, Sunlight", "year":"2023" },
        { "id": "BBZpSPkjRys", "title": "Day Old Milk", "year":"2024" },
    ]
}
var playlist = [];
var albumInfo = {};
var curSongPlayTime = 0;
var curSongDuration = 0;
var progressInterval;
const PROGRESS_UPDATE_INTERVAL = 250;
const PROGRESS_UPDATE_TIME_INCREMENT = 0.25;


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
        ToggleAlbumSelection();
        UpdatePlaylistState(-1);
        Stop();
    }

    if (event.data == 1) {
        // playing
        paused = false;
        UpdateSongInfo();
        curSongPlayTime = playerControls.getCurrentTime();
        curSongDuration = playerControls.getDuration();
        SetProgressBar();
        UpdatePlaylistState(playerControls.getPlaylistIndex());
    }

    if (event.data == 2) {
        // paused
        paused = true;
        curSongPlayTime = playerControls.getCurrentTime();
        curSongDuration = playerControls.getDuration();
        MoveProgressBar();
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
    document.getElementById("album-name-big").textContent = albumInfo.name + " (" + albumInfo.year + ")";
    document.getElementById("band-name-big").textContent = BAND_NAME;

    var videoIds = [];
    playlist.forEach(song => {
        videoIds.push(song["id"]);
    });
    playerControls.loadPlaylist(videoIds);
    UpdateAlbumArt(albumId);
    CreateSongList();
    UpdatePlaylistState(0);
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
    if (paused) {
        document.getElementById("play-button").classList.add("hidden");
        document.getElementById("pause-button").classList.remove("hidden");
        playerControls.playVideo();
        ResumeProgressBar();
    } else {
        document.getElementById("play-button").classList.remove("hidden");
        document.getElementById("pause-button").classList.add("hidden");
        playerControls.pauseVideo();
        PauseProgressBar();
    }

}

function Stop() {
    playerControls.stopVideo();
    document.getElementById("play-button").classList.remove("hidden");
    document.getElementById("pause-button").classList.add("hidden");
    StopProgressBar();
}

function Prev() {
    playerControls.previousVideo();
    document.getElementById("play-button").classList.add("hidden");
    document.getElementById("pause-button").classList.remove("hidden");
}

function Next() {
    playerControls.nextVideo();
    document.getElementById("play-button").classList.add("hidden");
    document.getElementById("pause-button").classList.remove("hidden");
}

function CreateSongList() {
    for (var songIndex = 0; songIndex < playlist.length; songIndex++) {
        CreateSongListItem(songIndex, playlist[songIndex].title);
    }
}

function CreateSongListItem(index, songName) {
    var list = document.getElementsByClassName("playlist__list")[0];
    let temp = document.getElementsByTagName("template")[0];
    let clon = document.importNode(temp.content, true);

    // Modify the cloned content with song details
    var button = clon.querySelector('.playlist__list__item');
    button.setAttribute("onclick", "SelectSong(" + index + ")");
    var name = clon.querySelector('.playlist__list__item__name');
    name.textContent = songName;

    list.appendChild(clon);
}

function SelectSong(index) {
    playerControls.playVideoAt(index);

    UpdatePlaylistState(index);
}

function UpdatePlaylistState(index) {
    var list = document.getElementsByClassName("playlist__list")[0];

    for (let i = 0; i < playlist.length; i++) {
        if (index == i) {
            list.children[i].querySelector(".playlist__list__item").classList.add("playing");
        } else {
            list.children[i].querySelector(".playlist__list__item").classList.remove("playing");
        }
    }
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

function SetProgressBar() {
    //prevents division by zero
    if (progressInterval != null) {
        clearInterval(progressInterval);
        progressInterval = null;
    }
    progressInterval = setInterval(MoveProgressBar, PROGRESS_UPDATE_INTERVAL);
}

function MoveProgressBar() {
    // why this?
    // the fewer requests to the youtube api the better
    curSongPlayTime += PROGRESS_UPDATE_TIME_INCREMENT;
    if (curSongDuration < 1) {
        curSongDuration = playerControls.getDuration();
    }
    var progress = curSongPlayTime / curSongDuration;
    if (progress > 1) {
        clearInterval(progressInterval);
        progressInterval = null;
    }

    if (!isFinite(progress)) {
        progress = 0;
    }

    document.getElementById("song-progress").value = progress;
    document.getElementById("song-time").textContent = GetFormattedTime(curSongPlayTime) + " / " + GetFormattedTime(curSongDuration);
}

function PauseProgressBar() {
    clearInterval(progressInterval);
    progressInterval = null;
}

function ResumeProgressBar() {
    if (progressInterval != null) {
        clearInterval(progressInterval);
    }
    curSongPlayTime = playerControls.getCurrentTime();
    progressInterval = setInterval(MoveProgressBar, PROGRESS_UPDATE_INTERVAL);
}

function StopProgressBar() {
    clearInterval(progressInterval);
    progressInterval = null;
    document.getElementById("song-progress").value = 0;
}

function GetFormattedTime(totalSeconds) {
    const seconds = Math.floor(totalSeconds); // Ensure whole number of seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${(remainingSeconds < 10 ? '0' : '')}${remainingSeconds}`;
}