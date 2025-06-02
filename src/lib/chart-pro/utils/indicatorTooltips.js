export const INDICATOR_DESCRIPTIONS = {
  MA: {
    name: 'Moving Average',
    description: 'Простая скользящая средняя сглаживает ценовые данные для определения тренда',
    parameters: 'Период: количество свечей для расчета (обычно 20, 50, 200)',
    usage: 'Цена выше MA = восходящий тренд, ниже = нисходящий',
    formula: 'MA = (P1 + P2 + ... + Pn) / n'
  },

  EMA: {
    name: 'Exponential Moving Average',
    description: 'Экспоненциальная скользящая средняя дает больший вес последним ценам',
    parameters: 'Период: обычно 12, 26, 50. Множитель сглаживания: 2/(период+1)',
    usage: 'Быстрее реагирует на изменения цены чем простая MA',
    formula: 'EMA = цена × (2/(период+1)) + EMA_предыдущая × (1-(2/(период+1)))'
  },

  RSI: {
    name: 'Relative Strength Index',
    description: 'Осциллятор измеряющий скорость и изменение ценовых движений',
    parameters: 'Период: обычно 14. Диапазон: 0-100',
    usage: 'RSI > 70 = перекупленность, RSI < 30 = перепроданность',
    formula: 'RSI = 100 - (100 / (1 + RS)), где RS = среднее восходящих движений / среднее нисходящих'
  },

  MACD: {
    name: 'Moving Average Convergence Divergence',
    description: 'Трендовый осциллятор показывающий отношения между двумя скользящими средними',
    parameters: 'Быстрая EMA: 12, Медленная EMA: 26, Сигнальная: 9',
    usage: 'Пересечение MACD и сигнальной линии дает торговые сигналы',
    formula: 'MACD = EMA(12) - EMA(26), Сигнальная = EMA(MACD, 9)'
  },

  BOLL: {
    name: 'Bollinger Bands',
    description: 'Полосы волатильности построенные вокруг скользящей средней',
    parameters: 'Период MA: 20, Стандартное отклонение: 2',
    usage: 'Цена касается верхней полосы = перекупленность, нижней = перепроданность',
    formula: 'Верхняя = MA + (2 × σ), Нижняя = MA - (2 × σ)'
  },

  KDJ: {
    name: 'KDJ Stochastic',
    description: 'Модифицированный стохастический осциллятор с дополнительной J-линией',
    parameters: 'Период K: 9, Период D: 3, Период J: 3',
    usage: 'K > D = восходящий импульс, K < D = нисходящий',
    formula: 'K = (C-L9)/(H9-L9) × 100, D = MA(K,3), J = 3K - 2D'
  },

  WR: {
    name: 'Williams %R',
    description: 'Осциллятор измеряющий уровень закрытия относительно диапазона за период',
    parameters: 'Период: обычно 14. Диапазон: от -100 до 0',
    usage: '%R > -20 = перекупленность, %R < -80 = перепроданность',
    formula: '%R = (Highest High - Close) / (Highest High - Lowest Low) × -100'
  },

  CCI: {
    name: 'Commodity Channel Index',
    description: 'Осциллятор определяющий циклические развороты в товарах и акциях',
    parameters: 'Период: 20, Константа: 0.015',
    usage: 'CCI > +100 = сильный восходящий тренд, CCI < -100 = сильный нисходящий',
    formula: 'CCI = (TP - SMA(TP)) / (0.015 × MD), где TP = (H+L+C)/3'
  },

  PSY: {
    name: 'Psychological Line',
    description: 'Индикатор психологического состояния рынка на основе закрытий',
    parameters: 'Период: 12 или 24',
    usage: 'PSY > 75% = оптимизм (возможна коррекция), PSY < 25% = пессимизм',
    formula: 'PSY = (количество растущих дней / общее количество дней) × 100'
  },

  DMA: {
    name: 'Displaced Moving Average',
    description: 'Смещенная скользящая средняя для уменьшения ложных сигналов',
    parameters: 'Короткий период: 10, Длинный период: 50, Смещение: 5',
    usage: 'Пересечение смещенных MA дает более надежные сигналы',
    formula: 'DMA = MA сдвинутая на N периодов назад или вперед'
  }
};

export function getIndicatorTooltip(indicatorType) {
  const info = INDICATOR_DESCRIPTIONS[indicatorType];
  if (!info) return indicatorType;

  return `
    <div class="indicator-tooltip">
      <div class="tooltip-title">${info.name}</div>
      <div class="tooltip-description">${info.description}</div>
      <div class="tooltip-parameters"><strong>Параметры:</strong> ${info.parameters}</div>
      <div class="tooltip-usage"><strong>Использование:</strong> ${info.usage}</div>
      <div class="tooltip-formula"><strong>Формула:</strong> ${info.formula}</div>
    </div>
  `;
}

export function createTooltip(element, content) {
  let tooltip;

  function showTooltip(event) {
    tooltip = document.createElement('div');
    tooltip.className = 'detailed-tooltip';
    tooltip.innerHTML = content;
    document.body.appendChild(tooltip);

    const rect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
    let top = rect.top - tooltipRect.height - 10;

    if (left < 10) left = 10;
    if (left + tooltipRect.width > window.innerWidth - 10) {
      left = window.innerWidth - tooltipRect.width - 10;
    }
    if (top < 10) top = rect.bottom + 10;

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  }

  function hideTooltip() {
    if (tooltip) {
      tooltip.remove();
      tooltip = null;
    }
  }

  element.addEventListener('mouseenter', showTooltip);
  element.addEventListener('mouseleave', hideTooltip);

  return {
    destroy() {
      element.removeEventListener('mouseenter', showTooltip);
      element.removeEventListener('mouseleave', hideTooltip);
      hideTooltip();
    }
  };
}