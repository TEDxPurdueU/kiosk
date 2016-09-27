# Kiosk
Kiosk is a simple node app for asking questions at event entrances for TEDxPurdueU events.

## Setup and Installation
1. `git clone` the repository to the server
2. Install the required packages with `npm install`
3. Compile our SCSS with `sass --update css/` from the root directory (you'll need to have Sass installed)
4. We use `pm2` for deployment at the moment. Use `npm install -g pm2` to get PM2 and `pm2 start main.js --name "kiosk"` to start the app as a daemon.

## Build
Kiosk uses `Gulp` as our build tool. Run `gulp` (the default task) to compile all the necessary assets for production.
