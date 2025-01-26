npx create-next-app@latest
npm i react-icons
npm i classnames

docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=masterkey -p 3306:3306 -d mysql:latest
docker start mysql-container

mysql -h 127.0.0.1 -P 3306 -uroot -p

my sql workbench working with monterey : https://downloads.mysql.com/archives/get/p/8/file/mysql-workbench-community-8.0.31-macos-x86_64.dmg

npm i prisma prisa
npx prisma init
npx prisma format
npx prisma migrate dev

To apply your initial migration(s):
npx prisma migrate resolve --applied 0_init

npm i zod
npm install @radix-ui/themes
