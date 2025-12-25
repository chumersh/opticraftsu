import React from 'react';
import { Link } from 'react-router-dom';

interface MinecraftButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'dark' | 'outline';
  onClick?: () => void;
  to?: string;
  className?: string;
  icon?: React.ReactNode;
}

const MinecraftButton: React.FC<MinecraftButtonProps> = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  to,
  className = '',
  icon
}) => {
  const baseStyles = "relative inline-flex items-center justify-center px-8 py-3 font-bold text-sm md:text-base uppercase tracking-widest transition-all duration-100 group border-none active:translate-y-[4px] active:shadow-none";
  
  const variants = {
    primary: "bg-mc-green hover:bg-mc-greenHover text-white shadow-mc-btn",
    secondary: "bg-[#353535] hover:bg-[#454545] text-white shadow-mc-btn",
    dark: "bg-black hover:bg-[#222] text-white shadow-mc-btn",
    outline: "bg-transparent border-2 border-white hover:bg-white hover:text-black text-white"
  };

  const content = (
    <>
      {icon && <span className="mr-3">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`${baseStyles} ${variants[variant]} ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {content}
    </button>
  );
};

export default MinecraftButton;