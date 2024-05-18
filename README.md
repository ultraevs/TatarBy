# TatarBy
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)![Golang](https://img.shields.io/badge/go-%23007ACC.svg?style=for-the-badge&logo=go&logoColor=white)![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![Python](https://img.shields.io/badge/python-%23316192.svg?style=for-the-badge&logo=python&logoColor=yellow)![Figma](https://img.shields.io/badge/figma-%2320232a.svg?style=for-the-badge&logo=figma)



# [Ссылка на готовое решение](https://tatarby.shmyaks.ru/)

### Трек: Платформа для изучения татарского языка

## Используемый стек технологий:
- [GO-Backend](https://github.com/ultraevs/GagarinHack/tree/main/go-backend) - Реализован с использванием [GO](https://go.dev/) и фреймворка [Gin](https://github.com/gin-gonic/gin). Задачей модуля является реализация API для взаимодействия с frontend модулем.
- [Frontend](https://github.com/ultraevs/GagarinHack/tree/main/front) - Реализован с использованием [React](https://ru.legacy.reactjs.org/). Задачай является предоставление красивого и функционалоного интерфейса для пользователя.
- [Deployment](https://github.com/ultraevs/GagarinHack/tree/main/deployment) - Реализован с использованием [Docker-Compose](https://www.docker.com/). Задачей модуля является возможность быстрого и безошибочного развертывания приложения на любом сервере.
- [Python-Backend](https://github.com/ultraevs/GagarinHack/tree/main/python-backend) - Реализован с использованием [Python](https://www.python.org/) и фреймворка [FastAPI](https://fastapi.tiangolo.com/). Задачей модуля является возможность распознавания голоса юзера.

## Функционал решения

- Уроки татарского языка, поделенные на курсы, включающие в себя упражнения на аудирование, текст, произношение.
- Рейтинг пользователей.
- Авторизация, Личный кабиент.

## Запуск решения
```sh
    cd TatarBy/deployment
    docker-compose build
    docker-compose up -d
```
#### Необходимо создать .env файл в папке go-backend, в котором должны содержаться ваши данные о сервере,базе данных и почтовом аккаунте. Также в вашем nginx и postgresql на сервере нужно указать те же порты что и в коде(местами из .env)
