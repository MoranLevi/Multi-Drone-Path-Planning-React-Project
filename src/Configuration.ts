import { ObjectUtils } from "src/utils/ObjectUtils";

interface IBackend {
    url:                         string;
    port:                        string;
}

/* Class for the configuration in the application */
class Config {
    
    backend: IBackend;  

    constructor() { 
        this.backend = {
            url:                        'http://localhost',
            port:                       '8000',
        };
    }

    /* Load the configuration from the config.json file */
    load() { 
        const configRequest = new XMLHttpRequest();
        configRequest.open('GET', 'config.json', false);
        configRequest.send();
        const configJson = ObjectUtils.parseJson(configRequest.responseText);
        this.setConfigProps(configJson);
    }

    /* Set the configuration properties */
    setConfigProps(configJson: any) {
        const { backend } = configJson;

        // Backend
        if (backend) { 
            if (ObjectUtils.isString(backend.url)) { /* Check if the url is a string */
                this.backend.url = backend.url;
            }
            if (ObjectUtils.isString(backend.port)) { /* Check if the port is a string */
                this.backend.port = backend.port;
            }
        }
    }
}

export const Configuration = new Config(); // Singleton
