import { Player } from "./player.js";

const ADMIN_PLAYER = 0;
const PLAYER = 1;

class Board {
    constructor() {
        this.map = this.build();
        this.players = new Map();
        this.startPoints = new Set([
            this.map.filter((item) => item.left == null),
            this.map.filter((item) => item.right == null),
            this.map.filter((item) => item.top == null),
            this.map.filter((item) => item.bottom == null)].flat());
    }

    newPlayer(ws) {
        let list = [...this.startPoints];
        let start = list[Math.floor(Math.random() * list.length)];
        this.startPoints.delete(list[Math.floor(Math.random() * list.length)]);
        start.player = new Player("noname", start);
        this.players.set(ws, start.player, PLAYER);
        return start.player;
    }


    build() {
        let board = new Array(400).fill(0).map((item, index) => {

            return {
                id: index, player: null, left: null, right: null, top: null, bottom: null, row: Math.floor(index / 20), col: index % 20
            }
        })
        board.forEach((element, id, list) => {
            let search = (y, x, a) => {

                return a.find(item => ((item.row === y) && (item.col === x))) || null
            }
            element.right = search(element.row, element.col + 1, list);
            element.left = search(element.row, element.col - 1, list);
            element.top = search(element.row - 1, element.col, list);
            element.bottom = search(element.row + 1, element.col, list);

        });
        return board;
    }
    look(name, command) {
        this.players.forEach((player) => {
            if (player._name === name) {
                if (player._looking != 3) {
                    player._looking = player._looking + 1;

                } else {
                    player._looking = 0;
                }
                console.log(player._looking);
            }

        })
    }
    move(name) {
        let info;
        let casillaid;
        let newcasilla;
        this.players.forEach((player) => {
            if (player._name === name) {
                casillaid = player._tile.id;
            }

        })
        console.log(casillaid)
        let casilla = this.map.find((element) => element.id == casillaid);
        if (casilla.player._looking == 0) {
            console.log((casillaid) - 20);
            newcasilla = this.map.find((element) => element.id == (casillaid) - 20);
            console.log(newcasilla);
            if (newcasilla != undefined) {
                newcasilla.player = casilla.player;
                casilla.player = null;
            }

        } else if (casilla.player._looking == 2) {
            console.log((casillaid) + 20);

            newcasilla = this.map.find((element) => element.id == (casillaid) + 20);
            console.log(newcasilla);
            if (newcasilla != undefined) {
                newcasilla.player = casilla.player;
                casilla.player = null;
            }
        } else if (casilla.player._looking == 1) {
            console.log((casillaid) + 1);
            newcasilla = this.map.find((element) => element.id == (casillaid) + 1);
            console.log(newcasilla);
            if (newcasilla != undefined) {
                newcasilla.player = casilla.player;
                casilla.player = null;
            }
        } else if (casilla.player._looking == 3) {
           
            newcasilla = this.map.find((element) => element.id == (casillaid) - 1);
            
            if (newcasilla != undefined) {
                newcasilla.player = casilla.player;
                casilla.player = null;
            }
        }




        if (newcasilla != undefined) {
            this.players.forEach((player) => {
                if (player._name === name) {
                    player._tile = newcasilla;
                }
                // console.log(newcasilla);
                info = {
                    row: newcasilla.row,
                    look: newcasilla.player._looking,
                    col: newcasilla.col,
                    name: newcasilla.player._name
                }

            })
            
            return info;
        }

    }
    shoot(name){
        function getKeyByValue(map, searchValue) {
            for (let [key, value] of map.entries()) {
              if (value === searchValue) {
                return key;
              }
            }
        }
        let casilla;
        let letplayer;
        let id;
        let eliminate
        this.players.forEach((player) => {
            if (player._name === name) {
                letplayer = player;
            }

        })
        console.log(name)
        if (letplayer._looking == 0) {
            if(letplayer._tile.top != null){
                id = letplayer._tile.top.id
            }else{
                id = null
            }
           
        } else  if (letplayer._looking == 1) {
            if(letplayer._tile.right != null){
                id = letplayer._tile.right.id
            }else{
                id = null
            }
           
        }else  if (letplayer._looking == 2) {
            if(letplayer._tile.bottom != null){
                id = letplayer._tile.bottom.id
            }else{
                id = null
            }
           
        }else  if (letplayer._looking == 3) {
            if(letplayer._tile.left != null){
                id = letplayer._tile.left.id
            }else{
                id = null
            }
           
        }
  if (id != null) {
    casilla = this.map.find((element) => element.id == (id));
        console.log(casilla);
        if (casilla.player != null) {
           
            eliminate = casilla.player._name 
            
            console.log("eliminado");
            this.players.forEach((player) => {
                if (player._name === eliminate) {
                   let key  = getKeyByValue(this.players,player)
                   this.players.delete(key)
                    console.log(this.players.size)
                }
    
            })
            casilla.player = null
            return eliminate
        }
        
       
  }
        
    }

}

export { Board }