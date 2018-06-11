function Bezier(start, end) {
  const points = [];
  const A = [100, 100];
  const B = [200, 100];

  for (let i = 0; i <= 100; i += 1) {
    let t;
    if (i === 0) {
      t = 0;
    } else {
      t = i / 100;
    }
    const pointX =
      Math.pow(1 - t, 3) * start[0] +
      3 * Math.pow(1 - t, 2) * t * A[0] +
      3 * (1 - t) * Math.pow(t, 2) * B[0] +
      Math.pow(t, 3) * end[0];
    const pointY =
      Math.pow(1 - t, 3) * start[1] +
      3 * Math.pow(1 - t, 2) * t * A[1] +
      3 * (1 - t) * Math.pow(t, 2) * B[1] +
      Math.pow(t, 3) * end[1];

    points.push([pointX, pointY]);
  }

  return points;
}
