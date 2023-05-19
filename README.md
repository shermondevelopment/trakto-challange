# <p align = "center"> Trakto challange </p>

<p align="center">
  <img src="https://www.trakto.io/wp-content/uploads/2022/07/Trakto-logo-dark-2022.svg" width="150"/>
</p>

## :computer: Technologies

- TypeScript
- Eslint, Prettier
- CommitLint
- Husky
- ClassValidator
- NestJS
- Docker

---
<br> 
<b style="color:#FF6347">NOTICE</b>
<p>
  To run the step below to run the application you must have docker and docker-compose installed on your machine you can get more information here <a href="https://docs.docker.com/engine/install/">install docker.</a>
</p>

<br />

<h3>
  1. Clone the repository
</h3>

```
 https://github.com/shermondevelopment/trakto-challange.git
```

<h3>
  1. upload a mongodb database with docker-compose
</h3>

```
docker-compose up -d
```

<h3>
  2. install all dependencies
</h3>

```
yarn install or npm install
```

<h3></h3>

```
app running by default on port 3000 🚀🚀🚀🚀🚀
```

## :rocket: Routers

```yml
POST /
    - route to generate new version of image
    - headers: {},
    - body: {
      image: 'image url'   --- required --
      compress: 'number' --- required --
    }
```

## 🧪🧪 Running tests e2e with jest
```
  npm run test:e2e or yarn test:e2e
````
