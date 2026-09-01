import { Language } from '../types';

class SpeechAssistant {
  private synth: SpeechSynthesis | null = null;
  private isSpeaking = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public speak(text: string, lang: Language = 'hi', onEnd?: () => void): boolean {
    if (!this.synth) {
      console.warn('SpeechSynthesis not supported in this browser.');
      if (onEnd) onEnd();
      return false;
    }

    try {
      this.synth.cancel(); // Stop previous speech

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Determine language tag
      const langCodeMap: Record<Language, string> = {
        hi: 'hi-IN',
        mr: 'mr-IN',
        en: 'en-IN',
      };

      utterance.lang = langCodeMap[lang] || 'hi-IN';
      utterance.rate = 0.92; // slightly slower for maximum clarity
      utterance.pitch = 1.0;

      // Try to select native voice if present
      const voices = this.synth.getVoices();
      const matchingVoice = voices.find(
        (v) => v.lang.startsWith(utterance.lang.slice(0, 2)) || v.lang === utterance.lang
      );
      if (matchingVoice) {
        utterance.voice = matchingVoice;
      }

      utterance.onstart = () => {
        this.isSpeaking = true;
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        console.warn('Speech error:', e);
        this.isSpeaking = false;
        if (onEnd) onEnd();
      };

      this.synth.speak(utterance);
      return true;
    } catch (err) {
      console.error('TTS error', err);
      if (onEnd) onEnd();
      return false;
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
    }
  }

  public speaking(): boolean {
    return this.isSpeaking || (this.synth ? this.synth.speaking : false);
  }
}

export const speechAssistant = new SpeechAssistant();
