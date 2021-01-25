# Looker Data References

## Introduction
This reference implmenetation is intended to be a library of clarifying examples for building an application with Looker's Developer tools. It covers a range of simple to complex use cases and includes complete examples with front and back end code.

## Examples
For beginners please start by visiting the [Basics](https://llooker.github.io/data_application_reference_implementation/basic)

## Installation
To begin:\
ensure you have yarn installed\
`yarn --version`\
If you dont have yarn installed, you can install it via npm\
`npm install --global yarn`\
Clone the repo\
`git clone git@github.com:llooker/data_application_reference_implementation.git`\
Move inside the repo folder\
`cd data_application_reference_implementation`\
Enter the front end codebase\
`cd frontend`\
Install the front end dependencies\
`yarn install`\
Enter the backend codebase\
`cd ../backend/`\
Install the 
`yarn install`

Then add your two env files with your information:
### frontend/.env
```
### Env variables required by frontend

PBL_DEV_PORT=3001
API_HOST=http://localhost:3000
LOOKER_HOST=https://example.looker.com
LOOKER_API_HOST=https://example.looker.com:19999
LOOKERSDK_EMBED_HOST=https://example.looker.com
```

### backend/.env
```
### Env variables required by backend

PBL_PORT=3000

LOOKERSDK_API_VERSION=4.0
LOOKERSDK_BASE_URL=https://your-instance.looker.com
LOOKERSDK_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxx
LOOKERSDK_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxx
# no protocol for this host
LOOKERSDK_EMBED_HOST=your-instance.looker.com
LOOKERSDK_EMBED_SECRET=xxxxxxxxxxxxxxxxxxxxxx
```

Then to boot up the application run:\
`yarn dev`


## Making developer contributions to the docs
The documentation system uses a ruby docs generator called jekyll
`cd docs`\
`brew install ruby`\
`brew install ruby-build`\
`gem install jekyll`\
`gem install jekyll-remote-theme`\
`gem install jekyll-rtd-theme`\
`bundle exec jekyll serve`\
The documentation will now be served on port 4000 and recompile as you change the underlying markdown files


