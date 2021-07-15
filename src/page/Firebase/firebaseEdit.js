import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import firestore from "@react-native-firebase/firestore"
import { FlatList } from 'react-native';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Modal } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons"
import EvilIcon from "react-native-vector-icons/EvilIcons"
import {connect} from "react-redux"


class FirebaseEdit extends Component {
    constructor(props){
        super(props);
        this.state={
            listData: [],
            nama: "",
            nip: "",
            alamat: "",
            jabatan: "",
            masa_kerja: "",
            detailsInfo: false,
            documentKey: ""
        }
    }

    // componentDidMount(){
    //     firestore()
    //         .collection('employee')
    //         .onSnapshot(
    //             dataSnapshot=>{
    //                 const newList = []

    //                 dataSnapshot.forEach(documentSnapshot=>{
    //                     newList.push({
    //                         ...documentSnapshot.data(),
    //                         key: documentSnapshot.id
    //                     })
    //                 })

    //                 this.setState({
    //                     listData: newList
    //                 })
    //             }
    //         )
    // }

    componentDidMount(){
        console.log(this.props.getEditDetailsSample.currentWorker)
        console.log(this.props.getEditDetailsSample.currentWorkerKey)
        this.setState({
            nama: this.props.getEditDetailsSample.currentWorker.nama,
            nip: this.props.getEditDetailsSample.currentWorker.nip,
            alamat: this.props.getEditDetailsSample.currentWorker.alamat,
            jabatan: this.props.getEditDetailsSample.currentWorker.jabatan,
            masa_kerja: this.props.getEditDetailsSample.currentWorker.masa_kerja,
            documentKey: this.props.getEditDetailsSample.currentWorkerKey,
        })
    }

    updateData(userId){
        firestore()
            .collection('employee')
            .doc(userId)
            .update({
                nama: this.state.nama,
                nip: this.state.nip,
                alamat: this.state.alamat,
                jabatan: this.state.jabatan,
                masa_kerja: this.state.masa_kerja
            })
            .then(()=>
                console.log('Update Berhasil')
            )
            .then(
                this.setState({
                    nama: "",
                    nip: "",
                    alamat: "",
                    jabatan: "",
                    masa_kerja: ""
                })
            )
            .then(
                this.props.navigation.navigate('Firebase List')
            )
    }

    render(){
        console.log("Data : ", this.state.listData)
        return(
            <View style={style.main}>
                <View style={{width: '100%', height: '15%', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 35, fontWeight: '900', textAlign: 'center'}}>PERBARUI DATA PEGAWAI</Text>
                </View>
                
                <View style={style.textInput}>
                        <Icon name='person-circle' size={35} style={{marginHorizontal: 10}}/>
                        <TextInput style={{width: '80%'}}  placeholder="Nama Pegawai" value={this.state.nama} onChangeText={(nama)=>this.setState({nama})} />
                </View>
                
                <View style={style.textInput}>
                    <Icon name='card' size={35} style={{marginHorizontal: 10}}/>
                    <TextInput style={{width: '80%'}} keyboardType='number-pad'  placeholder="Nomor Induk Pegawai" value={this.state.nip} onChangeText={(nip)=>this.setState({nip})} />
                </View>

                <View style={style.textInput}>
                    <Icon name='map' size={35} style={{marginHorizontal: 10}} color="black"/>   
                    <TextInput style={{width: '80%'}}  placeholder="Domisili Pegawai" value={this.state.alamat} onChangeText={(alamat)=>this.setState({alamat})} />
                </View>

                <View style={style.textInput}>
                    <Icon name='briefcase' size={35} style={{marginHorizontal: 15}}/>
                    <TextInput style={{width: '80%'}}  placeholder="jabatan" value={this.state.jabatan} onChangeText={(jabatan)=>this.setState({jabatan})} />
                </View>

                <View style={style.textInput}>
                    <Icon name='calendar' size={35} style={{marginHorizontal: 15}}/>
                    <TextInput style={{width: '80%'}} keyboardType='number-pad' placeholder="masa kerja" value={this.state.masa_kerja} onChangeText={(masa_kerja)=>this.setState({masa_kerja})} />
                </View>
                
                <TouchableOpacity style={style.submitBtn} onPress={()=>this.updateData(this.state.documentKey)}>
                    <Text style={{fontSize: 20, color: 'white'}}>Update</Text>
                </TouchableOpacity>
                
                {/* <FlatList 

                    data={this.state.listData}
                    renderItem={({item}) => 
                    <TouchableOpacity style={style.tableRow} onPress={()=>this.setState({detailsInfo: true})}>
                        <Text style={{fontSize: 25}}>{item.nama}</Text>
                    </TouchableOpacity>
                }
                />
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.detailsInfo}
                >
                    <View style={style.changePicModalLayout}>
                        <View style={style.changePicLayout}>
                            <View style={style.closeBtnPosition}>
                                <TouchableOpacity style={style.closePicBtn} onPress={()=>this.setState({detailsInfo: false})}>
                                    <Icon name='close' size={20} color='white' />
                                </TouchableOpacity>
                            </View>
                            <View style={{marginHorizontal: 10, marginTop:40, marginBottom: 20}}>
                                <Text style={{fontSize: 25, fontWeight:'900', textAlign: 'center'}}>Change Profile Picture ?</Text>
                            </View>
                        </View>
                    </View>
                </Modal> */}
            </View>
        )
    }
}

const mapStateToProps=(state)=>({
    getEditDetailsSample: state.firebaseEditData
})

export default connect(mapStateToProps)(FirebaseEdit);

const style = StyleSheet.create({
    main:{
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: 'white'
    },
    textInput:{
        width: '80%',
        height: 50,
        borderColor: 'black',
        borderWidth: 0.7,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 10,
        flexDirection: 'row'
    },
    submitBtn:{
        backgroundColor: 'black',
        borderRadius: 25,
        width: '80%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 20
    },
    tableRow:{
        alignItems: 'center',
        justifyContent: 'center',
        height: 50
    },
    changePicModalLayout:{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"rgba(1,1,1,0.8)",
        flex: 1
    },
    changePicLayout:{
        flexDirection: "column",
        paddingVertical: 15,
        marginHorizontal: 5,
        width: "75%",
        justifyContent:"center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 15
    },
    footer:{
        height: "25%"
    },
    cameraBtn:{
        backgroundColor: '#1C191C',
        alignItems: 'center',
        justifyContent: 'center',
        width: "80%",
        height: 50,
        marginVertical: 5,
        borderRadius: 25,
        flexDirection: 'row'
    },
    imageBtn:{
        backgroundColor: '#317AAD',
        alignItems: 'center',
        justifyContent: 'center',
        width: "80%",
        height: 50,
        marginVertical: 5,
        borderRadius: 25,
        flexDirection: 'row'
    },
    closePicBtn:{
        width: 30, 
        height: 30, 
        borderRadius: 30,
        backgroundColor: '#D92222',
        alignItems: 'center',
        justifyContent: 'center'
    },
    closeBtnPosition:{
        flex: 1,
        alignItems: 'flex-end',
        position: 'absolute',
        top: 20,
        bottom: 20,
        right: 20,
        left: 20,
        elevation: 0,
    }
})