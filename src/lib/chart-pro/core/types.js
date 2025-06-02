export const SymbolType = {
  CRYPTO: 'crypto',
  FUTURES: 'futures',
  STOCK: 'stock'
};

export const PeriodTimespan = {
  SECOND: 'second',
  MINUTE: 'minute',
  HOUR: 'hour',
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month'
};

export const ChartTheme = {
  LIGHT: 'light',
  DARK: 'dark'
};

export const Locale = {
  EN_US: 'en-US',
  ZH_CN: 'zh-CN'
};

export function createSymbolInfo(ticker, options = {}) {
  return {
    ticker,
    name: options.name || ticker,
    shortName: options.shortName || ticker,
    exchange: options.exchange || '',
    market: options.market || '',
    pricePrecision: options.pricePrecision || 2,
    volumePrecision: options.volumePrecision || 2,
    priceCurrency: options.priceCurrency || 'USD',
    type: options.type || SymbolType.STOCK,
    logo: options.logo || ''
  };
}

export function createPeriod(multiplier, timespan, text) {
  return {
    multiplier,
    timespan,
    text: text || `${multiplier}${timespan.charAt(0)}`
  };
}

export function createKLineData(timestamp, open, high, low, close, volume) {
  return {
    timestamp,
    open,
    high,
    low,
    close,
    volume
  };
}

export function createChartOptions(symbol, period, datafeed, options = {}) {
  return {
    container: options.container,
    styles: options.styles || {},
    watermark: options.watermark || '',
    theme: options.theme || ChartTheme.LIGHT,
    locale: options.locale || Locale.EN_US,
    drawingBarVisible: options.drawingBarVisible !== false,
    symbol,
    period,
    periods: options.periods || [],
    timezone: options.timezone || 'UTC',
    mainIndicators: options.mainIndicators || [],
    subIndicators: options.subIndicators || [],
    datafeed
  };
}