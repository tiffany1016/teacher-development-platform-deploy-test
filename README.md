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
```bash
# add branch
git checkout -b <new branch name> <existing branch>

# switch branch
git checkout <your branch>
# fetch from github
git fetch origin
# update (auto merge)
git rebase origin/main

# merge branch A to B
git checkout B
git merge A

# pull all branches on github
git pull --all

git add .
git commit -m "commit message"
git push origin <to be pushed branch>
# 如果他叫你 pull 的話(你有rebase到東西) 就可能要 push -f
```