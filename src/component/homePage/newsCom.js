import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native"
import {ListItem, Image, Button} from "react-native-elements"
import Icon from "react-native-vector-icons/Ionicons"
import { SwipeRow } from 'react-native-swipe-list-view';

class NewsComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            newsGenre:[{
                genre: "Sport",
                linkNav: 'Sport',
            }, {
                genre: "Music",
                linkNav: 'Music',
            }, {
                genre: "Tech",
                linkNav: 'Tech',
            }, {
                genre: "Economy",
                linkNav: 'Economy',
            }, {
                genre: "Politic",
                linkNav: 'Politic',
            }, {
                genre: "Game",
                linkNav: 'Game',
            },
        ]
        }
    }
    render(){
        return(
            <View style={styles.newsLayout}>
                <Text style={styles.titleText}>News</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    <View style={styles.rowFront}>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={styles.newsSectionAll}>
                                <Text style={{fontSize:17, color: 'white'}}>All</Text>
                            </TouchableOpacity>
                            {
                                this.state.newsGenre.map((item, index)=>(
                                    <TouchableOpacity key={index} style={styles.newsSection}>
                                        <Text style={{fontSize:17, color:'#5151CF'}}>{item.genre}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    newsLayout:{
        width: '90%',
        marginTop: 10
    },
    rowFront:{
        alignItems: 'flex-start',
        backgroundColor: 'white',
        justifyContent: 'center',
        height: 75,
        width: 750,
    },
    newsSection:{
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'white',
        borderWidth: 1.5,
        borderColor: '#5151CF',
        width: '14%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    newsSectionAll:{
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#5151CF',
        borderWidth: 1.5,
        borderColor: '#5151CF',
        width: '14%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    titleText:{
        paddingLeft: 10,
        fontSize: 35
    },
})

export default NewsComponent;