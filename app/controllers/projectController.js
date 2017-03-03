let Project = require('../models/Project');
let UserInfo = require('../models/UserInfo');


let projectController = {

    getProfilePage:function(req, res){
      if(req.session.passport !== undefined && req.session.passport.user !== undefined ){
          Project.find({username : req.session.passport.user.username},function(err, projects){
              if(err)
                  res.send(err.message);
              else{
                  res.render('index', {projects:projects,currentUserName:req.session.passport.user.username});
                }
          })
        }
        else{
          res.send("secure route")
        }
      },

    homePage:function(req, res){
            Project.find(function(err, project){

                if(err)
                    res.send(err.message);
                else
                    //res.render('registration', {MSG:""});
                    res.render('firstview');
            })
        },

    saveUser:function(req, res){ // if username is unique and email
      let userInfo = new UserInfo(req.body);
           userInfo.save(function(err, userInfo){
               if(err){
                   res.send(err.message)
                   console.log(err);
               }
               else{
                   console.log(userInfo);
                   res.render('registration', {MSG:"Registeration is Done,Please Login"});
               }
           })
        },

        saveClient:function(req, res){ // if username is unique and email
          let userInfo = new UserInfo(req.body);
               userInfo.save(function(err, userInfo){
                   if(err){
                       res.send(err.message)
                       console.log(err);
                   }
                   else{
                       console.log(userInfo);
                       res.render('clientView', {MSG:"Registeration is Done,Please Login"});
                   }
               })
            },

    createProject:function(req, res){
      if(req.session.passport !== undefined && req.session.passport.user !== undefined ){

            let project = new Project(req.body);
            console.log(req.body);
            project.username = req.session.passport.user.username;
              //req.body.email= elly hyrg3 mn el session
            project.save(function(err, project){
                if(err){
                    res.send(err.message)
                    console.log(err);
                }
                else{
                    console.log(project);
                    res.redirect('/profile');
                }
            })
          }
          else{
            res.send("secure route")
          }

        },

        loggingUser:function(req, res){
            res.render('registration',{MSG:""});
        },
        // clientloggingUser:function(req, res){
        //     res.render('registration',{MSG:""});
        // },
        clientUser:function(req, res){
            res.render('clientView',{MSG:""});
         },

        visitorPage:function(req, res){
              res.redirect('/showAllProjects');
          },

        showAllProjects:function(req, res){

          Project.find(function(err, projects){
              if(err)
                  res.send(err.message);
              else{
                if(req.session.passport !== undefined && req.session.passport.user !== undefined ){
                  res.render('viewAll', {projects:projects,currentUserName:req.session.passport.user.username});
                }
                else{
                  res.render('viewAll', {projects:projects,currentUserName:"PORTFOLIO"});
                }
              }

          })

      },
    searchInAll:function(req, res){
        Project.find(function(err, projects){
            if(err){
                res.send(err.message)
                console.log(err);
            }
            else{
              filtered_projects = [];
              console.log(req.body.searchID);
              for(var i=0; i<projects.length;i++){
                if(projects[i].title.indexOf(req.body.searchID)>-1){
                  filtered_projects.push(projects[i])
                }

              }
              if(req.session.passport !== undefined && req.session.passport.user !== undefined ){
                res.render('viewAll', {projects:   filtered_projects,currentUserName:req.session.passport.user.username});
              }
                else{res.render('viewAll',{projects:filtered_projects,currentUserName:"PORTFOLIO"}); }
            }
        })
    }
}

module.exports = projectController;
