function rootController ($scope) {
  socket.on('connect', function socketConnected() {

    // Listen for Comet messages from Sails
    socket.on('message', function messageReceived(message) {
        if (message.verb === "create") {
          $scope.messages.push(message.data);
          $scope.$apply();
          window.scrollTo(0,document.body.scrollHeight);
        }
    });
  });
  
  socket.get("/message", function (data) {
      $scope.messages = data;
      $scope.$apply();
      window.scrollTo(0,document.body.scrollHeight);
  });
  
  $scope.sendMessage = function () {
      var username = $scope.username;
      var message = $scope.message;
      
      if (! username || username === "") {
          return alert("please input user name");
      }
      
      if (! message || message === "") {
          return alert("please input message");
      }
      
      socket.post("/message/create", {
          message: message,
          username: username
      }, function (data) {
        //   $scope.messages.push(data);
          $scope.message = "";
          $scope.$apply();
      })
  };
}