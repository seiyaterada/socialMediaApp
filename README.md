## Scalable High-Performance Social Media Application

### Description
<p>
    This application is a scalable high-performance social media application that allows users to post messages, follow other users, and view their timeline. The application is built using the distributed architecture using docker. The application is built using the following technologies:
    <li>NodeJS</li>
    <li>MongoDB</li>
    <li>Redis</li>
    <li>NGINX</li>
    <li>RabbitMQ</li>
    <li>Docker</li>
</p>

### Getting Started
<p>
    To get started, you need to have docker installed on your machine. You can download docker from <a href="https://www.docker.com/">here</a>. Once you have docker installed, you can run the following command to seed the MongoDB database with some sample data:
    <pre>
        npm run seed
    </pre>
    In order to start the application using Docker, you can run the following command:
    <pre>
        docker-compose up --build
    </pre>
    This will start the application and you can access the application using the following URL:
    <pre>
        http://localhost:80
    </pre>
    If you want to scale the number of servers, you can run the following command:
    <pre>
        docker-compose up --build --scale server=n
    </pre>

    where n is the number of servers you want to scale to.
</p>
