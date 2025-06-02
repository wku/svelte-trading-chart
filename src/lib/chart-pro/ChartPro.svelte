<script>
 import Chart from './chart/Chart.svelte';
 import ChartToolbar from './components/chart-toolbar/ChartToolbar.svelte';
 import DrawingTools from './components/drawing-tools/DrawingTools.svelte';
 import IndicatorPanel from './components/indicators/IndicatorPanel.svelte';
 import SettingsModal from './components/modals/SettingsModal.svelte';
 import TimezoneModal from './components/modals/TimezoneModal.svelte';
 import { DefaultDatafeed } from './core/datafeed.js';
 import { initToolbar } from './components/chart-toolbar/toolbar.js';
 import { registerAllExtensions } from './core/extensions.js';
 import { isChartReady } from './stores/chartStore.js';
 import { onMount } from 'svelte';

 import './chart/chart.css';
 import './components/chart-toolbar/toolbar.css';
 import './components/drawing-tools/drawing.css';
 import './components/indicators/indicators.css';
 import './components/modals/modals.css';

 export let datafeed = null;
 export let symbol = null;
 export let period = null;
 export let theme = 'light';
 export let showToolbar = true;
 export let showDrawingTools = true;
 export let showIndicators = true;
 export let showSettings = true;
 export let className = '';

 import { setTheme } from './stores/settingsStore.js';
 import { updateSymbol, updatePeriod } from './stores/chartStore.js';

 let chartContainer;
 let loading = true;

 $: if (theme) {
 setTheme(theme);
 }

 $: if (symbol) {
 updateSymbol(symbol);
 }

 $: if (period) {
 updatePeriod(period);
 }

 onMount(async () => {
 try {
 if (!datafeed) {
 datafeed = new DefaultDatafeed();
 }

 await initToolbar(datafeed);

 const klinecharts = await import('klinecharts');
 registerAllExtensions(klinecharts);

 loading = false;
 } catch (error) {
 console.error('Error initializing ChartPro:', error);
 loading = false;
 }
 });
</script>

{#if loading}
 <div class="chart-pro-loading">
 <div class="loading-spinner"></div>
 <span>Loading Chart Pro...</span>
 </div>
{:else}
 <div class="chart-pro {className}">
 <div class="chart-pro-layout">
 {#if showToolbar}
 <ChartToolbar />
 {/if}

 {#if showDrawingTools}
 <DrawingTools />
 {/if}

 <div class="chart-pro-wrapper">
 <Chart bind:container={chartContainer} {datafeed} />
 </div>
 </div>

 {#if showIndicators}
 <IndicatorPanel />
 {/if}

 {#if showSettings}
 <SettingsModal />
 <TimezoneModal />
 {/if}
 </div>
{/if}

<style>
 .chart-pro {
 height: 100vh;
 width: 100vw;
 display: flex;
 flex-direction: column;
 overflow: hidden;
 font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
 background-color: var(--chart-background-color, #ffffff);
 color: var(--chart-text-color, #051441);
 }

 .chart-pro-layout {
 display: flex;
 flex-direction: column;
 flex: 1;
 overflow: hidden;
 }

 .chart-pro-wrapper {
 flex: 1;
 overflow: hidden;
 position: relative;
 min-height: 400px;
 }

 .chart-pro-loading {
 display: flex;
 align-items: center;
 justify-content: center;
 height: 100vh;
 color: #666;
 background-color: var(--chart-background-color, #ffffff);
 }

 .loading-spinner {
 width: 40px;
 height: 40px;
 border: 4px solid #f3f3f3;
 border-top: 4px solid #1677ff;
 border-radius: 50%;
 animation: spin 1s linear infinite;
 margin-right: 12px;
 }

 @keyframes spin {
 0% { transform: rotate(0deg); }
 100% { transform: rotate(360deg); }
 }

 @media (max-width: 768px) {
 .chart-pro-wrapper {
 min-height: 300px;
 }
 }
</style>