myApp.controller('liveController',function($http,$location,$scope){
    var id = sessionStorage.id;
    const messages = document.querySelector('#messages');
    const wsButton = document.querySelector('#wsButton');
    const stopButton = document.querySelector('#stopButton');
    console.log(id)

        if(!$location.path('/live')){
            websocket.terminate()
        }
        $scope.noLive= false;
        $scope.live= true;

            var canvas = document.getElementById('video-canvas');
            var url = 'ws://'+document.location.hostname+':3002/';
            var player = new JSMpeg.Player(url, {canvas: canvas, autoplay: false});
            wsButton.onclick = () => {
                player.play()
                console.log('player has started')
            }
            stopButton.onclick=()=>{
                player.destroy()
                console.log('player is destroyed')
            }

        

        // var ws;

      // wsButton.onclick = () => {
      //   if (ws) {
      //     ws.onerror = ws.onopen = ws.onclose = null;
      //     ws.close();
      //   }

        // ws = new WebSocket(`ws://${location.host}`);
        // var canvas = document.getElementById('video-canvas');
        // var url = 'ws://'+document.location.hostname+':3000/';
        // console.log(url)
        // var player = new JSMpeg.Player(url, {canvas: canvas});
        // console.log(location.host)

        // if(ws.onerror){$scope.showMessage='WebSocket error'}  ;
        // if(ws.onopen){
        //     $scope.showMessage='Play available online tutorial';
        // } 
        // if(ws.onclose){
        //     $scope.showMessage='WebSocket connection closed'
        // }
      // };

    // }

     $scope.go = function (path){
        $location.path(path);
    }

})


