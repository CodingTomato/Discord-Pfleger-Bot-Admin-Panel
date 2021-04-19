const axios = require('axios').default;

export default class botApiService {
    baseURL = "https://dc-api.schusterhang.de";

    getBotStatus(){
        return axios.get(`${this.baseURL}/api/getStatus`);
    }

    getBotCommands(){
        return axios.get(`${this.baseURL}/api/getCommands`);
    }

    getBotLogs(){
        return axios.get(`${this.baseURL}/api/getLogs`);
    }

    stopBot(){
        return axios.get(`${this.baseURL}/api/stopBot`);
    }

    startBot(){
        return axios.get(`${this.baseURL}/api/startBot`);
    }

    exeCommand(msg){
        let newMSG = msg.toString().trim();
        let content = {
            "msg": newMSG,
        };

        return axios.put(`${this.baseURL}/api/exeCommand`, content);
    }
}