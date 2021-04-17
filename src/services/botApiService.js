const axios = require('axios').default;

export default class botApiService {
    
    getBotStatus(){
        return axios.get(`${process.env.API_URL}/api/getStatus`);
    }

    getBotCommands(){
        return axios.get(`${process.env.API_URL}/api/getCommands`);
    }

    getBotLogs(){
        return axios.get(`${process.env.API_URL}/api/getLogs`);
    }

    stopBot(){
        return axios.get(`${process.env.API_URL}/api/stopBot`);
    }

    startBot(){
        return axios.get(`${process.env.API_URL}/api/startBot`);
    }

    exeCommand(msg){
        let newMSG = msg.toString().trim();
        let content = {
            "msg": newMSG,
        };

        console.log(content);

        return axios.put(`${process.env.API_URL}/api/exeCommand`, content);
    }
}