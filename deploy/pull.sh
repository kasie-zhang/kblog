#! /bin/bash
cd /home/zhangke/workspace/nginx/webapps/blog
echo "===== Start Excute Webooks ====="
echo "1. Start pull repo"
git pull
echo "2. Finish pull repo"
echo "3. Start pull static file"
cd /home/zhangke/workspace/nginx/files
git pull origin master
echo "4. Finish pull static file"
echo "===== Finish Excute Webhooks ====="