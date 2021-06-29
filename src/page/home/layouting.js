import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, ScrollView, Alert, ToastAndroid } from "react-native"
import {ListItem, Image, Button} from "react-native-elements"
import Icon from "react-native-vector-icons/Ionicons"

export default class Layouting extends Component {
    constructor(props){
        super(props);
        this.state={
            name: "",
            umur: 0,
            pekerjaan: "",
            hobi: "",
            domisili: "",
            listName: [], 
            editIndex: 0,
            finishAdd: false,
            finishEdit: false,
            cancel: false
        }
    }

    componentDidMount(){
        console.log("compDidMount")
        this.setState(
            {
                listName: this.props.peoples, 
                finishAdd: false, 
                cancel: false,
                finishEdit: false
            }
        )
    }

    componentDidUpdate(prevProps, prevState){
        console.log("PrevProps : ",prevProps)
        console.log("PrevState : ", prevState.cancel)
        if(this.state.finishAdd != prevState.finishAdd || this.state.finishEdit != prevState.finishEdit || this.state.cancel != prevState.cancel){
            this.setState({
                name: "",
                umur: "",
                pekerjaan: "",
                hobi: "",
                domisili: ""
            })
        }
    }

    addValue(){
        if(this.state.name == "" || this.state.umur == 0 || this. state.pekerjaan == "" || this.state.hobi =="" || this.state.domisili == "" ){
            ToastAndroid.show("Data harus dilengkapi", ToastAndroid.SHORT)
        } else {
            const newList = this.props.peoples;

            const newData = {
                name: this.state.name,
                umur: this.state.umur,
                pekerjaan: this.state.pekerjaan,
                hobi: this.state.hobi,
                domisili: this.state.domisili
            }

            newList.push(newData)

            this.setState({ listName: newList, finishAdd: true})

            ToastAndroid.show("Data ditambahkan", ToastAndroid.SHORT)
        }
    }

    editValue(id){
        this.props.onEdit()
        console.log(this.props.peoples[id].umur)
        console.log(id)

        const editData = this.props.peoples[id];

        this.setState({
            editIndex: id,
            name: editData.name,
            umur: editData.umur,
            pekerjaan: editData.pekerjaan,
            hobi: editData.hobi,
            domisili: editData.domisili
        })

        

    }

    saveNewData(inputName, inputAge, inputJob, inputHobby, inputDom){
        const listData = this.props.peoples

        const newData = {
            name: inputName,
            umur: inputAge,
            pekerjaan: inputJob,
            hobi: inputHobby,
            domisili: inputDom
        }

        listData.splice(this.state.editIndex, 1, newData)
        this.setState({listName: listData})
    }

    saveButton(){
        this.saveNewData(
            this.state.name,
            this.state.umur,
            this.state.pekerjaan,
            this.state.hobi,
            this.state.domisili
        )

        this.props.finishEdit()

        // this.setState({
        //     editIndex: 0,
        //     name: "",
        //     umur: "",
        //     pekerjaan: "",
        //     hobi: "",
        //     domisili: ""
        // })

        this.setState({finishEdit: true})
    }

    batalEdit(){
        this.props.editCancel()

        if(this.state.cancel == false){
            this.setState({cancel: true})
        } else {
            this.setState({cancel: false})
        }
    }


    render(){
        return(
            <View style={layouting.main}>
                {/* <View style={layouting.container1}>
                    <Text style={layouting.textInfo}>Registrasi User</Text>
                </View> */}

                <View style={layouting.containter3}>
                    <View style={layouting.containter4}>
                        <Text style={layouting.textCon3}>Nama : </Text>
                        <TextInput 
                        style={layouting.textInput} 
                        placeholder="input nama" 
                        value={this.state.name} 
                        onChangeText={(name)=>this.setState({name})}/>
                    </View>
                    
                    <View style={layouting.containter4}>
                        <Text style={layouting.textCon3}>Usia : </Text>
                        <TextInput 
                        style={layouting.textInput} 
                        placeholder="input usia" 
                        value={this.state.umur} 
                        onChangeText={(text)=>this.setState({umur: parseInt(text)})}
                        keyboardType="number-pad"
                        />
                    </View>

                    <View style={layouting.containter4}>
                        <Text style={layouting.textCon3}>Pekerjaan : </Text>
                        <TextInput 
                        style={layouting.textInput} 
                        placeholder="input pekerjaan" 
                        value={this.state.pekerjaan} 
                        onChangeText={(pekerjaan)=>this.setState({pekerjaan})}/>
                    </View>

                    <View style={layouting.containter4}>
                        <Text style={layouting.textCon3}>Hobi : </Text>
                        <TextInput 
                        style={layouting.textInput} 
                        placeholder="input hobi" 
                        value={this.state.hobi} 
                        onChangeText={(hobi)=>this.setState({hobi})}/>
                    </View>

                    <View style={layouting.containter4}>
                        <Text style={layouting.textCon3}>Domisili : </Text>
                        <TextInput 
                        style={layouting.textInput} 
                        placeholder="input domisili" 
                        value={this.state.domisili} 
                        onChangeText={(domisili)=>this.setState({domisili})}/>
                    </View>

                    {
                        !this.props.editStat ? 
                        <View style={layouting.buttonPosition}>
                            <TouchableOpacity style={layouting.button} onPress={()=>this.addValue()}>
                                <Text style={layouting.btnText}>Tambah</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={layouting.buttonPosition}>
                            <TouchableOpacity style={layouting.saveButton} onPress={()=>this.saveButton()}>
                                <Text style={layouting.btnText}>Simpan</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={layouting.cancelButton} onPress={()=>this.batalEdit()}>
                                <Text style={layouting.btnText}>Batal</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    
                    <View style={layouting.listTable}>
                        <FlatList 
                        data={this.state.listName}
                        renderItem={({item, index}) => (
                            <View key={index} style={layouting.tableRow}>
                                <Text style={layouting.tableData}>{item.name}</Text>
                                <Text style={layouting.tableData}>{item.umur}</Text>
                                <Text style={layouting.tableData}>{item.pekerjaan}</Text>
                                <Text style={layouting.tableData}>{item.hobi}</Text>
                                <Text style={layouting.tableData}>{item.domisili}</Text>
                                <View style={layouting.buttonUtil}>
                                    <TouchableOpacity style={layouting.editButton} onPress={()=>this.editValue(index)}>
                                        <Icon 
                                            name="create-outline"
                                            size={40}
                                            color="blue"
                                            
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={layouting.deleteButton} onPress={()=>this.props.onDelete(index)}>
                                        <Icon 
                                            name="trash-outline"
                                            size={40}
                                            color="red"
                                        />
                                    </TouchableOpacity>
                                </View>
                                
                            </View>)
                        }
                        showsVerticalScrollIndicator={true}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const layouting = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "blue"
    }, 
    container1: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "red"
    }, 
    containter2: {
        alignItems: "center",
        justifyContent:"center",
        flexDirection: "row",
        flex: 2,
        backgroundColor: "orange"
    },
    containter3: {
        alignItems: "center",
        justifyContent:"center",
        flexDirection: "column",
        flex: 1,
        backgroundColor: "white"
    },
    containter4: {
        alignItems: "center",
        justifyContent:"center",
        flexDirection: "row",
        // flex: 1,
        backgroundColor: "white",
        marginVertical: 20
    },
    buttonPosition:{
        flexDirection: "row"
    },
    btnText:{
        fontSize: 15,
        color: "white",
        fontWeight: "bold"
    },
    button:{
        alignItems: "center",
        justifyContent: "center",
        width: 90,
        height: 70,
        borderRadius: 20,
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: "green"
    },
    saveButton:{
        alignItems: "center",
        justifyContent: "center",
        width: 90,
        height: 70,
        borderRadius: 20,
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: "blue"
    },
    cancelButton:{
        alignItems: "center",
        justifyContent: "center",
        width: 90,
        height: 70,
        borderRadius: 20,
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: "red"
    },
    listTable:{
        flex: 2,
        color: "black",
        flexDirection: "column",
        width: "80%",
    },
    tableRow:{
        backgroundColor: "white",
        paddingLeft: 20, 
        marginBottom: 10, 
        borderColor: 'grey', 
        borderBottomWidth: 0.5,
        flexDirection: "column",
    },
    tableData:{
        marginHorizontal: 10,
        marginVertical: 5,
        textAlign: "center",
        fontSize: 20
    },
    textInfo: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
        margin: 10
    },
    textCon3: {
        color: "black",
        fontSize: 20
    },
    textInput: {
        width: "50%",
        height: 40,
        borderColor: "grey",
        borderWidth: 0.5,
        borderRadius: 20,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        color: "black"
    },
    buttonUtil: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    editButton: {
        marginHorizontal: 15,
        alignItems: "center",
        justifyContent: "center"
    },
    deleteButton: {
        marginHorizontal: 15,
        justifyContent: "center",
        alignItems: "center",
    }
})