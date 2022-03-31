# TrackU (Overland)

Tracku (Overland) is a monorepo that includes both a backend API server (Node.js) and a frontend SPA (Create React App).

The project started as two separate repos that are now archived. Both were merged into this monorepo. I created this project so I could learn more about [Typescript](https://www.typescriptlang.org) and [Turborepo](https://turborepo.org).

The Node.js API server collects GPS data from the [Overland](https://overland.p3k.app) iOS app and stores it in MongoDB. The iOS app is available in the [App Store](https://apps.apple.com/us/app/overland-gps-tracker/id1292426766) and is also [ope-source](https://github.com/aaronpk/Overland-iOS).

The frontend React app is a simple tracker that uses Socket.IO to communicate with the API server. The app receives periodic updates provided by the iOS device and displays the location on a map as well as other information such as date, time, timezone and battery level.

Also included is a Docker project to create a MongoDB container for ease of development.

## Project Status

The backend has been migrated to Typescript and works well. All tests are broken though. The frontend is sill Javascript. The iOS app hasn't been updated in several years but still works on iOS 15. Although I do plan to work on this more as time permits I'm not sure how much more that will be. My goal was to learn how to migrate to a monorepo and learn some Typesript, which I have done.
