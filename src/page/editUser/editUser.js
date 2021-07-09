import React, { Component } from 'react'
import { ToastAndroid } from 'react-native';
import {View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Modal, ActivityIndicator} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import {connect} from "react-redux"

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

    render(){
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

                <TouchableOpacity style={styling.closeBtn} onPress={()=>this.submitData()}>
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

export default EditUser;

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
