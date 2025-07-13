// cliente.js
const OPERATION = 0;

class Cliente {
    constructor(host, port, canvas) {
        this.operations = new Map();
        this.client = new WebSocket("ws://" + host + ":" + port);
        this.canvas = canvas;
        this.listOperationArray = null;
        this.search = null;
        this.WebSocket = "";
   
        this.client.onmessage = (message) => {
            try {
                let data = JSON.parse(message.data);
                console.log(data);
                let operation = this.operations.get(data.op);
                if (operation !== undefined) {
                    console.log(operation);
                    operation.execute(data.content);
                } else {
                    if (data.op === OPERATION) {
                        this.list_operations(data.content);
                        console.log(data.content);
                    }
                }
            } catch (e) {
                console.log(e);
            }
        };
    }

    send(type, content) {
        let message = {
            "type": type,
            "content": content
        };
        console.log(message);
        this.client.send(JSON.stringify(message));
    }

    list_operations(content) {
        content.forEach(element => {
            Reflect.set(element, 'execute', null);
            this.operations.set(element.op, element);
        });
        this.listOperationArray = [...this.operations].flat().filter((item) => (typeof(item) === "object"));
        this.search = (item) => { return this.listOperationArray.find((element) => element.command === item); };
    
        // Move the usage of this.search inside this.client.onopen
        this.client.onopen = () => {
            this.send(this.search("USERNAME").op, this.Getname())
        };
    
        window.addEventListener("beforeunload", () => {
            this.client.close();
        });
        this.search("NOTIFY").execute = (data) => {
            this.canvas.notify(data);
        };
        this.search("MESSAGE_UPDATE").execute = (data) => {
            this.message_Update(data);
        };
        this.search("WebSocket").execute = (data) => {
            this.WebSocket = data;
        };
    }

    message_Update(data) {
        this.canvas.message_Update(data);
    }

    Getname() {
        let name = this.canvas.UserName();
        return name;
    }

    message(data2) {
        let data = {
            message: data2.message,
            user: data2.name_user
        };
        this.send(this.search("message").op, data);
    }
}

export { Cliente };
