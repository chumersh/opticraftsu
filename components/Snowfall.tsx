import React, { useEffect, useState } from 'react';

const Snowfall: React.FC = () => {
  // Removed date check to ensure snow is always visible as requested.
  // Using pure CSS/Divs for better 3D effect simulation (blur/opacity/size).

  const [snowflakes, setSnowflakes] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    // Generate static snowflakes once on mount to avoid re-renders
    const flakes = Array.from({ length: 100 }).map((_, i) => {
      const left = Math.random() * 100;
      
      // Depth simulation:
      // High depth (close): Large, fast, opaque, no blur.
      // Low depth (far): Small, slow, transparent, blurred.
      const depth = Math.random(); 

      const sizeBase = 4; // base px
      const size = sizeBase + (depth * 8); // 4px to 12px
      
      const opacity = 0.3 + (depth * 0.7); // 0.3 to 1.0
      const blur = (1 - depth) * 2; // 0px to 2px blur
      
      const durationBase = 5; // seconds
      const duration = durationBase + ((1 - depth) * 10); // 5s (close) to 15s (far)
      
      const delay = Math.random() * -20; // Start immediately with offset
      const swayDuration = 3 + Math.random() * 4;

      return (
        <div
          key={i}
          className="snowflake"
          style={{
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            opacity: opacity,
            filter: `blur(${blur}px)`,
            boxShadow: depth > 0.8 ? `0 0 8px rgba(255,255,255,0.8)` : 'none', // Glow for close particles
            animationDuration: `${duration}s, ${swayDuration}s`,
            animationDelay: `${delay}s, ${Math.random() * -5}s`,
          }}
        />
      );
    });
    setSnowflakes(flakes);
  }, []);

  return <>{snowflakes}</>;
};

export default Snowfall;