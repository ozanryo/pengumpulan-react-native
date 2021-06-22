import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native"

class Login extends Component {
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.text_header}>WELCOME !!!</Text>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.text_footer}>Input Username</Text>
                    <TextInput 
                    placeholder="Masukkan Username" 
                    style={styles.textInput}
                    />
                    <Text style={styles.text_footer}>Input Password</Text>
                    <TextInput 
                    placeholder="Masukkan Password" 
                    style={styles.textInput}
                    secureTextEntry={true}
                    />
                    <Button style={styles.button} title="Login" onPress={()=>Alert.alert("Anda sudah berhasil login")} />
                    <Button style={styles.button} title="Signup" onPress={()=>Alert.alert("Anda sudah berhasil login")} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 200,
        paddingBottom: 200
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 50
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        backgroundColor:"#ffffff",
        borderColor: "#2ed534"
    },
    button: {
        alignItems: 'center'
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
});

export default Login;