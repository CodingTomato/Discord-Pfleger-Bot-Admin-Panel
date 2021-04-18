const axios = require('axios').default;

export default class botApiService {
    
    getBotStatus(){
        return axios.get(`https://dc-api.schusterhang.de/api/getStatus`);
    }

    getBotCommands(){
        return axios.get(`https://dc-api.schusterhang.de/api/getCommands`);
    }

    getBotLogs(){
        return axios.get(`https://dc-api.schusterhang.de/api/getLogs`);
    }

    stopBot(){
        return axios.get(`https://dc-api.schusterhang.de/api/stopBot`);
    }

    startBot(){
        return axios.get(`https://dc-api.schusterhang.de/api/startBot`);
    }

    exeCommand(msg){
        let newMSG = msg.toString().trim();
        let content = {
            "msg": newMSG,
        };

        console.log(content);

        return axios.put(`https://dc-api.schusterhang.de/api/exeCommand`, content);
    }
}