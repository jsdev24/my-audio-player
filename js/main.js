
let searchBox = document.getElementById("search");
let songList = document.getElementById("song-list-group");
let nowPlaying = document.getElementById("nowPlaying");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let playpauseBtn = document.getElementById("playpause");
let myaudio = document.getElementById("audio");
let currentSongId;
let isFirstSong = true;
let isPlaying = false;
let id = 1;

let songs = [
    {
        id: id++,
        title: "Pachtaoge | Arijit Singh | B Praak",
        src: "pachtaoge.mp3"
    },
    {
        id: id++,
        title: "Hawayein | Arijit Singh | Pritam",
        src: "hawayein.mp3"
    },
    {
        id: id++,
        title: "Lo Maan Liya | Arijit Singh | Jeet Gannguli",
        src: "lo_maan_liya.mp3"
    },
    {
        id: id++,
        title: "Main Hoon Saath Tere | Arijit Singh | K-A-G",
        src: "main_hoon_saath_tere.mp3"
    },
    {
        id: id++,
        title: "Phir Bhi Tumko Chaahunga | Arijit Singh | Mithoon",
        src: "phir_bhi_tumko.mp3"
    },
    {
        id: id++,
        title: "Sawan Aaya Hai | Arijit Singh | Tony Kakkar",
        src: "sawan_aaya_hai.mp3"
    },
    {
        id: id++,
        title: "Shayad | Arijit Singh | Pritam",
        src: "shayad.mp3"
    },
    {
        id: id++,
        title: "Phir Kabhi | Arijit Singh | Amaal Mallik",
        src: "phir_kabhi.mp3"
    },
    {
        id: id++,
        title: "Tera Fitoor | Arijit Singh | Himesh Reshammiya",
        src: "tera_fitoor.mp3"
    },
    {
        id: id++,
        title: "Soch Na Sake | Arijit Singh | Amaal Mallik",
        src: "soch_na_sake.mp3"
    }
];



let createSongElement = song => {
    songList.innerHTML += `
        <li class="list-group-item" songId=${song.id} onclick="playSong(this)">
        <svg class="musicIcon" width="1em" height="1em" viewBox="0 0 16 16"
        class="bi bi-music-note" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
            <path fill-rule="evenodd" d="M9 3v10H8V3h1z"/>
            <path d="M8 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 13 2.22V4L8 5V2.82z"/>
        </svg>
        <span>${song.title}</span></li>`;
}



songs.forEach(song => {
    createSongElement(song);
})



searchBox.addEventListener("keyup", e => {
    let searchStr = e.target.value.toLowerCase();
    songList.innerHTML = "";

    songs.forEach(song => {
        if (song.title.toLocaleLowerCase().includes(searchStr)) {
            createSongElement(song);
        }
    })
})



let playSong = elem => {
    let songId = elem.getAttribute("songId");
    
    songs.forEach(song => {
        if (song.id == songId) {
            playNow(elem, song.id, song.title, song.src);
        }
    })
}



let playNow = (elem, songId, title, url) => {
    myaudio.setAttribute("src", "./audio/" + url);

    isFirstSong = false;
    isPlaying = true;
    currentSongId = songId;
    nowPlaying.innerHTML = title;
    changePlayPause();

    Array.from(songList.children).forEach(song => {
        song.style.color = "#000";
    })

    elem.style.color = "#ff0057";
}



next.addEventListener("click", () => {
    let nextSongElement;
    currentSongId++;
   
    if (songs.length < currentSongId) {
        currentSongId = 1;
    }

    Array.from(songList.children).forEach(songElem => {
        if (songElem.getAttribute("songid") == currentSongId) {
            nextSongElement = songElem;
        }
    })

    songs.forEach(song => {
        if (song.id == currentSongId) {
            playNow(nextSongElement, song.id, song.title, song.src);
        }
    })
})



prev.addEventListener("click", () => {
    let prevSongElement;
    currentSongId--;

    if (currentSongId == 0) {
        currentSongId = songs.length;
    }

    Array.from(songList.children).forEach(songElem => {
        if (songElem.getAttribute("songid") == currentSongId) {
            prevSongElement = songElem;
        }
    })

    songs.forEach(song => {
        if (song.id == currentSongId) {
            playNow(prevSongElement, song.id, song.title, song.src);
        }
    })
})



playpauseBtn.addEventListener("click", () => {
    if (isFirstSong) {
        let firstSong = songs[0];
        let elem = Array.from(songList.children)[0];
        playNow(elem, firstSong.id, firstSong.title, firstSong.src);
        isFirstSong = false;
    } else {
        changePlayPause();
    }
})



let changePlayPause = () => {
    if (isPlaying) {
        playpauseBtn.innerHTML = '<path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>';
        myaudio.play();
        isPlaying = false;
    } else {
        playpauseBtn.innerHTML = '<path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>';
        myaudio.pause();
        isPlaying = true;
    }
}



let progress = event => {
    let progressCirle = document.getElementById("progressCirle");
    let progressBar = document.getElementById("progressBar");
    progressCirle.style.left = (event.currentTime / audio.duration) * 100 + "%";
    progressBar.style.width = (event.currentTime / audio.duration) * 100 + "%";

    let duration = songDuration();
    currentTime(event, duration);
}



let songDuration = () => {
    let totalLength = document.getElementById("totalLength");
    let duration = Math.floor(myaudio.duration);
    let totalSeconds = duration;
    let minutes = 0;
    let seconds = 0;

    minutes = Math.floor(totalSeconds / 60);
    seconds = totalSeconds % 60;

    if(seconds < 10) {
        seconds = '0' + seconds;
    }

    if(minutes && seconds) {
        totalLength.innerHTML = minutes + ":" + seconds;
    }

    return duration;
}



let currentTime = (event, duration) => {
    let currentLength = document.getElementById("currentLength");
    let currentTime = String(event.currentTime).split(".");
    let currentMinute = 0;
    let currentSecond = currentTime[0];
    let songPlayed = currentSecond;
    
    if(currentSecond > 59) {
        currentMinute++;
        currentSecond -= 60;
    }

    if (currentSecond < 10) {
        currentSecond = '0' + currentSecond;
    }

    currentLength.innerHTML = currentMinute + ":" + currentSecond;

    if(songPlayed == duration) {
        changePlayPause();
    }
}
