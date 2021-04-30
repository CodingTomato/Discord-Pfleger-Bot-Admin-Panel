const axios = require('axios').default;
const config = require('../../config');

let password = config.bot;
let password_content = {
    "password": password.toString(),
}
console.log(password_content);

export default class botApiService {
    // baseURL = "https://dc-api.schusterhang.de";
    baseURL = "http://localhost:3000";
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
        return axios.post(`${this.baseURL}/api/stopBot`, password_content);
    }

    startBot(){
        return axios.post(`${this.baseURL}/api/startBot`, password_content);
    }

    stopStickyMover(){
        return axios.post(`${this.baseURL}/api/stopStickyMover`, password_content);
    }

    startStickyMover(){
        return axios.post(`${this.baseURL}/api/startStickyMover`, password_content);
    }

    getChannelFromID(channelid){
        let newChannelid = channelid.toString().trim();
        let content = {
            "channelid": newChannelid,
        };
        return axios.post(`${this.baseURL}/api/getChannelFromID`, content);
    }

    exeCommand(msg){
        let newMSG = msg.toString().trim();
        let content = {
            "msg": newMSG,
            "password": password,
        };

        return axios.put(`${this.baseURL}/api/exeCommand`, content);
    }

    removeStickyUser(userid){
        let newUserid = userid.toString().trim();
        let content = {
            "userid":newUserid,
            "password": password,
        };
        return axios.put(`${this.baseURL}/api/removeStickyUser`, content);
    }
}