import { CircleSlash } from 'lucide-react';
import React, { useState } from 'react';

interface IconComponentProps {
    src?: string;
    alt?: string;
    className?: string;
}

const IconComponent: React.FC<IconComponentProps> = ({ src, alt = 'Profile Image', className = '' }) => {
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        setHasError(true);
    };

    return (
        <div className={`flex-shrink-0 ${className}`}>
            {hasError || !src ? (
                <div className="size-14 bg-slate-500 rounded-full flex items-center justify-center text-white">
                    <CircleSlash /> 
                </div>
            ) : (
                <img
                    src={src}
                    alt={alt}
                    className="size-14 rounded-full object-cover"
                    onError={handleError}
                />
            )}
        </div>
    );
};

export {
    IconComponent
};