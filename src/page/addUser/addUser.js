import React, { Component } from 'react'
import { ToastAndroid } from 'react-native';
import {View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Modal, ActivityIndicator} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import {connect} from "react-redux"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {History2} from "../"

class AddUser extends Component {
    constructor(props){
        super(props);
        this.state={
            nama: "",
            nip: "",
            alamat: "",
            jabatan: "",
            masa_kerja: "",
            submitCondition: false,
            loadingCondition: true,
            claimToken: ""
        }
    }

    async getToken(){
        try{
            // const getToken = await AsyncStorage.getItem('token')
            // this.setState({claimToken: getToken})
            return await AsyncStorage.getItem('token');

        }catch(e){
            console.log(e)
        }
    }

    async getData(){
        // await this.getToken()
        const token = await AsyncStorage.getItem('token')
        const optionFetch = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': 'Bearer '+token
            }
        }

        return fetch("http://207.148.121.63/api/employee?owner=3", optionFetch)
                .then((response)=>response.json())
                .then((ResponseJson)=>{
                    console.log("Data :", ResponseJson)
                    // this.setState({sampleData: ResponseJson.data})
                    this.props.fetchWorkerData(ResponseJson.data)
                })
                .catch((error)=>{
                    console.log("Error :", error)
                })
    }

    submitData(){
        if(this.state.nama == "" || this.state.nip == "" || this.state.alamat == "" || this.state.jabatan == "" || this.state.masa_kerja == ""){
            ToastAndroid.show("Data Belum Lengkap", ToastAndroid.SHORT)
        } else {
            this.fetchSubmitData();
        }
    }

    async fetchSubmitData(){
        const token = await AsyncStorage.getItem('token')
        this.setState({submitCondition: true})
        const optionFetch = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': 'Bearer '+token
            },
            body: JSON.stringify({
                nama: this.state.nama,
                nip: this.state.nip,
                alamat: this.state.alamat,
                jabatan: this.state.jabatan,
                masa_kerja: this.state.masa_kerja,
                owner: 3
            })
        }
        return fetch("http://207.148.121.63/api/employee", optionFetch)
                .then((response)=>response.json())
                .then((ResponseJson)=>{
                    console.log("Data :", ResponseJson)
                    this.getData();
                    if(ResponseJson.success == true){
                        this.setState({
                            loadingCondition: false,
                            nama: "",
                            nip: "",
                            alamat: "",
                            jabatan: "",
                            masa_kerja: ""
                        })
                    }
                    this.props.navigation.navigate('List User')
                })
                .catch((error)=>{
                    console.log("Error :", error)
                })
    }

    closeAdd(){
        this.getData()
        this.props.navigation.navigate('List User')
    }

    render(){
        return(
            <ScrollView contentContainerStyle={styling.main}>
                <Text style={styling.title}>ADD WORKER</Text>
                <View style={styling.textInput}>
                    <Icon name='person-circle' color='#C70707' size={35} style={{marginHorizontal: 10}} />
                    <TextInput style={{width:'80%'}} placeholder='nama pegawai' 
                    value={this.state.nama}
                    onChangeText={(nama)=>this.setState({nama})}
                    />
                </View>

                <View style={styling.textInput}>
                    <Icon name='card' color='#C70707' size={35} style={{marginHorizontal: 10}} />
                    <TextInput style={{width:'80%'}} placeholder='nomor induk pegawai' 
                    value={this.state.nip}
                    onChangeText={(nip)=>this.setState({nip})}
                    keyboardType='number-pad'
                    />
                </View>

                <View style={styling.textInput}>
                    <Icon name='map' color='#C70707' size={35} style={{marginHorizontal: 10}} />
                    <TextInput style={{width:'80%'}} placeholder='alamat pegawai' 
                    value={this.state.alamat}
                    onChangeText={(alamat)=>this.setState({alamat})}
                    />
                </View>

                <View style={styling.textInput}>
                    <Icon name='briefcase' color='#C70707' size={35} style={{marginHorizontal: 10}} />
                    <TextInput style={{width:'80%'}} placeholder='jabatan pegawai' 
                    value={this.state.jabatan}
                    onChangeText={(jabatan)=>this.setState({jabatan})}
                    />
                </View>

                <View style={styling.textInput}>
                    <Icon name='calendar' color='#C70707' size={35} style={{marginHorizontal: 10}} />
                    <TextInput style={{width:'80%'}} placeholder='masa kerja pegawai'
                    value={this.state.masa_kerja}
                    onChangeText={(masa_kerja)=>this.setState({masa_kerja})}
                    keyboardType='number-pad'
                    />
                </View>

                <TouchableOpacity style={styling.addBtn} onPress={()=>this.submitData()}>
                    <Icon name='add' color='white' size={35} style={{marginHorizontal: 10}} />
                    <Text style={styling.btnText}>Create</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styling.closeBtn} onPress={()=>this.closeAdd()}>
                    <Icon name='close' color='white' size={35} style={{marginHorizontal: 10}} />
                    <Text style={styling.btnText}>Close</Text>
                </TouchableOpacity>

                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.submitCondition}
                >
                    <View style={styling.loadingModalLayout}>
                        <View style={styling.loadingLayout}>
                            {
                                this.state.loadingCondition ?
                                <ActivityIndicator 
                                    size={80}
                                    color='#B43535'
                                    animating={true}
                                />
                                :
                                <View style={styling.doneLoading}>
                                    <Icon name='checkmark-circle' size={100} color='green' />
                                    <Text style={{fontSize: 35, fontWeight: 'bold'}}>Berhasil</Text>
                                    <TouchableOpacity style={styling.closeButton} onPress={()=>this.setState({submitCondition: false})}>
                                        <Text style={styling.closeBtnText}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                    </View>
                    
                </Modal>
            </ScrollView>
        )
    }
}

const styling = StyleSheet.create({
    main: {
        flex:1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    title:{
        textAlign: 'center',
        fontSize: 45,
        marginTop: 45,
        marginBottom: 15
    },
    textInput: {
        width:'80%',
        height: 50,
        borderWidth: 0.9,
        borderColor: '#C70707',
        borderRadius: 25,
        marginVertical: 15,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    addBtn:{
        width: '80%',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 5,
        // backgroundColor: '#EC7208',
        backgroundColor: 'black',
        borderRadius: 30,
        flexDirection: 'row'
    },
    btnText:{
        color: 'white',
        fontSize: 24,
        fontWeight: '900'
    },
    closeBtn:{
        width: '80%',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        backgroundColor: '#C70707',
        borderRadius: 30,
        flexDirection: 'row'
    },
    loadingModalLayout:{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"rgba(1,1,1,0.8)",
        flex: 1
    },
    loadingLayout:{
        flexDirection: "column",
        paddingVertical: 15,
        marginHorizontal: 5,
        width: "60%",
        justifyContent:"center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 15
    },
    doneLoading:{
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    closeButton:{
        width:110,
        height: 40,
        backgroundColor: 'red',
        alignItems:'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: 20
    },
    closeBtnText:{
        fontSize: 20,
        color: 'white',
        fontWeight: '900'
    }
})

const mapStateToProps = (state) => ({
    getAddCondition: state.add
})

const mapDispatchToProps=(dispatch)=>({
    fetchWorkerData: (workerData)=>dispatch({
        type:'GET_LIST_WORKER', data: workerData
    }),
    cancelAddData: ()=>dispatch({
        type: 'ADD_CANCEL'
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);