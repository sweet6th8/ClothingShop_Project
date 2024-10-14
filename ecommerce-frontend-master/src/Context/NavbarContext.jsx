import React, { createContext, useState } from 'react';

const NavbarContext = createContext(null);

export const NavbarProvider = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState('shop');

    return (
        <NavbarContext.Provider value={{ activeMenu, setActiveMenu }}>
            {children}
        </NavbarContext.Provider>
    );
};

export default NavbarProvider; // Exporting the context itself
