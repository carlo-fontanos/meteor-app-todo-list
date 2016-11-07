# Todo List with Meteor.JS
Sample meteor app with MongoDB as database and a simple implementation of built-in user authentication.

## Deploying to Heroku
Required softwares:
**Meteor** - Download it from here: https://www.meteor.com/install
**Heroku** - Download it from here: https://toolbelt.heroku.com/
**Git** - Download it from here: https://git-scm.com/downloads
	
1. Clone github project.
2. `$ heroko login`
	- Fill up credentials
	- If you do not have an account yet, you can register for one at http:/heroku.com
3. `$ heroku apps:create NAME_OF_PROJECT`
	- Creates the project depending on the name provided.
4. Set Buildpack for Heroku Instance
	`$ heroku buildpacks:set https://github.com/AdmitHub/meteor-buildpack-horse.git`
		- Meteor needs a buildpack in order to be executed by the Heroku dyno manager. As Heroku’s cedar stack has no default language/framework support, the buildpack determines the framework for us. Unfortunately, Heroku does not have official Meteor support. To get around this, we will use a third-party custom buildpack.
5. Create new mongodb instance
	`$ heroku addons:create mongolab:sandbox`
6. Add Environment Variables in heroku:
	`$ heroku config:add MONGO_URL=<MONGODB_URI value>`
		- You can get MONGO_URL by running: 
			`$ heroku config`
	$ heroku config:add ROOT_URL=https://NAME_OF_PROJECT.herokuapp.com
7. Check if we can push to heroku:
	`$ git remote -v`
		- Should give you a list of gits from github and heroku github.
		- if heroku link is not in the list, you can manually add it like this:
			`$ git remote add heroku https://git.heroku.com/NAME_OF_PROJECT.git`
8. Deploy our code:
	`$ git push heroku master`