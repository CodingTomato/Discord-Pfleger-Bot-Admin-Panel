let logs = [];

export default class logService {
    log(message){
        let d = Date(Date.now());
        console.log(message);
        
        logs.push({
            logID: Math.random(),
            logMessage: "[INFO] (" + d.toString() + ")" + message,
        });
    }

    getLogs(){
        console.log(logs);
        return logs;
    }
}