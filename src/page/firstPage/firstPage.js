import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { View, Text, StyleSheet, Image } from 'react-native'


export default class FirstPage extends Component {
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        return(
            <View style={style.main}>
                <Image source={require("../../assets/logo_oneline_wr.png")} style={{width:350, height:350, marginHorizontal:15}}/>
                <TouchableOpacity style={style.startedButton} onPress={()=>this.props.navigation.navigate('Login')}>
                    <Text style={style.startedBtnText}>Get Started!</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const style = StyleSheet.create({
    main: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center'
    },
    startedButton: {
        width: '80%',
        height: 60,
        backgroundColor: '#C70707',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 35
    },
    startedBtnText: {
        color: 'white',
        fontSize: 25,
        fontWeight: '900'
    }
})