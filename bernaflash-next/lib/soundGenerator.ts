export class SoundGenerator {
    private audioContext: AudioContext | null = null;

    constructor() {
        if (typeof window !== 'undefined') {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContextClass) {
                this.audioContext = new AudioContextClass();
            }
        }
    }

    private getContext(): AudioContext | null {
        if (!this.audioContext && typeof window !== 'undefined') {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContextClass) {
                this.audioContext = new AudioContextClass();
            }
        }
        if (this.audioContext?.state === 'suspended') {
            this.audioContext.resume();
        }
        return this.audioContext;
    }

    playTone(frequency: number, type: OscillatorType, duration: number, startTime: number = 0) {
        const ctx = this.getContext();
        if (!ctx) return;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(frequency, ctx.currentTime + startTime);

        gain.gain.setValueAtTime(0.1, ctx.currentTime + startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + startTime);
        osc.stop(ctx.currentTime + startTime + duration);
    }

    playCountdown() {
        this.playTone(800, 'sine', 0.1);
    }

    playCorrect() {
        const ctx = this.getContext();
        if (!ctx) return;

        // Ding sound (High pitch sine with quick decay)
        this.playTone(1200, 'sine', 0.15, 0);
        this.playTone(1800, 'sine', 0.3, 0.1); // Harmony
    }

    playWrong() {
        // Buzz sound (Sawtooth, low pitch)
        this.playTone(150, 'sawtooth', 0.4);
    }

    playWin() {
        // Victory Arpeggio (C Major)
        const now = 0;
        this.playTone(523.25, 'square', 0.1, now);       // C5
        this.playTone(659.25, 'square', 0.1, now + 0.1); // E5
        this.playTone(783.99, 'square', 0.1, now + 0.2); // G5
        this.playTone(1046.50, 'square', 0.6, now + 0.3); // C6
    }
}

export const soundGenerator = new SoundGenerator();
