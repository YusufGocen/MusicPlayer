const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const duration=document.querySelector(".duration");
const currentTime=document.querySelector(".current-time");
const progresBar=document.querySelector("#progres-bar");
const Volume=document.querySelector("#volume");
const volumeBar=document.querySelector("#volume-bar")
const ul=document.querySelector("ul");


const player = new MusicPlayer(musicList);

window.addEventListener("load", () => {
    let Music = player.getMusic();
    displayMusic(Music);
    displayMusiclist(player.musicList);
    PlayingNow();
});

function displayMusic(Music) {
    title.innerText = Music.getName();
    image.src = "img/" + Music.img;
    audio.src = "mp3/" + Music.file;
}

// Pause-Play

play.addEventListener("click", () => {
    const isPlayMusic= container.classList.contains("playing");
    if(isPlayMusic==true){
        pausemusic();
    }else{
        playMusic();
    }
})

function pausemusic(){
    container.classList.remove("playing");
    audio.pause();
    play.classList="fa-solid fa-play"
}
function playMusic(){
    container.classList.add("playing")
    audio.play();
    play.classList="fa-solid fa-pause"
}

// Next-prev

prev.addEventListener("click" ,()=>{
    prevMusic();
    PlayingNow();
})

next.addEventListener("click" ,()=>{
    nextMusic();
    PlayingNow()
})

function prevMusic(){
    player.prev();
    let music=player.getMusic();
    displayMusic(music);
    playMusic();
}
function nextMusic(){
    player.next();
    let music=player.getMusic();
    displayMusic(music);
    playMusic();
}

// TimesBar

// CalculateTime
const CalculateTime=(toplamSaniye) =>{
    const dakika=Math.floor(toplamSaniye/60);
    const saniye=Math.floor(toplamSaniye%60); 
    const Güncellenen=saniye < 10 ? `0${saniye}` : `${saniye}`
    const sonuc= `${dakika} : ${Güncellenen}`;
    return sonuc;
};

// rightMinute
audio.addEventListener("loadedmetadata",()=>{
    duration.textContent = CalculateTime(audio.duration);
    progresBar.max=Math.floor(audio.duration);
})

// leftMinute

audio.addEventListener("timeupdate",()=>{
    progresBar.value=Math.floor(audio.currentTime);
    currentTime.textContent=CalculateTime(progresBar.value);
})

// TimesControl

progresBar.addEventListener("input",()=>{
    currentTime.textContent=CalculateTime(progresBar.value);
    audio.currentTime=progresBar.value;
})

// Volume Controls


// Music Muted 

let sesDurumu="sesli";

Volume.addEventListener("click", ()=>{
    if(sesDurumu==="sesli"){
        audio.muted=true;
        sesDurumu="sessiz";
        Volume.classList="fa-solid fa-volume-xmark";
        volumeBar.value=0
    }else{
        audio.muted=false;
        sesDurumu="sesli";
        Volume.classList="fa-solid fa-volume-high";
        volumeBar.value=100
    }
})

// volume 0-100

volumeBar.addEventListener("input",(e)=>{
    const value=e.target.value;
    audio.volume=value/100;      

    if(value==0){
        audio.muted=true;
        sesDurumu="sessiz";
        Volume.classList="fa-solid fa-volume-xmark";
    }else{
        audio.muted=false;
        sesDurumu="sesli";
        Volume.classList="fa-solid fa-volume-high";
    }
});


// Music-List

const displayMusiclist =(list)=>{
    for(let i=0; i<list.length;i++){
        let liTag=
        `
          <li li-index='${i}' onclick="selectMusic(this)" class="list-group-item d-flex justify-content-between alignt-items-center">
             <span>${list[i].getName()}</span>
            <span id="music-${i}" class="badge bg rounded-pill"></span>
            <audio class="music-${i}" src="mp3/"${list[i].file}"></audio> 
           </li>
        `;
        ul.insertAdjacentHTML("beforeend",liTag);
        
        let liAudioDuration=ul.querySelector(`#music-${i}`);
        let liAudioTag=ul.querySelector(`.music-${i}`);
        
        liAudioTag.addEventListener("loadeddata", () => {
        liAudioDuration.innerText = calculateTime(liAudioTag.duration);
        });
    }
}

const selectMusic=(li) =>{
    player.index=li.getAttribute("li-index");
    displayMusic(player.getMusic());
    playMusic();
    PlayingNow();
}

const PlayingNow =()=>{
    for(let li of ul.querySelectorAll("li")){
        if(li.classList.contains("playing")){
            li.classList.remove("playing")
        }
        if(li.getAttribute("li-index")==player.index){
                li.classList.add("playing");
        }
    }
}

// FinishMusic
audio.addEventListener("ended",()=>{
    nextMusic();
    PlayingNow();
})