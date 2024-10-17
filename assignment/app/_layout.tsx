import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./(tabs)/index";
import ExploreScreen from "./(tabs)/explore";
import AboutCourseScreen from "./about-course";

const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator initialRouteName="(tabs)/index">
      <Stack.Screen
        name="(tabs)/index"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="(tabs)/explore"
        component={ExploreScreen}
        options={{ title: "Explore" }}
      />
      <Stack.Screen
        name="about-course"
        component={AboutCourseScreen}
        options={{ title: "About This Course" }}
      />
    </Stack.Navigator>
  );
}
