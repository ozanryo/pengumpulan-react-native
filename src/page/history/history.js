import React, { Component } from 'react'
import {View, Text, StyleSheet, ScrollView} from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

export default class History extends Component {
    constructor(props){
        super(props);
        this.state={
            historyShop: [],
            emptyNotice: true
        }
    }
    render(){
        return(
            <ScrollView contentContainerStyle={styles.main}>
                {
                    !this.state.emptyNotice ? 
                    <Text>Ini Page History</Text>
                    :
                    <View style={styles.emptyLayout}>
                        <Icon name='file-tray-outline' size={250} color='#FFECB3' />
                        <Text style={styles.emptyText}>Empty History</Text>
                    </View>
                }
                
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    emptyLayout:{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyText:{
        fontSize: 40,
        color: '#FFECB3',
        fontWeight: 'bold'
    }
})