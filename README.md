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

## Description

<p>
Challenge proposed by the company trakto, to create a new compressed image
</p>

## 🏁 running the application with docker

<h3 style="color:#ef4444; font-weight: bolder">Notice</h3>

<p>
  To run the step below to run the application you must have docker and docker-compose installed on your machine you can get more information here <a href="https://docs.docker.com/engine/install/">install docker.</a>
</p>
<br />

<h3>First step:<h3/>

```
docker-compose up -d
```
<p>
  Now that we have mongodb running on our machine let's go to the next step
</p>

<h3>Second step:<h3/>

```
yarn start or npm start
```

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
