import React from 'react';

interface NeoCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const NeoCard: React.FC<NeoCardProps> = ({ title, children, className = '' }) => {
  return (
    <article aria-label={title} className={`
      border-3 border-neo-black bg-neo-white 
      p-6 shadow-neo transition-all duration-200 
      hover:shadow-neo-hover hover:translate-x-[3px] hover:translate-y-[4px]
      flex flex-col group
      ${className}
    `}>
      <h3 className="text-2xl font-bold uppercase mb-4 truncate border-b-3 border-neo-black pb-2 group-hover:text-neo-black">
        {title}
      </h3>
      <div className="flex-grow">
        {children}
      </div>
    </article>
  );
};

interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const NeoButton: React.FC<NeoButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`
        px-6 py-3 font-bold uppercase tracking-wider
        border-3 border-neo-black bg-neo-white
        shadow-neo active:shadow-none active:translate-x-[5px] active:translate-y-[8px]
        transition-all duration-100 hover:bg-neo-grey
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

interface NeoLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

export const NeoLink: React.FC<NeoLinkProps> = ({ children, className = '', ...props }) => {
  return (
    <a
      className={`
        text-xl font-bold uppercase
        hover:bg-neo-grey hover:text-neo-black px-1
        border-b-3 border-transparent hover:border-neo-black
        transition-all duration-200
        ${className}
      `}
      {...props}
    >
      {children}
    </a>
  );
};
export const NeoProjectLink: React.FC<NeoLinkProps> = ({ children, className = '', ...props }) => (
  <a className={`px-6 py-3 font-bold uppercase tracking-wider border-3 border-neo-black bg-neo-white shadow-neo active:shadow-none active:translate-x-[5px] active:translate-y-[8px] transition-all duration-100 hover:bg-neo-grey ${className}`} {...props}>
    {children}
  </a>
);
