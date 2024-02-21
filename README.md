## Getting Started
```bash
# install dependencies
yarn 

# run the website
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## You might need to know
0. test users
  |帳號|密碼|
  |--|--|
  |one@gmail.com|1234|
  |three@gmail.com|3333|
1. standard colors
    - usage:
```import { INDIGO, ORANGE } from "@/lib/constants";```
add `style={{backgroundColor: INDIGO}}` in component to change background color to INDIGO
1. session
    - usage:
```
import { auth } from "@/lib/auth";
const session = await auth();
const notAuth = (!session || !session?.user?.email);  # whether signed in
```
`session.user.email, session.user.username, session.user.mobile` to get signed-in-user's info
1. fake const data in `@/lib/constants`
    - usage (e.g. get user info from mobile):
```
import { USERS } from "@/lib/constants";
const userIndex = USERS.findIndex(({ mobile }) => mobile === userMobile);
const email = USERS[userIndex].email;
```

## Git Commands
1. clone the project
   ```bash
   git clone git@github.com:ining310/teacher-development-platform.git
   ```
2. add a new branch
   ```bash
   git checkout -b <new branch name> <existing branch>
   # or just
   git checkout -b <new branch name>
   ```
3. update code to github
    1. make your branch up to date
        ```bash
          git checkout <your branch>  # switch to your branch
          git fetch origin  # fetch code from github
          git rebase origin/main  # update main to your branch (auto merge, sometimes you'll need to fix conflicts manually)
        ```
    2. add(stage), commit, push
        ```bash
          git add .
          git commit -m "commit message"
          git push origin <to be pushed branch>
          # 如果他叫你 pull 的話(你有rebase到東西) 就可能要 push -f
        ```
4. run other branch (e.g. branch A)
   ```bash
    git checkout A

    # remember to install the dependencies
    yarn
    yarn dev
   ```
   
5. other useful commands
   ```bash
    # pull all branches on github
    git pull --all

    # merge branch A to B
    git checkout B
    git merge A
   ```
