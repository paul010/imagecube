import React from 'react';

interface ImageToolLayoutProps {
  title: string;
  description: React.ReactNode;
  metaDescription?: string; // 新增 metaDescription 属性
  children: React.ReactNode;
}

const ImageToolLayout: React.FC<ImageToolLayoutProps> = ({ 
  title, 
  description, 
  children 
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <div className="mb-8">{description}</div>
        {children}
      </div>
    </div>
  );
};

export default ImageToolLayout;
