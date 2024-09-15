let currentSong = new Audio();

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

async function getsongs() {
  let a = await fetch("http://127.0.0.1:3000/songs/");
  let response = await a.text();
  console.log(response);
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/songs/")[1]);
    }
  }
  return songs;
}
const playMusic = (track, pause = false) => {
  let audio = new Audio("/songs/" + track);
  currentSong.src = "/songs/" + track;
  if (!pause) {
    currentSong.play();
    play.src = "img/pause.svg";
  }
  document.querySelector(".songinfo").innerHTML = decodeURI(track);
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
};

async function main() {
  let songs = await getsongs();
  playMusic(songs[0], true);
  console.log(songs);
  let songUL = document
    .querySelector(".songlist")
    .getElementsByTagName("ul")[0];
  for (const song of songs) {
    songUL.innerHTML =
      songUL.innerHTML +
      `<li><img src="img/music.svg" class="invert">
                <div class="info ">
                  <div class=songname>${song.replaceAll("%20", " ")}</div>
                  
                </div>
                <div class="playnow">
                  <span>PlayNow</span>
                  <img src="img/playnow.svg" class="invert">
                </div>
      
      </li>`;
  }

  Array.from(
    document.querySelector(".songlist").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
      console.log(e.querySelector(".info").firstElementChild.innerHTML);
    });
  });

  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "img/pause.svg";
    } else {
      currentSong.pause();
      play.src = "img/play.svg";
    }
  });

  currentSong.addEventListener("timeupdate", () => {
    console.log(currentSong.currentTime, currentSong.duration);
    document.querySelector(".songtime").innerHTML = `${formatTime(
      currentSong.currentTime
    )} / ${formatTime(currentSong.duration)}`;
    document.querySelector(".circle").style.left =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });
  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let per = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = per + "%";
    currentSong.currentTime = (currentSong.duration * per) / 100;
  });

  document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".lf").style.left = "0";
  });
  document.querySelector(".cross").addEventListener("click", () => {
    document.querySelector(".lf").style.left = "-110%";
  });

  pre.addEventListener("click", () => {
    console.log("Previous is clicked");
    console.log(currentSong);
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if (index - 1 >= 0) {
      playMusic(songs[index - 1]);
    }
  });
  next.addEventListener("click", () => {
    console.log("Next is clicked");
    console.log(currentSong);
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if (index + 1 < songs.length) {
      playMusic(songs[index + 1]);
    } else {
      // document.querySelector(".next").style.color = darkgrey
    }
  });

  document
    .querySelector(".range")
    .getElementsByTagName("input")[0]
    .addEventListener("change", (e) => {
      currentSong.volume = e.target.value / 100;
    });

document.querySelector(".vol >img").addEventListener("click",e=>{
  if(e.target.src.includes("img/vol.svg") ){
    e.target.src = e.target.src.replaceAll ("img/vol.svg","img/mute.svg") 
    // e.target.src = "img/mute.svg"
    currentSong.volume = 0;
    document.querySelector(".range").getElementsByTagName("input")[0] .value = 0
  }
  else{
    e.target.src = e.target.src.replaceAll ("img/mute.svg","img/vol.svg") 
    currentSong.volume = 0.30;
    document.querySelector(".range").getElementsByTagName("input")[0] .value = 30
  }
})
document.querySelector(".first").addEventListener("click",()=>{
  console.log("JO tum mere ho is playing")
  playMusic(songs[3])
})
document.querySelector(".second").addEventListener("click",()=>{
  
  playMusic(songs[1])
})
document.querySelector(".third").addEventListener("click",()=>{
  
  playMusic(songs[0])
})
document.querySelector(".fourth").addEventListener("click",()=>{
 
  playMusic(songs[4])
})
document.querySelector(".fifth").addEventListener("click",()=>{
  
  playMusic(songs[6])
})
document.querySelector(".sixth").addEventListener("click",()=>{
  
  playMusic(songs[7])
})




}

main();
 