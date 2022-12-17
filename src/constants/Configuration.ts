class Config {
    restoreFromTrashEnable:         boolean

    constructor() {
        this.restoreFromTrashEnable     = false;
    }

    load() {
        const configRequest = new XMLHttpRequest();
        configRequest.open('GET', 'config.json', false);
        configRequest.send();
        const configJSON = JSON.parse(configRequest.responseText);
        this.setConfigProps(configJSON);
    }

    setConfigProps(configJSON: any) {
        const { restoreFromTrashEnable } = configJSON;

        this.restoreFromTrashEnable = restoreFromTrashEnable;
    }
}

export const Configuration = new Config();