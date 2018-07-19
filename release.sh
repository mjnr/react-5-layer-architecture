git remote update origin --prune
git checkout master
git pull origin master
git tag -a $1
git push origin $1
if [[ $2 == *"hotfix/"* || $2 == *"feature/"* ]]; then
  git branch -d $2
  git push origin --delete $2
fi
git checkout development
git pull origin development
git merge origin/master
git push origin development
git checkout master
