export interface PastelPalette {
  name: string;
  bg: string;
  accent: string;
}

export const PASTEL_COLORS: PastelPalette[] = [
  { name: 'cream', bg: 'linear-gradient(135deg, #fff6e5, #ffe9c2)', accent: '#d4af37' },
  { name: 'pink', bg: 'linear-gradient(135deg, #ffe1ec, #ffc2d6)', accent: '#e0457b' },
  { name: 'lavender', bg: 'linear-gradient(135deg, #ece0ff, #d9c4fb)', accent: '#8b5fbf' },
  { name: 'blue', bg: 'linear-gradient(135deg, #dcf0ff, #b8def5)', accent: '#3a7ca5' },
  { name: 'mint', bg: 'linear-gradient(135deg, #dcfbe9, #b6f0cd)', accent: '#2e9e6a' },
  { name: 'peach', bg: 'linear-gradient(135deg, #ffe8d6, #ffcfa8)', accent: '#e07a3f' },
];
