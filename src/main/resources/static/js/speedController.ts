///<reference path="../../typescript/angular.d.ts"/>
namespace Assignment3750 {
    export var currentController: SpeedCtrl;

    export class SpeedCtrl {
        stompClient: any;
        title = "Welcome to the wonderful world of SPEED";
        playCard1: Models.Card;
        playCard2: Models.Card;
        dropping = false;
        gameState: Models.GameState;
        playedCards: Models.Card[] = [];

        constructor(private $scope: ng.IScope) {
            $scope["d"] = this;
            this.connect();
            currentController = this;
        }

        //Event for when card is dropped successfully
        dropSuccessHandler($event, card: Models.Card) {
            if (currentController.dropping) {
                currentController.gameState.player.hand.cards = currentController.gameState.player.hand.cards.filter(c => c.src !== card.src);
            }
            currentController.dropping = false;

        };

        //Notify scope of card drop
        onDrop($event, card: Models.Card, array: Models.Card[], stack: Models.Card, index: number) {
            array.push(card);
            if (index === 1)
                currentController.gameState.playCard1 = card;
            else
                currentController.gameState.playCard2 = card;
            currentController.playCard(card, stack);
            currentController.dropping = true;
        };

        //Connect to web socket
        connect() {
            let socket = new SockJS("/ws");
            this.stompClient = Stomp.over(socket);

            this.stompClient.connect({}, this.onConnected, this.onError);
            //event.preventDefault();
        }

        onConnected() {
            currentController.stompClient.subscribe("/user/queue/reply", currentController.updateHandler); // Listen for updates to game state
            currentController.initGame();
            //currentController.drawGameBoard({} as any);
        }

        onError(error) {
            // TODO: Take some action on connection error
            alert(error);
        }

        updateHandler(payload) {

            let gameState = JSON.parse(payload.body); // TODO: Should the server send the entire game state each time there is an update?

            // Do stuff?

            currentController.drawGameBoard(gameState);

        }

        //Sets game state and parses cards
        drawGameBoard(gameState: Models.GameState) {
            this.gameState = gameState;
            if (!this.gameState) return;
            let {playCard1, playCard2, playOptions, player} = gameState;

            if (playOptions && playOptions.length > 1) {
                this.gameState.playCard1 = new Models.Card(playOptions[0].rank, playOptions[0].suit);
                this.gameState.playCard2 = new Models.Card(playOptions[1].rank, playOptions[1].suit);
            }
            this.gameState.player.hand.cards = player.hand.cards.map(c => new Models.Card(c.rank, c.suit));

            this.$scope.$apply();
        }

        drawCard() {
            const endpoint = "/speed/game.drawCard";
            if (this.stompClient) {
                this.stompClient.send(endpoint, {}, JSON.stringify(""));
            }
        }

        stale() {
            const endpoint = "/speed/game.stalemate";
            if (this.stompClient) {
                this.gameState.player.handStale = true;
                this.stompClient.send(endpoint, {}, JSON.stringify(""));
            }
        }

        initGame() {
            const endpoint = "/speed/game.init";
            if (this.stompClient) {
                this.stompClient.send(endpoint, {}, JSON.stringify(""));
            }
        }

        playCard(card: Models.Card, target: Models.Card) {
            //Todo: Make it work?
            const endpoint = "/speed/game.playCard";
            let request = {
                destination: {suit: target.suit, rank: target.rank},
                source: {suit: card._suit, rank: card._rank}
            };
            if (this.stompClient) {
                this.stompClient.send(endpoint, {}, JSON.stringify(request));
            }
        }
    }

    let app = angular.module("speedApp", ["ang-drag-drop", "transition-card"]);
    app.controller("SpeedCtrl", SpeedCtrl);
}

declare var SockJS: any;
declare var Stomp: any;
declare var PLAY: any;