import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  Cell
} from 'recharts';

interface ExerciseProgressDetailsProps {
  exerciseName: string;
  data: {
    date: string;
    maxWeight: number;
    avgWeight: number;
    volume: number;
  }[];
  onBack: () => void;
}

export const ExerciseProgressDetails: React.FC<ExerciseProgressDetailsProps> = ({
  exerciseName,
  data,
  onBack
}) => {
  const { t } = useLanguage();
  const [selectedBar, setSelectedBar] = useState<number | null>(null);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric'
    });
  };

  const handleBarClick = (data: any, index: number) => {
    setSelectedBar(selectedBar === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10">
        <div className="flex items-center gap-4 p-4">
          <button
            onClick={onBack}
            className="p-2 rounded-xl"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold">{exerciseName}</h2>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-32">
        <div className="space-y-6 py-4">
          {/* Weight Progression Chart */}
          <div className="glass-card p-4">
            <h3 className="text-lg font-semibold mb-4">{t('weightProgression')}</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis
                    dataKey="date"
                    stroke="#ffffff60"
                    tickFormatter={formatDate}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    stroke="#ffffff60"
                    tickFormatter={(value) => `${value}kg`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(23, 23, 23, 0.9)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0.5rem',
                    }}
                    labelStyle={{ color: 'rgba(255, 255, 255, 0.6)' }}
                    labelFormatter={formatDate}
                  />
                  <Legend />
                  <Line
                    name={t('maxWeight')}
                    type="monotone"
                    dataKey="maxWeight"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: '#a78bfa' }}
                  />
                  <Line
                    name={t('avgWeight')}
                    type="monotone"
                    dataKey="avgWeight"
                    stroke="#60a5fa"
                    strokeWidth={2}
                    dot={{ fill: '#60a5fa', strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: '#93c5fd' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Volume Progression Chart */}
          <div className="glass-card p-4">
            <h3 className="text-lg font-semibold mb-4">{t('volumeProgression')}</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  onClick={(data) => handleBarClick(data.activePayload?.[0]?.payload, data.activeTooltipIndex ?? null)}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis
                    dataKey="date"
                    stroke="#ffffff60"
                    tickFormatter={formatDate}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    stroke="#ffffff60"
                    tickFormatter={(value) => `${value}kg`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(23, 23, 23, 0.9)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0.5rem',
                    }}
                    labelStyle={{ color: 'rgba(255, 255, 255, 0.6)' }}
                    labelFormatter={formatDate}
                  />
                  <Bar
                    name={t('volume')}
                    dataKey="volume"
                    fill="#8b5cf6"
                    radius={[4, 4, 0, 0]}
                    cursor="pointer"
                    onClick={(data, index) => handleBarClick(data, index)}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={selectedBar === index ? '#a78bfa' : '#8b5cf6'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            {selectedBar !== null && (
              <div className="mt-4 p-3 glass-card">
                <div className="flex justify-between items-center">
                  <span className="text-white/60">{formatDate(data[selectedBar].date)}</span>
                  <span className="font-semibold">{data[selectedBar].volume}kg</span>
                </div>
              </div>
            )}
          </div>

          {/* Session History */}
          <div className="glass-card p-4">
            <h3 className="text-lg font-semibold mb-4">{t('sessionHistory')}</h3>
            <div className="divide-y divide-white/10 max-h-[300px] overflow-y-auto pr-2">
              {data.map((session, index) => (
                <div key={index} className="py-4 first:pt-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/60">{formatDate(session.date)}</span>
                    <span className="font-semibold">{session.maxWeight}kg</span>
                  </div>
                  <div className="flex justify-between text-sm text-white/60">
                    <span>{t('avgWeight')}: {Math.round(session.avgWeight)}kg</span>
                    <span>{t('volume')}: {session.volume}kg</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};