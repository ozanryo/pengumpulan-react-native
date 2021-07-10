import React, { Component } from 'react'
import { View, Text, Button, TextInput, StyleSheet, Alert, TouchableOpacity, ScrollView, ToastAndroid } from "react-native"
import { Button as ButtonElement, Image, ListItem} from "react-native-elements"
import Home from "../home/home"
import Icon from "react-native-vector-icons/Ionicons"
import {connect} from "react-redux"
import AsyncStorage from '@react-native-async-storage/async-storage'


class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            email: "ozan@app.com",
            password: "password",
            loginState: false,
            dataSecureEntry: true
        }
    }

    login(){
        const optionFetch = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        }
        return fetch('http://207.148.121.63/api/login', optionFetch)
                .then((response)=>response.json())
                .then( async (ResponseJson)=>{
                    console.log("Data :", ResponseJson.data.access_token)
                    await AsyncStorage.setItem('token', ResponseJson.data.access_token)
                    await AsyncStorage.setItem('profile', JSON.stringify(ResponseJson.data.user))
                    console.log("Profile :", ResponseJson.data.user)
                    this.props.navigation.reset({
                        index:0, routes:[{name:'HomeTab'}]
                    })
                })
                .catch((error)=>{
                    console.log("Error :", error)
                    ToastAndroid.show("Login Error", ToastAndroid.Long)
                })
    }

    sampleLoginSubmit=()=>{
        if(this.state.username == "" || this.state.password == ""){
            ToastAndroid.show("Masukkan Username dan Password", ToastAndroid.SHORT)
        } else {

            this.login();

            // for(let index=0; index < this.state.listUser.length; index++){
            //     const checkUser = this.state.listUser[index];
            //     if (checkUser.username.includes(this.state.username)){
            //         if(checkUser.password.includes(this.state.password)){
            //             ToastAndroid.show("Selamat Datang", ToastAndroid.SHORT)
            //             this.setState({loginState: true, username:"", password:""})
            //             // this.props.loginUser()
            //             this.saveLoginStat();
            //             // this.props.navigation.navigate('Home')
            //         } else{
            //             ToastAndroid.show("Password anda salah", ToastAndroid.SHORT)
            //         }
            //     }
            // }
        }
    }

    sampleFacebookSubmit=()=>{
        ToastAndroid.show('Masuk ke Laman Facebook', ToastAndroid.SHORT)
    }

    sampleGmailSubmit=()=>{
        ToastAndroid.show('Masuk ke Laman Gmail', ToastAndroid.SHORT)
    }

    sampleSignupSubmit=()=>{
        Alert.alert("Anda Masuk ke laman Signup")
    }

    showPassword(){
        if(this.state.dataSecureEntry == false){
            this.setState({dataSecureEntry: true})
        } else {
            this.setState({dataSecureEntry: false})
        }
    }

    render(){
        return(
            <View style={styles.container} >
                <Text style={styles.title}>Login</Text>

                {/* <Text style={styles.fontStyle}>Username</Text> */}

                <View style={styles.textInput} >
                    <Icon 
                    style={{padding: 7, alignItems:"center", justifyContent:"center"}}
                    name="person-circle-outline"
                    color="#ccc"
                    size={30}
                    />

                    <TextInput 
                    style={styles.inputForm} 
                    placeholder="email" 
                    onChangeText={(email)=>this.setState({email})}
                    value={this.state.email}
                    />

                </View>

                {/* <Text style={styles.fontStyle}>Password</Text> */}

                <View style={styles.textInput}>
                    <Icon 
                    style={{padding: 7, alignItems:"center", justifyContent:"center"}}
                    name="lock-closed-outline"
                    color="#ccc"
                    size={30}
                    />
                    <TextInput 
                    style={styles.inputForm} 
                    placeholder="password" 
                    secureTextEntry={this.state.dataSecureEntry} 
                    onChangeText={(password)=>this.setState({password})}
                    value={this.state.password}
                    />
                    <TouchableOpacity style={{padding: 7, alignItems:"center", justifyContent:"center"}} onPress={()=>this.showPassword()}>
                        {
                            this.state.dataSecureEntry ? 
                            <Icon 
                                name="eye-outline"
                                color="#ccc"
                                size={30}
                            />
                            :
                            <Icon 
                                name="eye-off-outline"
                                color="#ccc"
                                size={35}
                            />
                        }
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => this.login()}>
                    <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.facebookButton} onPress={() => this.sampleFacebookSubmit()}>
                    <Text style={styles.fbButtonText}>Login with Facebook</Text>
                    <Icon 
                        name="logo-facebook"
                        color="white"
                        size={30}
                        style={{padding: 7, alignItems:"flex-end", justifyContent:"flex-end"}}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.gmailButton} onPress={() => this.sampleGmailSubmit()}>
                    <Text style={styles.gmailButtonText}>Login with Gmail</Text>
                    <Icon 
                        name="logo-google"
                        color="white"
                        size={30}
                        style={{padding: 7, alignItems:"flex-end", justifyContent:"flex-end"}}
                    />
                </TouchableOpacity>

                <View style={styles.registrationDirection}>
                    <Text style={styles.registrationText}>Don't have an account ? </Text>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('Signup')}>
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
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white"
    }, 
    title: {
        fontSize: 60,
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
        borderColor: "#e09200",
        borderWidth: 0.8,
        borderRadius: 20,
        paddingHorizontal: 15,
        marginVertical: 10,
        flexDirection: "row"
    },
    inputForm: {
        width: "72%",
        height: 50,
    },
    button: {
        width: "80%",
        height: 50,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffb01f",
        marginVertical:10
    },
    facebookButton: {
        width: "80%",
        height: 50,
        borderRadius: 20,
        borderColor: "#000061",
        borderWidth:0.8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000061",
        marginVertical:10,
        flexDirection: "row"
    },
    gmailButton: {
        width: "80%",
        height: 50,
        borderRadius: 20,
        borderColor: "red",
        borderWidth:0.8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red",
        marginVertical:10,
        flexDirection: "row"
    },
    btnText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white"
    },
    fbButtonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white"
    },
    gmailButtonText: {
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

// const mapStateToProps = (state) => ({
//     getLoginState: state.auth
// })

const mapDispatchToProps = (dispatch) => ({
    loginUser: (workerData)=>dispatch({
        type: 'LOGIN_SUCCESS', user:workerData
    })
})

export default connect(null, mapDispatchToProps)(Login);