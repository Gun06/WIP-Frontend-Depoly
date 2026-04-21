/** 한강 인근 샘플 폴리라인 (데모용) */
export function getMockRouteLatLngs(): [number, number][] {
  const base: [number, number] = [37.5308, 126.9322];
  const d = 0.004;
  return [
    base,
    [base[0] + d * 0.2, base[1] + d * 0.5],
    [base[0] + d * 0.6, base[1] + d * 1.1],
    [base[0] + d * 1.0, base[1] + d * 1.4],
    [base[0] + d * 1.4, base[1] + d * 1.2],
    [base[0] + d * 1.6, base[1] + d * 0.6],
    [base[0] + d * 1.5, base[1] - d * 0.2],
    [base[0] + d * 1.0, base[1] - d * 0.8],
    [base[0] + d * 0.4, base[1] - d * 0.5],
    base,
  ];
}

export const MOCK_DISTANCE_KM = 4.27;
export const MOCK_DURATION = "32:18";
export const MOCK_PACE = "4'46\" /km";
