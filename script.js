console.log("Music Player By Aman");

const BASE_URL = "/spotify-clone";
let new_songs = [];
let curr_song = new Audio();

function getName(url) {
  let new_url = url.split('/');
  return new_url[new_url.length - 1];
}

function getfName(url) {
  let new_url = url.split('/');
  return new_url[new_url.length - 2];
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

async function getSongs(folder) {
  let a = await fetch(`${BASE_URL}/songs/${folder}/`);
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split(`/${folder}/`)[1]);
    }
  }
  return songs;
}

async function Library(folder) {
  new_songs = await getSongs(folder);
  let library = document.querySelector(".Libr-Songs");
  library.innerHTML = "";
  for (let index = 0; index < new_songs.length; index++) {
    library.innerHTML += `
      <li class="Li-Songs">
        <img src="${BASE_URL}/img/music.svg" alt="Music-IMG" class="svg-imgs">
        <p>${decodeURIComponent(new_songs[index].replace(".mp3", " "))}</p>
        <a href="${BASE_URL}/songs/${folder}/${new_songs[index]}" class="Play-Li-Song">play now</a>
        <img src="${BASE_URL}/img/play.svg" alt="Music-IMG" class="svg-imgs">
      </li>`;
  }

  curr_song.src = `${BASE_URL}/songs/${folder}/${new_songs[0]}`;
  curr_song.play();
  document.querySelector(".play").src = `${BASE_URL}/img/pause.svg`;
  document.querySelector("#Name-song").innerHTML = decodeURI(new_songs[0]);

  function PlaySong(event) {
    event.preventDefault();
    curr_song.src = event.target.getAttribute("href");
    curr_song.play();
    document.querySelector(".play").src = `${BASE_URL}/img/pause.svg`;
    document.querySelector("#Name-song").innerHTML = event.target.previousElementSibling.innerHTML;
  }

  let lis = document.querySelectorAll(".Li-Songs");
  lis.forEach((anchor) => {
    anchor.querySelector("a").addEventListener("click", PlaySong);
  });

  curr_song.addEventListener("timeupdate", () => {
    document.querySelector("#Duration-song").innerHTML = `${formatTime(curr_song.currentTime)}/${formatTime(curr_song.duration)}`;
    document.querySelector(".ball").style.left = `${(curr_song.currentTime / curr_song.duration) * 100}%`;
  });
}

document.querySelector(".bar").addEventListener("click", e => {
  let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
  document.querySelector(".ball").style.left = percent + "%";
  curr_song.currentTime = (curr_song.duration * percent) / 100;
});

async function getPlaylists() {
  let a = await fetch(`${BASE_URL}/songs/`);
  let response = await a.text();
  return response;
}

async function getDescription(fName) {
  let desc = await fetch(`${BASE_URL}/songs/${encodeURIComponent(fName)}/info.json`);
  let response = await desc.json();
  return response;
}

async function main() {
  await getPlaylists();
  let div = document.createElement("div");
  div.innerHTML = await getPlaylists();
  let as = div.getElementsByTagName("a");

  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.getAttribute("href") !== "/" && element.getAttribute("title")) {
      let response = await getDescription(element.getAttribute("title"));
      document.querySelector(".Music-Cards").innerHTML += `
        <div class="card">
          <img src="${BASE_URL}/songs/${element.getAttribute("title")}/cover.jpeg" alt="Cover-Photo" class="card1 cards-covers">
          <h3 class="card1 playlist-titles">${element.getAttribute("title")}</h3>
          <div class="card1 card-play" id="playlist-select">
            <img src="${BASE_URL}/img/playlist-play.svg" alt="Playlist">
          </div>
          <p class="card1">${response.description}</p>
        </div>`;
    }
  }

  function playlistsdisplay(e) {
    let title = encodeURIComponent(e.innerHTML);
    Library(title);
    document.querySelector(".left").style.display = "block";
  }

  document.querySelectorAll(".card").forEach((card) => {
    card.querySelector(".playlist-titles").addEventListener("click", (e) => {
      e.stopPropagation();
      playlistsdisplay(e.target);
    });
    card.querySelector(".cards-covers").addEventListener("click", (e) => {
      e.stopPropagation();
      playlistsdisplay(card.querySelector(".playlist-titles"));
    });
    card.querySelector(".card-play").addEventListener("click", (e) => {
      e.stopPropagation();
      playlistsdisplay(card.querySelector(".playlist-titles"));
    });
  });
}

let play = document.querySelector(".play");
play.addEventListener("click", () => {
  if (curr_song.paused) {
    curr_song.play();
    play.src = `${BASE_URL}/img/pause.svg`;
  } else {
    curr_song.pause();
    play.src = `${BASE_URL}/img/play.svg`;
  }
});

let prev = document.querySelector(".prev");
prev.addEventListener("click", () => {
  let index = new_songs.indexOf(getName(curr_song.src));
  curr_song.pause();
  if (index > 0) {
    curr_song.src = `${BASE_URL}/songs/${getfName(curr_song.src)}/${new_songs[index - 1]}`;
  } else {
    curr_song.src = `${BASE_URL}/songs/${getfName(curr_song.src)}/${new_songs[new_songs.length - 1]}`;
  }
  curr_song.play();
  document.querySelector("#Name-song").innerHTML = decodeURIComponent(getName(curr_song.src));
  play.src = `${BASE_URL}/img/pause.svg`;
});

let next = document.querySelector(".next");
next.addEventListener("click", () => {
  let index = new_songs.indexOf(getName(curr_song.src));
  curr_song.pause();
  if (index < new_songs.length - 1) {
    curr_song.src = `${BASE_URL}/songs/${getfName(curr_song.src)}/${new_songs[index + 1]}`;
  } else {
    curr_song.src = `${BASE_URL}/songs/${getfName(curr_song.src)}/${new_songs[0]}`;
  }
  curr_song.play();
  document.querySelector("#Name-song").innerHTML = decodeURIComponent(getName(curr_song.src));
  play.src = `${BASE_URL}/img/pause.svg`;
});

let left = document.querySelector(".left");
let cross = document.querySelector(".close-menu");
let hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
  left.style.display = "block";
});

cross.addEventListener("click", () => {
  left.style.transform = "scale(0.5)";
  left.style.opacity = "0";
  setTimeout(() => {
    left.style.display = "none";
    left.style.transform = "scale(1)";
    left.style.opacity = "1";
  }, 500);
});

let vol = document.querySelector("#volume");
let volimg = document.querySelector("#volume-image");
vol.addEventListener("input", (e) => {
  if (e.target.value == 0) {
    volimg.src = `${BASE_URL}/img/mute.svg`;
  } else {
    volimg.src = `${BASE_URL}/img/volume.svg`;
  }
  curr_song.volume = e.target.value / 100;
  console.log(e.target.value);
  volumeperc.innerHTML = Math.floor(curr_song.volume * 100) + "%";
  volumeperc.style.opacity = "1";
  setTimeout(() => {
    volumeperc.style.opacity = "0";
  }, 1500);
});

volimg.addEventListener("click", () => {
  let src = volimg.src;
  if (src.endsWith("/img/volume.svg")) {
    volimg.src = `${BASE_URL}/img/mute.svg`;
    vol.value = "0";
    curr_song.volume = 0;
    volumeperc.innerHTML = "0%";
  } else {
    volimg.src = `${BASE_URL}/img/volume.svg`;
    vol.value = "100";
    curr_song.volume = 1;
    volumeperc.innerHTML = "100%";
  }
});

let songval = curr_song;
addEventListener("timeupdate", () => {
  if (curr_song != songval) {
    document.querySelector(".Name-song").style.transform = "translateX(0%)";
    document.querySelector(".Name-song").classList.remove("animate");
    songval = curr_song;
    setTimeout(() => {
      document.querySelector(".Name-song").classList.add("animate");
    }, 2000);
  }
});

window.addEventListener("resize", () => {
  let leftdisplay = document.querySelector(".left");
  if (window.innerWidth > 721) {
    leftdisplay.style.display = "block";
  } else {
    leftdisplay.style.display = "none";
  }
});

main();

let volumeperc = document.querySelector("#vol-perc");
volumeperc.innerHTML = curr_song.volume * 100 + "%";
vol.value = curr_song.volume * 100;
