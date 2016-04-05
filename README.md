# OASIS
A service that provides static file access and configures endpoints for serving JSON

# Getting started

You need to have node on your machine and checkout the service code
## Installing node
Check to see you have node:

* Open a terminal and type:
```sh
$ node
```

If you don't have node install it from the [repo](https://nodejs.org/download/release/latest/).

We use the express library for serving resources. Your dependencies should be prepackaged for you but you
can also install express by following instruction on the [express site](http://expressjs.com/en/starter/generator.html)

We use the handlebars template but you can also serve plain old HTML files from the public directory by placing them
in the appropriate location.

## Running Oasis in Docker
```sh
$ docker run -it -p 3000:3000 -v /home/docker/oasis/db:/usr/src/app/db --name oasis gcr.io/goodwatercap-1/oasis:latest
``

The app will be running on port 3000.`



