// Thocky High-Fidelity Web Audio Procedural DSP Keyboard Acoustic Engine
// Developed by Maximus Labs

export type SwitchId =
  | 'creamy-linear'
  | 'marbly-poppy'
  | 'crisp-clack'
  | 'deep-thock'
  | 'buckling-spring'
  | 'glass-ceramic';

export type PlateType = 'fr4' | 'brass' | 'aluminum' | 'pom' | 'polycarb';

export interface SwitchProfile {
  id: SwitchId;
  name: string;
  realEquivalent: string;
  category: 'Linear' | 'Poppy Mod' | 'Tactile Clack' | 'Deep Thock' | 'Clicky Vintage' | 'Ceramic';
  description: string;
  timbre: string;
  thockScore: number;
  clackScore: number;
  baseFreq: number;
  harmonicCount: number;
  decayMs: number;
  color: string;
  badge: string;
  accentGradient: string;
}

export const SWITCH_PROFILES: Record<SwitchId, SwitchProfile> = {
  'creamy-linear': {
    id: 'creamy-linear',
    name: 'Creamy Linear',
    realEquivalent: 'Smooth Lubed Linear',
    category: 'Linear',
    description: 'Ultra-smooth, buttery, muted low-mid frequencies with deep acoustic dampening and zero scratchiness.',
    timbre: 'Muted warm low-mids with velvety transient decay',
    thockScore: 98,
    clackScore: 18,
    baseFreq: 135,
    harmonicCount: 3,
    decayMs: 42,
    color: '#F59E0B',
    badge: 'Creamy & Buttery',
    accentGradient: 'from-[#F59E0B] to-[#B45309]',
  },
  'marbly-poppy': {
    id: 'marbly-poppy',
    name: 'Marbly Poppy',
    realEquivalent: 'Resonant Acoustic Mod',
    category: 'Poppy Mod',
    description: 'Bright, bubbly, glass-marble pop with high-frequency acoustic resonance and bouncy tactile presence.',
    timbre: 'Bubbly marble snap with energetic mid-range ring',
    thockScore: 89,
    clackScore: 72,
    baseFreq: 220,
    harmonicCount: 5,
    decayMs: 50,
    color: '#F43F5E',
    badge: 'Marbly Pop',
    accentGradient: 'from-[#F43F5E] to-[#BE123C]',
  },
  'crisp-clack': {
    id: 'crisp-clack',
    name: 'Crisp Clack',
    realEquivalent: 'Crisp Snappy Tactile',
    category: 'Tactile Clack',
    description: 'Snappy, high-pitched, clean, sharp bottom-out clack with rapid acoustic decay and distinct snap.',
    timbre: 'Clean sharp impact with prominent 1.2kHz transient peak',
    thockScore: 68,
    clackScore: 92,
    baseFreq: 340,
    harmonicCount: 6,
    decayMs: 35,
    color: '#64748B',
    badge: 'Sharp Snap',
    accentGradient: 'from-[#64748B] to-[#334155]',
  },
  'deep-thock': {
    id: 'deep-thock',
    name: 'Deep Thock',
    realEquivalent: 'Heavy Low-Frequency Thock',
    category: 'Deep Thock',
    description: 'Heavy bass body, hollow gasket housing thud, warm acoustic weight with authoritative low-frequency presence.',
    timbre: 'Sub-bass fundamental with resonant 90-140Hz cavity thump',
    thockScore: 99,
    clackScore: 24,
    baseFreq: 110,
    harmonicCount: 2,
    decayMs: 65,
    color: '#8B5CF6',
    badge: 'Heavy Sub-Bass',
    accentGradient: 'from-[#8B5CF6] to-[#6D28D9]',
  },
  'buckling-spring': {
    id: 'buckling-spring',
    name: 'Buckling Spring',
    realEquivalent: 'Vintage Steel Spring Click',
    category: 'Clicky Vintage',
    description: 'Iconic mechanical click with a resonant steel spring harmonic ping and authentic metallic ringing decay.',
    timbre: 'Dual-action mechanical click leaf with 2.8kHz spring ping',
    thockScore: 48,
    clackScore: 96,
    baseFreq: 520,
    harmonicCount: 8,
    decayMs: 90,
    color: '#10B981',
    badge: 'Vintage Steel Ring',
    accentGradient: 'from-[#10B981] to-[#047857]',
  },
  'glass-ceramic': {
    id: 'glass-ceramic',
    name: 'Glass & Ceramic Pop',
    realEquivalent: 'Glazed Ceramic Alumina Keycaps',
    category: 'Ceramic',
    description: 'Crystal-clear, high-definition acoustic chime with clean ceramic bell harmonics and high frequency brilliance.',
    timbre: 'High-Q bell transient with glassy crystal shimmer',
    thockScore: 65,
    clackScore: 88,
    baseFreq: 460,
    harmonicCount: 7,
    decayMs: 60,
    color: '#06B6D4',
    badge: 'Crystal Chime',
    accentGradient: 'from-[#06B6D4] to-[#0E7490]',
  },
};

export class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.85;
  private pitchMultiplier: number = 1.0;
  private currentSwitch: SwitchId = 'creamy-linear';
  private currentPlate: PlateType = 'fr4';

  // DSP Tuning Parameters
  private lubeLevel: number = 0.85; // 0 (dry) to 1.0 (heavily lubed 205g0)
  private stabilizerBoost: number = 1.6; // Spacebar & Enter gain factor
  private pitchJitterEnabled: boolean = true;
  private spatialPanningEnabled: boolean = true;
  private releaseClackEnabled: boolean = true;
  private cafeAmbienceEnabled: boolean = false;
  private roomReverbLevel: number = 0.25;

  // Background cafe white/pink noise node
  private cafeSource: AudioNode | null = null;
  private cafeGain: GainNode | null = null;

  constructor() {}

  public init() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass({ latencyHint: 'interactive' });

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.volume;

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.8;

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setSwitch(id: SwitchId) {
    this.currentSwitch = id;
  }

  public getSwitch(): SwitchId {
    return this.currentSwitch;
  }

  public setPlate(plate: PlateType) {
    this.currentPlate = plate;
  }

  public getPlate(): PlateType {
    return this.currentPlate;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime, 0.02);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public setPitch(pitch: number) {
    this.pitchMultiplier = Math.max(0.5, Math.min(1.5, pitch));
  }

  public getPitch(): number {
    return this.pitchMultiplier;
  }

  public setLubeLevel(lube: number) {
    this.lubeLevel = Math.max(0, Math.min(1, lube));
  }

  public getLubeLevel(): number {
    return this.lubeLevel;
  }

  public setStabilizerBoost(boost: number) {
    this.stabilizerBoost = Math.max(1.0, Math.min(2.5, boost));
  }

  public getStabilizerBoost(): number {
    return this.stabilizerBoost;
  }

  public setPitchJitter(enabled: boolean) {
    this.pitchJitterEnabled = enabled;
  }

  public getPitchJitter(): boolean {
    return this.pitchJitterEnabled;
  }

  public setSpatialPanning(enabled: boolean) {
    this.spatialPanningEnabled = enabled;
  }

  public getSpatialPanning(): boolean {
    return this.spatialPanningEnabled;
  }

  public setReleaseClack(enabled: boolean) {
    this.releaseClackEnabled = enabled;
  }

  public getReleaseClack(): boolean {
    return this.releaseClackEnabled;
  }

  public setRoomReverb(level: number) {
    this.roomReverbLevel = Math.max(0, Math.min(1, level));
  }

  public getRoomReverb(): number {
    return this.roomReverbLevel;
  }

  public toggleCafeAmbience(): boolean {
    this.init();
    this.cafeAmbienceEnabled = !this.cafeAmbienceEnabled;
    this.updateCafeAmbience();
    return this.cafeAmbienceEnabled;
  }

  public getCafeAmbience(): boolean {
    return this.cafeAmbienceEnabled;
  }

  private updateCafeAmbience() {
    if (!this.ctx || !this.masterGain) return;

    if (this.cafeAmbienceEnabled) {
      if (!this.cafeGain) {
        // Generate continuous soft Lo-Fi cafe rumble
        const bufferSize = this.ctx.sampleRate * 2;
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          output[i] = (b0 + b1 + b2) * 0.04;
        }

        const source = this.ctx.createBufferSource();
        source.buffer = noiseBuffer;
        source.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 450;

        this.cafeGain = this.ctx.createGain();
        this.cafeGain.gain.value = 0.18;

        source.connect(filter);
        filter.connect(this.cafeGain);
        this.cafeGain.connect(this.masterGain);

        source.start(0);
        this.cafeSource = source;
      } else {
        this.cafeGain.gain.setTargetAtTime(0.18, this.ctx.currentTime, 0.1);
      }
    } else if (this.cafeGain) {
      this.cafeGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime, 0.02);
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  /**
   * Procedural Web Audio DSP Bottom-Out Impact Synthesis
   */
  public playKey(keyName: string = 'KeyQ', isSpace: boolean = false, isEnter: boolean = false) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    const profile = SWITCH_PROFILES[this.currentSwitch] || SWITCH_PROFILES['creamy-linear'];
    const now = this.ctx.currentTime;

    // 1. Organic Micro-Pitch Jitter (±2.5% variation)
    const jitter = this.pitchJitterEnabled ? 1 + (Math.random() * 0.05 - 0.025) : 1.0;
    let baseHz = profile.baseFreq * this.pitchMultiplier * jitter;

    // 2. Stabilizer Tuning for Large Modifiers
    let stabMultiplier = 1.0;
    if (isSpace) {
      baseHz *= 0.62;
      stabMultiplier = this.stabilizerBoost;
    } else if (isEnter || keyName === 'Backspace' || keyName === 'ShiftLeft' || keyName === 'ShiftRight') {
      baseHz *= 0.78;
      stabMultiplier = 1.25;
    }

    // 3. Stereo Spatial Panning based on keyboard physical column
    let panValue = 0;
    if (this.spatialPanningEnabled) {
      panValue = this.calculateKeyStereoPan(keyName);
    }

    const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
    if (panner) {
      panner.pan.setValueAtTime(panValue, now);
    }

    // Node chain router
    const keyVoiceGain = this.ctx.createGain();
    keyVoiceGain.gain.value = 1.0;

    if (panner) {
      keyVoiceGain.connect(panner);
      panner.connect(this.masterGain);
    } else {
      keyVoiceGain.connect(this.masterGain);
    }

    // 4. Primary Downstroke Fundamental Impact (Mathematical Oscillator)
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();

    if (profile.id === 'buckling-spring') {
      osc.type = 'sawtooth';
    } else if (profile.id === 'glass-ceramic') {
      osc.type = 'sine';
    } else if (profile.id === 'crisp-clack') {
      osc.type = 'triangle';
    } else {
      osc.type = 'sine';
    }

    // Pitch sweep for bottom-out compression
    osc.frequency.setValueAtTime(baseHz * 2.6, now);
    osc.frequency.exponentialRampToValueAtTime(baseHz, now + 0.012);
    osc.frequency.exponentialRampToValueAtTime(Math.max(25, baseHz * 0.35), now + (profile.decayMs / 1000) * 1.2);

    const impactPeakGain = (isSpace ? 0.95 : 0.75) * stabMultiplier;
    oscGain.gain.setValueAtTime(0.001, now);
    oscGain.gain.linearRampToValueAtTime(impactPeakGain, now + 0.0015);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + (profile.decayMs / 1000));

    osc.connect(oscGain);
    oscGain.connect(keyVoiceGain);

    // 5. Shaped Noise Burst (Housing & Stem Friction DSP)
    const noiseBuffer = this.createNoiseBuffer();
    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';

    // Lube level attenuates harsh high frequencies
    let noiseCenterFreq = profile.clackScore > 60 ? 2800 : (1800 - this.lubeLevel * 1000);
    if (profile.id === 'deep-thock') noiseCenterFreq = 650;
    if (profile.id === 'glass-ceramic') noiseCenterFreq = 4200;

    noiseFilter.frequency.setValueAtTime(noiseCenterFreq, now);
    noiseFilter.Q.setValueAtTime(profile.id === 'glass-ceramic' ? 8.0 : (4.0 + this.lubeLevel * 2.0), now);

    const noiseGain = this.ctx.createGain();
    const noiseDuration = Math.max(0.015, (profile.decayMs / 1000) * 0.6 * (1.2 - this.lubeLevel * 0.4));
    const noiseAmp = (profile.clackScore / 100) * 0.5 + 0.12;

    noiseGain.gain.setValueAtTime(0.001, now);
    noiseGain.gain.linearRampToValueAtTime(noiseAmp, now + 0.001);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + noiseDuration);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(keyVoiceGain);

    // 6. Special Vintage Buckling Spring Harmonic Ping
    if (profile.id === 'buckling-spring') {
      const springOsc = this.ctx.createOscillator();
      const springGain = this.ctx.createGain();
      springOsc.type = 'sine';
      springOsc.frequency.setValueAtTime(2750 * jitter, now);
      springOsc.frequency.exponentialRampToValueAtTime(2100, now + 0.08);

      springGain.gain.setValueAtTime(0.001, now);
      springGain.gain.linearRampToValueAtTime(0.35, now + 0.002);
      springGain.gain.exponentialRampToValueAtTime(0.001, now + 0.085);

      springOsc.connect(springGain);
      springGain.connect(keyVoiceGain);
      springOsc.start(now);
      springOsc.stop(now + 0.09);
    }

    // Start synthesizers
    osc.start(now);
    osc.stop(now + (profile.decayMs / 1000) * 1.5);

    noiseSource.start(now);
    noiseSource.stop(now + noiseDuration + 0.01);
  }

  /**
   * Procedural Upstroke Return Clack Synthesis
   */
  public playRelease(keyName: string = 'KeyQ') {
    if (this.isMuted || !this.releaseClackEnabled) return;
    if (!this.ctx || !this.masterGain) return;

    const profile = SWITCH_PROFILES[this.currentSwitch] || SWITCH_PROFILES['creamy-linear'];
    const now = this.ctx.currentTime;

    const returnFreq = profile.baseFreq * 1.9 * this.pitchMultiplier * (1 + (Math.random() * 0.04 - 0.02));
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(returnFreq, now);
    osc.frequency.exponentialRampToValueAtTime(returnFreq * 0.6, now + 0.02);

    const amp = 0.16 * (1.1 - this.lubeLevel * 0.4);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(amp, now + 0.001);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.022);

    // Pan
    let panValue = 0;
    if (this.spatialPanningEnabled) {
      panValue = this.calculateKeyStereoPan(keyName);
    }
    const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

    if (panner) {
      panner.pan.setValueAtTime(panValue, now);
      osc.connect(gain);
      gain.connect(panner);
      panner.connect(this.masterGain);
    } else {
      osc.connect(gain);
      gain.connect(this.masterGain);
    }

    osc.start(now);
    osc.stop(now + 0.025);
  }

  private calculateKeyStereoPan(keyName: string): number {
    // Map key names to physical soundstage from -0.85 (Far Left) to +0.85 (Far Right)
    const leftKeys = ['Escape', 'Backquote', 'Tab', 'CapsLock', 'ShiftLeft', 'ControlLeft', 'KeyQ', 'KeyA', 'KeyZ', 'Digit1', 'Digit2', 'KeyW', 'KeyS', 'KeyX'];
    const midLeftKeys = ['Digit3', 'Digit4', 'KeyE', 'KeyR', 'KeyD', 'KeyF', 'KeyC', 'KeyV'];
    const centerKeys = ['Digit5', 'Digit6', 'KeyT', 'KeyY', 'KeyG', 'KeyH', 'KeyB', 'KeyN', 'Space'];
    const midRightKeys = ['Digit7', 'Digit8', 'KeyU', 'KeyI', 'KeyJ', 'KeyK', 'KeyM', 'Comma'];
    const rightKeys = ['Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'Period', 'Slash', 'ShiftRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'ArrowRight'];

    if (leftKeys.includes(keyName)) return -0.65;
    if (midLeftKeys.includes(keyName)) return -0.3;
    if (centerKeys.includes(keyName)) return 0.0;
    if (midRightKeys.includes(keyName)) return 0.3;
    if (rightKeys.includes(keyName)) return 0.65;
    return 0.0;
  }

  private createNoiseBuffer(): AudioBuffer {
    if (!this.ctx) {
      throw new Error('AudioContext not initialized');
    }
    const bufferSize = this.ctx.sampleRate * 0.1;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }
}

let soundEngineInstance: SoundEngine | null = null;

export function getSoundEngine(): SoundEngine {
  if (!soundEngineInstance) {
    soundEngineInstance = new SoundEngine();
  }
  return soundEngineInstance;
}

