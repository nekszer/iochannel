FROM node:latest
 
# Alright now the next instruction we will be adding will create a directory for our project. 
RUN mkdir -p /app/src
 
# Now we have to set this directory as our working directory: 
WORKDIR /app/src
 
# Copy the file package.json to the working directory with the following command:
COPY package.json .
 
# After this we have to run npm install so that we can set up our node environment:
RUN npm install
 
# Copy the source code inside your working directory to the docker image by running:
COPY . .
 
# The app that I am running uses the port 3000, we will be using EXPOSE instruction so that it can be mapped by the docker daemon: 
EXPOSE 4321
 
# And then the final command to start our project with npm start:
CMD ["npm","start"]