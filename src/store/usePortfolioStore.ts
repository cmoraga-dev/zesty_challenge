import { create } from 'zustand';
import { TickerLiveData } from '../hooks/useWebSocket';

interface PortfolioState {
  portfolio: TickerLiveData[];
  setPortfolio: (data: TickerLiveData[]) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  portfolio: [],
  setPortfolio: (data) => set({ portfolio: data }),
}));
