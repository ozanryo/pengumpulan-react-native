import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native"
import {ListItem, Image, Button} from "react-native-elements"
import Icon from "react-native-vector-icons/Ionicons"
import { SwipeRow } from 'react-native-swipe-list-view';
import {PaymentComponent, NewsComponent} from "../../component/homePage"

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    render(){
        return(
            <ScrollView contentContainerStyle={layouting.main} >
                <PaymentComponent />
                <NewsComponent />
            </ScrollView>
        )
    }
}

const layouting = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white"
    },
    paymentLayout:{
        backgroundColor: '#5151CF',
        width: '90%',
        height: 120,
        alignItems:'flex-start',
        justifyContent: 'center',
        borderRadius: 15,
        marginVertical: 15
    },
    pointLayout:{
        backgroundColor: 'white',
        marginLeft: 20,
        marginRight: 10,
        width: '45%',
        height: 85,
        borderRadius: 15,
        alignItems:'flex-start',
        justifyContent: 'center',
    },
    pointCaption:{
        paddingLeft: 10
    },
    paymentMethodLayout:{
        marginLeft: 15,
        marginRight: 10,
        alignItems:'flex-start',
        justifyContent: 'center',
    },
    
})

export default Home;