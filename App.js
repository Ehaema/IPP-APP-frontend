/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import {SafeAreaView, StyleSheet, ScrollView, StatusBar, Text} from "react-native";

import Main from "./components/Main";


const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Main/>
    </>
  );
};

const styles = StyleSheet.create({
});

export default App;
