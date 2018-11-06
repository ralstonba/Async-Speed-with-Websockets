///<reference path="../../typescript/angular.d.ts"/>
namespace Assignment3750 {
    import GameState = Models.GameState;
    export var currentController: SpeedCtrl;

    export class SpeedCtrl {
        stompClient: any;
        title = "Welcome to the wonderful world of SPEED";
        playedCards: Models.Card[] = [];
        playCard1: Models.Card;
        playCard2: Models.Card;

        oppCards: Models.Card[] = [
            {
                id: "x1",
                src: "img/9HEARTS.png"
            },
            {
                id: "x2",
                src: "img/7SPADES.png"
            },
            {
                id: "x3",
                src: "img/5SPADES.png"
            },
            {
                id: "x4",
                src: "img/10CLUBS.png"
            }
        ];
        dropping = false;
        addText = "";
        gameState: Models.GameState;

        constructor(private $scope: ng.IScope) {
            $scope["d"] = this;
            this.connect();
            this.playCard1 = {id: "first", src: "img/10SPADES.png"}
            this.playCard2 = {id: "second", src: "img/2SPADES.png"}
            currentController = this;
        }

        dropSuccessHandler($event, index, array: Models.Card[]) {
            if (this.dropping) {
                array.splice(index, 1);
            }
            this.dropping = false;
        };

        onDrop($event, card: Models.Card, array: Models.Card[], stack: number) {
            array.push(card);
            if (stack === 1)
                this.playCard1 = card;
            else
                this.playCard2 = card;
            this.dropping = true;
        };

        connect() {
            let socket = new SockJS("/ws");
            this.stompClient = Stomp.over(socket);

            this.stompClient.connect({}, this.onConnected, this.onError);
            //event.preventDefault();
        }

        onConnected() {
            currentController.stompClient.subscribe("/user/queue/reply", currentController.updateHandler); // Listen for updates to game state
        }

        onError(error) {
            // TODO: Take some action on connection error
            alert(error);
        }

        updateHandler(payload) {

            let gameState: Models.GameState = JSON.parse(payload.body); // TODO: Should the server send the entire game state each time there is an update? NOOOO!!!

            // Do stuff?

            currentController.drawGameBoard(gameState);

        }

        drawGameBoard(gameState: Models.GameState) {
            this.gameState = gameState;
            if (!this.gameState) return;
            this.gameState.availableCards = [
                {
                    id: "Jack",
                    src: "img/11CLUBS.png"
                },
                {
                    id: "Queen",
                    src: "img/12DIAMONDS.png"
                },
                {
                    id: "King",
                    src: "img/13CLUBS.png"
                },
                {
                    id: "Ace",
                    src: "img/1HEARTS.png"
                }
            ];
        }

        // makeMove(move) {
        //     /*
        //         TODO: Decide on move encoding, capture onHover events?
        //            {card: Card, destination: Index}
        //     */
        //
        //     //let move = null; // Create valid move object
        //     if (move && this.stompClient) {
        //         let command = {
        //             sender: null,   // TODO: Need to identify players, use session ID?
        //             move: move,
        //             type: PLAY
        //         };
        //         this.stompClient.send("/rest/api/game.playCard", {}, JSON.stringify(command));
        //     }
        //     //event.preventDefault();
        // }

        drawCard() {
            const endpoint = "/speed/game.drawCard";
            if (this.stompClient) {
                this.stompClient.send(endpoint, {}, JSON.stringify(""));
            }
            //event.preventDefault()
        }

        initGame() {
            const endpoint = "/speed/game.init";
            if (this.stompClient) {
                this.stompClient.send(endpoint, {}, JSON.stringify(""));
            }
            //event.preventDefault()
        }

        playCard(card, target) {
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