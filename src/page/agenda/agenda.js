import React, { Component } from 'react'
import { ToastAndroid } from 'react-native';
import {View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Modal, ActivityIndicator} from 'react-native'
import { Image } from 'react-native-elements';
import Icon from "react-native-vector-icons/Ionicons"
import {connect} from "react-redux"

class Agenda extends Component {
    render(){
        return(
            <View style={styles.main}>
                {/* <Icon name='chatbubble-ellipses' size={300} color='#DF5F5F'/> */}
                <Image source={require("../../assets/agenda_2.png")} style={{width: 250, height:350}}/>
                <Text style={{fontSize: 35, textAlign: 'center', width: '80%', color:'#D37878', fontWeight:'bold'}}>Relax, You Don't Have Any Agenda </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    }
})

export default Agenda;