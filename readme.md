# ChartPro Demo - Svelte Trading Chart

A demonstration project showcasing a professional trading chart implementation using Svelte and KLineCharts. This project serves as an example of how to integrate the ChartPro library into a Svelte application.

## 🚀 Features

- ✅ **Real-time Data**: Live market data from Binance (spot and futures)
- ✅ **Drawing Tools**: Complete set of drawing instruments (lines, shapes, Fibonacci, Elliott waves)
- ✅ **Technical Indicators**: 50+ built-in technical analysis indicators
- ✅ **Symbol Search**: Dynamic symbol search and timeframe switching
- ✅ **Themes**: Light/dark theme support with smooth transitions
- ✅ **Internationalization**: Multi-language support (EN, CN)
- ✅ **Export Features**: Screenshot capture and data export functionality
- ✅ **Fullscreen Mode**: Immersive trading experience
- ✅ **Chart Settings**: Comprehensive chart customization options
- ✅ **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-repo/chartpro-demo.git
cd chartpro-demo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── lib/
│   └── chart-pro/              # ChartPro Library
│       ├── chart/              # Core chart component
│       ├── components/         # UI components
│       │   ├── chart-toolbar/  # Main toolbar
│       │   ├── drawing-tools/  # Drawing instruments
│       │   ├── indicators/     # Technical indicators
│       │   └── modals/         # Settings and dialogs
│       ├── core/               # Core system
│       │   ├── datafeed.js     # Data provider interface
│       │   ├── extensions.js   # Chart extensions
│       │   └── types.js        # Type definitions
│       ├── stores/             # Svelte stores
│       │   ├── chartStore.js   # Chart state management
│       │   └── settingsStore.js# Settings management
│       ├── utils/              # Utilities
│       │   ├── constants.js    # Application constants
│       │   └── i18n.js         # Internationalization
│       └── index.js            # Library entry point
├── App.svelte                  # Main application component
├── main.js                     # Application entry point
└── app.css                     # Global styles
```

## 🏗 Architecture

This demo showcases a **modular Svelte architecture** with:

- **Component Isolation**: Each feature is encapsulated in its own component
- **State Management**: Centralized state using Svelte stores
- **Clean Separation**: Logic, markup, and styles are properly separated
- **Reusable Components**: All components are designed for reusability
- **Minimal Dependencies**: Only essential dependencies (KLineCharts 9.8.10)

## 💻 Usage Examples

### Basic Implementation

```svelte
<script>
  import { ChartPro, DefaultDatafeed } from './lib/chart-pro';

  const datafeed = new DefaultDatafeed();
</script>

<ChartPro {datafeed} />
```

### Advanced Configuration

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
    exchange: 'Binance',
    type: SymbolType.CRYPTO
  });

  const period = createPeriod(15, PeriodTimespan.MINUTE, '15m');
</script>

<ChartPro 
  {datafeed}
  {symbol}
  {period}
  theme="dark"
  showToolbar={true}
  showDrawingTools={true}
  showIndicators={true}
/>
```

### Custom Data Provider

```javascript
// Create your own datafeed implementation
class CustomDatafeed {
  async getKLineData(symbol, period, from, to) {
    // Fetch data from your API
    const response = await fetch(`/api/chart-data/${symbol}`);
    return response.json();
  }

  subscribe(symbol, period, callback) {
    // Implement real-time data subscription
    const ws = new WebSocket(`ws://your-api.com/ws/${symbol}`);
    ws.onmessage = (event) => callback(JSON.parse(event.data));
  }
}
```

## 🎨 Core Components

### ChartPro
Main chart component with full trading functionality

### ChartToolbar
- Symbol search and selection
- Timeframe switching
- Theme toggle
- Screenshot capture
- Fullscreen mode

### DrawingTools
- Trend lines and channels
- Geometric shapes
- Fibonacci tools
- Elliott wave patterns
- Text annotations

### IndicatorPanel
- Moving averages (SMA, EMA, WMA)
- Oscillators (RSI, MACD, Stochastic)
- Volume indicators
- Bollinger Bands
- And many more...

### SettingsModal
- Chart appearance customization
- Grid and crosshair settings
- Color scheme configuration
- Timezone selection

## 📊 Data Integration

The demo uses KLineCharts 9.8.10 as the core charting engine and provides:

- **Binance Integration**: Real-time crypto market data
- **WebSocket Support**: Live price updates
- **Historical Data**: OHLCV data with various timeframes
- **Symbol Management**: Dynamic symbol search and switching

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Type checking
npm run check

# Linting
npm run lint
```

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## 🎯 Use Cases

This demo is perfect for:

- **Learning Svelte**: See how to build complex financial applications
- **Chart Integration**: Example of integrating KLineCharts with Svelte
- **Trading Applications**: Foundation for building trading platforms
- **Financial Dashboards**: Base for market analysis tools
- **Educational Projects**: Understanding financial chart implementation

## 🌐 Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## 📱 Mobile Support

Fully responsive design with touch-friendly controls for mobile trading.

## 🔗 Dependencies

```json
{
  "klinecharts": "^9.8.10"
}
```

The project uses minimal dependencies to keep it lightweight and fast.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/src/lib/chart-pro/README.md` for library documentation
- **Issues**: Report bugs and feature requests via GitHub Issues
- **Discussions**: Join the community discussions

## 🙏 Acknowledgments

- [KLineCharts](https://github.com/liihuu/KLineChart) - Excellent charting library
- [Svelte](https://svelte.dev/) - Amazing frontend framework
- [Binance API](https://binance-docs.github.io/apidocs/) - Market data provider

---

**Made with ❤️ using Svelte + KLineCharts**

*This demo showcases the power of modern web technologies for building professional financial applications.*