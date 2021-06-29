import React, { Component } from 'react'
import { View, Text, Button, TextInput, StyleSheet, Alert, Pressable, TouchableOpacity, SafeAreaView, ScrollView, Platform } from "react-native"
import { Button as ButtonElement, Image} from "react-native-elements"
import Icon from "react-native-vector-icons/Ionicons"

class Signup extends Component {
    constructor(props){
        super(props);
        this.state={
            dataSecureEntry: true,
            firstname: "",
            lastname: "",
            phone: "",
            domisili: "",
            email: "",
            username: "",
            pass: "",
            repass: ""
        }
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
            <SafeAreaView style={styling.main}>
                <ScrollView style={styling.scrollView}>
                    <Text style={styling.textTitle}>Create Your Account</Text>

                    <Text style={styling.textForm}>Firstname</Text>
                    <TextInput 
                        style={styling.textInput} 
                        placeholder="input firstname" 
                        value={this.state.firstname}
                    />

                    <Text style={styling.textForm}>Lastname</Text>
                    <TextInput 
                        style={styling.textInput} 
                        placeholder="input lastname" 
                        value={this.state.lastname}
                    />

                    <Text style={styling.textForm}>Phone Number</Text>
                    <TextInput 
                        style={styling.textInput} 
                        placeholder="input phone number" 
                        value={this.state.phone}
                    />

                    <Text style={styling.textForm}>Domisili</Text>
                    <TextInput 
                        style={styling.textInput} 
                        placeholder="input domisili" 
                        value={this.state.domisili}
                    />

                    <Text style={styling.textForm}>Email</Text>
                    <TextInput 
                        style={styling.textInput} 
                        placeholder="input email" 
                        value={this.state.email}
                    />

                    <Text style={styling.textForm}>Username</Text>
                    <TextInput 
                        style={styling.textInput} 
                        placeholder="create username" 
                        value={this.state.username}
                    />

                    
                    <Text style={styling.textForm}>Password</Text>
                    <View style={styling.textInputPass}>
                        <TextInput 
                            style={styling.textInputPassForm} 
                            placeholder="create password" 
                            secureTextEntry={this.state.dataSecureEntry} 
                            value={this.state.pass}
                        />
                        <TouchableOpacity style={{padding: 7, alignItems:"center", justifyContent:"center"}} onPress={()=>this.showPassword()}>
                            {
                                this.state.dataSecureEntry ? 
                                <Icon 
                                    name="eye-outline"
                                    color="#ccc"
                                    size={23}
                                />
                                :
                                <Icon 
                                    name="eye-off-outline"
                                    color="#ccc"
                                    size={23}
                                />
                            }
                        </TouchableOpacity>
                    </View >
                    

                    <Text style={styling.textForm}>Rewrite Password</Text>
                    <View style={styling.textInputPass}>
                        <TextInput 
                            style={styling.textInputPassForm} 
                            placeholder="recreate firstname" 
                            secureTextEntry={this.state.dataSecureEntry} 
                            value={this.state.repass}
                        />
                        <TouchableOpacity style={{padding: 7, alignItems:"center", justifyContent:"center"}} onPress={()=>this.showPassword()}>
                            {
                                this.state.dataSecureEntry ? 
                                <Icon 
                                    name="eye-outline"
                                    color="#ccc"
                                    size={23}
                                />
                                :
                                <Icon 
                                    name="eye-off-outline"
                                    color="#ccc"
                                    size={23}
                                />
                            }
                        </TouchableOpacity>
                    </View >

                    <TouchableOpacity style={styling.button}>
                        <Text style={styling.btnText}>Register</Text>
                    </TouchableOpacity>

                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styling = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        flexDirection: "column"
    },
    textTitle: {
        fontSize: 40,
        fontWeight: "bold",
        marginVertical: 20,
        alignItems: "center",
        marginHorizontal: 10,
        textAlign:"center"
    },
    textForm: {
        fontSize: 30,
        fontWeight: "800",
        marginVertical: 10,
        alignItems: "center",
        marginLeft: "10%"
    },
    scrollView:{
        width:"90%"
    },
    textInput: {
        width: "80%",
        height: 40,
        borderColor: "grey",
        borderWidth: 0.5,
        borderRadius: 20,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        marginVertical: 10,
        color: "black",
        marginLeft: "10%"
    },
    textInputPass: {
        width: "80%",
        height: 40,
        borderColor: "grey",
        borderWidth: 0.5,
        borderRadius: 20,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        marginVertical: 10,
        color: "black",
        marginLeft: "10%",
        flexDirection:"row"
    },
    textInputPassForm: {
        width: "90%",
        height: 40,
    },
    button: {
        width: "80%",
        height: 50,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
        marginLeft: "10%",
        marginVertical: 20
    },
    btnText: {
        fontSize: 20,
        fontWeight: "900",
        color: "white"
    }
})

export default Signup;