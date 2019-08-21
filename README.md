## To install

Prerequisite packages:

`npm install -g react-native-cli watchman`


1) `yarn install`
2) `Link camera RN`
2.1) In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2.2) Go to `node_modules` ➜ `react-native-camera` and add `RNCamera.xcodeproj`
2.3) In XCode, in the project navigator, select your project. Add `libRNCamera.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
2.4) Click `RNCamera.xcodeproj` in the project navigator and go the `Build Settings` tab. Make sure 'All' is toggled on (instead of 'Basic'). In the `Search Paths` section, look for `Header Search Paths` and make sure it contains both `$(SRCROOT)/../../react-native/React` and `$(SRCROOT)/../../../React` - mark both as `recursive`
3) `react-native link react-native-video`
4) `react-native link react-native-vector-icons`

## To Run
`react-native run-ios`

## Possible errors
#config.h
#glog
Erase DerivedData and third-party from /Users/max/Library/Developer/Xcode and /Users/max/Desktop/ASAP/Proyectos/delAgro/node_modules/react-native/third-party-podspecs
Run this `cd ./node_modules/react-native/third-party/glog-0.3.4 && ../../scripts/ios-configure-glog.sh` on project's root
Added libfishhook.a to Link Binary With Libraries

#Unlink for Android to work, then link again to make videos work
`react-native unlink react-native-video`
`react-native link react-native-video`