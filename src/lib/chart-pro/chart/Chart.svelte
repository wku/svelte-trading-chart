<script>
  import { onMount, onDestroy } from 'svelte';
  import { initChart, destroyChart, updateChartSymbol, updateChartPeriod, updateChartTheme, updateChartStyles } from './chart.js';
  import {
    currentSymbol,
    currentPeriod,
    setChartInstance
  } from '../stores/chartStore.js';
  import {
    theme,
    chartStyles,
    timezone
  } from '../stores/settingsStore.js';

  export let datafeed = null;

  let chartContainer;
  let chart = null;
  let unsubscribeSymbol;
  let unsubscribePeriod;
  let unsubscribeTheme;
  let unsubscribeStyles;

  onMount(async () => {
    if (chartContainer && datafeed) {
      chart = await initChart(chartContainer, {
        symbol: $currentSymbol,
        period: $currentPeriod,
        theme: $theme,
        styles: $chartStyles,
        timezone: $timezone,
        datafeed
      });

      if (chart) {
        setChartInstance(chart);

        unsubscribeSymbol = currentSymbol.subscribe(symbol => {
          if (chart && symbol) {
            updateChartSymbol(chart, symbol, datafeed);
          }
        });

        unsubscribePeriod = currentPeriod.subscribe(period => {
          if (chart && period) {
            updateChartPeriod(chart, period, datafeed);
          }
        });

        unsubscribeTheme = theme.subscribe(newTheme => {
          if (chart && newTheme) {
            updateChartTheme(chart, newTheme);
          }
        });

        unsubscribeStyles = chartStyles.subscribe(styles => {
          if (chart && styles) {
            updateChartStyles(chart, styles);
          }
        });
      }
    }
  });

  onDestroy(() => {
    if (unsubscribeSymbol) unsubscribeSymbol();
    if (unsubscribePeriod) unsubscribePeriod();
    if (unsubscribeTheme) unsubscribeTheme();
    if (unsubscribeStyles) unsubscribeStyles();

    if (chart) {
      destroyChart(chart);
      setChartInstance(null);
    }
  });
</script>

<div class="chart-container" bind:this={chartContainer}></div>