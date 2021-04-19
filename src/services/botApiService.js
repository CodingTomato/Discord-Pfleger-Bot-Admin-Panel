const axios = require('axios').default;

export default class botApiService {
    URL = "https://192.168.178.46";
    PORT = 3000;
    baseURL = this.URL + ":" + this.PORT;

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