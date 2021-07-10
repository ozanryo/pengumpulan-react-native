import React, { Component } from 'react'
import { ToastAndroid } from 'react-native';
import {View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Modal, ActivityIndicator} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import {connect} from "react-redux"
import {History2} from '../'
import AsyncStorage from '@react-native-async-storage/async-storage';

class EditUser extends Component {
    constructor(props){
        super(props);
        this.state={
            nama: "",
            nip: "",
            alamat: "",
            jabatan: "",
            masa_kerja: "",
            submitCondition: false,
            loadingCondition: true
        }
    }

    async getData(){
        const token = await AsyncStorage.getItem('token')
        const optionFetch = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': 'Bearer '+ token
            }
        }

        return fetch("http://207.148.121.63/api/employee?owner=3", optionFetch)
                .then((response)=>response.json())
                .then((ResponseJson)=>{
                    console.log("Data :", ResponseJson)
                    this.props.fetchWorkerData(ResponseJson.data)
                })
                .catch((error)=>{
                    console.log("Error :", error)
                })
    }

    submitData(){
        const editWorker = {
            nama: this.state.name,
            nip: this.state.nip,
            alamat: this.state.alamat,
            jabatan: this.state.jabatan,
            masa_kerja: this.state.masa_kerja
        }

        this.fetchDataRegisterOrder(this.props.getEditState.currentWorker.id, editWorker)
    }

    async fetchDataRegisterOrder(index, dataToObj){
        this.setState({submitCondition: true})
        const token = await AsyncStorage.getItem('token')
        const option = {
            method: 'PUT',
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': 'Bearer '+ token
            },
            body: JSON.stringify(dataToObj)
        }

        fetch("http://207.148.121.63/api/employee/" + index, option)
        .then((response)=>response.json())
        .then((ResponseJson)=>{
            console.log("Data :", ResponseJson)
            this.getData();
            this.setState({
                nama: "",
                nip: "",
                alamat: "",
                jabatan: "",
                masa_kerja: "",
                submitCondition: false,
                loadingCondition: false
            })
        })
        .catch((error)=>{
            console.log("Error :", error)
        })
    }

    closeBtn(){
        this.getData();
        this.props.finishEditing();
    }

    componentDidMount(){
        this.setState({
            nama: this.props.getEditState.currentWorker.nama,
            nip: this.props.getEditState.currentWorker.nip,
            alamat: this.props.getEditState.currentWorker.alamat,
            jabatan: this.props.getEditState.currentWorker.jabatan,
            masa_kerja: this.props.getEditState.currentWorker.masa_kerja,
        })
    }

    render(){
        if(this.props.getEditState.editCondition == false){
            return(
                <History2 />
            )
        }
        return(
            <ScrollView contentContainerStyle={styling.main}>
                <Text style={styling.title}>EDIT WORKER</Text>
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

                <TouchableOpacity style={styling.saveBtn} onPress={()=>this.submitData()}>
                    <Icon name='save' color='white' size={35} style={{marginHorizontal: 10}} />
                    <Text style={styling.btnText}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styling.closeBtn} onPress={()=>this.closeBtn()}>
                    <Icon name='close' color='white' size={35} style={{marginHorizontal: 10}} />
                    <Text style={styling.btnText}>Batal</Text>
                </TouchableOpacity>

                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.submitCondition}
                >
                    <View style={styling.loadingModalLayout}>
                        <View style={styling.loadingLayout}>
                            <ActivityIndicator 
                                size={80}
                                color='#B43535'
                                animating={this.state.loadingCondition}
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        )
    }
}

const mapStateToProps=(state)=>({
    getEditState:state.current
})

const mapDispatchToProps=(dispatch)=>({
    fetchWorkerData: (workerData)=>dispatch({
        type:'GET_LIST_WORKER', data: workerData
    }),
    finishEditing: ()=>dispatch({
        type: 'DONE_EDITING'
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);

const styling = StyleSheet.create({
    main: {
        flex:1,
        alignItems: 'center'
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
    saveBtn:{
        width: '80%',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 5,
        backgroundColor: '#297929',
        borderRadius: 30,
        flexDirection: 'row'
    },
    closeBtn:{
        width: '80%',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        backgroundColor: '#C70707',
        borderRadius: 30,
        flexDirection: 'row'
    },
    btnText:{
        color: 'white',
        fontSize: 24,
        fontWeight: '900'
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
    }
})
