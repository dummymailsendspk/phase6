import React, { useEffect, useRef, useState } from 'react';
import ThenNowSlider from './ThenNowSlider';
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
import mid from '../assets/mid.jpg';
import img20 from '../assets/20.jpg';
const journeyGradients = [
  'linear-gradient(180deg, #ffd89b 0%, #ff9a76 100%)', // sunrise
  'linear-gradient(180deg, #ff9a76 0%, #f8b195 100%)', // morning
  'linear-gradient(180deg, #a8e6cf 0%, #dcedc1 100%)', // midday
  'linear-gradient(180deg, #74b9ff 0%, #a29bfe 100%)', // afternoon sky
  'linear-gradient(180deg, #fd79a8 0%, #ffeaa7 100%)', // golden hour
  'linear-gradient(180deg, #6c5ce7 0%, #a29bfe 100%)', // dusk
  'linear-gradient(180deg, #2d3561 0%, #6c5ce7 100%)', // twilight
  'linear-gradient(180deg, #0f0c29 0%, #302b63 100%)', // starry night
];

const Gallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const total = containerRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const gradientIndex = Math.min(
    journeyGradients.length - 1,
    Math.floor(scrollProgress * journeyGradients.length)
  );

  const galleryItems = [
  {
    id: 1,
    image: img1,
    title: 'The Beginning',
    message: 'From the moment you entered this world, everything changed. Your innocent smile lit up our lives. You brought joy we never knew we needed. The first spark of a beautiful journey began here.'
  },
  {
    id: 2,
    image: img2,
    title: 'Steps of Wonder',
    message: 'Your tiny feet took the first steps into a world full of love. Each wobble and stumble was magic in motion. You explored with wonder in your eyes. We followed with hearts full of pride.'

  },
  {
    id: 3,
    image: img3,
    title: 'Laughter Echoes',
    message: 'Your laughter was the melody of our home. Every giggle healed hearts and lit up days. It echoed through the walls like music. Pure, magical, unforgettable joy'
  },
  {
    id: 4,
    image: img4,
    title: 'Imagination Blooms',
  //  message: ''
      message: 'Your eyes held stories no words could tell. You built castles from clouds and dreams from stardust. Everything seemed possible when you believed. And we believed too.'

  },
  {
    id: 5,
    image: img5,
    title: 'Kindness Grows',
    message: 'You touched hearts in the gentlest ways. A caring hand, a loving word, a warm hug. Your kindness bloomed early and never stopped. It taught us how to love better.'

  //  message: 'Kindness bloomed early in you — always sharing, always caring.'
  },
  {
    id: 6,
    image: img6,
       title: 'Shining Curiosity',
    message: 'You questioned the skies, the stars, the ants on the ground. Your thirst to know was endless and bright. With every “why”, you grew wiser. And so did we beside you.'
  },

  {
    id: 7,
    image: img7,
    title: 'Colors of You',
    message: 'You became a canvas of emotions, creativity, and dreams. Bold, gentle, wild, calm—everything in harmony. You painted life in shades only you could see. And we stood in awe.'
  },
  {
    id: 8,
    image: mid,
      title: 'The Brave Heart',
    message: 'You faced fears with a quiet courage. Whether it was falling or failing, you always rose again. Your bravery became our inspiration. You made strength look beautiful.'
  },
  {
    id: 9,
    image: img8,
     title: 'Unstoppable Energy',
    message: 'You ran, danced, sang, and lived loud. The energy in your soul couldn’t be contained. You made every day an adventure. A spark that never stopped glowing.'
  },
  {
    id: 10,
    image: img9,
     title: 'Blooming Grace',
    message: 'You grew into grace and gentleness. Your heart became wiser, your smile more meaningful. In silence or in laughter, your presence spoke volumes. You were blooming beautifully.'
  },
  {
    id: 11,
    image: img10,
    title: 'Moments of Magic',
    message: 'In the small things, you created wonder. A look, a word, a thought—you made everything magical. You reminded us to see joy in the ordinary. You turned life into poetry.'
  },
  {
    id: 12,
    image: img11,
   title: 'A Light for Others',
    message: 'You didn’t just shine you lit the way for others. With your smile, support, and soft strength, you became a guiding light. And we knew you’d touch lives beyond ours.'
  },
  {
    id: 13,
    image: img12,
     title: 'Courageous Growth',
    message: 'Growing up wasn’t always easy, but you did it with strength. You met challenges with grace and change with acceptance. You kept evolving, never stopping. Courage lived in you.'
  },
  {
    id: 14,
    image: img13,
    title: 'Infinite Spark',
    message: 'Your passion ignited everyone around you. You didn’t just shine you set hearts on fire with hope. Every room felt warmer with you in it. The spark became infinite.'
  },
  {
    id: 15,
    image: img14,
    title: 'Building Bonds',
    message: 'You created friendships that felt like family. With loyalty, laughter, and endless love, you made every connection stronger. You brought people together—just by being you.'
  },
  {
    id: 16,
    image: img15,
     title: 'Joy in Moments',
    message: 'You found joy in the smallest things. A melody, a hug, a moment of silence. Your happiness was never loud, but always deep. And it quietly made life brighter.'
  },
  {
    id: 17,
    image: img16,
    title: 'Strength in Stillness',
    message: 'Even when things were quiet, your strength was loud. You stood firm with grace, held space with compassion. In silence, you showed resilience. A soft warrior at heart.'
  },
  {
    id: 18,
    image: img17,
      title: 'Dreams Take Flight',
    message: 'Your dreams no longer whispered they roared. You reached for skies with both feet on the ground. You believed, planned, and acted. And your flight began.'
  },
  {
    id: 19,
    image: img18,
      title: 'Moments to Memories',
    message: 'You turned fleeting moments into lifelong memories. Each day with you became a page in our storybook. The past 20 years are treasures. And every second was worth it.'
  },
  {
    id: 20,
    image: img20,
        title: 'A Beautiful 20-Year Story',
    message: 'Two decades of laughter, growth, and love. Every chapter brought its own magic. This is not the end—it’s a new beginning. And your story has only just begun.'
  }

];


  return (
    <div
      id="gallery-section"
      className="gallery-section"
      ref={containerRef}
      style={{ background: journeyGradients[gradientIndex], transition: 'background 1.2s ease' }}
    >
      <h2 className="gallery-title">Memory Lane 📸</h2>

      <ThenNowSlider />

      <div className="gallery-container">
        {galleryItems.map((item, index) => (
          <div key={item.id}>
            <div className={`gallery-item ${index % 2 === 0 ? 'left-image' : 'right-image'}`}>
              <div className="gallery-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="gallery-content">
                <h3>{item.title}</h3>
                <p>{item.message}</p>
              </div>
            </div>

            {index < galleryItems.length - 1 && (
              <div className="gallery-separator">
                <div className="separator-line"></div>
                <div className="separator-ornament">❋</div>
                <div className="separator-line"></div>
              </div>
            )}
            
          </div>
        ))}
      </div>
        <div style={{
  textAlign: 'center',
  marginTop: '4rem',
  padding: '2rem',
  background: 'linear-gradient(135deg, #d8d8d8ff, #d6d6d6ff)',
  borderRadius: '20px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  fontFamily: `cursive, sans-serif`,
}}>
  <h2 style={{ fontSize: '2rem', color: '#7224caff', marginBottom: '1rem' }}>
    🎉 Once Again, Happy Birthday Jayapriya! 🎂
  </h2>
  <p style={{ fontSize: '1.1rem', color: '#7224caff' }}>
    May your life continue to bloom with happiness, adventure, and love. <br />
    Here's to a future as bright and beautiful as your heart. 💖
  </p>
</div>
    </div>
  );
};

export default Gallery;