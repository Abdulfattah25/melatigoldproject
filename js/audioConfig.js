export const AUDIO_PATHS = {
    informasi: "audio/informasi.mp3",
    antrian: "audio/antrian.mp3"
};
export function getPreferredVoice() {
    const voices = window.speechSynthesis.getVoices();
    console.log('Available voices:', voices.map(v => `${v.name} (${v.lang})`));
    
    const voicePreferences = [
        voice => voice.name.includes('Microsoft') && voice.lang.includes('id') && voice.name.includes('Andika'),
        voice => voice.lang.includes('id') && voice.name.includes('Andika'),
        voice => voice.lang.includes('id'),
        voice => true
    ];
    
    for (const preference of voicePreferences) {
        const voice = voices.find(preference);
        if (voice) return voice;
    }
    
    return voices[0];
}
