import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, ScrollView, Alert, ToastAndroid, KeyboardAvoidingView, Modal } from "react-native"
import {ListItem, Image, Button} from "react-native-elements"
import Icon from "react-native-vector-icons/Ionicons"

class Networking2 extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            nama: "",
            nip: "",
            alamat: "",
            jabatan: "",
            masker: "",
            details: [],
            detailsInfo: false,
            editCondition: false,
            editIndex: 0
        }
    }

    componentDidMount(){
        this.getData()
    }

    getData(){
        const optionFetch = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }

        return fetch("http://207.148.121.63/api/employee?owner=3", optionFetch)
                .then((response)=>response.json())
                .then((ResponseJson)=>{
                    console.log("Data :", ResponseJson)
                    this.setState({data: ResponseJson.data})
                })
                .catch((error)=>{
                    console.log("Error :", error)
                })
    }

    submitData(){
        const optionFetch = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nama: this.state.nama,
                nip: this.state.nip,
                alamat: this.state.alamat,
                jabatan: this.state.jabatan,
                masa_kerja: this.state.masker,
                owner: 3
            })
        }
        return fetch("http://207.148.121.63/api/employee", optionFetch)
                .then((response)=>response.json())
                .then((ResponseJson)=>{
                    console.log("Data :", ResponseJson)
                    this.getData();
                    this.setState({
                        nama: "",
                        nip: "",
                        alamat: "",
                        jabatan: "",
                        masker: ""
                    })
                })
                .catch((error)=>{
                    console.log("Error :", error)
                })
    }

    detailsData(index){
        const optionFetch = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }

        return fetch("http://207.148.121.63/api/employee/" + index, optionFetch)
                .then((response)=>response.json())
                .then((ResponseJson)=>{
                    console.log("Data :", ResponseJson)
                    this.setState({details: ResponseJson.data, detailsInfo: true})

                })
                .catch((error)=>{
                    console.log("Error :", error)
                })
    }

    showDetails(index){
        this.setState({detailsInfo: true, showIndex: index})
    }

    closeDetails(index){
        this.setState({detailsInfo: false})
    }

    editPegawai(index){
        const editedData = this.state.details

        this.setState({
            nama: editedData.nama,
            nip: editedData.nip,
            alamat: editedData.alamat,
            jabatan: editedData.jabatan,
            masker: editedData.masa_kerja,
            detailsInfo: false,
            editCondition : true,
            editIndex: index
        })
    }

    saveCurrentData(){
        const optionFetch = {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nama: this.state.nama,
                nip: this.state.nip,
                alamat: this.state.alamat,
                jabatan: this.state.jabatan,
                masa_kerja: this.state.masker
            })
        }

        return fetch('http://207.148.121.63/api/employee/'+ this.state.editIndex, optionFetch)
                .then((response)=>response.json())
                .then((ResponseJson)=>{
                    console.log("Data :", ResponseJson)
                    this.getData();
                    this.setState({
                        nama: "",
                        nip: "",
                        alamat: "",
                        jabatan: "",
                        masker: "",
                        editCondition: false,
                        editIndex: 0
                    })
                })
                .catch((error)=>{
                    console.log("Error :", error)
                })
    }

    cancelEdit(){
        this.setState({
            editCondition: false,
            editIndex: 0,
            nama: "",
            nip: "",
            alamat: "",
            jabatan: "",
            masker: ""
        })
    }

    deletePegawai(index){
        this.setState({detailsInfo: false})
        const optionFetch = {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }
        return fetch('http://207.148.121.63/api/employee/'+ index, optionFetch)
                .then((response)=>response.json())
                .then((ResponseJson)=>{
                    console.log("Data :", ResponseJson)
                    this.getData();
                    ToastAndroid.show("Data sudah dihapus", ToastAndroid.SHORT)
                })
                .catch((error)=>{
                    console.log("Error :", error)
                })

    }

    render(){
        // console.log("Data:", this.state.data.nama)
        return(
            <View style={layouting.main}>
                <View style={layouting.titleLayout}>
                    <Icon name="book-outline" size={70} color="blue"/>
                    <Text style={layouting.title}>Perusahaan</Text>
                </View>
                <View style={layouting.formLayout}>
                    <View style={layouting.formRow}>
                        <Text style={layouting.inputText}>Nama : </Text>
                        <TextInput 
                        style={layouting.inputForm} 
                        placeholder="input nama pegawai" 
                        value = {this.state.nama}
                        onChangeText={(nama)=>this.setState({nama})}
                        />
                    </View>

                    <View style={layouting.formRow}>
                        <Text style={layouting.inputText}>NIP : </Text>
                        <TextInput 
                        style={layouting.inputForm}
                        placeholder="input nip pegawai"
                        keyboardType="number-pad"
                        value = {this.state.nip}
                        onChangeText={(nip)=>this.setState({nip})} 
                        />
                    </View>

                    <View style={layouting.formRow}>
                        <Text style={layouting.inputText}>Alamat : </Text>
                        <TextInput 
                        style={layouting.inputForm} 
                        placeholder="input alamat pegawai" 
                        value = {this.state.alamat}
                        onChangeText={(alamat)=>this.setState({alamat})} 
                        />
                    </View>

                    <View style={layouting.formRow}>
                        <Text style={layouting.inputText}>Jabatan : </Text>
                        <TextInput 
                        style={layouting.inputForm} 
                        placeholder="input jabatan pegawai" 
                        value = {this.state.jabatan}
                        onChangeText={(jabatan)=>this.setState({jabatan})}
                        />
                    </View>
                    
                    <View style={layouting.formRow}>
                        <Text style={layouting.inputText}>Masa Kerja : </Text>
                        <TextInput 
                        style={layouting.inputForm} 
                        placeholder="input masa kerja pegawai" 
                        keyboardType="number-pad"
                        value = {this.state.masker}
                        onChangeText={(masker)=>this.setState({masker})}
                        />
                    </View>

                    {
                        !this.state.editCondition ?
                        <View style={layouting.formRow}>
                            <TouchableOpacity style={layouting.submitBtn} onPress={()=>this.submitData()}>
                                <Text style={layouting.submitBtnText}>Submit</Text>
                            </TouchableOpacity>
                        </View> 
                        :
                        <View style={layouting.editRow}>
                            <TouchableOpacity style={layouting.saveBtn} onPress={()=>this.saveCurrentData()}>
                                <Text style={layouting.saveBtnText}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={layouting.cancelBtn} onPress={()=>this.cancelEdit()}>
                                <Text style={layouting.cancelBtnText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    
                </View>
                <FlatList 
                    data={this.state.data}
                    renderItem={
                        ({item, index}) => (
                            <View style={layouting.tableRow}  key={index}>
                                <View style={layouting.tableData}>
                                    <View style={layouting.movieFront}>
                                        <Text style={layouting.dataName}>{item.nama}</Text>
                                        <TouchableOpacity style={layouting.detailsButton} onPress={()=>this.detailsData(item.id)}>
                                            <Text style={layouting.detailsBtnText}>Details</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )
                    }
                    showsVerticalScrollIndicator={false}
                />

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.detailsInfo}
                >
                    <View style={layouting.modalLayout}>
                        <View style={layouting.dataInfo}>
                            <View style={{marginVertical: "20%"}}>
                                <Text style={{fontWeight: "700", fontSize: 25, color:"black"}}>Nama Pegawai : <Text style={{fontWeight: "200"}}>{this.state.details.nama}</Text></Text>
                                <Text style={{fontWeight: "700", fontSize: 25, color:"black"}}>NIP : <Text style={{fontWeight: "200"}}>{this.state.details.nip}</Text></Text>
                                <Text style={{fontWeight: "700", fontSize: 25, color:"black"}}>Alamat : <Text style={{fontWeight: "200"}}>{this.state.details.alamat}</Text></Text>
                                <Text style={{fontWeight: "700", fontSize: 25, color:"black"}}>Jabatan : <Text style={{fontWeight: "200"}}>{this.state.details.jabatan}</Text></Text>
                                <Text style={{fontWeight: "700", fontSize: 25, color:"black"}}>Masa Kerja : <Text style={{fontWeight: "200"}}>{this.state.details.masa_kerja}</Text></Text>
                            </View>
                            
                            <TouchableOpacity style={layouting.editButton} onPress={()=>this.editPegawai(this.state.details.id)}>
                                <View style={layouting.editBtnView}>
                                    <Icon name="create" color="white" size={25}/>
                                    <Text style={layouting.editBtnText}>Edit</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={layouting.deleteButton} onPress={()=>this.deletePegawai(this.state.details.id)}>
                                <View style={layouting.deleteBtnView}>
                                    <Icon name="trash" color="white" size={25}/>
                                    <Text style={layouting.deleteBtnText}>Delete</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={layouting.closeButton} onPress={()=>this.closeDetails(this.state.details.id)}>
                                {/* <Icon name="close-outline" size={40} color="white" /> */}
                                <Text style={layouting.deleteBtnText}>Close</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>
                
            </View>
        )
    }
}

const layouting = StyleSheet.create({
    main: {
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
        backgroundColor: "#F9FBE7"
    },
    titleLayout:{
        padding:15,
        marginVertical: 10,
        flexDirection: "row",
        alignItems:"center",
        justifyContent:"center"
    },
    title: {
        fontSize: 50, 
        fontWeight: "bold",
        color: "black"
    },
    formRow:{
        flexDirection: "row",
        marginVertical: 10,
        marginLeft: "5%",
        alignItems:"center",
        // justifyContent: "center",
    },
    editRow:{
        flexDirection: "row",
        marginVertical: 10,
        marginLeft: "5%",
        alignItems:"center",
    },
    inputText:{
        fontSize: 25,
        fontWeight: "900",
        color: "black"
    },
    inputForm: {
        width: "50%",
        height: 40,
        borderColor: "grey",
        borderWidth: 0.5,
        borderRadius: 20,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        color: "black"
    },
    submitBtn:{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2E7D32",
        width: "30%",
        height: 40,
        borderRadius: 20
    },
    submitBtnText:{
        color: "white",
        fontSize: 18,
        fontWeight: "800"
    },
    saveBtn:{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1565C0",
        width: "30%",
        height: 40,
        borderRadius: 20
    },
    saveBtnText:{
        color: "white",
        fontSize: 18,
        fontWeight: "800"
    },
    cancelBtn:{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#C62828",
        width: "30%",
        height: 40,
        borderRadius: 20,
        marginHorizontal: 10
    },
    cancelBtnText:{
        color: "white",
        fontSize: 18,
        fontWeight: "800"
    },
    tableList: {
    },
    tableRow: {
        marginVertical: 0,
        marginHorizontal: "5%",
        justifyContent: "center",
        alignItems: 'center',
        borderBottomColor:"black",
        borderTopColor: "black",
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5
    },
    tableData: {
        flexDirection: "row"
    },
    movieFront: {
        flexDirection: "column",
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        width: "80%",
        alignItems: "center",
        justifyContent:"center",
    },
    modalLayout:{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"rgba(1,1,1,0.8)",
        flex: 1
    },
    dataInfo: {
        flexDirection: "column",
        paddingVertical: 15,
        marginHorizontal: 5,
        width: "90%",
        justifyContent:"center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 15
    },
    dataName:{
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        color: "black"
    },
    detailsButton: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 15,
        backgroundColor: "#FFA000",
        width: 140,
        height: 55,
        borderRadius: 35
    },
    detailsBtnText:{
        fontSize: 20,
        fontWeight: "bold",
        color: "white"
    },
    closeButton: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
        marginLeft: 5,
        backgroundColor: "#D84315",
        width: "80%",
        height: 55,
        borderRadius: 30
    },
    editButton:{
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
        backgroundColor: "#0288D1",
        width: "80%",
        height: 55,
        borderRadius: 30
    },
    editBtnText:{
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        marginHorizontal: 15
    },
    editBtnView:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    deleteButton:{
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
        marginHorizontal: 10,
        backgroundColor: "#B71C1C",
        width: "80%",
        height: 55,
        borderRadius: 30
    },
    deleteBtnText:{
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        marginHorizontal: 15
    },
    deleteBtnView:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
})

export default Networking2;