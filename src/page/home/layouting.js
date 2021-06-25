import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, ScrollView, Alert } from "react-native"
import {ListItem, Image, Button} from "react-native-elements"

export default class Layouting extends Component {
    constructor(props){
        super(props);
        this.state={
            name: "",
            umur: 0,
            pekerjaan: "",
            hobi: "",
            domisili: "",
            listName: [
                {
                    name: "Ardi",
                    umur: 20,
                    pekerjaan: "Programmer",
                    hobi: "Game",
                    domisili: "Jakarta"
                },
                {
                    name: "Budi",
                    domisili: "Jakarta",
                    umur: 21,
                    pekerjaan: "Accountant",
                    hobi: "Sepak Bola",
                    domisili: "Bandung"
                }
            ]
        }
    }

    // onChangeFunction=(text)=>{
    //     this.setState({name: text})
    // }

    // onChangeAge=(text)=>{
    //     this.setState({umur: parseInt(text)})
    // }

    // onChangeJob=(text)=>{
    //     this.setState({pekerjaan: text})
    // }

    // onChangeHobby=(text)=>{
    //     this.setState({hobi: text})
    // }

    // onChangeDom=(text)=>{
    //     this.setState({domisili: text})
    // }

    addValue(){
        const newList = this.state.listName;

        const newData = {
            name: this.state.name,
            umur: this.state.umur,
            pekerjaan: this.state.pekerjaan,
            hobi: this.state.hobi,
            domisili: this.state.domisili
        }

        newList.push(newData)

        this.setState({ listName: newList})

        Alert.alert(
            "Selamat Datang, Nama : " + this.state.name + 
            "\nUsia : " + this.state.umur + 
            "\nPekerjaan : " + this.state.pekerjaan + 
            "\nHobi : " + this.state.hobi + 
            "\nDomisili : " + this.state.domisili 
        )
    }
    render(){
        return(
            <View style={layouting.main}>
                <View style={layouting.container1}><Text style={layouting.textInfo}>Registrasi User</Text></View>

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

                    <View>
                        <TouchableOpacity style={layouting.button} onPress={()=>this.addValue()}>
                            <Text style={layouting.textCon3}>Tambah</Text>
                        </TouchableOpacity>
                    </View>
                    
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
        flex: 9,
        backgroundColor: "white"
    },
    containter4: {
        alignItems: "center",
        justifyContent:"center",
        flexDirection: "row",
        flex: 1,
        backgroundColor: "white",
        marginVertical: 20
    },
    button:{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "orange",
        width: 120,
        height: 70,
        borderRadius: 20,
        marginVertical: 10
    },
    listTable:{
        flex: 5,
        color: "black",
        flexDirection: "column"
    },
    tableRow:{
        backgroundColor: "white",
        paddingLeft: 20, 
        marginBottom: 10, 
        borderColor: 'grey', 
        borderBottomWidth: 0.5,
        flexDirection: "row"
    },
    tableData:{
        marginHorizontal: 10
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
})