import { registerAllExtensions } from '../core/extensions.js';
import { DEFAULT_STYLES, CSS_VARIABLES } from '../utils/constants.js';
import { setLoadingData, setDataError } from '../stores/chartStore.js';

let chartDatafeed = null;

export async function initChart(container, options) {
  try {
    console.log('Initializing chart with options:', options);

    const klinecharts = await import('klinecharts');
    registerAllExtensions(klinecharts);

    const chart = klinecharts.init(container, {
      watermark: options.watermark || '',
      timezone: options.timezone || 'UTC',
      locale: options.locale || 'en-US',
      customApi: {
        formatDate: (dateTimeFormat, timestamp, format) => {
          return new Date(timestamp).toLocaleString();
        }
      }
    });

    if (!chart) {
      throw new Error('Failed to initialize chart');
    }

    updateChartTheme(chart, options.theme);
    updateChartStyles(chart, options.styles);

    if (options.mainIndicators?.length) {
      options.mainIndicators.forEach(indicator => {
        chart.createIndicator(indicator, false, { id: 'candle_pane' });
      });
    }

    if (options.subIndicators?.length) {
      options.subIndicators.forEach(indicator => {
        chart.createIndicator(indicator, true);
      });
    }

    chartDatafeed = options.datafeed;
    await loadChartData(chart, options.symbol, options.period);

    console.log('Chart initialized successfully');
    return chart;
  } catch (error) {
    console.error('Error initializing chart:', error);
    setDataError(error.message);
    return null;
  }
}

export function destroyChart(chart) {
  try {
    console.log('Destroying chart');
    if (chartDatafeed && chart._symbol && chart._period) {
      chartDatafeed.unsubscribe(chart._symbol, chart._period);
    }
    klinecharts.dispose(chart.id);
    chartDatafeed = null;
  } catch (error) {
    console.error('Error destroying chart:', error);
  }
}

export async function updateChartSymbol(chart, symbol, datafeed = null) {
  try {
    console.log('Updating chart symbol:', symbol);

    if (chartDatafeed && chart._symbol && chart._period) {
      chartDatafeed.unsubscribe(chart._symbol, chart._period);
    }

    chart._symbol = symbol;
    if (datafeed) chartDatafeed = datafeed;

    await loadChartData(chart, symbol, chart._period || { multiplier: 15, timespan: 'minute' });
  } catch (error) {
    console.error('Error updating chart symbol:', error);
    setDataError(error.message);
  }
}

export async function updateChartPeriod(chart, period, datafeed = null) {
  try {
    console.log('Updating chart period:', period);

    if (chartDatafeed && chart._symbol && chart._period) {
      chartDatafeed.unsubscribe(chart._symbol, chart._period);
    }

    chart._period = period;
    if (datafeed) chartDatafeed = datafeed;

    await loadChartData(chart, chart._symbol, period);
  } catch (error) {
    console.error('Error updating chart period:', error);
    setDataError(error.message);
  }
}

export function updateChartTheme(chart, theme) {
  try {
    console.log('Updating chart theme:', theme);

    const styles = JSON.parse(JSON.stringify(DEFAULT_STYLES));

    if (theme === 'dark') {
      if (styles.grid && styles.grid.horizontal) styles.grid.horizontal.color = '#333333';
      if (styles.grid && styles.grid.vertical) styles.grid.vertical.color = '#333333';
      if (styles.candle && styles.candle.tooltip && styles.candle.tooltip.text) styles.candle.tooltip.text.color = '#D9D9D9';
      if (styles.xAxis && styles.xAxis.tickText) styles.xAxis.tickText.color = '#D9D9D9';
      if (styles.yAxis && styles.yAxis.tickText) styles.yAxis.tickText.color = '#D9D9D9';
      if (styles.crosshair && styles.crosshair.horizontal && styles.crosshair.horizontal.text) styles.crosshair.horizontal.text.color = '#D9D9D9';
      if (styles.crosshair && styles.crosshair.vertical && styles.crosshair.vertical.text) styles.crosshair.vertical.text.color = '#D9D9D9';
    }

    chart.setStyles(styles);
    applyCSSVariables(theme);
  } catch (error) {
    console.error('Error updating chart theme:', error);
  }
}

export function updateChartStyles(chart, styles) {
  try {
    console.log('Updating chart styles:', styles);
    chart.setStyles(styles);
  } catch (error) {
    console.error('Error updating chart styles:', error);
  }
}

async function loadChartData(chart, symbol, period) {
  if (!chartDatafeed || !symbol || !period) {
    console.warn('Missing required parameters for loading chart data');
    return;
  }

  try {
    setLoadingData(true);
    setDataError(null);

    const now = Date.now();
    const from = now - 86400000 * 7;

    console.log('Loading historical data for:', symbol.ticker, period);
    const historicalData = await chartDatafeed.getHistoryKLineData(symbol, period, from, now);

    if (historicalData && historicalData.length > 0) {
      chart.applyNewData(historicalData, true);
      console.log('Historical data loaded:', historicalData.length, 'candles');

      await chartDatafeed.subscribe(symbol, period, (data) => {
        if (data) {
          chart.updateData(data);
        }
      });

      console.log('Real-time subscription established');
    }
  } catch (error) {
    console.error('Error loading chart data:', error);
    setDataError(error.message);
  } finally {
    setLoadingData(false);
  }
}

function applyCSSVariables(theme) {
  if (typeof document === 'undefined') return;

  const variables = CSS_VARIABLES[theme] || CSS_VARIABLES.light;
  const root = document.documentElement;

  Object.entries(variables).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
}

export function createIndicator(chart, name, isMain = false, options = {}) {
  try {
    console.log('Creating indicator:', name, 'isMain:', isMain);
    return chart.createIndicator(name, !isMain, options);
  } catch (error) {
    console.error('Error creating indicator:', error);
    return null;
  }
}

export function removeIndicator(chart, paneId, name) {
  try {
    console.log('Removing indicator:', name, 'from pane:', paneId);
    chart.removeIndicator(paneId, name);
  } catch (error) {
    console.error('Error removing indicator:', error);
  }
}

export function createOverlay(chart, name) {
  try {
    console.log('Creating overlay:', name);
    chart.createOverlay(name);
  } catch (error) {
    console.error('Error creating overlay:', error);
  }
}

export function removeOverlay(chart, overlayId) {
  try {
    console.log('Removing overlay:', overlayId);
    chart.removeOverlay(overlayId);
  } catch (error) {
    console.error('Error removing overlay:', error);
  }
}