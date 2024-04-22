# Prerequisities

- [GitHub Desktop](https://desktop.github.com/) to manage sources - see the installation instructions on the site
- [Node.js](http://nodejs.org/) - install node version 20.11.1 (see the installation instructions on the site) or issue `nvm install` (if nvm is used) which will install the required node version
  NOTE: It is recommended to install and use nvm (see https://github.com/creationix/nvm) and install node 20.11.1 by issuing `nvm install v20.11.1` or `nvm install` (the latter command will also install 20.11.1 as listed in .nvmrc)
- (if using nvm) Switch to node 20.11.1 by issuing `nvm use 20.11.1` (you may want to make this default node version) or issuing `nvm use` (the latter command will use 20.11.1 as listed in .nvmrc)
- [npm](https://www.npmjs.com/) - install the latest npm version 10.x (for example, 10.5.0 by issuing commands `npm install -g npm@10.5.0`)
- [Ionic CLI](http://ionicframework.com/docs/cli/install.html) - install the latest stable ionic cli version 7.2.x (for example, 7.2.0 by issuing commands `npm install -g @ionic/cli@7.2.0`)
- Install Capacitor Required Dependencies for iOS and Android Development (see https://capacitor.ionicframework.com/docs/getting-started/dependencies/)

# Instructions

## Initial setup

1. clone the source code repository
2. change to project repository directory (the directory where you cloned the repo)
3. execute the command `npm install`
4. to build and run the app:
   - on the desktop:
     - execute the command `ionic serve` or `npm run serve` to build and run in the local browser
   - on a real device or a simulator:
     - execute the command `ionic build`, then `npx cap sync` to copy the build from www to the native projects and sync native plugins and then `npx cap open android` or `npx cap open ios` to open projects in Android Studio or XCode, then build from there, or
     - execute the command `ionic capacitor build android` or `npm run build:dev:android` (note that this will enable source maps support when deployed on Android) or `ionic capacitor build ios` to open projects in Android Studio or XCode, then build from there

## General development workflow

1. change to project repository directory (<Git>\src)
2. pull the latest changes from the repository
3. run `ionic capacitor build android` or `npm run build:dev:android` (note that this will enable source maps support when deployed on Android) or `ionic capacitor build ios` to open projects in Android Studio or XCode, then build from there
   **_NOTE_**: The option is to run separate commands to build, sync/copy and open IDE:
   - run `ionic build` command (to build and copy app files to www directory)
   - run `npx cap copy android` or `npx cap copy ios`
     This will copy all the app assets to the appropriate platform directory
     NOTE: If you wanted to update native dependencies as well as copying built/published web assets to the android/ios directory simply use the following command `npx cap sync <PLATFORM_NAME>` instead of `npx cap copy <PLATFORM_NAME>`
   - run `npx cap open android` or `npx cap open ios`
     This will open the appropriate IDE (Android Studio or XCode)
4. compile the app using the platform-specific tooling
   For more details please see [Building your App](https://capacitor.ionicframework.com/docs/basics/building-your-app)
