import { ObjectUtils } from "src/utils/ObjectUtils";

interface IBackend {
    url:                         string;
    port:                        string;
}

class Config {
    
    backend: IBackend;

    constructor() {
        this.backend = {
            url:                        'http://localhost',
            port:                       '8000',
        };
    }

    load() {
        const configRequest = new XMLHttpRequest();
        configRequest.open('GET', 'config.json', false);
        configRequest.send();
        const configJson = ObjectUtils.parseJson(configRequest.responseText);
        this.setConfigProps(configJson);
    }

    setConfigProps(configJson: any) {
        const { backend } = configJson;

        // Backend
        if (backend) {
            if (ObjectUtils.isString(backend.url)) {
                this.backend.url = backend.url;
            }
            if (ObjectUtils.isString(backend.port)) {
                this.backend.port = backend.port;
            }
        }
    }
}

export const Configuration = new Config(); // Singleton
