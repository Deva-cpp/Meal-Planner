export function readJson(key, fallbackValue) {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallbackValue;
    return JSON.parse(raw);
  } catch {
    return fallbackValue;
  }
}

export function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function remove(key) {
  localStorage.removeItem(key);
}
