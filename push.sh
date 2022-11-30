#Add commit message
echo "==============================="
echo "==== Enter commit message ====="
echo "==============================="

read commitMessage
git add .
git commit -m "${commitMessage}"
if [ -n "$(git status --porcelain)" ];
then
 echo "==============================="
 echo "======== IT IS CLEAN =========="
 echo "==============================="
else
 git status
 echo "==============================="
 echo "Pushing data to remote server!!"
 echo "==============================="
 git push 
fi

