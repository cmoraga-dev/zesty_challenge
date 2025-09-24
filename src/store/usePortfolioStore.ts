import { create } from 'zustand';

interface PortfolioState {
  portfolio: WebSocketMessageEvent[];
  setPortfolio: (data: WebSocketMessageEvent[]) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  portfolio: [],
  setPortfolio: (data) => set({ portfolio: data }),
}));
