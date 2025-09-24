import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LineChart, XAxis, YAxis } from 'react-native-svg-charts';
import { colors } from '../styles/colors';
import { getDateLabels, getYAxisLabels } from '../utils/chartLabels';


interface PortfolioChartProps {
  history: number[];
}


export default function PortfolioChart({ history }: PortfolioChartProps) {
  const xLabels = getDateLabels(history);
  const yLabels = getYAxisLabels(history);
  const chartLineColor = colors.primary;
  const axisLabelColor = colors.accent;


  return (
    <View style={[styles.row, { backgroundColor: colors.bg }]} className="my-4 bg-white rounded p-2 border border-gray-200">
      <YAxis
        data={history}
        style={styles.yAxis}
        contentInset={{ top: 20, bottom: 20 }}
        svg={{ fontSize: 10, fill: axisLabelColor, fontWeight: 'bold' }}
        numberOfTicks={3}
        formatLabel={(_, idx) => yLabels[idx] || ''}
      />
      <View style={[styles.chartContainer, { backgroundColor: colors.bg }]}> 
        <View pointerEvents="none" style={styles.gridBg}>
          {[...Array(10)].map((_, i) => (
            <View
              key={`h-${i}`}
              style={[styles.gridLineH, { top: `${(i * 10)}%` }]}
            />
          ))}
          {[...Array(10)].map((_, i) => (
            <View
              key={`v-${i}`}
              style={[styles.gridLineV, { left: `${(i * 10)}%` }]}
            />
          ))}
        </View>
        <LineChart
          style={styles.chart}
          data={history}
          svg={{ stroke: chartLineColor, strokeWidth: 2 }}
          contentInset={{ top: 20, bottom: 20 }}
        />
        <XAxis
          style={styles.xAxis}
          data={history}
          formatLabel={(_, idx) => xLabels[idx]}
          contentInset={{ left: 10, right: 10 }}
          svg={{ fontSize: 10, fill: axisLabelColor, fontWeight: 'bold' }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chart: { height: 100, width: '100%' },
  chartContainer: {
    flex: 1,
    borderRadius: 6,
    overflow: 'hidden',
  },
  gridBg: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  gridLineH: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: colors.secondary,
    opacity: 0.5,
  },
  gridLineV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    borderLeftWidth: 1,
    borderLeftColor: colors.secondary,
    opacity: 0.5,
  },
  yAxis: {
    width: 52,
    height: 100,
  },
  xAxis: {
    marginHorizontal: -10,
    height: 16,
  },
});