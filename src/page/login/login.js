import React, { Component } from 'react'
import { View, Text, Button, TextInput, StyleSheet, Alert, Pressable, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native"
import { Button as ButtonElement } from "react-native-elements"

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username: "",
            password: ""
        }

        this.handleUsername = this.handleUsername.bind(this)
        this.handlePass = this.handlePass.bind(this)
    }

    handleUsername = (event) => {
        this.setState({username: event.target.value})
    }

    handlePass = (event) => {
        this.setState({password: event.target.value})
    }

    handleSubmit=(event)=>{
        event.preventDefault();

        Alert.alert("Hallo " + this.state.username)
    }

    sampleLoginSubmit=()=>{
        Alert.alert("Anda berhasil Login")
    }

    sampleSignupSubmit=()=>{
        Alert.alert("Anda Masuk ke laman Signup")
    }

    render(){
        return(
            <View style={styles.container} >
                <Text style={styles.title}>Login Now</Text>
                <Text style={styles.fontStyle}>Username</Text>
                <TextInput style={styles.textInput} placeholder="input username" onChange={this.handleUsername}/>
                <Text style={styles.fontStyle}>Password</Text>
                <TextInput style={styles.textInput} placeholder="input password" secureTextEntry={true} onChange={this.handlePass}/>
                <TouchableOpacity style={styles.button} onPress={() => this.sampleLoginSubmit()}>
                    <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>
                <View style={styles.registrationDirection}>
                    <Text style={styles.registrationText}>Don't have an account ? </Text>
                    <TouchableOpacity onPress={()=> this.sampleSignupSubmit()}>
                        <Text style={styles.registrationLink}>Register Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#e09200',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white"
    }, 
    title: {
        fontSize: 30,
        fontWeight:'bold',
        marginBottom: 20
    }, 
    fontStyle:{
        fontSize: 20,
        marginVertical: 5
    },
    textInput: {
        width: "80%",
        height: 50,
        borderColor: "grey",
        borderWidth: 0.5,
        borderRadius: 20,
        paddingHorizontal: 15,
        marginVertical: 10
    },
    button: {
        width: "80%",
        height: 50,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "orange",
        marginVertical:10
        
    },
    btnText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white"
    },
    registrationText: {
        fontSize: 15
    },
    registrationLink: {
        color: "red",
        marginRight: 5,
        marginLeft: 5,
        fontSize: 15
    },
    registrationDirection:{
        flexDirection: "row"
    }
    


});
  

export default Login;