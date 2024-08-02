import { createContext, useContext, useState } from 'react';

interface MenuContextProps {
  isOpen: boolean;
  toggle: () => void;
}

const MenuContext = createContext<MenuContextProps | undefined>(undefined);

interface MenuProviderProps {
  children: React.ReactNode;
}

const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <MenuContext.Provider value={{ isOpen, toggle }}>{children}</MenuContext.Provider>
  );
};
export default MenuProvider;

export const useMenu = (): MenuContextProps => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider.');
  }
  return context;
};
