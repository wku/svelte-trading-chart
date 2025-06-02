export const INDICATORS = {
  MAIN: ['MA', 'EMA', 'SMA', 'BOLL', 'BBI', 'SAR'],
  SUB: ['VOL', 'MACD', 'KDJ', 'RSI', 'BIAS', 'BRAR', 'CCI', 'DMI', 'CR', 'PSY', 'DMA', 'TRIX', 'OBV', 'VR', 'WR', 'MTM', 'EMV', 'ROC', 'PVT', 'AO']
};

export const DRAWING_TOOLS = {
  SINGLE_LINE: [
    'horizontalStraightLine', 'horizontalRayLine', 'horizontalSegment',
    'verticalStraightLine', 'verticalRayLine', 'verticalSegment',
    'straightLine', 'rayLine', 'segment', 'arrow', 'priceLine'
  ],
  MORE_LINE: ['priceChannelLine', 'parallelStraightLine'],
  POLYGON: ['circle', 'rect', 'parallelogram', 'triangle'],
  FIBONACCI: [
    'fibonacciLine', 'fibonacciSegment', 'fibonacciCircle',
    'fibonacciSpiral', 'fibonacciSpeedResistanceFan', 'fibonacciExtension',
    'gannBox'
  ],
  WAVE: ['xabcd', 'abcd', 'threeWaves', 'fiveWaves', 'eightWaves', 'anyWaves']
};

export const MAGNET_MODES = ['none', 'weak_magnet', 'strong_magnet'];

export const CHART_TYPES = [
  'candle_solid', 'candle_stroke', 'candle_up_stroke',
  'candle_down_stroke', 'ohlc', 'area'
];

export const AXIS_TYPES = ['normal', 'percentage', 'log'];

export const TIMEZONES = [
  { key: 'Etc/UTC', offset: 0 },
  { key: 'Pacific/Honolulu', offset: -10 },
  { key: 'America/Juneau', offset: -8 },
  { key: 'America/Los_Angeles', offset: -7 },
  { key: 'America/Chicago', offset: -5 },
  { key: 'America/Toronto', offset: -4 },
  { key: 'America/Sao_Paulo', offset: -3 },
  { key: 'Europe/London', offset: 1 },
  { key: 'Europe/Berlin', offset: 2 },
  { key: 'Asia/Bahrain', offset: 3 },
  { key: 'Asia/Dubai', offset: 4 },
  { key: 'Asia/Ashkhabad', offset: 5 },
  { key: 'Asia/Almaty', offset: 6 },
  { key: 'Asia/Bangkok', offset: 7 },
  { key: 'Asia/Shanghai', offset: 8 },
  { key: 'Asia/Tokyo', offset: 9 },
  { key: 'Australia/Sydney', offset: 10 },
  { key: 'Pacific/Norfolk', offset: 12 }
];

export const DEFAULT_PERIODS = [
  { multiplier: 1, timespan: 'minute', text: '1m' },
  { multiplier: 5, timespan: 'minute', text: '5m' },
  { multiplier: 15, timespan: 'minute', text: '15m' },
  { multiplier: 30, timespan: 'minute', text: '30m' },
  { multiplier: 1, timespan: 'hour', text: '1H' },
  { multiplier: 4, timespan: 'hour', text: '4H' },
  { multiplier: 1, timespan: 'day', text: '1D' },
  { multiplier: 1, timespan: 'week', text: '1W' }
];

export const DEFAULT_SYMBOL = {
  ticker: 'BTCUSDT',
  name: 'Bitcoin / Tether',
  shortName: 'BTCUSDT',
  exchange: 'Binance Spot',
  market: 'crypto',
  type: 'crypto',
  priceCurrency: 'USDT',
  pricePrecision: 2,
  volumePrecision: 2
};

export const DEFAULT_STYLES = {
  grid: { show: true, horizontal: { show: true }, vertical: { show: true } },
  candle: {
    type: 'candle_solid',
    bar: { upColor: '#26A69A', downColor: '#EF5350', noChangeColor: '#888888' },
    tooltip: { showRule: 'always', showType: 'standard' },
    priceMark: {
      show: true,
      high: { show: true, color: '#D9D9D9', textMargin: 5, textSize: 10 },
      low: { show: true, color: '#D9D9D9', textMargin: 5, textSize: 10 },
      last: { show: true, upColor: '#26A69A', downColor: '#EF5350', noChangeColor: '#888888' }
    }
  },
  technicalIndicator: {
    margin: { top: 0.2, bottom: 0.1 },
    bar: { upColor: '#26A69A', downColor: '#EF5350', noChangeColor: '#888888' },
    line: { size: 1, colors: ['#FF9600', '#9D65C9', '#2196F3', '#E11D74', '#01C5C4'] },
    circle: { upColor: '#26A69A', downColor: '#EF5350', noChangeColor: '#888888' }
  },
  xAxis: {
    show: true,
    height: null,
    axisLine: { show: true, color: '#888888', size: 1 },
    tickText: { show: true, color: '#D9D9D9', size: 12, margin: 3 },
    tickLine: { show: true, size: 1, length: 3, color: '#888888' }
  },
  yAxis: {
    show: true,
    width: null,
    type: 'normal',
    position: 'right',
    reverse: false,
    axisLine: { show: true, color: '#888888', size: 1 },
    tickText: { show: true, color: '#D9D9D9', size: 12, margin: 3 },
    tickLine: { show: true, size: 1, length: 3, color: '#888888' }
  },
  separator: { size: 1, color: '#888888', fill: true, activeBackgroundColor: 'rgba(230, 230, 230, .15)' },
  crosshair: {
    show: true,
    horizontal: {
      show: true, line: { show: true, style: 'dash', dashValue: [4, 2], size: 1, color: '#888888' },
      text: { show: true, color: '#D9D9D9', size: 12, paddingLeft: 2, paddingRight: 2, paddingTop: 2, paddingBottom: 2, borderSize: 1, borderColor: '#505050', backgroundColor: '#505050' }
    },
    vertical: {
      show: true, line: { show: true, style: 'dash', dashValue: [4, 2], size: 1, color: '#888888' },
      text: { show: true, color: '#D9D9D9', size: 12, paddingLeft: 2, paddingRight: 2, paddingTop: 2, paddingBottom: 2, borderSize: 1, borderColor: '#505050', backgroundColor: '#505050' }
    }
  }
};

export const CSS_VARIABLES = {
  light: {
    '--chart-background-color': '#FFFFFF',
    '--chart-text-color': '#051441',
    '--chart-border-color': '#ebedf1',
    '--chart-grid-color': '#F5F5F5',
    '--chart-crosshair-color': '#888888'
  },
  dark: {
    '--chart-background-color': '#151517',
    '--chart-text-color': '#F8F8F8',
    '--chart-border-color': '#292929',
    '--chart-grid-color': '#333333',
    '--chart-crosshair-color': '#888888'
  }
};