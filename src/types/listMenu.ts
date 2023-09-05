export interface MenuDataItem {
    id: number;
    tab_id: number;
    name: string;
    translation: string;
}
interface LanguageSelected {
    code: string;
    dir: string;
    icon: string;
    id: number;
    name: string;
}

export interface LanguageDataItem {
    id: number;
    code: string;
    name: string;
    native_name: string;
    direction: string
}


export interface ListMenuModuleProps {
    menuData: MenuDataItem[];
    isCollapsed:boolean;
    activeItem: number;
    setActiveItem: React.Dispatch<React.SetStateAction<number>>; 
    languageSelected: LanguageSelected;
    activeDropdown:boolean;
    setActiveDropdown: React.Dispatch<React.SetStateAction<boolean>>;
    languagesData: LanguageDataItem[]
    handleDirChange: React.Dispatch<React.SetStateAction<any>>; 



    
}