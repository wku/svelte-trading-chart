import { writable, derived } from 'svelte/store';
import { createSymbolInfo, createPeriod, SymbolType, PeriodTimespan } from '../core/types.js';

export const chartInstance = writable(null);
export const isChartReady = writable(false);

export const currentSymbol = writable(createSymbolInfo('BTCUSDT', {
  name: 'Bitcoin / Tether',
  shortName: 'BTCUSDT',
  exchange: 'Binance Spot',
  market: 'crypto',
  type: SymbolType.CRYPTO,
  priceCurrency: 'USDT'
}));

export const currentPeriod = writable(createPeriod(15, PeriodTimespan.MINUTE, '15m'));

export const availablePeriods = writable([
  createPeriod(1, PeriodTimespan.MINUTE, '1m'),
  createPeriod(5, PeriodTimespan.MINUTE, '5m'),
  createPeriod(15, PeriodTimespan.MINUTE, '15m'),
  createPeriod(30, PeriodTimespan.MINUTE, '30m'),
  createPeriod(1, PeriodTimespan.HOUR, '1H'),
  createPeriod(4, PeriodTimespan.HOUR, '4H'),
  createPeriod(1, PeriodTimespan.DAY, '1D'),
  createPeriod(1, PeriodTimespan.WEEK, '1W')
]);

export const symbols = writable([]);
export const isLoadingSymbols = writable(false);
export const searchQuery = writable('');

export const filteredSymbols = derived(
  [symbols, searchQuery],
  ([$symbols, $searchQuery]) => {
    if (!$searchQuery) return $symbols;
    const query = $searchQuery.toLowerCase();
    return $symbols.filter(symbol =>
      symbol.ticker.toLowerCase().includes(query) ||
      symbol.name.toLowerCase().includes(query) ||
      symbol.shortName.toLowerCase().includes(query)
    );
  }
);

export const selectedDrawingTool = writable(null);
export const isDrawingMode = writable(false);
export const magnetMode = writable('none');

export const mainIndicators = writable(['MA']);
export const subIndicators = writable(['VOL']);

export const overlays = writable([]);
export const selectedOverlay = writable(null);

export const chartData = writable([]);
export const isLoadingData = writable(false);
export const dataError = writable(null);

export function setChartInstance(instance) {
  console.log('Setting chart instance:', instance);
  chartInstance.set(instance);
  isChartReady.set(!!instance);
}

export function updateSymbol(symbol) {
  console.log('Updating symbol:', symbol);
  currentSymbol.set(symbol);
  dataError.set(null);
}

export function updatePeriod(period) {
  console.log('Updating period:', period);
  currentPeriod.set(period);
  dataError.set(null);
}

export function setSymbols(symbolList) {
  console.log('Setting symbols:', symbolList.length);
  symbols.set(symbolList);
}

export function setLoadingSymbols(loading) {
  isLoadingSymbols.set(loading);
}

export function setSearchQuery(query) {
  searchQuery.set(query);
}

export function setDrawingTool(tool) {
  console.log('Setting drawing tool:', tool);
  selectedDrawingTool.set(tool);
  isDrawingMode.set(!!tool);
}

export function setMagnetMode(mode) {
  console.log('Setting magnet mode:', mode);
  magnetMode.set(mode);
}

export function addMainIndicator(indicator) {
  mainIndicators.update(indicators => {
    if (!indicators.includes(indicator)) {
      console.log('Adding main indicator:', indicator);
      return [...indicators, indicator];
    }
    return indicators;
  });
}

export function removeMainIndicator(indicator) {
  mainIndicators.update(indicators => {
    console.log('Removing main indicator:', indicator);
    return indicators.filter(i => i !== indicator);
  });
}

export function addSubIndicator(indicator) {
  subIndicators.update(indicators => {
    if (!indicators.includes(indicator)) {
      console.log('Adding sub indicator:', indicator);
      return [...indicators, indicator];
    }
    return indicators;
  });
}

export function removeSubIndicator(indicator) {
  subIndicators.update(indicators => {
    console.log('Removing sub indicator:', indicator);
    return indicators.filter(i => i !== indicator);
  });
}

export function addOverlay(overlay) {
  overlays.update(overlayList => {
    console.log('Adding overlay:', overlay);
    return [...overlayList, overlay];
  });
}

export function removeOverlay(overlayId) {
  overlays.update(overlayList => {
    console.log('Removing overlay:', overlayId);
    return overlayList.filter(o => o.id !== overlayId);
  });
}

export function selectOverlay(overlay) {
  selectedOverlay.set(overlay);
}

export function setChartData(data) {
  chartData.set(data);
}

export function setLoadingData(loading) {
  isLoadingData.set(loading);
}

export function setDataError(error) {
  console.error('Chart data error:', error);
  dataError.set(error);
}