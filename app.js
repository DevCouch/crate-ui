(function() {
  var app = angular.module("crate", []);

  app.controller("NavigationController", function() {
    this.tab = 0;
    this.userId = -1;

    this.setTab = function(tab) {
      this.tab = tab || 0;
    }

    this.isSet = function(currentTab) {
      return this.tab === currentTab;
    }
  });

  app.directive("logs", ["$http", "$log", function($http, $log) {
    return {
      restrict: "E",
      templateUrl: "logs.html",
      controller: function() {
        logCtrl = this;
        logCtrl.logs = [];
        logCtrl.searchTerm = '';
        $http.post('http://127.0.0.1:8080/log/query?limit=1000', {}).success(function(data) {
          logCtrl.logs = data.logMessages;
          logCtrl.duration = data.duration;
        });

        this.searchLogs = function() {
          this.query = { "query": logCtrl.searchTerm };
          $log.info(this.query);
          $http.post("http://127.0.0.1:8080/log/query", this.query).success(function(data) {
            logCtrl.logs = data.logMessages;
            logCtrl.duration = data.duration;
            logCtrl.searchTerm = ''
          });
        }
      },
      controllerAs: "logCtrl"
    };
  }]);

  app.directive("fixedHeader", ["$log", function($log, $scope, $element) {
    return {
      restrict: "A",
      controller: function() {
        $scope = angular.element(document.getElementById('header')).scope();

          $log.info($scope.element);
      }
    };
  }]);
})();
