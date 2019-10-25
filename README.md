In this project we're using our custom [Redvike Git Flow](https://github.com/Redvike/redvike-git-flow).

To run the project in the `development` environment you should:
1. Go to the project's `./` folder and copy the environment variables. - `cp env.development.example .env`  
2. Fill the `.env` file. For example, I have:

```
# The application's environment and port.
APP_ENV=development
APP_PORT=1337

# The API documentation's port.
API_DOCUMENTATION_PORT=1338

# The Maildev's port.
MAILDEV_PORT=1339

# The NoSQLClient's port.
NOSQLCLIENT_PORT=1340

# The MongoDB's credentials.
MONGO_INITDB_ROOT_USERNAME=username
MONGO_INITDB_ROOT_PASSWORD=password
```

3. Go to the project's `./app/backend/` folder and copy the environment variables. - `cp env.development.example .env.development` 
4. Fill the `.env.development` file. For example, I have:
```

# JWT secret
JWT_SECRET=test

# Mail
MAIL_FROM="viDent <dev@redvike.com>"
MAIL_SMTP_HOST=maildev
MAIL_SMTP_PORT=3002
MAIL_ROOT_URL=http://localhost:1337/#/

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# DB
DB_USER=username
DB_PASSWORD=password
DB_HOST=mongo
DB_PORT=27017
DB_NAME=admin
```

Take into attention that `DB_NAME` must be set to `admin`.

5. Go to the project's `./app/frontend/` folder and copy the environment variables- `cp env.development.example .env.development` .
6. Fill the `.env.development` file. For example, I have:

```
REACT_APP_API_URL=http://localhost:1337/api
```

Take into attention that `REACT_APP_API_URL` must be set without trailing slash at the end.

7. To serve the project you should go to the project's `./` folder and run:

```
docker-compose -f docker-compose.yml -f docker-compose.development.yml up --build
```

The Docker will serve the application and all the services on:
- http://localhost:${APP_PORT}/ - frontend application
- http://localhost:{APP_PORT}/api/ - backend application
- http://localhost:{API_DOCUMENTATION_PORT}/ - API documentation
- http://localhost:{MAILDEV_PORT}/ - MailDev client
- http://localhost:{NOSQLCLIENT_PORT}/ - NoSQL client

For example, if you copied & pasted my environment variables, you would have:
- http://localhost:1337/ - frontend application
- http://localhost:1337/api/ - backend application
- http://localhost:1338/ - API documenation
- http://localhost:1339/ - MailDev client
- http://localhost:1340/ - NoSQL client

You must install any packages inside the Docker container. Do not install any packages on your host machine. Also, you must run your tests inside the Docker container too. To enter the container you should go to the project's `./` folder and run:

`docker-compose exec backend bash` - to enter the `backend` container
`docker-compose exec frontend bash` - to enter the `frontend` container

To stop the Docker Compose, you should just press `CTRL + C` inside the terminal where the Docker Compose is running. Wait for all the containers to be stopped (it takes about 15 seconds). Do not close the terminal when Docker Compose is running. Do not press `CTRL + C` twice because it stops the containers forcefully (it can cause unexpected issues in the future). If something went wrong, and you are not able to `up` Docker Compose you should `down` all the container and volumes. Go to the project's `./` folder and run:

```
docker-compose -f docker-compose.yml -f docker-compose.development.yml down -v
```

If you are feeling comfortable with the Docker, you can extend or override our stack with `docker-compose.override.yml` file. Let's assume that you want to disable logs for MailDev and NoSQL client. To do that you should create `docker-compose.override.yml` file in the project's `./` folder and fill it with:

```
---
# Define Docker Compose version.
version: "3"

# Define all the containers.
services:
  # Maildev container.
  maildev:
    logging:
      driver: none
  # Nosqlclient client container.
  nosqlclient-client:
    logging:
      driver: none
```

To run the Docker Compose with the `docker-compose.override.yml` file you should go to the project's `./` folder and run:

```
docker-compose -f docker-compose.yml -f docker-compose.development.yml -f docker-compose.override.yml up --build
```

In this case, you will extend the MailDev and NoSQL client services with the new `logging` directive.
