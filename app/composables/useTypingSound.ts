export function useTypingSound() {
  let audioCtx: AudioContext | null = null;

  function getCtx() {
    if (!audioCtx) audioCtx = new AudioContext();
    return audioCtx;
  }

  function playKeySound() {
    const ctx = getCtx();
    const t = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(600 + Math.random() * 200, t);
    osc.frequency.exponentialRampToValueAtTime(150, t + 0.04);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1500, t);
    filter.Q.setValueAtTime(0.7, t);

    gain.gain.setValueAtTime(0.02 + Math.random() * 0.01, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.05);
  }

  return { playKeySound };
}
