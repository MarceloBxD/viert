'use client'

import React, { createContext, FC, useEffect, useReducer, useState } from 'react';

interface ContextType {
    isDesktop: boolean;
}

export const AppContext = createContext({} as ContextType);


const AppProvider = ({ children }: {
    children: React.ReactNode;
}) => {
    const [isDesktop, setIsDesktop] = useState<boolean>(true);
    
    const handleResize = () => {
        setIsDesktop(window.innerWidth > 768);
    };


    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const value = {
        isDesktop
    };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};


const useAppContext = () => {
    const context = React.useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppProvider');
    }
    return context;
}
    
export { AppProvider, useAppContext };