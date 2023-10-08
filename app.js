let play_btn = document.querySelector('.play');
let pause = document.querySelector('.pause');
let i_pause = document.querySelector('.id_pause');
let play = document.querySelector('.i-play');
let song = document.querySelector('audio');
let currenttime = document.querySelector('.currenttime');
let totaltime = document.querySelector('.totaltime');
let slider = document.querySelector('#songrange');
let forward = document.querySelector('.forward');
let backward = document.querySelector('.backward')
let son = '';

//click on button play 

play_btn.addEventListener("click",()=>{

    play.classList.toggle('notactive');
    i_pause.classList.toggle('fa-pause');
    pause.classList.toggle('i-pause')

    if (play.className.includes('notactive')){
        song.play()
        setInterval(() => {
            slider.value = song.currentTime
        }, 500)
    }else{
        song.pause()
    }
})

//play music

function playmusic(i){
    
    son = songs[i].path.replaceAll(" ", "/");
    song.src = son;
    currenttime.innerHTML ='0:0';
    song.ontimeupdate = function(){
        totaltime.innerHTML = settingtime(song.currentTime);
    } 
    setTimeout(()=>{
        slider.max = song.duration
    },1000);
    slider.oninput = function () {
        totaltime.innerHTML = this.value;
        song.currentTime = this.value
    } 
    
    play.classList.toggle('notactive');
    i_pause.classList.toggle('fa-pause');
    pause.classList.toggle('i-pause')

    if (play.className.includes('notactive')) {
        song.play()
        setInterval(() => {
            slider.value = song.currentTime
        }, 500)
    } else {
        song.pause()
    }
    
};

//view mins in music

function settingtime(time) {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);

    return `${min}:${sec}`;
};

//list of music
// --------------------------------------------------------
let addAudio = document.querySelector(".addition .audio");
let list_btn = document.querySelector(".addition .listbtn");
let list = document.querySelector('.list');
let icon

list_btn.addEventListener("click", () => {
    list.classList.toggle('visability')
})

addAudio.onchange = (event) => {
    var input = event.target;

    if(input.files && input.files[0]){
        var reader = new FileReader();
        
        console.log(input.files[0].name);
        reader.onload = function(e){

            const musics = document.createElement('div');
            musics.classList.add("music");

            const paragrap = document.createElement('p');
            paragrap.innerHTML = input.files[0].name;

            icon = document.createElement('i')
            icon.classList.add("fa-solid", "fa-play");

            musics.appendChild(paragrap)
            musics.appendChild(icon)

            list.appendChild(musics)

            songs.push({
                path: e.target.result
            })
        }
        reader.readAsDataURL(input.files[0])
    } 
}

//------------------------------------------------------

//Button forward and button backward
playmusic(0)

let i = 0;
var error = document.querySelector('.error')

forward.addEventListener('click', () => {
    i++;
    console.log(i);
    if (i < songs.length) {
        playmusic(i)
    } else {
        i--;
        error.classList.add("visability")
        setTimeout(function () {
            error.classList.add("notvisability");
            error.classList.remove("visability")
            error.classList.remove("notvisability")
        }, 2000);
    }     
})

backward.addEventListener('click', () => {
    i--;
    console.log(i);
    if (i >= 0) {
        playmusic(i)
    } else {
        i++;
        error.classList.add("visability")
        setTimeout(function () {
            error.classList.add("notvisability");
            error.classList.remove("visability")
            error.classList.remove("notvisability")
        }, 2000);
        
        
    }
})





