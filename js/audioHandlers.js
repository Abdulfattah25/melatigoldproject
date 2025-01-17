import { AUDIO_PATHS } from './audioConfig.js';

export async function playWaitMessageSequence() {
    const openingChime = new Audio(AUDIO_PATHS.informasi);
    // 2. Wait message text
    const waitText =
      "Kepada Pelanggan Melati, kami mohon kesabarannya untuk menunggu giliran pelayanan. Terima kasih atas perhatiannya";

    // Play complete sequence
    await new Promise((resolve) => {
      openingChime.addEventListener("ended", resolve);
      openingChime.play();
    });

    await new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(waitText);
      utterance.lang = "id-ID";
      utterance.rate = 1;
      utterance.pitch = 1.2;
      utterance.onend = resolve;

      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find((voice) => voice.lang.includes("id") && voice.name.includes("Female"));

      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }

      speechSynthesis.speak(utterance);
    });
}

export async function playTakeQueueMessage() {
    const openingChime = new Audio(AUDIO_PATHS.informasi);
    // 2. Reminder message text
  const reminderText = "Kepada pelanggan yang belum mendapat nomor antrian, harap meminta nomor antrian terlebih dahulu kepada staff Melati. Terima kasih atas perhatiannya";

  // Play opening chime
  await new Promise((resolve) => {
    openingChime.addEventListener("ended", resolve);
    openingChime.play();
  });

  // Play voice message
  await new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(reminderText);
    utterance.lang = "id-ID";
    utterance.rate = 1;
    utterance.pitch = 1.2;
    utterance.onend = resolve;

    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find((voice) => voice.lang.includes("id") && voice.name.includes("Female"));

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    speechSynthesis.speak(utterance);
  });
}
export function announceQueueNumber(queueNumber) {
    const letter = queueNumber.charAt(0);
    const numbers = queueNumber.substring(1);

    const text = `Nomor antrian ${letter} ${numbers.split("").join(" ")}`;
    const utterance = new SpeechSynthesisUtterance(text);

    // Get available voices
    const voices = window.speechSynthesis.getVoices();

    // Set voice preferences
    utterance.lang = "id-ID";
    utterance.rate = 0.8; // Slower speed (0.1 to 1.0)
    utterance.pitch = 1.2; // Slightly higher pitch for female voice

    // Add slight pause between words

    speechSynthesis.speak(utterance);
}

export async function playQueueAnnouncement(queueNumber) {
    const introRingtone = new Audio(AUDIO_PATHS.antrian);
    const playRingtone = () => {
        return new Promise((resolve) => {
          introRingtone.addEventListener("ended", resolve);
          introRingtone.play();
        });
      };

      // Play sequence: ringtone first, then queue announcement
      await playRingtone();
      await announceQueueNumber(queueNumber);
}