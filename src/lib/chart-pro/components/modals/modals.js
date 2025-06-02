import { get } from 'svelte/store';
import { chartInstance } from '../../stores/chartStore.js';
import { updateChartStyles } from '../../chart/chart.js';
import { t, getCurrentLocale } from '../../utils/i18n.js';

export function getSettingsOptions() {
  const locale = getCurrentLocale();

  return [
    {
      key: 'candle.type',
      text: t('candle_type', locale),
      component: 'select',
      dataSource: [
        { key: 'candle_solid', text: t('candle_solid', locale) },
        { key: 'candle_stroke', text: t('candle_stroke', locale) },
        { key: 'candle_up_stroke', text: t('candle_up_stroke', locale) },
        { key: 'candle_down_stroke', text: t('candle_down_stroke', locale) },
        { key: 'ohlc', text: t('ohlc', locale) },
        { key: 'area', text: t('area', locale) }
      ]
    },
    {
      key: 'candle.priceMark.last.show',
      text: t('last_price_show', locale),
      component: 'switch'
    },
    {
      key: 'candle.priceMark.high.show',
      text: t('high_price_show', locale),
      component: 'switch'
    },
    {
      key: 'candle.priceMark.low.show',
      text: t('low_price_show', locale),
      component: 'switch'
    },
    {
      key: 'indicator.lastValueMark.show',
      text: t('indicator_last_value_show', locale),
      component: 'switch'
    },
    {
      key: 'yAxis.type',
      text: t('price_axis_type', locale),
      component: 'select',
      dataSource: [
        { key: 'normal', text: t('normal', locale) },
        { key: 'percentage', text: t('percentage', locale) },
        { key: 'log', text: t('log', locale) }
      ]
    },
    {
      key: 'yAxis.reverse',
      text: t('reverse_coordinate', locale),
      component: 'switch'
    },
    {
      key: 'grid.show',
      text: t('grid_show', locale),
      component: 'switch'
    }
  ];
}

export function getTimezoneOptions() {
  const locale = getCurrentLocale();

  return [
    { key: 'Etc/UTC', text: t('utc', locale) },
    { key: 'Pacific/Honolulu', text: t('honolulu', locale) },
    { key: 'America/Juneau', text: t('juneau', locale) },
    { key: 'America/Los_Angeles', text: t('los_angeles', locale) },
    { key: 'America/Chicago', text: t('chicago', locale) },
    { key: 'America/Toronto', text: t('toronto', locale) },
    { key: 'America/Sao_Paulo', text: t('sao_paulo', locale) },
    { key: 'Europe/London', text: t('london', locale) },
    { key: 'Europe/Berlin', text: t('berlin', locale) },
    { key: 'Asia/Bahrain', text: t('bahrain', locale) },
    { key: 'Asia/Dubai', text: t('dubai', locale) },
    { key: 'Asia/Ashkhabad', text: t('ashkhabad', locale) },
    { key: 'Asia/Almaty', text: t('almaty', locale) },
    { key: 'Asia/Bangkok', text: t('bangkok', locale) },
    { key: 'Asia/Shanghai', text: t('shanghai', locale) },
    { key: 'Asia/Tokyo', text: t('tokyo', locale) },
    { key: 'Australia/Sydney', text: t('sydney', locale) },
    { key: 'Pacific/Norfolk', text: t('norfolk', locale) }
  ];
}

export function applySettings(styles) {
  const chart = get(chartInstance);
  if (!chart) return;

  console.log('Applying settings:', styles);
  updateChartStyles(chart, styles);
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
      link.download = `chart-screenshot-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.jpg`;
      link.href = canvas;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log('Screenshot saved successfully');
    } else {
      console.error('Failed to generate screenshot');
    }
  } catch (error) {
    console.error('Error taking screenshot:', error);
  }
}

export function exportChartData() {
  const chart = get(chartInstance);
  if (!chart) return;

  try {
    console.log('Exporting chart data');
    const data = chart.getDataList();
    const jsonData = JSON.stringify(data, null, 2);

    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.download = `chart-data-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
    console.log('Chart data exported successfully');
  } catch (error) {
    console.error('Error exporting chart data:', error);
  }
}

export function resetZoom() {
  const chart = get(chartInstance);
  if (!chart) return;

  try {
    console.log('Resetting zoom');
    chart.zoomAtDataIndex(0, 1);
  } catch (error) {
    console.error('Error resetting zoom:', error);
  }
}

export function fitContent() {
  const chart = get(chartInstance);
  if (!chart) return;

  try {
    console.log('Fitting content');
    chart.zoomAtDataIndex(0, chart.getDataList().length);
  } catch (error) {
    console.error('Error fitting content:', error);
  }
}