export interface MenuItem {
  id: string;
  name: string;
  category: 'Ice Cream' | 'Sundaes' | 'Shakes' | 'Waffles' | 'Beverages' | 'Quick Bites';
  description: string;
  price: string;
  image: string;
  isSignature?: boolean;
  isNew?: boolean;
}

export const menuData: MenuItem[] = [
  {
    id: 'death-by-chocolate',
    name: 'Death By Chocolate',
    category: 'Sundaes',
    description: 'Rich cocoa layers, premium vanilla scoop, and hot fudge. A signature indulgence.',
    price: '[CLIENT TO PROVIDE]',
    image: '/assets/images/products/dbc-placeholder.jpg',
    isSignature: true,
  },
  // Add remaining products here
];