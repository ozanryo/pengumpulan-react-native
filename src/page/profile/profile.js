import React, { Component } from 'react'
import { View, Text, Button, TextInput, StyleSheet, Alert, Pressable, TouchableOpacity, SafeAreaView, ScrollView, Platform, ToastAndroid } from "react-native"
import { Button as ButtonElement, Image, Avatar} from "react-native-elements"
import Icon from "react-native-vector-icons/Ionicons"

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
        ToastAndroid.show("Mulai Mengedit", ToastAndroid.SHORT)
        this.setState({editProfileStat: true})
    }

    logoutProfile(){
        ToastAndroid.show("Keluar Aplikasi", ToastAndroid.SHORT)
    }

    render(){
        return(
            <ScrollView contentContainerStyle={styles.main} >
                <View style={styles.imageLayout}>
                    {
                        this.state.image != '' ? 
                        <Avatar
                            size={250}
                            rounded
                            source={{uri: this.state.image}}
                            onPress={() => console.log("Works!")}
                            activeOpacity={0.7}
                            overlayContainerStyle={{backgroundColor:'#90A4AE'}}
                        />
                        :
                        <Avatar
                            size={250}
                            rounded
                            icon={{name:'person', type:'Ionicons', size: 200}}
                            onPress={() => console.log("Works!")}
                            activeOpacity={0.7}
                            overlayContainerStyle={{backgroundColor:'#E0E0E0'}}
                        />
                    }
                </View>
                <View style={styles.profileLayout}>
                    <Text style={styles.textProfile} >Nama : {this.state.firstname + this.state.lastname}</Text>
                    <Text style={styles.textProfile} >Phone : {this.state.phone}</Text>
                    <Text style={styles.textProfile} >Domisili : {this.state.domisili}</Text>
                    <Text style={styles.textProfile} >Email : {this.state.email}</Text>
                    <Text style={styles.textProfile} >Username : {this.state.username}</Text>
                    <View style={styles.button}>
                        <TouchableOpacity style={styles.editBtn} onPress={() => this.beginEditProfile()}>
                            <Icon name='create' color='white' size={30}/>
                            <Text style={styles.btnText}>Edit Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.logoutBtn} onPress={() => this.logoutProfile()}>
                            <Icon name='exit' color='white' size={30}/>
                            <Text style={styles.btnText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.footer}></View>
            </ScrollView>
        )
    }
}

const styles=StyleSheet.create({
    main:{
        flex:1,
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "white"
    },
    imageLayout:{
        marginTop: 30,
        marginBottom: 15
    },
    profileLayout:{
        marginBottom: 5,
        width: "80%"
    },
    textProfile:{
        fontSize: 28,
        fontWeight: "bold",
        color: "#EF6C00",
        marginVertical: 10
    },
    button:{
        alignItems: 'center'
    },
    editBtn:{
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        width: "90%",
        height: "20%",
        marginVertical: 5,
        borderRadius: 20,
        flexDirection: 'row'
    },
    logoutBtn:{
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        width: "90%",
        height: "20%",
        marginVertical: 5,
        borderRadius: 20,
        flexDirection: 'row'
    },
    btnText:{
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        marginLeft: 10
    },
    footer:{
        height: "25%"
    }
})

export default Profile;