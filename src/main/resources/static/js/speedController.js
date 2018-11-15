///<reference path="../../typescript/angular.d.ts"/>
var Assignment3750;
(function (Assignment3750) {
    var SpeedCtrl = /** @class */ (function () {
        function SpeedCtrl($scope) {
            this.$scope = $scope;
            this.title = "Welcome to the wonderful world of SPEED";
            this.dropping = false;
            this.playedCards = [];
            $scope["d"] = this;
            this.connect();
            Assignment3750.currentController = this;
        }
        //Event for when card is dropped successfully
        SpeedCtrl.prototype.dropSuccessHandler = function ($event, card) {
            if (Assignment3750.currentController.dropping) {
                Assignment3750.currentController.gameState.player.hand.cards = Assignment3750.currentController.gameState.player.hand.cards.filter(function (c) { return c.src !== card.src; });
            }
            Assignment3750.currentController.dropping = false;
        };
        ;
        //Notify scope of card drop
        SpeedCtrl.prototype.onDrop = function ($event, card, array, stack, index) {
            array.push(card);
            if (index === 1)
                Assignment3750.currentController.gameState.playCard1 = card;
            else
                Assignment3750.currentController.gameState.playCard2 = card;
            Assignment3750.currentController.playCard(card, stack);
            Assignment3750.currentController.dropping = true;
        };
        ;
        //Connect to web socket
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
        //Sets game state and parses cards
        SpeedCtrl.prototype.drawGameBoard = function (gameState) {
            this.gameState = gameState;
            if (!this.gameState)
                return;
            var playCard1 = gameState.playCard1, playCard2 = gameState.playCard2, playOptions = gameState.playOptions, player = gameState.player;
            if (playOptions && playOptions.length > 1) {
                this.gameState.playCard1 = new Models.Card(playOptions[0].rank, playOptions[0].suit);
                this.gameState.playCard2 = new Models.Card(playOptions[1].rank, playOptions[1].suit);
            }
            this.gameState.player.hand.cards = player.hand.cards.map(function (c) { return new Models.Card(c.rank, c.suit); });
            this.$scope.$apply();
        };
        SpeedCtrl.prototype.drawCard = function () {
            var endpoint = "/speed/game.drawCard";
            if (this.stompClient) {
                this.stompClient.send(endpoint, {}, JSON.stringify(""));
            }
        };
        SpeedCtrl.prototype.stale = function () {
            var endpoint = "/speed/game.stalemate";
            if (this.stompClient) {
                this.gameState.player.handStale = true;
                this.stompClient.send(endpoint, {}, JSON.stringify(""));
            }
        };
        SpeedCtrl.prototype.initGame = function () {
            var endpoint = "/speed/game.init";
            if (this.stompClient) {
                this.stompClient.send(endpoint, {}, JSON.stringify(""));
            }
        };
        SpeedCtrl.prototype.playCard = function (card, target) {
            //Todo: Make it work?
            var endpoint = "/speed/game.playCard";
            var request = {
                destination: { suit: target.suit, rank: target.rank },
                source: { suit: card._suit, rank: card._rank }
            };
            if (this.stompClient) {
                this.stompClient.send(endpoint, {}, JSON.stringify(request));
            }
        };
        return SpeedCtrl;
    }());
    Assignment3750.SpeedCtrl = SpeedCtrl;
    var app = angular.module("speedApp", ["ang-drag-drop", "transition-card"]);
    app.controller("SpeedCtrl", SpeedCtrl);
})(Assignment3750 || (Assignment3750 = {}));
//# sourceMappingURL=speedController.js.map