import React from 'react';

interface BreadcrumbProps {
  path: string[]; // Assuming path is an array of strings
  onNavigate: (index: number) => void; // Assuming onNavigate is a function taking an index
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ path, onNavigate }) => {
    return (
        <div>
          {path.map((item, index) => (
            <span key={index}>
              {index > 0 && ' > '}
              {index < path.length - 1 ? (
                <a href="#" onClick={() => onNavigate(index)} style={{ cursor: 'pointer' }}>
                    {item}
                </a>
              ) : (
                item
              )}
            </span>
          ))}
        </div>
      );
      
};

export default Breadcrumb;
