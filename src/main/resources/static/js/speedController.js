///<reference path="../../typescript/angular.d.ts"/>
var Assignment3750;
(function (Assignment3750) {
    var SpeedCtrl = /** @class */ (function () {
        function SpeedCtrl($scope) {
            this.$scope = $scope;
            this.title = "Welcome to the wonderful world of SPEED";
            this.playedCards = [];
            this.oppCards = [
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
            this.dropping = false;
            this.addText = "";
            $scope["d"] = this;
            this.connect();
            this.playCard1 = { id: "first", src: "img/10SPADES.png" };
            this.playCard2 = { id: "second", src: "img/2SPADES.png" };
            Assignment3750.currentController = this;
        }
        SpeedCtrl.prototype.dropSuccessHandler = function ($event, index, array) {
            if (Assignment3750.currentController.dropping) {
                array.splice(index, 1);
            }
            Assignment3750.currentController.dropping = false;
        };
        ;
        SpeedCtrl.prototype.onDrop = function ($event, card, array, stack) {
            array.push(card);
            if (stack === 1)
                Assignment3750.currentController.playCard1 = card;
            else
                Assignment3750.currentController.playCard2 = card;
            Assignment3750.currentController.dropping = true;
        };
        ;
        SpeedCtrl.prototype.connect = function () {
            var socket = new SockJS("/ws");
            this.stompClient = Stomp.over(socket);
            this.stompClient.connect({}, this.onConnected, this.onError);
            //event.preventDefault();
        };
        SpeedCtrl.prototype.onConnected = function () {
            Assignment3750.currentController.stompClient.subscribe("/user/queue/reply", Assignment3750.currentController.updateHandler); // Listen for updates to game state
            Assignment3750.currentController.initGame();
            //currentController.drawGameBoard({} as any);
        };
        SpeedCtrl.prototype.onError = function (error) {
            // TODO: Take some action on connection error
            alert(error);
        };
        SpeedCtrl.prototype.updateHandler = function (payload) {
            var gameState = JSON.parse(payload.body); // TODO: Should the server send the entire game state each time there is an update?
            // Do stuff?
            Assignment3750.currentController.drawGameBoard(gameState);
        };
        SpeedCtrl.prototype.drawGameBoard = function (gameState) {
            this.gameState = gameState;
            if (!this.gameState)
                return;
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
            this.$scope.$apply();
        };
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
        SpeedCtrl.prototype.drawCard = function () {
            var endpoint = "/speed/game.drawCard";
            if (this.stompClient) {
                this.stompClient.send(endpoint, {}, JSON.stringify(""));
            }
            //event.preventDefault()
        };
        SpeedCtrl.prototype.initGame = function () {
            var endpoint = "/speed/game.init";
            if (this.stompClient) {
                this.stompClient.send(endpoint, {}, JSON.stringify(""));
            }
            //event.preventDefault()
        };
        SpeedCtrl.prototype.playCard = function (card, target) {
            var endpoint = "/speed/game.playCard";
            var request = {
                target: target,
                source: card
            };
            if (this.stompClient) {
                this.stompClient.send(endpoint, {}, JSON.stringify(target));
            }
        };
        return SpeedCtrl;
    }());
    Assignment3750.SpeedCtrl = SpeedCtrl;
    var app = angular.module("speedApp", ["ang-drag-drop"]);
    app.controller("SpeedCtrl", SpeedCtrl);
})(Assignment3750 || (Assignment3750 = {}));
//# sourceMappingURL=speedController.js.map