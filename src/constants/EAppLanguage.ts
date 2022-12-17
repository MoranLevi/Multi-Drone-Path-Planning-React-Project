export interface EAppLanguage {

}

const createEAppLanguage = (): EAppLanguage => {
    return {  };
}

export const EAppLanguage = {
    ENGLISH:        createEAppLanguage(), 
    HEBREW:         createEAppLanguage(), 
}