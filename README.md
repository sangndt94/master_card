# cust-mastercard-fi

MasterCard Fraud Insights applications

## How to run testcafe tests locally

In one terminal window run

```
yarn start
```

and in another (`username` and `password` are your test user's credentials). For Linux/macOS:

```
export TEST_PASSWORD=password && export TEST_USERNAME=username && export TEST_BACKEND=https://localhost:8999/ && yarn testcafe
```

or for Windows:

```
set TEST_PASSWORD=password && set TEST_USERNAME=username && set TEST_BACKEND=https://localhost:8999/ && yarn testcafe
```

You can replace `yarn testcafe` by `yarn testcafe-visual` to actually see what the test does with the browser.

## Run Wiremock and record data mapping locally
Start Wiremock on port 6060 first, then run mastercard app with backend environment https://localhost:6060.
```
$ docker pull harbor.intgdc.com/3rdparty/rodolpheche/wiremock
$ docker run -it -p 6060:6060 -v ${pwd}/wiremock:/home/wiremock rodolpheche/wiremock --https-port=6060 --proxy-all="https://frauddashboard-dev.na.gooddata.com" --record-mappings --verbose
$ yarn start --env.backend=https://localhost:6060
```

#### Backend-mock service
- The service which mocks all backend requests needed for mastercard-fi
- We use [Wiremock](http://wiremock.org) docker image.
- To add more mocked requests, add requests mapping and __files from ${pwd}/wiremock folder and responses into **test-services/backend-mock**.

## Run isolated tests locally
Build the image first, then run isolated tests providing the IMAGE_ID env variable.
```
$ docker build -t mastercard-fi-ui-develop .
$ IMAGE_ID=mastercard-fi-ui-develop:latest docker-compose -f ./docker-compose-isolated.yaml -p mastercard-fi-ui-develop up --abort-on-container-exit --force-recreate --always-recreate-deps --renew-anon-volumes
```

## Deployment
There was a request to approve changes by Mastercard. GoodData II pipelines does not support promoting changes inside k8s deployment for example as A/B testing. It was possible to implement this with current features in following way.

There are three branches- develop, staging, master. All these branches contain charts for three different k8s applications- mastercard-fi-develop, mastercard-fi-staging, mastercard-fi.
 
Because of II pipelines implementation, there must be per branch specific `.gdc-ii-config.yaml` which contains deployment pipeline for the k8s app which corresponds to given git branch- eg. develop branch contains `.gdc-ii-config.yaml` only for mastercard-fi-develop app although there are charts also for other apps (this is for easier merging of changes between branches). Pipeline is triggered based on branch configuration defined in `ci-infra`.
 
Be careful when changing `.gdc-ii-config.yaml` and merging changes to other branch!

There are hostname mappings to these three apps:
- stg3: 
   - mastercard-fi-develop: staging3-lcm-dev.intgdc.com
   - mastercard-fi-staging: isolated1-staging3.intgdc.com
   - mastercard-fi: isolated2-staging3.intgdc.com
- stg2: 
   - mastercard-fi-develop: staging2-lcm-dev.intgdc.com
   - mastercard-fi-staging: isolated1-staging2.intgdc.com
   - mastercard-fi: isolated2-staging2.intgdc.com
- stg:
   - mastercard-fi-develop: staging-lcm-dev.intgdc.com
   - mastercard-fi-staging: isolated1-staging.intgdc.com
   - mastercard-fi: isolated2-staging.intgdc.com
- prod (NA2): 
   - mastercard-fi-develop: frauddashboard-dev.na.gooddata.com
   - mastercard-fi-staging: frauddashboard-test.na.gooddata.com
   - mastercard-fi: frauddashboard.mastercard.com

## Development process
Implement changes over develop branch. Merge changes into develop branch. Changes will be visibible in mastercard-fi-develop = mastercard-fi-develop hostnames. In production it means frauddashboard-test.na.gooddata.com in production.

Merge (through PR) develop branch or cherry-pick changes into staging branch to check, that changes are working properly before propagate into master (Mastercard production domain).

To propagate changes to Mastercard production domain, merge staging branch into master branch (through PR).
