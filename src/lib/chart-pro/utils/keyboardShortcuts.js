import { get } from 'svelte/store';
import { selectedPeriod, setSelectedPeriod } from '../stores/chartStore.js';
import { theme, setTheme, openModal, toggleDrawingBar, setFullscreen } from '../stores/settingsStore.js';
import { selectDrawingTool } from '../components/drawing-tools/drawing.js';
import { takeScreenshot } from '../components/chart-toolbar/toolbar.js';

const TIMEFRAMES = [
  { multiplier: 1, timespan: 'minute', text: '1m' },
  { multiplier: 5, timespan: 'minute', text: '5m' },
  { multiplier: 15, timespan: 'minute', text: '15m' },
  { multiplier: 30, timespan: 'minute', text: '30m' },
  { multiplier: 1, timespan: 'hour', text: '1h' },
  { multiplier: 4, timespan: 'hour', text: '4h' },
  { multiplier: 1, timespan: 'day', text: '1d' },
  { multiplier: 1, timespan: 'week', text: '1w' },
  { multiplier: 1, timespan: 'month', text: '1M' }
];

export const KEYBOARD_SHORTCUTS = {
  'F11': 'Toggle Fullscreen',
  'Ctrl+S': 'Take Screenshot',
  'Ctrl+Z': 'Undo Drawing',
  'Delete': 'Remove Selected Drawing',
  'Escape': 'Cancel Drawing Mode',
  'D': 'Toggle Drawing Tools',
  'I': 'Open Indicators',
  'T': 'Toggle Theme',
  'S': 'Open Settings',
  '1-9': 'Select Timeframe',
  'L': 'Draw Line',
  'R': 'Draw Rectangle',
  'C': 'Draw Circle'
};

export function handleKeyboardShortcut(event) {
  const { key, ctrlKey, altKey, metaKey } = event;

  if (ctrlKey && key.toLowerCase() === 's') {
    event.preventDefault();
    takeScreenshot();
    return;
  }

  if (key === 'F11') {
    event.preventDefault();
    setFullscreen(true);
    return;
  }

  if (ctrlKey || altKey || metaKey) return;

  const target = event.target;
  if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.contentEditable === 'true') {
    return;
  }

  switch (key.toLowerCase()) {
    case 'd':
      event.preventDefault();
      toggleDrawingBar();
      break;

    case 'i':
      event.preventDefault();
      openModal('indicators');
      break;

    case 't':
      event.preventDefault();
      const currentTheme = get(theme);
      setTheme(currentTheme === 'light' ? 'dark' : 'light');
      break;

    case 's':
      event.preventDefault();
      openModal('settings');
      break;

    case 'escape':
      event.preventDefault();
      selectDrawingTool(null);
      break;

    case 'l':
      event.preventDefault();
      selectDrawingTool('straightLine');
      break;

    case 'r':
      event.preventDefault();
      selectDrawingTool('rectangle');
      break;

    case 'c':
      event.preventDefault();
      selectDrawingTool('circle');
      break;

    default:
      if (/^[1-9]$/.test(key)) {
        event.preventDefault();
        const index = parseInt(key) - 1;
        if (index < TIMEFRAMES.length) {
          setSelectedPeriod(TIMEFRAMES[index]);
        }
      }
      break;
  }
}

export function showShortcutsHelp() {
  const shortcuts = Object.entries(KEYBOARD_SHORTCUTS)
    .map(([key, description]) => `${key}: ${description}`)
    .join('\n');

  alert(`Keyboard Shortcuts:\n\n${shortcuts}`);
}