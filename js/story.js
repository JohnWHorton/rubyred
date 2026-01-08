/* branch main*/

var utterance;

var id = getParameter("id");
// var chapter = storyChapters[id - 1];

function getParameter(id) {
    let params = new URLSearchParams(window.location.search);
    id = params.get(id);

    window.onload = () => loadChapter(id);
}
function loadChapter(id) {

    if (speechSynthesis) {
        speechSynthesis.cancel();
    }

    var chapter = storyChapters[id - 1];

    //   if (!chapter) return;

    document.getElementById("chapter-title").innerText = chapter.title;
    document.getElementById("chapter-image").innerHTML = chapter.image;
    document.getElementById("storytext").innerHTML = chapter.storytext;

    // Update the text

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


function speakText() {
    const text = document.getElementById("storytext").innerText;

    utterance = new SpeechSynthesisUtterance(text);

    // Voice style settings
    utterance.pitch = 1.3;      // slightly higher pitch
    utterance.rate = 0.8;       // slower, gentle pacing
    utterance.volume = 0.9;     // softer volume

    // Optional: choose a specific voice if available
    const voices = speechSynthesis.getVoices();
    const gentleVoice = voices.find(v =>
        v.name.toLowerCase().includes("“Google UK English Male”")
    );
    utterance.voice = gentleVoice || voices[0];
    speechSynthesis.speak(utterance);
}
function pauseText() {

    speechSynthesis.pause(utterance);

}
function resumeText() {

    speechSynthesis.resume(utterance);

}
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
