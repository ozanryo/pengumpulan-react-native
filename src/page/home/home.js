import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native"
import {ListItem, Image, Button} from "react-native-elements"

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    // componentDidMount(){
    //     this.autoLogout
    // }

    // async autoLogout(){
    //     try{
    //         await AsyncStorage.removeItem('token');
    //     } catch(e){
    //         console.log(e)
    //     }
    // }

    render(){
        return(
            <View style={layouting.main}>
                <Text>Ini Page Home</Text>
            </View>
        )
    }
}

const layouting = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white"
    },
    
})

export default Home;