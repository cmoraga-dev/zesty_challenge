import { useEffect, useRef, useState, useCallback } from 'react';


export interface TickerLiveData {
  ticker: string;
  price?: number;
  history?: Array<{ date: string; open: number; high: number; low: number; close: number }>;
}

export function useWebSocket(url: string) {
  const ws = useRef<WebSocket | null>(null);
  const [data, setData] = useState<TickerLiveData[]>([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Store live data by ticker
  const liveDataRef = useRef<{ [ticker: string]: TickerLiveData }>({});

  const handleMessage = useCallback((event: any) => {
    try {
      const msg = JSON.parse(event.data);
      if (msg.type === 'history' && msg.data) {
        Object.entries(msg.data).forEach(([ticker, history]) => {
          if (!liveDataRef.current[ticker]) liveDataRef.current[ticker] = { ticker };
          liveDataRef.current[ticker].history = history as Array<{ date: string; open: number; high: number; low: number; close: number }>;
        });
        setData(Object.values(liveDataRef.current));
      } else if (msg.type === 'tick' && msg.ticker) {
        if (!liveDataRef.current[msg.ticker]) liveDataRef.current[msg.ticker] = { ticker: msg.ticker };
        liveDataRef.current[msg.ticker].price = msg.price;
        setData(Object.values(liveDataRef.current));
      }
    } catch {
      setError('Invalid data received');
      console.error('[useWebSocket] Invalid data received');
    }
  }, []);

  useEffect(() => {
    console.log('[useWebSocket] Initializing WebSocket:', url);
    ws.current = new WebSocket(url);
    ws.current.onopen = () => {
      setConnected(true);
      console.log('[useWebSocket] WebSocket connected');
    };
    ws.current.onclose = () => {
      setConnected(false);
      console.log('[useWebSocket] WebSocket disconnected');
    };
    ws.current.onerror = (e) => {
      setError('WebSocket error');
      console.error('[useWebSocket] WebSocket error', e);
    };
    ws.current.onmessage = handleMessage;
    return () => {
      console.log('[useWebSocket] Cleaning up WebSocket');
      ws.current?.close();
    };
  }, [url, handleMessage]);

  return { data, connected, error };
}
