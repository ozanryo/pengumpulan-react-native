import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import firestore from "@react-native-firebase/firestore"
import { FlatList } from 'react-native';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Modal } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons"
import {connect} from "react-redux"

class Firebase extends Component {
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
            selectedData: [],
            deleteCondition: false,
            documentKey: ""
        }
    }

    componentDidMount(){
        firestore()
            .collection('employee')
            .onSnapshot(
                dataSnapshot=>{
                    const newList = []

                    dataSnapshot.forEach(documentSnapshot=>{
                        console.log(documentSnapshot)
                        newList.push({
                            ...documentSnapshot.data(),
                            key: documentSnapshot.id
                        })
                    })

                    this.setState({
                        listData: newList
                    })
                }
            )
    }

    detailsUser(userId){
        this.setState({documentKey: userId})
        this.getSpecificUser(userId)
    }
    getSpecificUser(userId){
        firestore()
            .collection('employee')
            .doc(userId)
            .get()
            .then(
                documentSnapshot=>{
                    console.log('User Exist : ', documentSnapshot.exists)

                    if(documentSnapshot.exists){
                        console.log('User Data : ', documentSnapshot.data())
                        const dataSelected = []

                        // dataSelected.push(documentSnapshot.data())
                        this.setState({selectedData: documentSnapshot.data()})
                        this.setState({detailsInfo: true})
                    }
                }
            )
    }

    submitData(){
        firestore()
            .collection('employee')
            .add({
                nama: this.state.nama,
                nip: this.state.nip,
                alamat: this.state.alamat,
                jabatan: this.state.jabatan,
                masa_kerja: this.state.masa_kerja
            })
    }

    deleteData(){
        this.removeButton(this.state.documentKey)
        this.setState({detailsInfo: false, deleteCondition:false})
    }

    removeButton(userId){
        firestore()
            .collection('employee')
            .doc(userId)
            .delete()
            .then(() => {
                console.log('employee data deleted!');
            });
    }

    gotoEdit(){
        this.props.navigation.navigate('Firebase Edit')
        this.setState({detailsInfo: false})
        this.props.sendDetailsData(this.state.selectedData, this.state.documentKey)
    }

    render(){
        console.log("Data : ", this.state.documentKey)
        return(
            <View style={style.main}>
                <View style={style.titleLayout}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 30, marginLeft: 25, marginRight: '20%'}}>Daftar Pegawai</Text>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Firebase Add')}>
                            <Icon name='add' size={50} />
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList 
                    data={this.state.listData}
                    renderItem={({item}) => 
                    <TouchableOpacity style={style.tableRow} onPress={()=>this.detailsUser(item.key)}>
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
                                <Text style={{fontSize: 30, fontWeight:'900', textAlign: 'center'}}>Data Lengkap Pegawai</Text>
                                <View style={{marginVertical: 10, width: '95%'}}>
                                    <Text style={{fontSize: 20, fontWeight: 'bold', marginVertical: 5}}>Nama Pegawai : <Text style={{fontWeight:'500'}}>{this.state.selectedData.nama}</Text></Text>
                                    <Text style={{fontSize: 20, fontWeight: 'bold', marginVertical: 5}}>NIP Pegawai : <Text style={{fontWeight:'500'}}>{this.state.selectedData.nip}</Text></Text>
                                    <Text style={{fontSize: 20, fontWeight: 'bold', marginVertical: 5}}>Alamat Pegawai :  <Text style={{fontWeight:'500'}}>{this.state.selectedData.alamat}</Text></Text>
                                    <Text style={{fontSize: 20, fontWeight: 'bold', marginVertical: 5}}>Jabatan Pegawai :  <Text style={{fontWeight:'500'}}>{this.state.selectedData.jabatan}</Text></Text>
                                    <Text style={{fontSize: 20, fontWeight: 'bold', marginVertical: 5}}>Masa Kerja  Pegawai :  <Text style={{fontWeight:'500'}}>{this.state.selectedData.masa_kerja}</Text></Text>
                                </View>
                            </View>

                            <TouchableOpacity style={style.editBtn} onPress={()=>this.gotoEdit()}>
                                <Text style={style.btnText}>Perbarui</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.deleteBtn} onPress={()=>this.setState({deleteCondition: true})} >
                                <Text style={style.btnText}>Hapus</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.deleteCondition}
                >
                    <View style={style.deleteModalLayout}>
                        <View style={style.deleteLayout}>
                            <View style={{width:'80%'}}>
                                <Text style={{fontSize: 25, textAlign: 'center', marginVertical: 20}}>Apakah Anda Yakin Ingin Menghapus Data Pegawai ?</Text>
                            </View>
                            
                            <View style={{flexDirection: 'row', marginVertical: 15}}>
                                <TouchableOpacity style={style.yesButton} onPress={()=>this.deleteData()}>
                                    <Text style={style.btnText}>Ya</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={style.noButton} onPress={()=>this.setState({deleteCondition: false})}>
                                    <Text style={style.btnText}>Tidak</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const mapDispatchToProps =(dispatch)=>({
    sendDetailsData: (workerData, workerKey)=> dispatch({
        type: 'GET_FIREBASE_CURRENT_DATA',
        currentWorker: workerData,
        currentWorkerKey: workerKey
    })
})

export default connect(null, mapDispatchToProps)(Firebase);

const style = StyleSheet.create({
    main:{
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: 'white'
    },
    titleLayout:{
        height: 80,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: 'black'
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
        width: "85%",
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
    },
    editBtn:{
        width: '80%',
        height: '10%',
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 5,
        borderRadius: 25
    },
    deleteBtn:{
        width: '80%',
        height: '10%',
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 5,
        borderRadius: 25
    }, 
    btnText:{
        fontSize: 20,
        color: 'white'
    },
    deleteModalLayout:{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"rgba(1,1,1,0.8)",
        flex: 1
    },
    deleteLayout:{
        flexDirection: "column",
        paddingVertical: 15,
        marginHorizontal: 5,
        width: "85%",
        justifyContent:"center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 15
    },
    yesButton:{
        backgroundColor: 'green',
        width: 110,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        borderRadius: 20
    },
    noButton:{
        backgroundColor: 'red',
        width: 110,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        borderRadius: 20
    }

})