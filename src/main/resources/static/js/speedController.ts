///<reference path="../../typescript/angular.d.ts"/>
namespace Assignment3750 {
    export class SpeedCtrl {
        stompClient: any;
        title = "Welcome to the wonderful world of SPEED";
        playableCards = [
            "OtherJack"
        ];
        availableCards = [
            "Jack",
            "Queen",
            "King",
            "Ace"
        ];
        oppCards = [
            "x",
            "x",
            "x",
            "x"
        ];
        dropping = false;
        addText = "";
        gameState: Models.GameState;

        constructor($scope: ng.IScope) {
            $scope["d"] = this;
            this.connect()
        }

        dropSuccessHandler($event, index, array) {
            if (this.dropping) {
                array.splice(index, 1);
            }
            this.dropping = false;
        };

        onDrop($event, $data, array) {
            array.push($data);
            this.dropping = true;
        };

        connect() {
            let socket = new SockJS("/ws");
            this.stompClient = Stomp.over(socket);

            this.stompClient.connect({}, this.onConnected, this.onError);
            //event.preventDefault();
        }

        onConnected() {
            this.stompClient.subscribe("/speed", this.updateHandler); // Listen for updates to game state
        }

        onError(error) {
            // TODO: Take some action on connection error
            alert(error);
        }

        updateHandler(payload) {

            let gameState = JSON.parse(payload.body); // TODO: Should the server send the entire game state each time there is an update?

            // Do stuff?

            this.drawGameBoard(gameState);

        }

        drawGameBoard(gameState) {
            // TODO: Draw gameboard's current state
        }

        makeMove(move) {
            /*
                TODO: Decide on move encoding, capture onHover events?
                   {card: Card, destination: Index}
            */

            //let move = null; // Create valid move object
            if (move && this.stompClient) {
                let command = {
                    sender: null,   // TODO: Need to identify players, use session ID?
                    move: move,
                    type: PLAY
                };
                this.stompClient.send("/rest/api/game.playCard", {}, JSON.stringify(command));
            }
            //event.preventDefault();
        }

        drawCard() {
            const endpoint = "/rest/api/game.drawCard";
            if (this.stompClient) {
                this.stompClient.send(endpoint, {}, JSON.stringify(""));
            }
            //event.preventDefault()
        }

        playCard(card, target){
            const endpoint = "/rest/api/game.playCard";
            let request = {
                target: target,
                source: card
            }
            if (this.stompClient) {
                this.stompClient.send(endpoint, {}, JSON.stringify(target));
            }
        }
    }

    let app = angular.module("speedApp", ["ang-drag-drop"]);
    app.controller("SpeedCtrl", SpeedCtrl);
}

declare var SockJS: any;
declare var Stomp: any;
declare var PLAY: any;