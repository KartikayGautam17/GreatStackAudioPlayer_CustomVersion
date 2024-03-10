//pause = <i class="fa-solid fa-circle-pause"
//<input type="range" value="0"id="volume-progress-bar">
//fa-solid fa-volume-xmark
//fa-solid fa-volume-low
//fa-solid fa-volume-high
/**
 * @var {HTMLAudioElement} song 
 */
let play = document.querySelector("div.play");
const pause_class = "fa-solid fa-pause";
const play_class = "fa-solid fa-play";
const max_volume_icon = "fa-solid fa-volume-high";
const min_volume_icon = "fa-solid fa-volume-xmark";
const low_volume_icon = "fa-solid fa-volume-low";
let progress = document.getElementById("progress");
let song = document.getElementById("song");
let cntrlIcon = document.getElementById("cntrlIcon");
let seek_obj = {update_interval:null,
                last_volume_checkpoint : 1    
};
let rewind_btn = document.getElementsByClassName("backward")[0];
let forward_btn = document.getElementsByClassName("forward")[0];
let start_time = document.getElementById("progress-before");
let end_time = document.getElementById("progress-after");
let volume_btn = document.getElementById("volume-btn");
let volume_circle = document.getElementById("volume-circle");
let volume_progress_bar = document.getElementById("volume-progress-bar");

//------//

function update_progress_bar(){
    if (seek_obj.update_interval != null) clearInterval(seek_obj.update_interval);
    seek_obj.update_interval = setInterval(()=>{
    progress.value = song.currentTime;
    },100);
    seek_obj.update_interval;
}
function update_seek(){
    song.currentTime = progress.value;
      
}
function rewind_10sec(){
    song.currentTime = Math.max(0,song.currentTime-10);
    progress.value = song.currentTime;
    update_time_labels();
}
function forward_10sec(){
    song.currentTime = Math.min(song.duration,song.currentTime+10);
    progress.value = song.currentTime;
    update_time_labels();
}
/**
 * @param {Number} seconds 
 */
function getTimeInMinSec(seconds){
    seconds = Math.floor(seconds);
    let min = Math.floor(seconds/60);
    let sec = seconds%60;
    if (sec < 10) return String(min)+":0"+String(sec); // Not the most optismised way to return maybe :)
    return String(min)+":"+String(sec);
}
function getVolumeIcon(volume){
    if (volume >= 0.3){
        return max_volume_icon;
    }
    else if (volume>0){
        return low_volume_icon;
    }
    return min_volume_icon;
}
function volume_progress_bar_update(){
    song.volume = volume_progress_bar.value/100;
    seek_obj.last_volume_checkpoint = song.volume;
    volume_btn.setAttribute("class",getVolumeIcon(song.volume));
}
function playClick(){
    let play_f = play.firstChild;
    if (play_f.classList.value == play_class){
        play_f.setAttribute("class",pause_class);
        update_progress_bar();
        song.play();
    }
    else{ 
        play_f.setAttribute("class",play_class);
        song.pause();
    }
}
function volumeCircleOnclick(){
    if (volume_btn.className.includes(min_volume_icon)){
        song.volume = seek_obj.last_volume_checkpoint;
        volume_btn.className = getVolumeIcon(song.volume);
    }
    else{
        volume_btn.className = min_volume_icon //volume-xmark
        song.volume = 0;
    }
}
function volume_low(){
    volume_progress_bar.value = Math.max(0,volume_progress_bar.value-10);
    volume_progress_bar_update();
}
function volume_high(){
    volume_progress_bar.value = Math.min(100,+volume_progress_bar.value+10);
    volume_progress_bar_update();
    
}
function update_time_labels(){
    start_time.innerHTML = getTimeInMinSec(song.currentTime);
    end_time.innerHTML = getTimeInMinSec(song.duration-song.currentTime);
}
//-------//

song.defaultMuted = true;
song.volume = seek_obj.last_volume_checkpoint;
rewind_btn.onclick = rewind_10sec;
forward_btn.onclick = forward_10sec;
volume_progress_bar.setAttribute("value",String(seek_obj.last_volume_checkpoint)*100);
//------//

song.onloadedmetadata = function(){
    progress.max = song.duration;
    progress.value = song.currentTime;
    end_time.innerHTML = getTimeInMinSec(song.duration);
};
progress.onmousedown = function(){
    if (seek_obj.update_interval){
    clearInterval(seek_obj.update_interval);
    }
};
progress.onmouseup = function(){
    update_seek();
    update_progress_bar();
    update_time_labels();
};
 
volume_circle.onclick = function(){
    volumeCircleOnclick();
}
volume_progress_bar.oninput = ()=>{
    volume_progress_bar_update();
}

play.addEventListener("click",()=>{
    playClick();
});
setInterval(()=>{
    
    update_time_labels();
    if (progress.value == Math.floor(song.duration)){
        let play_f = play.firstChild;
        play_f.setAttribute("class",play_class);
        song.pause();
    }
},1000);

//--------//

window.addEventListener("keydown",(e)=>{
    
    if (e.code=="Space"){
        playClick();
    }
    else if (e.code=="KeyM"){
        volumeCircleOnclick();
    }
    else if (e.code=="KeyZ"){
        volume_low();
    }
    else if (e.code=="KeyX"){
        volume_high();
    }
    else if (e.code=="ArrowLeft"){
        rewind_10sec();
    }
    else if(e.code=="ArrowRight"){
        forward_10sec();
    }
    else{}
});