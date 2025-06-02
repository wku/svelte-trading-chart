# ChartPro

A professional, feature-rich trading chart component built with Svelte and KLineCharts. Designed for financial applications requiring advanced charting capabilities with drawing tools, technical indicators, and comprehensive customization options.

## Features

- **Professional Trading Interface**: Clean, modern design optimized for financial data visualization
- **Advanced Drawing Tools**: Lines, shapes, Fibonacci retracements, Elliott waves, and more
- **Technical Indicators**: 50+ built-in indicators including MA, MACD, RSI, Bollinger Bands
- **Multiple Timeframes**: Support for various chart intervals from minutes to months
- **Theme Support**: Light/dark themes with customizable color schemes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Accessibility**: Full keyboard navigation and screen reader support
- **i18n Ready**: Multi-language support with easy localization
- **Extensible**: Plugin architecture for custom indicators and tools

## Installation

### For Development

```bash
# Clone and integrate into your Svelte project
git clone https://github.com/your-repo/chart-pro.git
cp -r chart-pro/src/lib/chart-pro ./src/lib/
```

### As Git Submodule

```bash
# Add as submodule for easier updates
git submodule add https://github.com/your-repo/chart-pro.git src/lib/chart-pro
git submodule update --init --recursive
```

### Manual Copy

```bash
# Download and copy the chart-pro folder to your project
cp -r /path/to/chart-pro ./src/lib/
```

## Project Integration

After installing, your project structure should look like:

```
src/
├── lib/
│   └── chart-pro/     # ChartPro Library
│       ├── chart/
│       ├── components/
│       ├── core/
│       ├── stores/
│       └── utils/
└── your-app-files...
```

## Quick Start

### Basic Usage

```svelte
<script>
  import { ChartPro, DefaultDatafeed } from './lib/chart-pro';

  const datafeed = new DefaultDatafeed();
</script>

<ChartPro 
  {datafeed}
  theme="light"
  showToolbar={true}
  showDrawingTools={true}
  showIndicators={true}
/>
```

### With Custom Symbol and Period

```svelte
<script>
  import { 
    ChartPro, 
    DefaultDatafeed, 
    createSymbolInfo, 
    createPeriod,
    SymbolType,
    PeriodTimespan 
  } from './lib/chart-pro';

  const datafeed = new DefaultDatafeed();
  
  const symbol = createSymbolInfo('BTCUSDT', {
    name: 'Bitcoin / Tether',
    shortName: 'BTCUSDT',
    exchange: 'Binance',
    market: 'crypto',
    type: SymbolType.CRYPTO,
    priceCurrency: 'USDT'
  });

  const period = createPeriod(15, PeriodTimespan.MINUTE, '15m');
</script>

<ChartPro 
  {datafeed}
  {symbol}
  {period}
  theme="dark"
/>
```

## API Reference

### ChartPro Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `datafeed` | `IDatafeed` | `null` | Data provider for chart data |
| `symbol` | `SymbolInfo` | `null` | Initial symbol to display |
| `period` | `Period` | `null` | Initial time period |
| `theme` | `'light' \| 'dark'` | `'light'` | Chart theme |
| `showToolbar` | `boolean` | `true` | Show/hide main toolbar |
| `showDrawingTools` | `boolean` | `true` | Show/hide drawing tools panel |
| `showIndicators` | `boolean` | `true` | Show/hide indicators panel |
| `showSettings` | `boolean` | `true` | Show/hide settings modal |
| `className` | `string` | `''` | Additional CSS class |

### Datafeed Interface

Implement the `IDatafeed` interface to provide chart data:

```typescript
interface IDatafeed {
  // Search for symbols
  searchSymbols(query: string): Promise<SymbolSearchResult[]>;
  
  // Get symbol information
  getSymbolInfo(symbol: string): Promise<SymbolInfo>;
  
  // Get historical data
  getKLineData(symbol: string, period: Period, from: number, to: number): Promise<KLineData[]>;
  
  // Subscribe to real-time updates
  subscribe(symbol: string, period: Period, callback: (data: KLineData) => void): void;
  
  // Unsubscribe from updates
  unsubscribe(symbol: string, period: Period): void;
}
```

### Symbol Configuration

```typescript
const symbol = createSymbolInfo('AAPL', {
  name: 'Apple Inc.',
  shortName: 'AAPL',
  exchange: 'NASDAQ',
  market: 'stocks',
  type: SymbolType.STOCK,
  priceCurrency: 'USD',
  description: 'Apple Inc. Common Stock',
  ticker: 'AAPL'
});
```

### Period Configuration

```typescript
// 15-minute chart
const period = createPeriod(15, PeriodTimespan.MINUTE, '15m');

// Daily chart
const period = createPeriod(1, PeriodTimespan.DAY, '1D');

// Weekly chart
const period = createPeriod(1, PeriodTimespan.WEEK, '1W');
```

## Stores and State Management

Access chart state using built-in stores:

```svelte
<script>
  import { 
    currentSymbol, 
    currentPeriod, 
    chartInstance,
    isChartReady,
    theme,
    setTheme 
  } from './lib/chart-pro';

  // Reactive access to current state
  $: console.log('Current symbol:', $currentSymbol);
  $: console.log('Chart ready:', $isChartReady);

  // Update theme programmatically
  function toggleTheme() {
    setTheme($theme === 'light' ? 'dark' : 'light');
  }
</script>
```

## Drawing Tools

Access drawing functionality:

```svelte
<script>
  import { selectDrawingTool, setMagnetMode, getDrawingToolGroups } from './lib/chart-pro';

  function enableTrendLine() {
    selectDrawingTool('priceLine');
  }

  function enableMagnetMode() {
    setMagnetMode('strong_magnet');
  }

  $: toolGroups = getDrawingToolGroups();
</script>
```

### Available Drawing Tools

- **Lines**: Trend lines, horizontal/vertical lines, ray lines
- **Shapes**: Rectangles, circles, polygons
- **Fibonacci**: Retracements, extensions, arcs, fans
- **Elliott Wave**: Wave patterns and labels
- **Annotations**: Text labels, arrows, callouts

## Technical Indicators

Manage indicators programmatically:

```svelte
<script>
  import { 
    toggleMainIndicator, 
    toggleSubIndicator, 
    getAvailableIndicators 
  } from './lib/chart-pro';

  function addMovingAverage() {
    toggleMainIndicator('MA');
  }

  function addRSI() {
    toggleSubIndicator('RSI');
  }

  $: indicators = getAvailableIndicators();
</script>
```

### Supported Indicators

**Main Chart Indicators:**
- Moving Averages (SMA, EMA, WMA)
- Bollinger Bands
- SAR (Parabolic SAR)
- BOLL (Bollinger Bands)

**Sub Chart Indicators:**
- RSI (Relative Strength Index)
- MACD (Moving Average Convergence Divergence)
- KDJ (Stochastic Oscillator)
- VOL (Volume)
- And 40+ more...

## Customization

### Theme Customization

Override CSS variables to customize appearance:

```css
:root {
  --chart-background-color: #ffffff;
  --chart-text-color: #051441;
  --chart-border-color: #ebedf1;
  --chart-grid-color: #f5f5f5;
  --primary-color: #1677ff;
}

:root[data-theme="dark"] {
  --chart-background-color: #151517;
  --chart-text-color: #f8f8f8;
  --chart-border-color: #292929;
  --chart-grid-color: #333333;
}
```

### Custom Datafeed Example

```typescript
class CustomDatafeed implements IDatafeed {
  async searchSymbols(query: string) {
    const response = await fetch(`/api/search?q=${query}`);
    return response.json();
  }

  async getSymbolInfo(symbol: string) {
    const response = await fetch(`/api/symbols/${symbol}`);
    return response.json();
  }

  async getKLineData(symbol: string, period: Period, from: number, to: number) {
    const response = await fetch(
      `/api/klines/${symbol}?period=${period.timespan}&from=${from}&to=${to}`
    );
    return response.json();
  }

  subscribe(symbol: string, period: Period, callback: (data: KLineData) => void) {
    // Implement WebSocket or polling logic
    const ws = new WebSocket(`ws://localhost:8080/ws/${symbol}`);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      callback(data);
    };
  }

  unsubscribe(symbol: string, period: Period) {
    // Clean up subscriptions
  }
}
```

## Toolbar Actions

Control chart behavior programmatically:

```svelte
<script>
  import { 
    takeScreenshot, 
    toggleTheme, 
    handlePeriodChange, 
    handleSymbolSearch 
  } from './lib/chart-pro';

  async function downloadChart() {
    const imageData = await takeScreenshot();
    // Handle image data
  }

  function switchToDaily() {
    const dailyPeriod = createPeriod(1, PeriodTimespan.DAY, '1D');
    handlePeriodChange(dailyPeriod);
  }
</script>
```

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Dependencies

- Svelte 4.0+
- KLineCharts 9.0+

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details.

## Support

- Documentation: [Chart Pro Docs](https://chartpro.dev/docs)
- Issues: [GitHub Issues](https://github.com/yourorg/chart-pro/issues)
- Discussions: [GitHub Discussions](https://github.com/yourorg/chart-pro/discussions)

---

Built with ❤️ using Svelte and KLineCharts