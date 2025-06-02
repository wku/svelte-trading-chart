import { get } from 'svelte/store';
import {
  setDrawingTool,
  setMagnetMode as setStoreMagnetMode,
  chartInstance,
  selectedOverlay,
  overlays,
  removeOverlay,
  selectOverlay
} from '../../stores/chartStore.js';
import { createOverlay, removeOverlay as removeChartOverlay } from '../../chart/chart.js';
import { DRAWING_TOOLS } from '../../utils/constants.js';
import { t, getCurrentLocale } from '../../utils/i18n.js';

export function selectDrawingTool(tool) {
  console.log('Selecting drawing tool:', tool);
  const chart = get(chartInstance);

  if (chart && tool) {
    chart.createOverlay(tool);
    setDrawingTool(tool);
  } else {
    setDrawingTool(null);
  }
}

export function setMagnetMode(mode) {
  console.log('Setting magnet mode:', mode);
  const chart = get(chartInstance);

  if (chart) {
    chart.setStyles({
      overlay: {
        point: {
          activeBackgroundColor: mode === 'strong_magnet' ? '#ff0000' : mode === 'weak_magnet' ? '#ffaa00' : '#888888'
        }
      }
    });
  }

  setStoreMagnetMode(mode);
}

export function removeSelectedOverlay() {
  const overlay = get(selectedOverlay);
  const chart = get(chartInstance);

  if (overlay && chart) {
    console.log('Removing selected overlay:', overlay.id);
    removeChartOverlay(chart, overlay.id);
    removeOverlay(overlay.id);
    selectOverlay(null);
  }
}

export function clearAllOverlays() {
  const chart = get(chartInstance);
  const allOverlays = get(overlays);

  if (chart && allOverlays.length > 0) {
    console.log('Clearing all overlays:', allOverlays.length);
    allOverlays.forEach(overlay => {
      removeChartOverlay(chart, overlay.id);
      removeOverlay(overlay.id);
    });
    selectOverlay(null);
  }
}

export function getDrawingToolGroups() {
  const locale = getCurrentLocale();

  return {
    single: DRAWING_TOOLS.SINGLE_LINE.map(key => ({
      key,
      text: t(key, locale)
    })),
    more: DRAWING_TOOLS.MORE_LINE.map(key => ({
      key,
      text: t(key, locale)
    })),
    polygon: DRAWING_TOOLS.POLYGON.map(key => ({
      key,
      text: t(key, locale)
    })),
    fibonacci: DRAWING_TOOLS.FIBONACCI.map(key => ({
      key,
      text: t(key, locale)
    })),
    wave: DRAWING_TOOLS.WAVE.map(key => ({
      key,
      text: t(key, locale)
    }))
  };
}

export function toggleOverlayVisibility(overlayId) {
  const chart = get(chartInstance);

  if (chart) {
    console.log('Toggling overlay visibility:', overlayId);
    chart.setOverlayStyles(overlayId, {
      visible: !chart.getOverlayById(overlayId)?.visible
    });
  }
}

export function lockOverlay(overlayId, locked = true) {
  const chart = get(chartInstance);

  if (chart) {
    console.log('Setting overlay lock:', overlayId, locked);
    chart.setOverlayStyles(overlayId, {
      lock: locked
    });
  }
}

export function duplicateOverlay(overlayId) {
  const chart = get(chartInstance);

  if (chart) {
    console.log('Duplicating overlay:', overlayId);
    const overlay = chart.getOverlayById(overlayId);
    if (overlay) {
      chart.createOverlay(overlay.name, overlay.points);
    }
  }
}

export function getOverlayInfo(overlayId) {
  const chart = get(chartInstance);

  if (chart) {
    return chart.getOverlayById(overlayId);
  }
  return null;
}