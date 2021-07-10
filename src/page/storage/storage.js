import React, { Component } from 'react'
import { View, Text, Button, TextInput, StyleSheet, Alert, Pressable, TouchableOpacity, SafeAreaView, ScrollView, Platform, ToastAndroid } from "react-native"
import { Button as ButtonElement, Image, Avatar} from "react-native-elements"
import Icon from "react-native-vector-icons/Ionicons"
import {connect} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

class Storage extends Component {
    constructor(props){
        super(props);
        this.state={
            nama: "",
            storageCondition: true
        }
    }

    // componentDidMount(){
    //     this.storeData()
    // }

    async storeData(){
        try{
            await AsyncStorage.setItem('nama', this.state.nama)
            this.getData()
        }catch(e){
            console.log(e)
        }
    }

    async getData(){
        try{
            const nama = await AsyncStorage.getItem('nama')
            console.log("Nama User : ",nama)
        }catch(e){
            console.log(e)
        }
    }

    async removeData(){
        try{
            await AsyncStorage.removeItem('nama')
            this.getData()
        }catch(e){
            console.log(e)
        }
    }

    render(){
        return(
            <View style={styles.main}>
                {
                    this.state.storageCondition != false ?
                    <View style={styles.storageLayout}>
                        <TextInput style={{width:'80%', borderBottomWidth:0.5, borderBottomColor: 'black'}} 
                        placeholder='nama pegawai' value={this.state.nama} onChangeText={(nama)=>this.setState({nama})}/>
                        <TouchableOpacity style={styles.addButton} onPress={()=>this.storeData()}>
                            <Text style={{color: 'white', fontSize: 20}} >Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.removeButton} onPress={()=>this.removeData()}>
                            <Text style={{color: 'white', fontSize: 20}} >Remove</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={styles.emptyLayout}>
                    <   Icon name='logo-dropbox' size={300} color='#C70707'/>
                    <Text style={styles.titleText}>Storage</Text>
                </View>
                }
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
    },
    titleText:{
        fontSize: 60,
        color: '#C70707'
    },
    emptyLayout:{
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%'
    },
    storageLayout:{
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%'
    },
    addButton:{
        width: '50%',
        height: 45,
        backgroundColor: 'red',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 5
    },
    removeButton:{
        width: '50%',
        height: 45,
        backgroundColor: 'red',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10
    },
})

export default Storage;