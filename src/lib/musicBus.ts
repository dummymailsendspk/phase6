// Lightweight pub/sub so unrelated components (e.g. the magical unlock
// transition) can ask the background music to duck in volume without
// needing direct access to the <audio> element living in CelebrationPage.
type DuckListener = (duck: boolean) => void;

const listeners = new Set<DuckListener>();

export function onDuckMusic(listener: DuckListener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function duckMusic(duck: boolean) {
  listeners.forEach((listener) => listener(duck));
}
