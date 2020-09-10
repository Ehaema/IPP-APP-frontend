/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import {SafeAreaView, StyleSheet, StatusBar} from "react-native"
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';

import Main from "./components/Main";


const App: () => React$Node = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <StatusBar barStyle="dark-content" />
      <Main/>
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({
});

export default App;
