import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, ScrollView, Alert } from "react-native"
import Layouting from "./layouting"

class AddUser extends Component {
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
                    hobi: "Soccer",
                    domisili: "Bandung"
                }
            ],
            editCondition: false,
            sendIndex: 0
        }
    }

    deleteUser=(id)=>{
        const deleteUser = this.state.listName;
        deleteUser.splice(id, 1)
        this.setState({listName: deleteUser})
        console.log(id)
    }

    beginEdit=()=>{
        this.setState({editCondition: true})
    }

    cancelEdit(){
        this.setState({editCondition: false})
    }

    doneEdit(){
        this.setState({editCondition: false})
    }
    render(){
        return(
            <View style={{flex: 1}}>
                <Layouting 
                peoples={this.state.listName} 
                onDelete={this.deleteUser} 
                onEdit={()=>this.beginEdit()} 
                editStat={this.state.editCondition}
                editCancel={()=>this.cancelEdit()}
                editIndex={this.state.sendIndex}
                finishEdit={()=>this.doneEdit()}
            />
            </View>
        )
    }
}

export default AddUser;