import React, { Component } from 'react'
import { ToastAndroid } from 'react-native';
import {View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Modal, ActivityIndicator} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import {connect} from "react-redux"

class Agenda extends Component {
    render(){
        return(
            <View style={styles.main}>
                <Icon name='chatbubble-ellipses' size={300} color='#C70707'/>
                <Text style={{fontSize: 35, textAlign: 'center', width: '80%', color:'#C70707', fontWeight:'bold'}}>Relax, You Don't Have Any Agenda </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Agenda;