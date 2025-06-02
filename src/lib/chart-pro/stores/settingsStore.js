import { writable } from 'svelte/store';

const ChartTheme = {
  LIGHT: 'light',
  DARK: 'dark'
};

const Locale = {
  EN_US: 'en-US',
  ZH_CN: 'zh-CN'
};

export const theme = writable(ChartTheme.LIGHT);
export const locale = writable(Locale.EN_US);
export const timezone = writable('UTC');

export const chartStyles = writable({
  candle: {
    type: 'candle_solid',
    priceMark: {
      last: { show: true },
      high: { show: true },
      low: { show: true }
    }
  },
  indicator: {
    lastValueMark: { show: true }
  },
  yAxis: {
    type: 'normal',
    reverse: false
  },
  grid: {
    show: true
  }
});

export const drawingBarVisible = writable(true);
export const fullscreen = writable(false);

export const modalStates = writable({
  symbolSearch: false,
  indicators: false,
  settings: false,
  timezone: false,
  screenshot: false
});

export const watermark = writable('');

export function setTheme(newTheme) {
  console.log('Setting theme:', newTheme);
  theme.set(newTheme);
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', newTheme);
  }
}

export function setLocale(newLocale) {
  console.log('Setting locale:', newLocale);
  locale.set(newLocale);
}

export function setTimezone(newTimezone) {
  console.log('Setting timezone:', newTimezone);
  timezone.set(newTimezone);
}

export function updateChartStyles(updates) {
  chartStyles.update(styles => {
    console.log('Updating chart styles:', updates);
    return { ...styles, ...updates };
  });
}

export function setChartStyleValue(path, value) {
  chartStyles.update(styles => {
    const newStyles = { ...styles };
    const keys = path.split('.');
    let current = newStyles;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
    console.log('Setting chart style:', path, '=', value);
    return newStyles;
  });
}

export function toggleDrawingBar() {
  drawingBarVisible.update(visible => {
    console.log('Toggling drawing bar:', !visible);
    return !visible;
  });
}

export function setFullscreen(isFullscreen) {
  console.log('Setting fullscreen:', isFullscreen);
  fullscreen.set(isFullscreen);
}

export function openModal(modalName) {
  modalStates.update(states => {
    console.log('Opening modal:', modalName);
    return { ...states, [modalName]: true };
  });
}

export function closeModal(modalName) {
  modalStates.update(states => {
    console.log('Closing modal:', modalName);
    return { ...states, [modalName]: false };
  });
}

export function closeAllModals() {
  modalStates.update(states => {
    console.log('Closing all modals');
    return Object.keys(states).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {});
  });
}

export function setWatermark(text) {
  console.log('Setting watermark:', text);
  watermark.set(text);
}

export function resetToDefaults() {
  console.log('Resetting settings to defaults');
  setTheme(ChartTheme.LIGHT);
  setLocale(Locale.EN_US);
  setTimezone('UTC');
  updateChartStyles({
    candle: {
      type: 'candle_solid',
      priceMark: {
        last: { show: true },
        high: { show: true },
        low: { show: true }
      }
    },
    indicator: {
      lastValueMark: { show: true }
    },
    yAxis: {
      type: 'normal',
      reverse: false
    },
    grid: {
      show: true
    }
  });
  drawingBarVisible.set(true);
  setWatermark('');
}