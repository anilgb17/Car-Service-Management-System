const BG_MODE_KEY = 'autocare_bg_mode';

export const BG_MODES = {
  PHOTO: 'photo',
  MINIMAL: 'minimal',
  OFF: 'off',
};

const BODY_CLASS_PREFIX = 'bg-style-';

export function getStoredBackgroundMode() {
  const mode = localStorage.getItem(BG_MODE_KEY);
  if (mode === BG_MODES.MINIMAL || mode === BG_MODES.OFF || mode === BG_MODES.PHOTO) {
    return mode;
  }
  return BG_MODES.PHOTO;
}

export function applyBackgroundMode(mode) {
  const selectedMode = mode || BG_MODES.PHOTO;
  document.body.classList.remove(
    `${BODY_CLASS_PREFIX}${BG_MODES.PHOTO}`,
    `${BODY_CLASS_PREFIX}${BG_MODES.MINIMAL}`,
    `${BODY_CLASS_PREFIX}${BG_MODES.OFF}`,
  );
  document.body.classList.add(`${BODY_CLASS_PREFIX}${selectedMode}`);
  localStorage.setItem(BG_MODE_KEY, selectedMode);
}
