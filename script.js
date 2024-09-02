console.log("working");

const voiceSelect = document.getElementById("voiceSelect");
const synth = window.speechSynthesis;
let voices = [];


const populateVoiceList = () => {
    try {
        voices = synth.getVoices();
        voiceSelect.innerHTML = ''; 
        voices.forEach((voice, index) => {
            const option = document.createElement('option');
            option.textContent = `${voice.name} (${voice.lang})`;
            option.value = index;
            voiceSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error populating voice list:", error);
    }
};

try {
    populateVoiceList();
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoiceList;
    }
} catch (error) {
    console.error("Error initializing voice list or setting event listener:", error);
}

const stopSpeaking = () => {
    try {
        speechSynthesis.cancel();
        console.log("Cancel....")
    } catch (error) {
        console.error("Error stopping speech:", error);
    }
}

const speak = () => {
    try {
        
        let text = document.getElementById("text").value;
        let speech = new SpeechSynthesisUtterance(text);

        const selectedVoice = voices[voiceSelect.value];
        speech.voice = selectedVoice;

        speechSynthesis.speak(speech);
    } catch (error) {
        console.error("Error speaking text:", error);
    }
}
