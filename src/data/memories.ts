import img1 from '../assets1/1.jpg';
import img2 from '../assets1/2.jpg';
import img3 from '../assets1/3.jpg';
import img4 from '../assets1/4.jpg';
import img5 from '../assets1/5.jpg';
import img6 from '../assets1/6.jpg';
import img7 from '../assets1/7.jpg';
import img8 from '../assets1/8.png';
import img9 from '../assets1/9.jpg';
import img10 from '../assets1/10.jpg';
import img11 from '../assets1/11.jpg';
import img12 from '../assets1/12.jpg';
import img13 from '../assets1/13.jpg';
import img14 from '../assets1/14.jpg';
import img15 from '../assets1/15.jpg';
import img16 from '../assets1/16.jpg';
import img17 from '../assets1/17.jpg';
import img18 from '../assets1/18.jpg';
import img20 from '../assets1/19.jpg';
import mid from '../assets1/20.jpg';
import extra from '../assets1/21.jpg';

export interface Memory {
  id: number;
  image: string;
  caption: string;
  date: string;
}

export const memories: Memory[] = [
  { id: 1, image: img1, caption: 'A tiny smile that changed everything.', date: 'The Beginning' },
  { id: 2, image: img2, caption: 'Every little step was a victory worth celebrating.', date: 'First Steps' },
  { id: 3, image: img3, caption: 'A laugh that could brighten even the darkest day.', date: 'Pure Joy' },
  { id: 4, image: img4, caption: 'A world filled with dreams, imagination, and endless wonder.', date: 'Dreamer' },
  { id: 5, image: img5, caption: 'Kindness came naturally—it was always part of you.', date: 'Kind Heart' },
  { id: 6, image: img6, caption: 'Curiosity turned every ordinary day into an adventure.', date: 'Explorer' },
  { id: 7, image: img7, caption: 'Creativity made everything around you a little more beautiful.', date: 'Creative Soul' },
  { id: 8, image: mid, caption: 'Bravery isn’t being fearless—it’s moving forward anyway.', date: 'Brave Heart' },
  { id: 9, image: img8, caption: 'Your energy and excitement were impossible to ignore.', date: 'Bundle of Energy' },
  { id: 10, image: img9, caption: 'Growing with grace, confidence, and a beautiful smile.', date: 'Blooming Grace' },
  { id: 11, image: img10, caption: 'Finding happiness in the little moments of life.', date: 'Little Wonders' },
  { id: 12, image: img11, caption: 'A person who naturally brings light into others’ lives.', date: 'Guiding Light' },
  { id: 13, image: img12, caption: 'Every challenge became another reason to grow stronger.', date: 'Growing Strong' },
  { id: 14, image: img13, caption: 'Your passion inspired everyone lucky enough to know you.', date: 'Inspiring Soul' },
  { id: 15, image: img14, caption: 'A wonderful friend who made every memory unforgettable.', date: 'Great Friend' },
  { id: 16, image: img15, caption: 'The little moments with you became the biggest memories.', date: 'Beautiful Memories' },
  { id: 17, image: img16, caption: 'Quiet strength, endless patience, and a heart full of care.', date: 'Strong & Kind' },
  { id: 18, image: img17, caption: 'Dream big, believe deeply, and keep reaching higher.', date: 'Dream Chaser' },
  { id: 19, image: img18, caption: 'Some memories never fade—they only become more precious.', date: 'Unforgettable' },
  { id: 20, image: img20, caption: 'Twenty wonderful years of laughter, growth, and unforgettable moments.', date: '21st Birthday' },
  { id: 21, image: extra, caption: 'Keep Smiling, like in this picture, Good Bye..!!', date: 'Forever Friends ❤️' },
];
