<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# School-Tips

This repository contains an API developed with NestJS and TypeORM for managing school tips. The API allows creating, updating, deleting (soft delete), and querying school tips. Additionally, it supports paginated queries and filtering by subject and level. PostgreSQL is the database used, and the API is deployed in a public cloud.

## Content Table

- [Description](#description) o
- [Characteristics](#characteristics) o
- [Functionalities](#functionalities) o
- [Requirements](#requirements) x
- [Project Configuration](#project-configuration) o
- [Running the App](#running-the-app) o
- [Docker Commands](#docker-commands) o
- [Queries in Postman and Swagger](#queries-in-postman-and-swagger) x
- [Gitflow Branching Strategy](#gitflow-branching-strategy) o
- [Documentation in Confluence](#documentation-in-confluence) x
- [Participant](#participant) o
- [License](#license) o

## Characteristics

* Microservice Management.
* Category Integration.
* Search Filtering.
* Robust Development Practices.

## Functionalities

**Tip Management**
* Registration and management of school tips.
* Organization of tips by levels, grades, and subjects.
* Efficient search and filtering of tips.

**Technologies Used**
* **NestJS:** Framework for building scalable and maintainable microservices.
* **TypeScript:** Programming language that provides static typing and advanced development features.
* **Docker:** A platform used to automate the deployment of applications in lightweight, portable containers, ensuring consistency across different environments.
* **TypeORM:** An ORM for TypeScript and JavaScript that simplifies interaction with SQL databases such as PostgreSQL, MySQL, and SQLite, making it easier to manage data models and schema migrations.
* **Swagger:** Tool for API documentation that facilitates the creation of interactive documentation.
* **Confluence:** Platform for team documentation and collaboration.

**Development Practices**
* **Traceability:** Logging all user requests for monitoring and auditing purposes.
* **Code Best Practices:** Use of design patterns, SOLID principles, and code reviews.
* **Testing:** Implementation of unit, integration, and end-to-end tests to ensure software quality.
* **Extensive Documentation:** Creation of documentation in Swagger and Confluence to facilitate the use and maintenance of the microservices.

## Project Configuration

To run the project locally, clone the repository and set up the necessary environment variables for the database.

1. Clone the repository:

    ``` bash
    git clone https://github.com/cxmi02/School-Tips.git
    cd School-Tips
    ```

2. Install the necessary dependencies:

    ``` bash
    npm install
    ```

3. Copy the .env.example file to a new .env file and configure the necessary environment variables:

    ``` bash
    cp .env.example .env    
    ```

Edit the .env file and configure the following values:

    DATABASE_TYPE= Database type (e.g., postgres, mysql)
    DATABASE_HOST= Database server address
    DATABASE_PORT= Database connection port
    DATABASE_USERNAME= Database username
    DATABASE_PASSWORD= Database password
    DATABASE_DB= Database name
    PORT= Application port

These steps will allow you to execute the project. Additionally, you must develop the environment variables according to your needs.

## Running the App

```bash
# development
$ npm run start

# watch mode and Run Docker
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Docker Commands

```bash
# Make sure the database is running.
$ docker ps

# Stop.
$ Ctrl + C

# Delete
$ docker-compose down
```


## Queries in Postman

...


## Gitflow Branching Strategy

This project follows the Gitflow strategy, a robust model for software development. Here is how the branches are organized and their purpose:

* `main:` Main branch with stable code for production. 
* `dev:` Development branch with the latest features before production. 
* `feat/AT-20-NameTask:` Branch of tasks with functionalities, identified by a Jira ID in addition to the task name.

The work is integrated into the 'dev' branch for integration testing. Once 'dev' is stable and ready to be released, it is merged into 'main'.

If you want to contribute to the project, create a new branch from 'dev' using the appropriate prefix (feat/AT-20-NameTask). After finishing your work and testing, open a Pull Request towards 'dev'.

## Participant

María Camila Sepúlveda Giraldo - Software Developer and 3D Animator

* **GitHub:** [cxmi02](https://github.com/cxmi02)
* **Instagram:** [@k_amila2002](https://www.instagram.com/k_amila2002/)
* **Email:** sepulveda.giraldo.camila@gmail.com

## License

Nest is [MIT licensed](LICENSE).
