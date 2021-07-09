import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import {connect} from "react-redux"
import Icon from "react-native-vector-icons/Ionicons"

class PageRedux extends Component {
    constructor(props){
        super(props);
        this.state={
            nama: ''
        }
    }

    componentDidUpdate(){
        console.log("Data : ", this.props.listMember.member)
    }

    tambahData(){
        this.props.addMember(this.state.nama)
    }

    render(){
        return(
            <View style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
                {/* <TouchableOpacity style={Styles.increaseBtn} onPress={()=>this.props.increment()}>
                    <Text style={{color: 'white', fontSize: 20}}>Increase</Text>
                    <Icon name='caret-up' color='white' size={35} style={{marginHorizontal: 10}} />
                </TouchableOpacity>
                <Text style={{fontSize: 30, marginVertical: 20}}>{this.props.getNumberReducer.number}</Text>
                <TouchableOpacity style={Styles.decreaseBtn} onPress={()=>this.props.decrease()}>
                    <Text style={{color: 'white', fontSize: 20}} >Decrease</Text>
                    <Icon name='caret-down' color='white' size={35} style={{marginHorizontal: 10}} />
                </TouchableOpacity> */}
                <TextInput style={{width:'80%', borderBottomWidth:0.5, borderBottomColor: 'black'}} 
                placeholder='tambah data' value={this.state.nama} onChangeText={(nama)=>this.setState({nama})}/>
                <TouchableOpacity style={Styles.addButton} onPress={()=>this.tambahData()}>
                    <Text style={{color: 'white', fontSize: 20}} >Tambah</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    increaseBtn:{
        width: '50%',
        height: 45,
        backgroundColor: 'green',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    decreaseBtn:{
        width: '50%',
        height: 45,
        backgroundColor: 'red',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    addButton:{
        width: '50%',
        height: 45,
        backgroundColor: 'red',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 10
    }
})

const mapStateToProps=(state)=>({
    getNumberReducer: state.exampleReducer,
    listMember: state.member
})

const mapDispatchToProps=(dispatch)=>({
    increment: ()=>dispatch({type: 'INCREASE'}),
    decrease: ()=>dispatch({type: 'DECREASE'}),
    addMember: (inputData)=> dispatch(
        {type: 'ADD_SAMPLE_MEMBER', member: inputData})
})

export default connect(mapStateToProps, mapDispatchToProps)(PageRedux);