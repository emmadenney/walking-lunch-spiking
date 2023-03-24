# walking-lunch-spiking

google only maps and map styling options -https://mapstyle.withgoogle.com/

## Setup expo evnviroment

Offical:
https://reactnative.dev/docs/environment-setup?guide=quickstart

Unofficaial:
https://aboutreact.com/getting-started-with-react-native/https://reactnative.dev/docs/environment-setup?guide=quickstart

### Overview of commands

1. npx create-expo-app `name of app`
2. cd into app dir
3. npm start # - this will show QR code
4. press a to run in simulator

## react-native-maps - setup

### Docs

Unoffical: https://medium.com/featurepreneur/integrating-google-maps-with-react-native-62fc8b7ecded

- See Installation of Dependency, (omit --save)

Offical : https://github.com/react-native-maps/react-native-maps/blob/HEAD/docs/installation.md

in the app dir run

1. npm install 2.`npx expo install react-native-maps@1.3.2`

## Working with mapview

offical : https://docs.expo.dev/versions/latest/sdk/map-view/

see branch main app.js

## geo-location branch

## doc

offical: https://docs.expo.dev/versions/latest/sdk/location/

cmd
`npx expo install expo-location`

see branch main

## marker

add Marker from react-native maps- Destructure!

need key and coordinate attribute

or use array and map over

## Driections

NC
"latitude": 53.4721341, "longitude": -2.2377251,

Home
latitude": 53.636325899999996, "longitude": -2.3278136

https://github.com/methodbox/rn-maps-directions-expo

## Ollie M Notes (Callouts)

- Looks like the Callout component within `react-native-maps` is custom only, so Google Maps [Place Search](https://developers.google.com/maps/documentation/places/web-service/search) may be the way to go instead

- In order to share files (e.g. reviews/photos etc.), need to install `expo-file-system`

```
npx expo install expo-file-system
```

- [Useful Video](https://www.youtube.com/watch?v=xcn-0LyX6JY&ab_channel=MissCoding)
