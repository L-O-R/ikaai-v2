"use client";

import { createContext, useContext, useState } from "react";

const HeaderThemeContext = createContext();

export function HeaderThemeProvider({ children }) {
    const [theme, setTheme] = useState("light"); // light = white text

    return (
        <HeaderThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </HeaderThemeContext.Provider>
    );
}

export const useHeaderTheme = () => useContext(HeaderThemeContext);