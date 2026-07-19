import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';
import img5 from '../assets/5.jpg';
import img6 from '../assets/6.jpg';
import img7 from '../assets/7.jpg';
import img8 from '../assets/8.jpg';
import img9 from '../assets/9.jpg';
import img10 from '../assets/10.jpg';
import img11 from '../assets/11.jpg';
import img12 from '../assets/12.jpg';
import img13 from '../assets/13.jpg';
import img14 from '../assets/14.jpg';
import img15 from '../assets/15.jpg';
import img16 from '../assets/16.jpg';
import img17 from '../assets/17.jpg';
import img18 from '../assets/18.jpg';
import img20 from '../assets/20.jpg';
import mid from '../assets/mid.jpg';
import extra from '../assets/IMG-20250720-WA0013.jpg';

export interface Memory {
  id: number;
  image: string;
  caption: string;
  date: string;
}

export const memories: Memory[] = [
  { id: 1, image: img1, caption: 'The moment it all began', date: 'Year 1' },
  { id: 2, image: img2, caption: 'First wobbly steps into the world', date: 'Year 2' },
  { id: 3, image: img3, caption: 'A laugh that filled the whole room', date: 'Year 3' },
  { id: 4, image: img4, caption: 'Building castles out of clouds', date: 'Year 4' },
  { id: 5, image: img5, caption: 'A gentle heart, even back then', date: 'Year 5' },
  { id: 6, image: img6, caption: 'Endless questions about the stars', date: 'Year 6' },
  { id: 7, image: img7, caption: 'Painting life in your own colors', date: 'Year 7' },
  { id: 8, image: mid, caption: 'Quiet courage, even when scared', date: 'Year 8' },
  { id: 9, image: img8, caption: 'Too much energy for one small body', date: 'Year 9' },
  { id: 10, image: img9, caption: 'Growing into grace, quietly', date: 'Year 10' },
  { id: 11, image: img10, caption: 'Finding magic in ordinary days', date: 'Year 11' },
  { id: 12, image: img11, caption: 'A light for everyone around you', date: 'Year 12' },
  { id: 13, image: img12, caption: 'Growing up with real courage', date: 'Year 13' },
  { id: 14, image: img13, caption: 'A spark that never stopped', date: 'Year 14' },
  { id: 15, image: img14, caption: 'Friendships that felt like family', date: 'Year 15' },
  { id: 16, image: img15, caption: 'Joy hiding in the small things', date: 'Year 16' },
  { id: 17, image: img16, caption: 'Strength that never needed to be loud', date: 'Year 17' },
  { id: 18, image: img17, caption: 'Dreams finally taking flight', date: 'Year 18' },
  { id: 19, image: img18, caption: 'Every moment becoming a memory', date: 'Year 19' },
  { id: 20, image: img20, caption: 'Two decades of love and laughter', date: 'Year 20' },
  { id: 21, image: extra, caption: 'And the story is only just beginning', date: 'Today' },
];
