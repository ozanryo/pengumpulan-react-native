import React, { Component } from 'react'
import { View, Text, Button, TextInput, StyleSheet, Alert, Pressable, TouchableOpacity, SafeAreaView, ScrollView, Platform } from "react-native"
import { Button as ButtonElement, Image, Avatar} from "react-native-elements"

class Profile extends Component {
    constructor(props){
        super(props);
        this.state={
            image: "",
            firstname: "",
            lastname: "",
            phone: "",
            domisili: "",
            email: "",
            username: "",
            editProfileStat: false
        }
    }

    beginEditProfile(){
        this.setState({editProfileStat: true})
    }

    render(){
        return(
            <View style={styles.main}>
                <Avatar rounded source={{uri: this.state.image}}/>
                <Text style={styles.textProfile} >Nama : {this.state.firstname + this.state.lastname}</Text>
                <Text style={styles.textProfile} >Phone : {this.state.phone}</Text>
                <Text style={styles.textProfile} >Domisili : {this.state.domisili}</Text>
                <Text style={styles.textProfile} >Email : {this.state.email}</Text>
                <Text style={styles.textProfile} >Username : {this.state.username}</Text>
                <TouchableOpacity onPress={() => this.beginEditProfile()}>
                    <Text style={styles.btnText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    main:{
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    textProfile:{
        fontSize: 20,
        fontWeight: "900",
        color: "black"
    },
    btnText:{
        fontSize: 20,
        fontWeight: "bold",
        color: "white"
    }
})

export default Profile;