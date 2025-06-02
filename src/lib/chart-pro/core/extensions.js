function getRotateCoordinate(coordinate, targetCoordinate, angle) {
  const x = (coordinate.x - targetCoordinate.x) * Math.cos(angle) - (coordinate.y - targetCoordinate.y) * Math.sin(angle) + targetCoordinate.x;
  const y = (coordinate.x - targetCoordinate.x) * Math.sin(angle) + (coordinate.y - targetCoordinate.y) * Math.cos(angle) + targetCoordinate.y;
  return { x, y };
}

function getRayLine(coordinates, bounding) {
  if (coordinates.length > 1) {
    let coordinate;
    if (coordinates[0].x === coordinates[1].x && coordinates[0].y !== coordinates[1].y) {
      coordinate = coordinates[0].y < coordinates[1].y
        ? { x: coordinates[0].x, y: bounding.height }
        : { x: coordinates[0].x, y: 0 };
    } else if (coordinates[0].x > coordinates[1].x) {
      coordinate = {
        x: 0,
        y: coordinates[0].y + (coordinates[1].y - coordinates[0].y) * (0 - coordinates[0].x) / (coordinates[1].x - coordinates[0].x)
      };
    } else {
      coordinate = {
        x: bounding.width,
        y: coordinates[0].y + (coordinates[1].y - coordinates[0].y) * (bounding.width - coordinates[0].x) / (coordinates[1].x - coordinates[0].x)
      };
    }
    return { coordinates: [coordinates[0], coordinate] };
  }
  return [];
}

function getDistance(coordinate1, coordinate2) {
  const xDis = Math.abs(coordinate1.x - coordinate2.x);
  const yDis = Math.abs(coordinate1.y - coordinate2.y);
  return Math.sqrt(xDis * xDis + yDis * yDis);
}

export const arrow = {
  name: 'arrow',
  totalStep: 3,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  createPointFigures: ({ coordinates }) => {
    if (coordinates.length > 1) {
      const flag = coordinates[1].x > coordinates[0].x ? 0 : 1;
      const slope = (coordinates[1].y - coordinates[0].y) / (coordinates[1].x - coordinates[0].x);
      let offsetAngle;
      if (isFinite(slope)) {
        offsetAngle = Math.atan(slope) + Math.PI * flag;
      } else {
        offsetAngle = coordinates[1].y > coordinates[0].y ? Math.PI / 2 : Math.PI / 2 * 3;
      }
      const rotateCoordinate1 = getRotateCoordinate({ x: coordinates[1].x - 8, y: coordinates[1].y + 4 }, coordinates[1], offsetAngle);
      const rotateCoordinate2 = getRotateCoordinate({ x: coordinates[1].x - 8, y: coordinates[1].y - 4 }, coordinates[1], offsetAngle);
      return [
        { type: 'line', attrs: { coordinates } },
        { type: 'line', ignoreEvent: true, attrs: { coordinates: [rotateCoordinate1, coordinates[1], rotateCoordinate2] } }
      ];
    }
    return [];
  }
};

export const circle = {
  name: 'circle',
  totalStep: 3,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  styles: { circle: { color: 'rgba(22, 119, 255, 0.15)' } },
  createPointFigures: ({ coordinates }) => {
    if (coordinates.length > 1) {
      const radius = getDistance(coordinates[0], coordinates[1]);
      return {
        type: 'circle',
        attrs: { ...coordinates[0], r: radius },
        styles: { style: 'stroke_fill' }
      };
    }
    return [];
  }
};

export const rect = {
  name: 'rect',
  totalStep: 3,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  styles: { polygon: { color: 'rgba(22, 119, 255, 0.15)' } },
  createPointFigures: ({ coordinates }) => {
    if (coordinates.length > 1) {
      return [{
        type: 'polygon',
        attrs: {
          coordinates: [
            coordinates[0],
            { x: coordinates[1].x, y: coordinates[0].y },
            coordinates[1],
            { x: coordinates[0].x, y: coordinates[1].y }
          ]
        },
        styles: { style: 'stroke_fill' }
      }];
    }
    return [];
  }
};

export const triangle = {
  name: 'triangle',
  totalStep: 4,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  styles: { polygon: { color: 'rgba(22, 119, 255, 0.15)' } },
  createPointFigures: ({ coordinates }) => {
    return [{
      type: 'polygon',
      attrs: { coordinates },
      styles: { style: 'stroke_fill' }
    }];
  }
};

export const parallelogram = {
  name: 'parallelogram',
  totalStep: 4,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  styles: { polygon: { color: 'rgba(22, 119, 255, 0.15)' } },
  createPointFigures: ({ coordinates }) => {
    if (coordinates.length === 2) {
      return [{ type: 'line', ignoreEvent: true, attrs: { coordinates } }];
    }
    if (coordinates.length === 3) {
      const coordinate = { x: coordinates[0].x + (coordinates[2].x - coordinates[1].x), y: coordinates[2].y };
      return [{
        type: 'polygon',
        attrs: { coordinates: [coordinates[0], coordinates[1], coordinates[2], coordinate] },
        styles: { style: 'stroke_fill' }
      }];
    }
    return [];
  }
};

export const fibonacciSegment = {
  name: 'fibonacciSegment',
  totalStep: 3,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  createPointFigures: ({ coordinates, overlay, precision }) => {
    const lines = [];
    const texts = [];
    if (coordinates.length > 1) {
      const textX = coordinates[1].x > coordinates[0].x ? coordinates[0].x : coordinates[1].x;
      const percents = [1, 0.786, 0.618, 0.5, 0.382, 0.236, 0];
      const yDif = coordinates[0].y - coordinates[1].y;
      const points = overlay.points;
      const valueDif = points[0].value - points[1].value;
      percents.forEach(percent => {
        const y = coordinates[1].y + yDif * percent;
        const price = (points[1].value + valueDif * percent).toFixed(precision.price);
        lines.push({ coordinates: [{ x: coordinates[0].x, y }, { x: coordinates[1].x, y }] });
        texts.push({
          x: textX,
          y,
          text: `${price} (${(percent * 100).toFixed(1)}%)`,
          baseline: 'bottom'
        });
      });
    }
    return [
      { type: 'line', attrs: lines },
      { type: 'text', ignoreEvent: true, attrs: texts }
    ];
  }
};

export const fibonacciCircle = {
  name: 'fibonacciCircle',
  totalStep: 3,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  createPointFigures: ({ coordinates }) => {
    if (coordinates.length > 1) {
      const xDis = Math.abs(coordinates[0].x - coordinates[1].x);
      const yDis = Math.abs(coordinates[0].y - coordinates[1].y);
      const radius = Math.sqrt(xDis * xDis + yDis * yDis);
      const percents = [0.236, 0.382, 0.5, 0.618, 0.786, 1];
      const circles = [];
      const texts = [];
      percents.forEach(percent => {
        const r = radius * percent;
        circles.push({ ...coordinates[0], r });
        texts.push({
          x: coordinates[0].x,
          y: coordinates[0].y + r + 6,
          text: `${(percent * 100).toFixed(1)}%`
        });
      });
      return [
        { type: 'circle', attrs: circles, styles: { style: 'stroke' } },
        { type: 'text', ignoreEvent: true, attrs: texts }
      ];
    }
    return [];
  }
};

export const threeWaves = {
  name: 'threeWaves',
  totalStep: 5,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  createPointFigures: ({ coordinates }) => {
    const texts = coordinates.map((coordinate, i) => ({
      ...coordinate,
      text: `(${i})`,
      baseline: 'bottom'
    }));
    return [
      { type: 'line', attrs: { coordinates } },
      { type: 'text', ignoreEvent: true, attrs: texts }
    ];
  }
};

export const fiveWaves = {
  name: 'fiveWaves',
  totalStep: 7,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  createPointFigures: ({ coordinates }) => {
    const texts = coordinates.map((coordinate, i) => ({
      ...coordinate,
      text: `(${i})`,
      baseline: 'bottom'
    }));
    return [
      { type: 'line', attrs: { coordinates } },
      { type: 'text', ignoreEvent: true, attrs: texts }
    ];
  }
};

export const eightWaves = {
  name: 'eightWaves',
  totalStep: 10,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  createPointFigures: ({ coordinates }) => {
    const texts = coordinates.map((coordinate, i) => ({
      ...coordinate,
      text: `(${i})`,
      baseline: 'bottom'
    }));
    return [
      { type: 'line', attrs: { coordinates } },
      { type: 'text', ignoreEvent: true, attrs: texts }
    ];
  }
};

export const anyWaves = {
  name: 'anyWaves',
  totalStep: Number.MAX_SAFE_INTEGER,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  createPointFigures: ({ coordinates }) => {
    const texts = coordinates.map((coordinate, i) => ({
      ...coordinate,
      text: `(${i})`,
      baseline: 'bottom'
    }));
    return [
      { type: 'line', attrs: { coordinates } },
      { type: 'text', ignoreEvent: true, attrs: texts }
    ];
  }
};

export const abcd = {
  name: 'abcd',
  totalStep: 5,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  createPointFigures: ({ coordinates }) => {
    let acLineCoordinates = [];
    let bdLineCoordinates = [];

    const tags = ['A', 'B', 'C', 'D'];
    const texts = coordinates.map((coordinate, i) => ({
      ...coordinate,
      baseline: 'bottom',
      text: `(${tags[i]})`
    }));

    if (coordinates.length > 2) {
      acLineCoordinates = [coordinates[0], coordinates[2]];
      if (coordinates.length > 3) {
        bdLineCoordinates = [coordinates[1], coordinates[3]];
      }
    }

    return [
      { type: 'line', attrs: { coordinates } },
      { type: 'line', attrs: [{ coordinates: acLineCoordinates }, { coordinates: bdLineCoordinates }], styles: { style: 'dashed' } },
      { type: 'text', ignoreEvent: true, attrs: texts }
    ];
  }
};

export const xabcd = {
  name: 'xabcd',
  totalStep: 6,
  needDefaultPointFigure: true,
  needDefaultXAxisFigure: true,
  needDefaultYAxisFigure: true,
  styles: { polygon: { color: 'rgba(22, 119, 255, 0.15)' } },
  createPointFigures: ({ coordinates }) => {
    const dashedLines = [];
    const polygons = [];
    const tags = ['X', 'A', 'B', 'C', 'D'];
    const texts = coordinates.map((coordinate, i) => ({
      ...coordinate,
      baseline: 'bottom',
      text: `(${tags[i]})`
    }));

    if (coordinates.length > 2) {
      dashedLines.push({ coordinates: [coordinates[0], coordinates[2]] });
      polygons.push({ coordinates: [coordinates[0], coordinates[1], coordinates[2]] });
      if (coordinates.length > 3) {
        dashedLines.push({ coordinates: [coordinates[1], coordinates[3]] });
        if (coordinates.length > 4) {
          dashedLines.push({ coordinates: [coordinates[2], coordinates[4]] });
          polygons.push({ coordinates: [coordinates[2], coordinates[3], coordinates[4]] });
        }
      }
    }

    return [
      { type: 'line', attrs: { coordinates } },
      { type: 'line', attrs: dashedLines, styles: { style: 'dashed' } },
      { type: 'polygon', ignoreEvent: true, attrs: polygons },
      { type: 'text', ignoreEvent: true, attrs: texts }
    ];
  }
};

export const allExtensions = [
  arrow, circle, rect, triangle, parallelogram,
  fibonacciCircle, fibonacciSegment,
  threeWaves, fiveWaves, eightWaves, anyWaves,
  abcd, xabcd
];

export function registerAllExtensions(klinecharts) {
  allExtensions.forEach(extension => {
    klinecharts.registerOverlay(extension);
  });
}