FROM openjdk:19
ENV ENVIRONMENT=prod
LABEL maintainer="name"
# /app entspricht pom.xml Tag <finalName> und jar <packaging>
EXPOSE 8080
ADD backend/target/app.jar app.jar
CMD [ "sh", "-c", "java -jar /app.jar" ]