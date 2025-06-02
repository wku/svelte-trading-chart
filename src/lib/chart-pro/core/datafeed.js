import { createSymbolInfo, createKLineData, SymbolType } from './types.js';

export class DefaultDatafeed {
  constructor() {
    this.wsBinance = null;
    this.currentSymbol = null;
    this.currentPeriod = null;
    this.lastCandle = null;
  }

  async searchSymbols(search = '') {
    console.log('searchSymbols called with search:', search);
    try {
      const [spotResponse, futuresResponse] = await Promise.all([
        fetch('https://api.binance.com/api/v3/exchangeInfo?permissions=SPOT'),
        fetch('https://fapi.binance.com/fapi/v1/exchangeInfo')
      ]);

      const spotData = await spotResponse.json();
      const futuresData = await futuresResponse.json();

      console.log('Fetched exchange info:', { spot: spotData, futures: futuresData });

      const spotSymbols = spotData.symbols
        .filter(symbol => symbol.quoteAsset === 'USDT' && symbol.status === 'TRADING')
        .map(symbol => createSymbolInfo(symbol.symbol, {
          name: `${symbol.baseAsset}/${symbol.quoteAsset}`,
          shortName: `${symbol.baseAsset}/${symbol.quoteAsset}`,
          exchange: 'Binance Spot',
          market: 'crypto',
          type: SymbolType.CRYPTO,
          priceCurrency: 'USDT'
        }));

      const futuresSymbols = futuresData.symbols
        .filter(symbol => symbol.status === 'TRADING')
        .map(symbol => createSymbolInfo(symbol.symbol, {
          name: `${symbol.baseAsset}/${symbol.quoteAsset}`,
          shortName: `${symbol.baseAsset}/${symbol.quoteAsset} Futures`,
          exchange: 'Binance Futures',
          market: 'futures',
          type: SymbolType.FUTURES,
          priceCurrency: symbol.quoteAsset
        }));

      const allSymbols = [...spotSymbols, ...futuresSymbols];

      const filtered = search
        ? allSymbols.filter(symbol =>
            symbol.ticker.toLowerCase().includes(search.toLowerCase()) ||
            symbol.name.toLowerCase().includes(search.toLowerCase())
          )
        : allSymbols;

      console.log('Filtered symbols:', filtered.length);
      return filtered;
    } catch (error) {
      console.error('Error fetching symbols:', error);
      return [];
    }
  }

  async getHistoryKLineData(symbol, period, from, to) {
    try {
      const interval = this.convertPeriodToInterval(period);
      console.log('Converted period to interval:', interval);

      const baseUrl = symbol.type === SymbolType.FUTURES
        ? 'https://fapi.binance.com/fapi/v1/klines'
        : 'https://api.binance.com/api/v3/klines';

      const url = `${baseUrl}?symbol=${symbol.ticker}&interval=${interval}&startTime=${from}&endTime=${to}`;
      console.log('Fetching historical data from:', url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.msg) {
        throw new Error(`Binance API Error: ${data.msg}`);
      }

      console.log('Fetched historical data:', data.length, 'candles');

      return data.map(kline => createKLineData(
        kline[0],
        parseFloat(kline[1]),
        parseFloat(kline[2]),
        parseFloat(kline[3]),
        parseFloat(kline[4]),
        parseFloat(kline[5])
      ));
    } catch (error) {
      console.error('Error loading historical data:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        return [];
      }
      throw error;
    }
  }

  async subscribe(symbol, period, callback) {
    if (this.currentSymbol?.ticker === symbol.ticker &&
        this.currentPeriod?.multiplier === period.multiplier &&
        this.currentPeriod?.timespan === period.timespan) {
      console.log('Symbol/period unchanged, skipping re-subscribe');
      return;
    }

    console.log('subscribe called:', { symbol, period });

    if (this.currentSymbol && this.currentPeriod) {
      this.unsubscribe(this.currentSymbol, this.currentPeriod);
    }

    this.currentSymbol = symbol;
    this.currentPeriod = period;

    const now = Date.now();
    const from = now - 86400000 * 7;
    const historicalData = await this.getHistoryKLineData(symbol, period, from, now);

    console.log('Loading historical data:', historicalData.length, 'candles');
    historicalData.forEach(data => callback(data));

    const interval = this.convertPeriodToInterval(period);
    const wsUrl = symbol.type === SymbolType.FUTURES
      ? `wss://fstream.binance.com/ws/${symbol.ticker.toLowerCase()}@kline_${interval}`
      : `wss://stream.binance.com:9443/ws/${symbol.ticker.toLowerCase()}@kline_${interval}`;

    console.log('Connecting to WebSocket:', wsUrl);

    if (this.wsBinance) {
      this.wsBinance.close();
    }

    this.wsBinance = new WebSocket(wsUrl);

    this.wsBinance.onopen = () => {
      console.log('WebSocket connection opened');
    };

    this.wsBinance.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.e === 'kline') {
          const kline = message.k;
          const klineData = createKLineData(
            kline.t,
            parseFloat(kline.o),
            parseFloat(kline.h),
            parseFloat(kline.l),
            parseFloat(kline.c),
            parseFloat(kline.v)
          );

          if (kline.x) {
            this.lastCandle = null;
            callback(klineData);
          } else {
            if (this.lastCandle) {
              this.lastCandle.high = Math.max(this.lastCandle.high, klineData.high);
              this.lastCandle.low = Math.min(this.lastCandle.low, klineData.low);
              this.lastCandle.close = klineData.close;
              this.lastCandle.volume = klineData.volume;
              callback(this.lastCandle);
            } else {
              this.lastCandle = { ...klineData };
              callback(this.lastCandle);
            }
          }
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    this.wsBinance.onclose = () => {
      console.log('WebSocket closed. Reconnecting in 5 seconds...');
      setTimeout(() => {
        if (this.currentSymbol && this.currentPeriod) {
          this.subscribe(this.currentSymbol, this.currentPeriod, callback);
        }
      }, 5000);
    };

    this.wsBinance.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  unsubscribe(symbol, period) {
    console.log('unsubscribe called:', { symbol, period });

    if (this.wsBinance) {
      this.wsBinance.close();
      this.wsBinance = null;
    }

    this.lastCandle = null;
  }

  convertPeriodToInterval(period) {
    const { multiplier, timespan } = period;
    const timespanMap = {
      second: 's',
      minute: 'm',
      hour: 'h',
      day: 'd',
      week: 'w',
      month: 'M'
    };

    const interval = timespanMap[timespan]
      ? `${multiplier}${timespanMap[timespan]}`
      : '1m';

    console.log('Converted period to interval:', interval);
    return interval;
  }
}