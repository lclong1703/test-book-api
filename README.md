## Required

- node: v16.15.0
- yarn: v1.22.19
- elasticsearch: v8.8.1: [Download elastic 8.8.1](https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-8.8.1-windows-x86_64.zip)
- run `elasticsearch` locally `windows`:

* In a terminal window, cd to the %ES_HOME% directory, for instance:
  ![alt text](https://i.imgur.com/uG3H97y.png)
  run command `.\bin\elasticsearch -E xpack.security.enabled=false`

- `git clone https://github.com/lclong1703/test-book-api.git`

## Start project

- Create `.env` from the `.env.example` and fulfill all environment variables
- add node_modules: `yarn install`
- Start project with command `yarn start`

# Features

## use swagger check: http://localhost:3000/docs/
