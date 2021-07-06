import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { View, Text } from 'react-native';
import {Home, Profile, Product, Login, Signup, History} from "../../page"
import { StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from "react-native-vector-icons/Ionicons"

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// export default function Navigator(){
//     return(
//         <NavigationContainer>
//             <Stack.Navigator>
//                 <Stack.Screen name="Login" component={Login} />
//                 <Stack.Screen name="Signup" component={Signup} />
//                 <Stack.Screen name="Home" component={Home} />
//                 <Stack.Screen name="Profile" component={Profile} />
//                 <Stack.Screen name="Product" component={Product} />
//             </Stack.Navigator>
//         </NavigationContainer>
//     )
// }

export default function Navigator(){
    return(
        <NavigationContainer>
            <Tab.Navigator
                tabBarOptions={{
                    showLabel:false,
                    style:{
                        position: 'absolute',
                        bottom: 15,
                        right: 20,
                        left: 20,
                        elevation: 0,
                        backgroundColor: 'white',
                        borderRadius: 15,
                        height: 90,
                        ...styling.shadow
                    }
                }}
            >
                <Tab.Screen name="Home" component={Home} options={{
                    tabBarIcon: ({focused}) => (
                        <View style={styling.tabs} >
                            <Icon name='home' color={focused ? "#FF6F00" : "#363535"} size={30} />
                            <Text style={{color: focused ? "#FF6F00" : "#363535", fontSize: 12}} >HOME</Text>
                        </View>
                    )
                }}/>
                <Tab.Screen name="Product" component={Product} options={{
                    tabBarIcon: ({focused}) => (
                        <View style={styling.tabs}>
                            <Icon name='pricetags' color={focused ? "#FF6F00" : "#363535"} size={30} />
                            <Text style={{color: focused ? "#FF6F00" : "#363535", fontSize: 12}} >PRODUCT</Text>
                        </View>
                    )
                }} />
                <Tab.Screen name="History" component={History} options={{
                    tabBarIcon: ({focused}) => (
                        <View style={styling.tabs}>
                            <Icon name='receipt' color={focused ? "#FF6F00" : "#363535"} size={30} />
                            <Text style={{color: focused ? "#FF6F00" : "#363535", fontSize: 12}} >HISTORY</Text>
                        </View>
                    )
                }} />
                <Tab.Screen name="Profile" component={Profile} options={{
                    tabBarIcon: ({focused}) => (
                        <View style={styling.tabs}>
                            <Icon name='person' color={focused ? "#FF6F00" : "#363535"} size={30} />
                            <Text style={{color: focused ? "#FF6F00" : "#363535", fontSize: 12}} >PROFILE</Text>
                        </View>
                    )
                }} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const styling = StyleSheet.create({
    shadow: {
        shadowColor: "black",
        shadowOffset: {
            width: 0, 
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
    tabs: {
        alignItems: 'center'
    }
})

// export default function Navigator(){
//     return(
//         <NavigationContainer>
//             <Drawer.Navigator initialRouteName='Login'>
//                 <Drawer.Screen name="Login" component={Login} />
//                 <Drawer.Screen name="Signup" component={Signup} />
//                 <Drawer.Screen name="Home" component={Home} />
//                 <Drawer.Screen name="Profile" component={Profile} />
//                 <Drawer.Screen name="Product" component={Product} />
//             </Drawer.Navigator>
//         </NavigationContainer>
//     )
// }
