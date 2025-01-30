npx create-next-app@latest
npm i react-icons
npm i classnames

docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=masterkey -p 3306:3306 -d mysql:latest
docker start mysql-container

mysql -h 127.0.0.1 -P 3306 -uroot -p

my sql workbench working with monterey : https://downloads.mysql.com/archives/get/p/8/file/mysql-workbench-community-8.0.31-macos-x86_64.dmg

npm i prisma
npx prisma init
npx prisma format
npx prisma migrate dev

To apply all migrations:
npx prisma migrate reset

npm i zod
npm install @radix-ui/themes
npm install --save react-simplemde-editor easymde
npm install react-hook-form
npm i axios
npm i @radix-ui/react-icons

TESTS
npm install jest @types/jest ts-jest --save-dev

npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom vite-tsconfig-paths

npm i @hookform/resolvers

npm i swr  
npm i ms
npm i react-markdown
npm install -D @tailwindcss/typography
npm install react-loading-skeleton
