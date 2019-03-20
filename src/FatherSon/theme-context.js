// 确保默认值按类型传递
// createContext() 匹配的属性是 Consumers 所期望的
import React from 'react';
export const themes = {
  light: {
    foreground: '#ffffff',
    background: '#222222',
  },
  dark: {
    foreground: '#000000',
    background: '#eeeeee',
  },
};
export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {},
});