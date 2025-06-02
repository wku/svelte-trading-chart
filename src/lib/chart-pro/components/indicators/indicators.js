import { get } from 'svelte/store';
import { chartInstance } from '../../stores/chartStore.js';
import { createIndicator, removeIndicator } from '../../chart/chart.js';
import { INDICATORS } from '../../utils/constants.js';
import { t, getCurrentLocale } from '../../utils/i18n.js';

export function toggleMainIndicator(indicatorName) {
  const chart = get(chartInstance);
  if (!chart) return;

  console.log('Toggling main indicator:', indicatorName);

  const existingIndicator = chart.getIndicatorByPaneId('candle_pane', indicatorName);

  if (existingIndicator) {
    removeIndicator(chart, 'candle_pane', indicatorName);
  } else {
    createIndicator(chart, indicatorName, true, { id: 'candle_pane' });
  }
}

export function toggleSubIndicator(indicatorName) {
  const chart = get(chartInstance);
  if (!chart) return;

  console.log('Toggling sub indicator:', indicatorName);

  const panes = chart.getPanes();
  let indicatorPane = null;

  for (const pane of panes) {
    if (pane.id !== 'candle_pane') {
      const indicators = chart.getIndicatorByPaneId(pane.id);
      if (indicators && indicators.find(ind => ind.name === indicatorName)) {
        indicatorPane = pane.id;
        break;
      }
    }
  }

  if (indicatorPane) {
    removeIndicator(chart, indicatorPane, indicatorName);
  } else {
    createIndicator(chart, indicatorName, false);
  }
}

export function getAvailableIndicators() {
  const locale = getCurrentLocale();

  return {
    main: INDICATORS.MAIN.map(key => ({
      key,
      text: t(key.toLowerCase(), locale)
    })),
    sub: INDICATORS.SUB.map(key => ({
      key,
      text: t(key.toLowerCase(), locale)
    }))
  };
}

export function updateIndicatorSettings(indicatorName, paneId, settings) {
  const chart = get(chartInstance);
  if (!chart) return;

  console.log('Updating indicator settings:', indicatorName, settings);

  try {
    chart.overrideIndicator({
      name: indicatorName,
      calcParams: settings.calcParams || [],
      styles: settings.styles || {}
    }, paneId);
  } catch (error) {
    console.error('Error updating indicator settings:', error);
  }
}

export function getIndicatorSettings(indicatorName, paneId) {
  const chart = get(chartInstance);
  if (!chart) return null;

  try {
    return chart.getIndicatorByPaneId(paneId, indicatorName);
  } catch (error) {
    console.error('Error getting indicator settings:', error);
    return null;
  }
}

export function removeAllIndicators() {
  const chart = get(chartInstance);
  if (!chart) return;

  console.log('Removing all indicators');

  const panes = chart.getPanes();

  panes.forEach(pane => {
    const indicators = chart.getIndicatorByPaneId(pane.id);
    if (indicators) {
      indicators.forEach(indicator => {
        removeIndicator(chart, pane.id, indicator.name);
      });
    }
  });
}

export function resetIndicatorsToDefault() {
  const chart = get(chartInstance);
  if (!chart) return;

  console.log('Resetting indicators to default');

  removeAllIndicators();

  setTimeout(() => {
    createIndicator(chart, 'MA', true, { id: 'candle_pane' });
    createIndicator(chart, 'VOL', false);
  }, 100);
}