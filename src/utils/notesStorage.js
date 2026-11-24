const NOTES_PREFIX = 'katalog_notes_';

export function getNotesByProduct(productId) {
  try {
    const raw = localStorage.getItem(`${NOTES_PREFIX}${productId}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addNoteForProduct(productId, note) {
  const existing = getNotesByProduct(productId);
  const updated = [note, ...existing];
  try {
    localStorage.setItem(`${NOTES_PREFIX}${productId}`, JSON.stringify(updated));
  } catch {
    // Abaikan jika penyimpanan browser tidak tersedia
  }
  return updated;
}

export function deleteNoteForProduct(productId, noteId) {
  const existing = getNotesByProduct(productId);
  const updated = existing.filter((item) => item.id !== noteId);
  try {
    localStorage.setItem(`${NOTES_PREFIX}${productId}`, JSON.stringify(updated));
  } catch {
    // Abaikan jika penyimpanan browser tidak tersedia
  }
  return updated;
}
