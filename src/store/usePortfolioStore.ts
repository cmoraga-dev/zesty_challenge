import { create } from 'zustand';
import { WebSocketMessage } from '../hooks/useWebSocket';

interface PortfolioState {
  portfolio: WebSocketMessage[];
  setPortfolio: (data: WebSocketMessage[]) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  portfolio: [],
  setPortfolio: (data) => set({ portfolio: data }),
}));
