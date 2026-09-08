export const locationRegions = {
  bangalore: {
    name: 'Bangalore',
    intro: 'The city where our mango story began.',
    accent: '#ffb900',
    surface: 'linear-gradient(135deg,#09281e 0%,#124a36 58%,#1d6547 100%)',
  },
  uae: {
    name: 'UAE',
    intro: 'A growing Mango’s world, made for happy days.',
    accent: '#ffbd2e',
    surface: 'linear-gradient(135deg,#c9700c 0%,#f3a30b 52%,#ffd56a 100%)',
  },
} as const;

export type LocationRegionSlug = keyof typeof locationRegions;

