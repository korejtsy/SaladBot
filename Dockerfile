FROM node:9                                                                                                                                                                                                        
                                                                                                                                                                                                                   
WORKDIR /usr/src/app

RUN apt-get update; \                                                                                                                                                                                              
    apt-get clean; \
    npm i                                                                                                                                                                                                               
                                                                                                                                                                                                                   
