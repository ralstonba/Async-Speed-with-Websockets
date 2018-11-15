var Directives;
(function (Directives) {
    var TransitionCard = /** @class */ (function () {
        function TransitionCard($scope) {
            var _this = this;
            this.$scope = $scope;
            var me = this;
            setTimeout(function () {
                me.showCard = true;
                _this.$scope.$apply();
            }, 1000);
        }
        TransitionCard.directive = function () {
            return {
                restrict: 'EA',
                scope: {},
                link: function (scope, elem, attrs) {
                },
                transclude: "element",
                replace: true,
                templateUrl: '../../view/transitionCardTemplate.html'
            };
        };
        return TransitionCard;
    }());
    Directives.TransitionCard = TransitionCard;
    var app = angular.module("transition-card", []);
    app.controller("TransitionCard", TransitionCard);
    app.directive("transCard", TransitionCard.directive);
})(Directives || (Directives = {}));
//# sourceMappingURL=transitionCard.js.map