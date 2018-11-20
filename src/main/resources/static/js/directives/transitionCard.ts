namespace Directives {
    export class TransitionCard {
        showCard: boolean;

        constructor(private $scope: ITransCardScope) {
            var me = this;
            setTimeout(()=>{
                me.showCard = true;
                this.$scope.$apply();
            }, 1000);
        }

        static directive() {
            return {
                restrict: 'EA',
                scope: {},
                link(scope: ITransCardScope, elem, attrs) {

                },
                transclude: "element",
                replace: true,
                templateUrl: '../../view/transitionCardTemplate.html'
            } as ng.IDirective;
        }
    }

    interface ITransCardScope extends ng.IScope {
    }

    var app = angular.module("transition-card", []);
    app.controller("TransitionCard", TransitionCard)
    app.directive("transCard", TransitionCard.directive);
}