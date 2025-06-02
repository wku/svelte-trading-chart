import { get } from 'svelte/store';
import {
  updateSymbol,
  updatePeriod,
  chartInstance,
  setLoadingSymbols,
  setSymbols
} from '../../stores/chartStore.js';
import {
  theme,
  setTheme
} from '../../stores/settingsStore.js';
import { ChartTheme } from '../../core/types.js';
import { DefaultDatafeed } from '../../core/datafeed.js';

let datafeed = null;

export async function initToolbar(datafeedInstance) {
  datafeed = datafeedInstance;
  await loadInitialSymbols();
}

async function loadInitialSymbols() {
  if (!datafeed) {
    datafeed = new DefaultDatafeed();
  }

  try {
    console.log('Loading initial symbols');
    setLoadingSymbols(true);
    const symbols = await datafeed.searchSymbols('');
    setSymbols(symbols);
    console.log('Loaded symbols:', symbols.length);
    return symbols;
  } catch (error) {
    console.error('Error loading symbols:', error);
    return [];
  } finally {
    setLoadingSymbols(false);
  }
}

export function handlePeriodChange(period) {
  console.log('Period changed:', period);
  updatePeriod(period);
}

export function handleSymbolSearch(symbol) {
  console.log('Symbol selected:', symbol);
  updateSymbol(symbol);
}

export async function searchSymbols(query) {
  if (!datafeed) return [];

  try {
    console.log('Searching symbols:', query);
    setLoadingSymbols(true);
    const symbols = await datafeed.searchSymbols(query);
    setSymbols(symbols);
    return symbols;
  } catch (error) {
    console.error('Error searching symbols:', error);
    return [];
  } finally {
    setLoadingSymbols(false);
  }
}

export function toggleTheme() {
  const currentTheme = get(theme);
  const newTheme = currentTheme === ChartTheme.LIGHT ? ChartTheme.DARK : ChartTheme.LIGHT;
  console.log('Toggling theme from', currentTheme, 'to', newTheme);
  setTheme(newTheme);
}

export function takeScreenshot() {
  const chart = get(chartInstance);
  if (!chart) {
    console.warn('Chart instance not available for screenshot');
    return;
  }

  try {
    console.log('Taking screenshot');
    const canvas = chart.getConvertPictureUrl(true, 'jpeg', '#FFFFFF');

    if (canvas) {
      const link = document.createElement('a');
      link.download = `chart-${Date.now()}.jpg`;
      link.href = canvas;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log('Screenshot saved');
    }
  } catch (error) {
    console.error('Error taking screenshot:', error);
  }
}

export function resetChart() {
  const chart = get(chartInstance);
  if (!chart) return;

  try {
    console.log('Resetting chart');
    chart.getTimestampByCoordinate();
  } catch (error) {
    console.error('Error resetting chart:', error);
  }
}

export function zoomIn() {
  const chart = get(chartInstance);
  if (!chart) return;

  try {
    console.log('Zooming in');
    chart.zoomAtCoordinate(0.1, { x: 0, y: 0 });
  } catch (error) {
    console.error('Error zooming in:', error);
  }
}

export function zoomOut() {
  const chart = get(chartInstance);
  if (!chart) return;

  try {
    console.log('Zooming out');
    chart.zoomAtCoordinate(-0.1, { x: 0, y: 0 });
  } catch (error) {
    console.error('Error zooming out:', error);
  }
}