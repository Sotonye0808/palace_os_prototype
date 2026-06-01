const PALETTE: [string, string][] = [
  ['#E85D1A', '#FFFFFF'],
  ['#D4A017', '#1A1614'],
  ['#8B5CF6', '#FFFFFF'],
  ['#2E7D52', '#FFFFFF'],
  ['#C0392B', '#FFFFFF'],
  ['#F5A623', '#1A1614'],
  ['#2E5FA3', '#FFFFFF'],
  ['#10B981', '#FFFFFF'],
];

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h) + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function placeholder(name: string, w = 400, h = 300): string {
  const i = hash(name) % PALETTE.length;
  const [bg, fg] = PALETTE[i];
  const label = name.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const fontSize = Math.round(Math.min(w, h) * 0.08);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect fill="${bg}" width="${w}" height="${h}"/><text fill="${fg}" font-family="sans-serif" font-size="${fontSize}" font-weight="600" x="${w/2}" y="${h/2}" text-anchor="middle" dominant-baseline="middle">${label}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
