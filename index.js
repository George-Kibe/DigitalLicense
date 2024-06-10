/**
 * @format
 */
import 'react-native-gesture-handler';
import {Amplify} from 'aws-amplify';
import outputs from './amplify_outputs.json';
Amplify.configure(outputs);

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
