angular.module('discoverApp',  ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('home',{
            url:'/home',
            templateUrl: "../templates/home-tmpl.html",
            controller: "mainController"
        })
        .state('signin',{
            url:'/signin',
            templateUrl: "../templates/signin-tmpl.html",
            controller: "userController"
        })
        .state('eSignUp',{
            url:'/eSignUp',
            templateUrl: "../templates/employerSignUp.html",
            controller: "userController"
        })
        .state('sSignUp',{
            url:'/sSignUp',
            templateUrl: "../templates/studentSignUp.html",
            controller: "userController"
        })
        .state('mainSignUp',{
            url:'/mainSignUp',
            templateUrl: "../templates/mainSignUp.html",
            controller: "userController"
        })
        .state('createProfile',{
            url:'/createProfile',
            templateUrl: "../templates/createProfile.php",
            controller: "userController"
        })
        .state('createEmployerProfile',{
            url:'/createEmployerProfile',
            templateUrl: "../templates/createEmployerProfile.html",
            controller: "userController"
        })
        .state('newProject',{
            url:'/newProject',
            templateUrl: "../templates/newProject.php",
            controller: "projectController"
        })
        .state('newProfilePiece',{
            url:'/newProfilePiece',
            templateUrl: "../templates/newProfilePiece.html",
            controller: "projectController"
        })
        .state('myProjects',{
            url:'/myProjects',
            templateUrl: "../templates/my-projects.html",
            controller: "userController"
        })
        .state('userprofile',{
            url:'/userprofile',
            templateUrl: "../templates/userprofile.html",
            controller: "userController"
        })
        .state('githubConnect',{
            url:'/githubConnect',
            templateUrl: "../templates/githubConnect.html",
            controller: "userController"
        })
        .state('userprofile.newsfeed',{
            url:'/newsfeed',
            templateUrl: "../templates/userprofileNewsfeed.html",
            controller: "userController"
        })
        .state('userprofile.timeline',{
            url:'/timeline',
            templateUrl: "../templates/userprofileTimeline.html",
            controller: "userController"
        })
        .state('companyProfile.newsfeed',{
            url:'/newsfeed',
            templateUrl: "../templates/userprofileNewsfeed.html",
            controller: "userController"
        })
        .state('companyProfile.timeline',{
            url:'/timeline',
            templateUrl: "../templates/userprofileTimeline.html",
            controller: "userController"
        })
        .state('companyProfile',{
            url:'/companyProfile',
            templateUrl: "../templates/companyProfile.html",
            controller: "userController"
        })
        .state('employerInfo',{
            url:'/employerInfo',
            templateUrl: "../templates/employerInfo.html",
            controller: "employerController"
        })
        .state('studentLineup',{
          url:"/studentLineup",
          templateUrl: "../templates/students/student-lineup.html",
          controller: "userController"
        })
        .state('employerLineup',{
          url:"/employerLineup",
          templateUrl: "../templates/employers/employer-lineup.html",
          controller: "userController"
        })
        .state('home.james',{
            url:'/james',
            templateUrl: "../templates/james-tmpl.html",
            controller: "mainController"
        })
        .state('home.mike',{
            url:'/mike',
            templateUrl: "templates/mike-tmpl.html",
            controller: "mainController"
        })
        .state('home.sally',{
            url:'/sally',
            templateUrl: "templates/sally-tmpl.html",
            controller: "mainController"
        })
        .state('home.joan',{
            url:'/joan',
            templateUrl: "templates/joan-tmpl.html",
            controller: "mainController"
        })
        .state('LItest',{
            url:'/LItest',
            templateUrl: "templates/linkedinTestingPage.html",
            controller: "userController"
        })
        .state('timertempl',{
            url:'/timertempl',
            templateUrl: "templates/timertempl.html",
            controller: "linkedinController"
        })
        .state('outfacingStudent',{
            url:'/outfacingStudent',
            templateUrl: "templates/students/outfacing-student.html",
            controller: "userController"
        })
        .state('searchresults',{
            url:'/searchresults',
            templateUrl: "templates/search-results.html",
            controller: "userController"
        })
        .state('savedUsers',{
            url:'/savedUsers',
            templateUrl: "templates/students/saved-users.html",
            controller: "userController"
        })
        .state('inbox',{
            url:'/inbox',
            templateUrl: "templates/user-inbox.html",
            controller: "userController"
        })
        .state('inbox.messages',{
            url:'/messages',
            templateUrl: "templates/user-inbox-messages.html",
            controller: "userController"
        })
        .state('inbox.contacts',{
            url:'/contacts',
            templateUrl: "templates/user-inbox-contacts.html",
            controller: "userController"
        })
        .state('projectinfo',{
            url:'/projectinfo',
            templateUrl: "templates/marketing/projects.html",
            controller: "userController"
        })
        .state('tallentinfo',{
            url:'/tallentinfo',
            templateUrl: "templates/marketing/tallent.html",
            controller: "userController"
        })




        $urlRouterProvider
            .when('/', '/home/james')
            .otherwise('/');
    });
