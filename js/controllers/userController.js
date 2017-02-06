angular.module('discoverApp').controller('userController', function($http ,$rootScope,$scope, mainService, userService, projectService, $window){

$scope.currentUser;
$scope.outfacingUser;
// linkedin Oauth
$scope.linkedinOauth = function(){
  userService.linkedinOauth().then(function(res){
    // console.log("SUCCESS in LINKEDIN")
  })
}
// sign out
$scope.signOut = function(){
  $scope.currentUser = null
  window.location = 'http://localhost:3000/#/signin'
}
// create user section
$scope.createUserProfile = function(firstName, lastName, email, password, type, newUser){
  console.log(newUser)
  if(type === "Employer2017" || type === "Student2017"){
    if(firstName && lastName && email && password ){
      $('.create-profile-form').hide()
      $('.create-profile-section h3').show()
      $('#field-prompt-5').hide()
        window.location = 'http://localhost:3000/#/signin'
        userService.createUser(newUser).then(function(res){
          console.log("success!")
        })
    }
     if(!firstName){
      $('#field-prompt-1').show()
      $('#field-prompt-5').show()
    }else{
      $('#field-prompt-1').hide()
    }
     if(!lastName){
      $('#field-prompt-2').show()
      $('#field-prompt-5').show()
    }else{
      $('#field-prompt-2').hide()
    }
     if(!email){
      $('#field-prompt-3').show()
      $('#field-prompt-5').show()
    }else{
      $('#field-prompt-3').hide()
    }
     if(!password){
      $('#field-prompt-4').show()
      $('#field-prompt-5').show()
    }else{
      $('#field-prompt-4').hide()
    }
    if(!firstName || !lastName || !email || !password) {
      $('#field-prompt-5').show()
    }
  }else{
    $('#wrong-invite').show()
  }
}


$scope.getUser = function(userAccount){
  userService.getUser(userAccount).then(function(res){
    var data = res.data
    if(data === "wrong"){
      $('#wrong-pass').show()
    }else{
      if(data.acctype === 'Student'){
        window.location = 'http://localhost:3000/#/userprofile/timeline'
      }else if(data.acctype === 'Employer'){
        window.location = 'http://localhost:3000/#/companyProfile/timeline'
      }
    }
    $scope.getUserConnect();
  })
}
$scope.gitHubConnect = function(userInfo){
  var githubUser = userInfo.username
  let password = userInfo.password
  let email = $scope.currentUser.email
  if(githubUser && password === $scope.currentUser.password ){
    userService.gitHubConnect(githubUser,email).then(function(res){
      window.location = 'http://localhost:3000/#/userprofile'
    })
  }else{
  }
}
//go to employers (ALL EMPLOYERS)
// got to student
$scope.goToStudent = function (id){
  userId = {id:id}
  userService.goToStudent(userId).then(function(res){
    // console.log("this is the res data",res.data)
    $scope.currentUser.outfacingUser = res.data
    window.location = 'http://localhost:3000/#/outfacingStudent'
  })
}
//quicklook connect STUDENTS
$scope.goToStudentQuick = function (id){
  userId = {id:id}
  userService.goToStudent(userId).then(function(res){
    // console.log("this is the res data",res.data)
    $scope.currentUser.outfacingUser = res.data
    $('student-popup').show()
  })
}
// got to student
$scope.goToEmployer = function (id){
  userId = {id:id}
  userService.goToEmployer(userId).then(function(res){
    console.log("this is the res data",res.data)
    $scope.currentUser.outfacingUser = res.data
    window.location = 'http://localhost:3000/#/outfacingStudent'
  })
}
//quicklook connect EMPLOYERS
$scope.goToEmployerQuick = function (id){
  userId = {id:id}
  userService.goToEmployer(userId).then(function(res){
    // console.log("this is the res data",res.data)
    $scope.currentUser.outfacingUser = res.data
    $('student-popup').show()
  })
}

$scope.studentPopupOff = function (){
  $('student-popup').hide()
}

$scope.getUserConnect = function(){

  userService.getUserConnect().then(function(res){
    let data = res.data;
    // console.log(data)
    let email = data.email
    userService.currentuser = res.data;
    projectService.currentuser = res.data;
    $rootScope.currentUser = res.data;
    let githubUser = data.githubuser
    if(githubUser){
      userService.gitHubConnect(githubUser,email).then(function(res){
        // console.log(res)
        $scope.currentUser.gitrepos = res.data.public_repos
      })
    }else{
      $('#githubConnect').show()
    }
    userService.getUserProjects(data.id).then(function(res){
      // console.log(res)
      $scope.currentUser.projectData = res.data
      $scope.currentUser.projectNumber = res.data.length
    })
    userService.getAllStudents().then(function(res){
      $scope.currentUser.allStudents = res.data
    })
    userService.getAllEmployers().then(function(res){
      $scope.currentUser.allEmployers = res.data
    })
    userService.goToStudentConnect().then(function(res){
      $scope.currentUser.outfacingUser = res.data
    })
    userService.getAllEmployerProjects().then(function(res){
      // console.log(res.data)
      $scope.currentUser.allEmployerProjects = res.data
    })
    userService.getSavedUsersArray().then(function(res){
      // console.log('data from getsavedusers', res.data)
      if( $scope.currentUser){
        $scope.currentUser.savedusers = res.data;
      }
      // console.log($scope.currentUser.savedusers)
      fullSavedUsersArray = [];
      if($scope.currentUser.acctype === "Employer" && $scope.currentUser.savedusers){
        for(var i = 0; i < $scope.currentUser.savedusers.length; i++ ){
          for(var j = 0; j <   $scope.currentUser.allStudents.length; j++ ){
            if($scope.currentUser.savedusers[i] ===   $scope.currentUser.allStudents[j].id){
              fullSavedUsersArray.push(  $scope.currentUser.allStudents[j])
            }
          }
        }
      }
      if($scope.currentUser.acctype === "Student" && $scope.currentUser.savedusers){
        for(var i = 0; i < $scope.currentUser.savedusers.length; i++ ){
          for(var j = 0; j <   $scope.currentUser.allEmployers.length; j++ ){
            if($scope.currentUser.savedusers[i] ===   $scope.currentUser.allEmployers[j].id){
              fullSavedUsersArray.push(  $scope.currentUser.allEmployers[j])
            }
          }
        }
      }
      // console.log('test')
      $scope.currentUser.fullSavedUsers = fullSavedUsersArray
    })
    // console.log("yoyo", $scope.currentUser)
  })
}
$scope.getUserConnect();
$scope.loadUserMessages = function(resid, userid){
  var connectMessageUser
  data = {reciver: resid, id: userid}
  if($scope.currentUser.acctype === 'Employer'){
    for(var i = 0; i < $scope.currentUser.allStudents.length; i++){
      if($scope.currentUser.allStudents[i].id === resid){
         connectMessageUser =  $scope.currentUser.allStudents[i]
      }
    }
  }
  if($scope.currentUser.acctype === 'Student'){
    for(var i = 0; i < $scope.currentUser.allEmployers.length; i++){
      if($scope.currentUser.allEmployers[i].id === resid){
         connectMessageUser =  $scope.currentUser.allEmployers[i]
      }
    }
  }
  $scope.currentUser.connectMessageUser = connectMessageUser;
  // console.log($scope.currentUser)
  userService.loadUserMessages(data).then(function(res){
    // console.log(res)
    let allMessages = [];
    let allSortedMessages = [];
    let allMessagesId = [];
    let sentMessage = res.data[0]
    for(var i = 0; i < sentMessage.length; i++ ){
      allMessages.push(sentMessage[i]);
    }
    let recMessage = res.data[1]
    for(var i = 0; i < recMessage.length; i++ ){
      allMessages.push(recMessage[i]);
    }
    for(var i = 0; i < allMessages.length; i++ ){
      allMessagesId.push(allMessages[i].id);
      allMessagesId.sort()
    }
    for(var i = 0; i < allMessagesId.length; i++ ){
      for(var j = 0; j < allMessagesId.length; j++ ){
        if(allMessages[j].id === allMessagesId[i]){
          allSortedMessages.push(allMessages[j])
        }
      }
    }
    console.log(allSortedMessages)
    $scope.currentUser.connectMessageUser.messages = allSortedMessages
  })
}

$scope.sendUserMessage = function(id, resid, message){
  data = {id: id, reciver: resid, message: message }
  console.log(data)
  userService.sendUserMessage(data).then(function(res){
    console.log("there and message again", res)
  })
}

$scope.uploadProfilePic = function(){
  var blobFile = $('#filechooser')[0].files[0];
  var test = {blobFile: blobFile}
  userService.imagetesting(test).then(function(res){
  })


}

// profile updates
$scope.newProfileimg = function(){

 var newImg = prompt("type in image url (image from file comming soon...)")
 if(newImg){
   var email = $scope.currentUser.email
   var imgUpdate = {image: newImg, email: email}
  userService.newProfileimg(imgUpdate).then(function(res){
    location.reload();
  })
 }
}
$scope.newUserBio = function(){
     $('#newUserBio').show()
     $('.save-user-bio').show()
}
$scope.saveUserBio = function(){
     $('#newUserBio').hide()
     $('.save-user-bio').hide()
     var newUserBio = $('#newUserBio').val()
     var email = $scope.currentUser.email
     var userBioUpdate = {userbio: newUserBio, email: email }
     userService.saveUserBio(userBioUpdate).then(function(res){
       location.reload();
     })
}
// save user
$scope.saveUser = function(userId){
  $('#saved-popup-section').show();
  setTimeout(function(){
    $('#saved-popup-section').fadeOut("slow");
  });
  if(!$scope.currentUser.savedusers){
    $scope.currentUser.savedusers =[]
  }
  $scope.currentUser.savedusers.push(userId)
  console.log($scope.currentUser.savedusers)
  userService.saveUser(userId).then(function(res){
    console.log("there and back again", res)
  })
}

$scope.dropdownAnimateProjects = function(){
  $('.blue-nav-projects').toggleClass( "margin-correct-zero", 300, "easeOutSine" );
  $('.blue-nav-students').removeClass( "margin-correct-zero", 300, "easeOutSine" );
}
$scope.dropdownAnimateStudents = function(){
  $('.blue-nav-students').toggleClass( "margin-correct-zero", 300, "easeOutSine" );
  $('.blue-nav-projects').removeClass( "margin-correct-zero", 300, "easeOutSine" );
}

//Raw jquery

$('#explainInvite').click(function(){
  $('#Invite-section').show()
})






})
