import { XStorage as xsto } from "../XStorage";
export class Todo {
    static serverUrl = (window.location.protocol.indexOf("https") > -1 ? "https": "http") + process.env.REACT_APP_API_URL;

    static async list () {
        const userToken = xsto.get("token");
        try {
            let response = await fetch(this.serverUrl + 'api/todos', {
                method: 'get',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + userToken
                }
            });
            return response;
        } catch (error) {
            console.error(error);
            return { error: "conn_err" }
        }
    }

    static async update (id, entity) {
        const userToken = xsto.get("token");
        try {
            let response = await fetch(this.serverUrl + 'api/todos/' + id, {
                method: 'put',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + userToken
                },
                body: (new URLSearchParams(entity)).toString()
            });
            return response;
        } catch (error) {
            console.error(error);
            return { error: "conn_err" }
        }
    }

    static async store (entity) {
        const userToken = xsto.get("token");
        try {
            let response = await fetch(this.serverUrl + 'api/todos', {
                method: 'post',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + userToken
                },
                body: (new URLSearchParams(entity)).toString()
            });
            return response;
        } catch (error) {
            console.error(error);
            return { error: "conn_err" }
        }
    }
}