export const AUDIO_PATHS = {
    informasi: "audio/informasi.mp3",
    antrian: "audio/antrian.mp3"
};

// Buat audio context untuk mengontrol volume sistem
let audioContext = null;

export function initializeAudioControl() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

// Fungsi untuk mengontrol volume sistem
export function controlSystemAudio(lower = true) {
    // Menggunakan Chrome Tab Audio API
    if (chrome && chrome.tabs) {
        chrome.tabs.query({audible: true}, (tabs) => {
            tabs.forEach(tab => {
                chrome.tabs.update(tab.id, {
                    muted: lower
                });
            });
        });
    }
    
    // Menggunakan MediaSession API
    if ('mediaSession' in navigator) {
        navigator.mediaSession.setActionHandler('pause', () => {
            document.querySelectorAll('audio, video').forEach(media => {
                media.volume = lower ? 0.2 : 1.0;
            });
        });
    }
    
    // Menggunakan Web Audio API
    if (audioContext) {
        const gainNode = audioContext.createGain();
        gainNode.gain.value = lower ? 0.2 : 1.0;
    }
}

