FROM node:12.14.0-slim

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 58712A2291FA4AD5
RUN echo "deb http://repo.mongodb.org/apt/debian stretch/mongodb-org/3.6 main" | tee /etc/apt/sources.list.d/mongodb-org-3.6.list
RUN apt-get update && apt-get install -y git g++ make python mongodb-org-tools bzip2 --no-install-recommends && rm -rf /var/lib/apt/lists/*

ENV SHELL bash
ENV CONTAINER docker
ENV PATH /usr/src/app/node_modules/.bin:$PATH
ENV PORT 80

WORKDIR /usr/src/app
CMD [ "/bin/bash" ]
