myApp.controller('loadController',function($scope,$location,$http,$routeParams){
    var id = sessionStorage.id;
    var q_name = sessionStorage.qname;
    var title = sessionStorage.title
    var time = sessionStorage.time
    var randomize = sessionStorage.randomize
    var q_id = parseInt($routeParams.q_id,10);
    var instruction= sessionStorage.instruction;
    var qcode= sessionStorage.qcode;
    var quiz_model;
    $scope.instruction= instruction;

    var riteans_perc ;
    var urite_ans = 0;
    $scope.quiz_box = false;
    $scope.info_box = true;
    $scope.result_box = false;


    if(!id){
        // console.log("not found"+id)
        $scope.user_in = false;
        $scope.user_out = true;
    }else{
        // console.log("found"+id)

        $scope.user_in = true;
        $scope.user_out = false;
    }

    $scope.startQuiz = function(){
        $scope.quiz_box = true;
        $scope.info_box = false;
       // var q_name

       //Load question from the server
        $http({
            url:"/load",
            data:{q_name:q_name},
            method:"POST"
        }).then(
                function(res){
                    // console.log("response data are below")
                    // console.log('res data', res.data)
                    if(res.data){
                    $scope.quiz_model = res.data;
                 quiz_model =  $scope.quiz_model;
                 // console.log("quiz model is ",quiz_model)

                var next = 0;
                $scope.current_q = quiz_model[next];
                // console.log("current quiz model is ", $scope.current_q)

                $scope.prev_btn = false ;

                 $scope.next_btn = true;
                 $scope.result_btn = false;
                 var user_ans = [];//User Ans will be stored here
                 $scope.u_ans = '';//user ans are upated in this model var
                 var ans_given = false;
                 $scope.change_q = function(state){

                 var next_btn=next+1;
                 var prev_btn=next-1;

                 switch(state)
                 {
                 case "next":
                 if(!$scope.u_ans){
                 $scope.err_message = "Please Select Any answer to processed  forward";


                 }else{
                 $scope.current_q = quiz_model[next_btn];
                 next = next_btn;

                 var q_id =  quiz_model[next-1]._id
                 // console.log("q id is  ", q_id)
                 var u_ans = $scope.u_ans;
                 ans_forward(q_id,u_ans);
                 $scope.u_ans = '';

                 $scope.err_message = '';
                 ans_given = !ans_given;
                 }
                 //console.log(q_id + "------"+quiz_model[next-1].q);


                 //console.log(next);
                 break;
                 case "prev":
                 $scope.current_q = quiz_model[prev_btn];
                 next = prev_btn;
                 // console.log(quiz_model[prev_btn].id);
                 break;
                 }//Switch
                 check_status();


                 }//Solving the  user request for next/prev questions
                 var check_status = function(){
                 if(ans_given == true){
                 if(next == 0){

                 $scope.prev_btn = true;
                 $scope.next_btn = true;
                 }else if(next< (quiz_model.length-1)){

                 $scope.prev_btn = true;
                 $scope.next_btn = true;
                 }else if((next+1) == quiz_model.length){

                 $scope.prev_btn = true;
                 $scope.next_btn = false;
                 $scope.result_btn = true;
                 //console.log(quiz_model.length-1)
                 next--;


                 }//Showing and hiding next/prev button
                 ans_given = false

                 }//checking that user have choosen any answer or not
                 }// Checking the position of the user for button show and hide

                 $scope.generate_result = function(){

                 if(!$scope.u_ans){
                 $scope.err_message = "Please Select Any answer to processed  forward";

                 }else{
                 var q_id =  quiz_model[next+1].id
                 var u_ans = $scope.u_ans;
                 ans_forward(q_id,u_ans);
                 //console.log(q_id+"----------"+u_ans)

                 for(var i=0;i<quiz_model.length;i++){
                 //console.log("user_ans"+user_ans[i].q_id + "quiz_model--"+quiz_model[i].id);

                 if(quiz_model[i].id == user_ans[i].q_id){
                 //console.log("Q:"+(i+1)+" as"+user_ans[i].u_ans +"qm"+quiz_model[i].r_a);
                 if((user_ans[i].u_ans) == (quiz_model[i].r_a)){
                 urite_ans ++;
                 }//if internal
                 }//if main



                 }//for loop

                 $scope.quiz_box = false;
                 $scope.result_box = true;
                 //Calculating Result
                  riteans_perc = (urite_ans/quiz_model.length)*100;
                 $scope.rite_percentage = riteans_perc;

                 var value = riteans_perc;
                 var type;

                 if (value < 25) {
                 type = 'danger';
                 } else if (value < 50) {
                 type = 'info';
                 } else if (value < 75) {
                 type = 'warning';
                 } else {
                 type = 'success';
                 }


                 $scope.dynamicObject = {
                 value: value,
                 type: type
                 };


                 // console.log(riteans_perc);
                 }////checking that user have choosen any answer or not

                }//generate_result();

                $scope.saveResult = function(){
                                console.log("Result Saved");
                                $scope.generate_result()
                    $http({
                        url:"/saveResult",
                        data:{u_id:id,riteans_perc : riteans_perc,q_name:q_name},
                        method:"POST"
                    }).then(function(res){

                            // console.log(res.data);
                        },function(res){
                         alert("Error");
                        }
                    )

                }//saveResult()

                 var ans_forward = function(id,ans){
                 user_ans.push({q_id:id,u_ans:ans});
                 }//This function save user's answer to array

                    }else{ $scope.error= res.data
                        }
                            //console.log(quiz_model)
                            //quiz_model = $scope.quiz_model;
                },function(res){ alert("Error")}
                
            )

            //set timer
            if(time != null){
                $scope.timer= true
                function getTimeRemaining(endtime) {
                  var t = Date.parse(endtime) - Date.parse(new Date());
                  var seconds = Math.floor((t / 1000) % 60);
                  var minutes = Math.floor((t / 1000 / 60) % 60);
                  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
                  return {
                    'total': t,
                    'hours': hours,
                    'minutes': minutes,
                    'seconds': seconds
                  };
                }

                function initializeClock(id, endtime) {
                  var clock = document.getElementById(id);
                  var hoursSpan = clock.querySelector('.hours');
                  var minutesSpan = clock.querySelector('.minutes');
                  var secondsSpan = clock.querySelector('.seconds');

                  function updateClock() {
                    var t = getTimeRemaining(endtime);
                    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
                    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
                    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

                    if (t.total <= 0) {
                      clearInterval(timeinterval);
                      $scope.saveResult()
                      $scope.result_box= true
                      $scope.quiz_box= false
                    }
                  }

                  updateClock();
                  var timeinterval = setInterval(updateClock, 1000);
                }

                var deadline = new Date(Date.parse(new Date()) + time * 1000);
                initializeClock('clockdiv', deadline);

            }//end of set timer

    }//startQuiz








    $scope.go = function (path){
        $location.path(path);
    }
     q_name.toUpperCase();
    $scope.message = title  +" Quiz";


});
