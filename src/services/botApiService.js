const axios = require('axios').default;

let base_url = "http://192.168.178.46";
let port = 3000;

let url = base_url + ":" + port;

export default class botApiService {
    
    getBotStatus(){
        return axios.get(url + "/api/getStatus");
    }

    getBotCommands(){
        return axios.get(url + "/api/getCommands");
    }

    getBotLogs(){
        return axios.get(url + "/api/getLogs");
    }

    stopBot(){
        return axios.get(url + "/api/stopBot");
    }

    startBot(){
        return axios.get(url + "/api/startBot");
    }

    exeCommand(msg){
        let newMSG = msg.toString().trim();
        let content = {
            "msg": newMSG,
        };

        console.log(content);

        return axios.put(url + "/api/exeCommand", content);
    }
}