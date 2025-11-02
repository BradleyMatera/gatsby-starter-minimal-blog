import React from 'react';

interface BadgeProps {
  variant?: 'adventure' | 'tech' | 'insight' | 'default';
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ variant = 'default', children }) => {
  let style = 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ';
  switch (variant) {
    case 'adventure':
      style += 'bg-orange-100 text-orange-800 border border-orange-300';
      break;
    case 'tech':
      style += 'bg-blue-100 text-blue-800 border border-blue-300';
      break;
    case 'insight':
      style += 'bg-green-100 text-green-800 border border-green-300';
      break;
    default:
      style += 'bg-gray-100 text-gray-800 border border-gray-300';
  }
  return <span className={style}>{children}</span>;
};

export default Badge;
