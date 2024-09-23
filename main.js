let btn = document.querySelector('#btn');
let content = document.querySelector('#content');
let voice = document.querySelector('#voice');

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    let voices = window.speechSynthesis.getVoices();

    
    let femaleVoice = voices.find(voice => voice.lang.includes('hi') && voice.name.includes('Female')) ||
                    voices.find(voice => voice.lang.includes('en-IN') && voice.name.includes('Female')) ||
                    voices.find(voice => voice.gender === 'female') || 
                    voices[0]; 
    
    text_speak.voice = femaleVoice;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning my dear");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon my dear");
    } else {
        speak("Good Evening my dear");
    }
}


window.addEventListener('load', () => {
    window.speechSynthesis.onvoiceschanged = () => {
        wishMe();
    };
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();


recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    content.innerText = transcript;
    takecommand(transcript.toLowerCase(), btn, voice, recognition);
}


btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});


function takecommand(message, btn, voice, recognition) {
    btn.style.display = "flex";
    voice.style.display = "none";

    if (message.includes('hello')) {
        speak("Hello sir, what can I help you with?");
    } else if (message.includes('who are you')) {
        speak("I am a virtual assistant, created by Alok Singh.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube.");
        window.open("https://www.youtube.com/");
    } else if (message.includes("open google")) {
        speak("Opening Google.");
        window.open("https://www.google.com/");
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp.");
        window.open("https://web.whatsapp.com/");
    } else {
        message = message.replace("sanjana", "");
        speak(`This is what I found on the internet regarding ${message}.`);
        window.open(`https://www.google.com/search?q=${message}`);
    }
}
