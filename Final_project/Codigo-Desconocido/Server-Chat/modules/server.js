import { WebSocketServer, WebSocket } from 'ws';
import { Board } from "./board.js";

const ADMIN_PLAYER = 1;
const USER_PLAYER = 0;


class Server {
    constructor() {
        
        this.operations = {
            list: [
                {
                    op: 0,
                    type: "send",
                    command: "LIST_OPERATIONS",
                    level: 0,
                    remote_action: false,
                    action: this.listOperationToClient
                },
                {
                    op: 1,
                    type: "send",
                    command: "NOTIFY",
                    level: 0,
                    remote_action: true,
                    action: null
                },
                {
                    op: 2,
                    type: "send",
                    command: "BOARD_SIZE",
                    level: 0,
                    remote_action: true,
                    action: null
                },
                {
                    op: 3,
                    type: "send",
                    command: "INFO_PLAYERS",
                    level: 0,
                    remote_action: true,
                    action: null
                },
                {
                    op: 4,
                    type: "receive",
                    command: "message",
                    level: 0,
                    remote_action: null,
                    action: this.message.bind(this)
                },
                {
                    op: 5,
                    type: "send",
                    command: "MESSAGE_UPDATE",
                    level: 0,
                    remote_action: true,
                    action: null
                },
                {
                    op: 6,
                    type: "send",
                    command: "WebSocket",
                    level: 0,
                    remote_action: true,
                    action: null
                },
                // {
                //     op: 5,
                //     type: "receive",
                //     command: "MOVE",
                //     level: 0,
                //     remote_action: null,
                //     action: this.Move.bind(this)
                // },
                // {
                //     op: 6,
                //     type: "send",
                //     command: "UPDATE",
                //     level: 0,
                //     remote_action: true,
                //     action: null
                // },
                // {
                //     op: 7,
                //     type: "receive",
                //     command: "SHOOT",
                //     level: 0,
                //     remote_action: null,
                //     action: this.Shoot.bind(this)
                // },
                // {
                //     op:8,
                //     type: "send",
                //     command: "ELIMINADO",
                //     level: 0,
                //     remote_action: true,
                //     action: null
                // },
                // {
                //     op:9,
                //     type: "send",
                //     command: "GANADOR",
                //     level: 0,
                //     remote_action: true,
                //     action: null
                // },
                // {
                //     op: 50,
                //     type: "receive",
                //     command: "SETNAME",
                //     level: 0,
                //     remote_action: null,
                //     action: this.setName.bind(this)
                // }

            ]
        };
        
        this.server = new WebSocketServer({ port: 8080 });
        this.board = new Board();
       this.usersOnline = 0;
        
      
        this.server.on("connection",(ws)=> {
            this.usersOnline = this.usersOnline + 1
            console.log("usuarios conectados: "+this.usersOnline);
              console.log("connect");
              ws.on("close", () => {
                console.log("Cliente desconectado");
                this.usersOnline = this.usersOnline - 1
                console.log("usuarios conectados: "+this.usersOnline);
            });

                ws.on("message",(data)=> {
                    this.do(data);
                });
                this.send("LIST_OPERATIONS",null ,ws);
           let user = "user "+ this.usersOnline
                this.send("WebSocket",user ,ws);
                // this.send("NOTIFY","No hay Mensajes...",ws);
              
        });
    }

    do(data) {
        try {
            let message = JSON.parse(data);
            if (!message.hasOwnProperty("type")) return;
            let operation = this.operations.list.find((item) => item.op == message.type);
            if (operation != undefined) operation.action(message.content);
        } catch(e) {
            console.log(e);
        } 
    }
    send(command,content,ws) {

        let operation = this.operations.list.filter((item) => ((item.command == command) && (item.type==="send")));
        if (operation != undefined) {
            operation = operation[0];
            let message = {
                op: operation.op,
                content: null
            }
            if (operation.action === null) message.content = content;
                else message.content = ((content) => { return operation.action(content,this) })();
            
            if (ws === undefined) {
                this.server.clients.forEach(function each(client) {
                    if (client.readyState === WebSocket.OPEN) {
                     
                        client.send(JSON.stringify(message));
                    }
                });
            } else ws.send(JSON.stringify(message));
        }
    }

    listOperationToClient(content,that) {
        return that.operations.list.filter((item)=> (item.level===USER_PLAYER) ).map((item) => {
            return {
                "op" : item.op,
                "command": item.command,
                "action" : item.remote_action
            }
        })
    }

   message(data){
    console.log(data.message);
    console.log(data.user);
    let Update = data.user +" - "+data.message;
    this.send("MESSAGE_UPDATE",Update,undefined);
   }
    // changelook(name,command){
    //     this.board.look(name,command);
    // }
    // Move(name){
    //  let info = this.board.move(name); 
    //  console.log(info);
    //   this.send("UPDATE",info,undefined) ;
    // }
    // Shoot(data){
    //     let eliminate = this.board.shoot(data)
    //     console.log("pasa1")
    //     this.send("ELIMINADO",eliminate,undefined)
    //     if (this.board.players.size == 1) {
           
    //         this.send("GANADOR",data,undefined)
    //     }
      
    // }

}

export { Server }