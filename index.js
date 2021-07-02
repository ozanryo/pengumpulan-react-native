/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Login, Home, Layouting, Signup, Profile, Lifecycle, Networking, Networking2} from "./src/page/index"
import AddUser from "./src/page/home/addUser"

AppRegistry.registerComponent(appName, () => Networking2);
