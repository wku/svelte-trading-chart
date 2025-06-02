import { get } from 'svelte/store';
import { locale } from '../stores/settingsStore.js';

const translations = {
  'en-US': {
    // Existing translations...
    search_symbols: 'Search symbols...',
    setting: 'Settings',
    screenshot: 'Screenshot',
    indicator: 'Indicators',
    timezone: 'Timezone',
    full_screen: 'Fullscreen',
    exit_full_screen: 'Exit Fullscreen',
    drawing_tools: 'Drawing Tools',
    cancel: 'Cancel',

    // New keyboard shortcuts
    toggle_fullscreen: 'Toggle Fullscreen',
    take_screenshot: 'Take Screenshot',
    undo_drawing: 'Undo Drawing',
    remove_selected_drawing: 'Remove Selected Drawing',
    cancel_drawing_mode: 'Cancel Drawing Mode',
    toggle_drawing_tools: 'Toggle Drawing Tools',
    toggle_theme: 'Toggle Theme',
    open_indicators: 'Open Indicators',
    open_settings: 'Open Settings',
    select_timeframe: 'Select Timeframe',
    draw_line: 'Draw Line',
    draw_rectangle: 'Draw Rectangle',
    draw_circle: 'Draw Circle',

    // Context menu
    add_indicator: 'Add Indicator',
    edit: 'Edit',
    delete: 'Delete',
    settings: 'Settings',

    // Indicators
    main_indicator: 'Main Indicators',
    sub_indicator: 'Sub Indicators',
    confirm: 'Confirm',

    // Individual indicators
    ma: 'Moving Average',
    ema: 'Exponential MA',
    boll: 'Bollinger Bands',
    rsi: 'RSI',
    macd: 'MACD',
    kdj: 'KDJ',
    wr: 'Williams %R',
    cci: 'CCI',
    psy: 'Psychological Line',
    dma: 'Displaced MA',
    vol: 'Volume',
  },

  'zh-CN': {
    // Existing translations...
    search_symbols: '搜索交易对...',
    setting: '设置',
    screenshot: '截图',
    indicator: '指标',
    timezone: '时区',
    full_screen: '全屏',
    exit_full_screen: '退出全屏',
    drawing_tools: '绘图工具',
    cancel: '取消',

    // New keyboard shortcuts
    toggle_fullscreen: '切换全屏',
    take_screenshot: '截图',
    undo_drawing: '撤销绘图',
    remove_selected_drawing: '删除选中绘图',
    cancel_drawing_mode: '取消绘图模式',
    toggle_drawing_tools: '切换绘图工具',
    toggle_theme: '切换主题',
    open_indicators: '打开指标',
    open_settings: '打开设置',
    select_timeframe: '选择时间周期',
    draw_line: '画线',
    draw_rectangle: '画矩形',
    draw_circle: '画圆',

    // Context menu
    add_indicator: '添加指标',
    edit: '编辑',
    delete: '删除',
    settings: '设置',

    // Indicators
    main_indicator: '主图指标',
    sub_indicator: '副图指标',
    confirm: '确认',

    // Individual indicators
    ma: '移动平均线',
    ema: '指数移动平均',
    boll: '布林带',
    rsi: 'RSI指标',
    macd: 'MACD',
    kdj: 'KDJ指标',
    wr: '威廉指标',
    cci: 'CCI指标',
    psy: '心理线',
    dma: '位移移动平均',
    vol: '成交量',

    // Magnet modes
    weak_magnet: '弱磁铁',
    strong_magnet: '强磁铁',
    no_magnet: '无磁铁'
  }
};

export function t(key, localeOverride = null) {
  const currentLocale = localeOverride || get(locale);
  return translations[currentLocale]?.[key] || key;
}

export function loadLocales(localeKey, localeData) {
  console.log('Loading locale:', localeKey);
  translations[localeKey] = { ...translations[localeKey], ...localeData };
}

export function getAvailableLocales() {
  return Object.keys(translations);
}

export function getCurrentLocale() {
  return get(locale);
}