import * as BiIcons from 'react-icons/bi';
import * as SiIcons from 'react-icons/si';

interface IIconModuleMap {
  [key: string]: typeof SiIcons | typeof BiIcons;
}

const iconModuleMap: IIconModuleMap = {
  si: SiIcons,
  bi: BiIcons,
};
export default iconModuleMap;
