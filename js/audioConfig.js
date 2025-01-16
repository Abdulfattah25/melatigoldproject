export const AUDIO_PATHS = {
    informasi: "audio/informasi.mp3",
    antrian: "audio/antrian.mp3"
};
export function getPreferredVoice() {
    const voices = window.speechSynthesis.getVoices();
    console.log('Available voices:', voices.map(v => `${v.name} (${v.lang})`));
    
    // Cek spesifik untuk Microsoft Andika
    let selectedVoice = voices.find(voice => 
        voice.name === 'Microsoft Andika Online (Natural) - Indonesian' || 
        voice.name === 'Microsoft Andika - Indonesian'
    );

    // Jika tidak ditemukan, cari yang mengandung kata Andika
    if (!selectedVoice) {
        selectedVoice = voices.find(voice => 
            voice.name.includes('Andika') && 
            voice.lang.includes('id')
        );
    }

    // Jika masih tidak ditemukan, gunakan suara Indonesia apapun
    if (!selectedVoice) {
        selectedVoice = voices.find(voice => voice.lang.includes('id'));
    }

    console.log('Selected voice:', selectedVoice ? selectedVoice.name : 'Default voice');
    return selectedVoice || voices[0];
}
