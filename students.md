# Github Scavenger Hunt Actions

## Prerequisites
1. Make an account at [github.com](https://github.com)
2. Fork the main repo: [https://github.com/raghunat/scavenger-hunt](https://github.com/raghunat/scavenger-hunt) (Button is in the top right, says "Fork" with some number next to it)
3. Clone your repo
	1. go to **your repo** on **your github** account
	2. Click the clone button
	3. Turn on "Use HTTPS"
	4. Copy the URL
	5. Open a terminal
	6. `cd` into a directory where you want this repo to live
	7. then run `git clone <your repo https url>` (without the < and > signs)
4. Create a branch
	1. With a terminal open in your repo's folder, run `git checkout -b <last-name>-bootstrap` (replace the <, >, and everything in between with your last name) 
5. Make `<last-name>.md` file in a developers/ folder
	1. In your repo, on your new branch, create a `developers folder`
	2. Inside the `developers` folder, create a < Last-Name >.md file with the following content: `# Hello From <last-name> <email>`
6. Add that file to your repo/branch
	1. run `git add developers/<last-name>.md` and press enter	
7. Commit that file
	1. run `git commit -m "Added my developer file"` and press enter 
8. Push to remote
	1. Run `git push`
	2. If `git push` fails, and says you need to run an upstream push, run the command they provide. This is only required once per computer
9. Create PR
	1. Go to your repo on github
	2. Click the `New Pull Request` button
	3. Choose `base fork: raghunat/hostpot base: master`
	4. Choose `head fork: <last-name> compare: <last-name>-bootstrap`
	5. Click `Create Pull Request` Green Button
	6. Enter in a PR Title, and Description
	7. Click `Create Pull Request` Green Button
10. (PR is merged by Professor Raghunath)

## Getting Updates from raghunat/master
1. Open a terminal and `cd` into your forks local folder
2. Run `git remote add upstream https://github.com/raghunat/scavenger-hunt.git` (only needed once per computer)
3. Run `git fetch upstream`
4. Run `git pull upstream master`


