function speakText() {
  const text = document.getElementById("storytext").innerText;

  const utterance = new SpeechSynthesisUtterance(text);

  // Voice style settings
  utter.pitch = 1.3;      // slightly higher pitch
  utter.rate = 0.9;       // slower, gentle pacing
  utter.volume = 0.9;     // softer volume

  // Optional: choose a specific voice if available
  const voices = speechSynthesis.getVoices();
  const gentleVoice = voices.find(v =>
    v.name.toLowerCase().includes("child") ||
    v.name.toLowerCase().includes("girl") ||
    v.name.toLowerCase().includes("young")
  );

  utter.voice = gentleVoice;

  speechSynthesis.speak(utterance);
}

