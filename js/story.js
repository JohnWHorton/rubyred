/* branch main*/

// var speechSynthesis;
var soundfile 

var id = getParameter("id");
// var chapter = storyChapters[id - 1];

function getParameter(id) {
    let params = new URLSearchParams(window.location.search);
    id = params.get(id);

    window.onload = () => loadChapter(id);
}
function loadChapter(id) {

    // if (speechSynthesis) {
    //     speechSynthesis.cancel();
    // }
    const audio = document.getElementById("audio");
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }

    if (id == null) {
        return;
    }
    var chapter = storyChapters[id - 1];

    //   if (!chapter) return;

    document.getElementById("chapter-title").innerText = chapter.title;
    document.getElementById("chapter-image").innerHTML = chapter.image;
    document.getElementById("storytext").innerHTML = chapter.storytext;

    // Update the text
    
    if(id) {
        // a = document.getElementById("audio").innerHTML = "./sound/chapter" + id + ".mp3";
        audio.src = "./sound/chapter" + id + ".mp3";
    }
    if (id == 1) {
        var navbtns = `<a href="index.html">Back to Index</a> |
    <a href="#" onclick="`+ chapter.next + `">` + chapter.nextdesc + `</a>`;
    } else if (id == storyChapters.length) {
        var navbtns = `<a href="#" onclick="` + chapter.previous + `">` + chapter.previousdesc + `</a> |
            <a href="index.html">Back to Index</a>`;
    } else {
        var navbtns = `<a href="#" onclick="` + chapter.previous + `">` + chapter.previousdesc + `</a> |
    <a href="#" onclick="`+ chapter.next + `">` + chapter.nextdesc + `</a>`;
    }

    document.getElementById("navbtns").innerHTML = navbtns;

    document.querySelector('pre').scrollTop = 0;
}

// Global cached promise so you never wait twice
// let voicesReady = null;

// function loadVoices() {
//     if (voicesReady) return voicesReady;

//     voicesReady = new Promise(resolve => {
//         const voices = speechSynthesis.getVoices();

//         // If voices already loaded, resolve immediately
//         if (voices.length > 0) {
//             resolve(voices);
//             return;
//         }

//         // Otherwise wait for the event (fires once)
//         speechSynthesis.addEventListener(
//             "voiceschanged",
//             () => resolve(speechSynthesis.getVoices()),
//             { once: true }
//         );
//     });

//     return voicesReady;
// }

// let utterance = null;

// async function speakText() {

//     let voiceName = "Google UK English Male";
//     const voices = await loadVoices();

//     const voice = voices.find(v => v.name === voiceName) || voices[0];

//     const text = document.getElementById("storytext").innerText;

//     utterance = new SpeechSynthesisUtterance(text);

//     utterance.voice = voice;
//     utterance.pitch = 1.3;      // slightly higher pitch
//     utterance.rate = 0.8;       // slower, gentle pacing
//     utterance.volume = 0.9;     // softer volume

//     speechSynthesis.speak(utterance);
// }
// function pauseText() {
//     if (speechSynthesis.speaking && !speechSynthesis.paused) {
//         speechSynthesis.pause();
//     }
// }

// function resumeText() {
//     if (speechSynthesis.paused) {
//         speechSynthesis.resume();
//     }
// }

// function stopText() {
//     speechSynthesis.cancel();
// }

function makeMenu() {
    var m = "";
    for (var i = 0; i <= storyChapters.length - 1; i++) {
        var chapter = storyChapters[i];
        var title = chapter.title;
        m = m +
            `<div class="box">
                <a href="chapter.html?id=`+ (i + 1) + `">
                    <div class="box">
                        <img src="./images/chapter`+ (i + 1) + `.png" alt="` + title + `">
                        <p>Chapter `+ (i + 1) + `: ` + title + `</p>
                    </div>
                </a>
            </div>`;
    }
    document.getElementById("themenu").innerHTML = m;
    document.getElementById("storyname").innerText = storyname;

}
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');
const stopBtn = document.getElementById('stop');
const volumeSlider = document.getElementById('volume');

playBtn.addEventListener('click', () => {
    audio.play();
});

pauseBtn.addEventListener('click', () => {
    audio.pause();
});

stopBtn.addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;
});

volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
});


// Reset button text when audio ends
audio.addEventListener('ended', () => {
    playPauseBtn.textContent = 'Play';
});
