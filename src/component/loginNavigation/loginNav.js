import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { View, Text } from 'react-native';
import {FirstPage, Login, Signup} from "../../page"
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default class LoginNav extends Component {
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        return(
            <Stack.Navigator>
                <Stack.Screen name='Opening' component={FirstPage} options={{
                    headerShown:false
                }} />
                <Stack.Screen name="Login" component={Login} options={{
                    headerShown:false
                }}/>
                <Stack.Screen name="Signup" component={Signup} />
            </Stack.Navigator>
        )
    }
}