<script>
 import { ChartPro, DefaultDatafeed, createSymbolInfo, createPeriod, SymbolType, PeriodTimespan } from './lib/chart-pro';

 let datafeed = new DefaultDatafeed();

 let symbol = createSymbolInfo('BTCUSDT', {
 name: 'Bitcoin / Tether',
 shortName: 'BTCUSDT',
 exchange: 'Binance Spot',
 market: 'crypto',
 type: SymbolType.CRYPTO,
 priceCurrency: 'USDT'
 });

 let period = createPeriod(15, PeriodTimespan.MINUTE, '15m');
</script>

<ChartPro
 {datafeed}
 {symbol}
 {period}
 theme="light"
 showToolbar={true}
 showDrawingTools={true}
 showIndicators={true}
 showSettings={true}
/>