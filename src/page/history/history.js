import React, { Component } from 'react'
import {View, Text, StyleSheet, ScrollView} from "react-native"

export default class History extends Component {
    render(){
        return(
            <ScrollView style={styles.main}>
                <Text>Ini Page History</Text>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1
    }
})