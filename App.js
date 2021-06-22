import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, Button, Alert, Pressable, TouchableOpacity } from "react-native"
import Login from "./page/login/login"

class App extends Component {
  render(){
    return(
      <View style={styles.container}>
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
                    <TouchableOpacity style={styles.loginBtn} onPress={()=>Alert.alert("Anda sudah berhasil login")}>
                      <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.signupBtn} onPress={()=>Alert.alert("Anda masuk pada laman registrasi")}>
                      <Text style={styles.signupText}>Sign-up</Text>
                    </TouchableOpacity>
                </View>
            </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#e09200'
  },
  header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50
  },
  footer: {
      flex: 3,
      backgroundColor: '#efecca',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30
  },
  text_header: {
      color: '#0f0f0f',
      fontWeight: 'bold',
      fontSize: 30
  },
  text_footer: {
      color: '#05375a',
      fontSize: 25
  },
  textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
  },
  loginBtn: {
    alignItems: "center",
    backgroundColor: "#e09200",
    padding: 15,
    marginTop: 10,
    marginBottom:10,
    borderRadius: 20
  },
  signupBtn: {
    alignItems: "center",
    backgroundColor: "#c20000",
    padding: 15,
    marginTop: 10,
    marginBottom:10,
    borderRadius: 20
  },
  loginText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  signupText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  }
});

export default App;