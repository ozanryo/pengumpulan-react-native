import React, { Component } from 'react'
import { View, Text, Button, TextInput, StyleSheet, Alert, TouchableOpacity, ScrollView } from "react-native"
import { Button as ButtonElement, Image, Icon, ListItem} from "react-native-elements"

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username: "",
            password: "",
            loginState: false,
            listUser: [
                {
                    username: "Admin",
                    password: "Admin"
                }, {
                    username: "Staff",
                    password: "Staff"
                }
            ],
            checkUser: [],
            listProduct: [
                {
                    name: "Indosat",
                    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c0/Indosat_Ooredoo_logo.svg/1200px-Indosat_Ooredoo_logo.svg.png"
                }, {
                    name: "Telkomsel",
                    imageUrl: "https://cyberhostnet.com/wp-content/uploads/TELKOMSEL.png"
                }, {
                    name: "XL",
                    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/5/55/XL_logo_2016.svg/1200px-XL_logo_2016.svg.png"
                }, {
                    name: "Axis",
                    imageUrl: "https://3.bp.blogspot.com/-duXJs4wTS9s/WfsyPVPVs0I/AAAAAAAAAIg/O48WVTHrHgMWogUjll5J6BFwFS4PoGGhgCLcBGAs/s1600/Logo_axis_new.png"
                }, {
                    name: "Flexi",
                    imageUrl: "https://upload.wikimedia.org/wikipedia/en/c/c9/Flexi_Logo_2014.png"
                }, {
                    name: "IM3",
                    imageUrl: "http://3.bp.blogspot.com/-ggCD4CenT7Q/UiepiyVXnpI/AAAAAAAAABo/JCNo7gLei0o/s1600/eka.png"
                }
            ]
        }
    }

    

    sampleLoginSubmit=()=>{
        for(let index=0; index < this.state.listUser.length; index++){
            const checkUser = this.state.listUser[index];
            if (checkUser.username.includes(this.state.username)){
                if(checkUser.password.includes(this.state.password)){
                    Alert.alert("Selamat Datang")
                    this.setState({loginState: true})
                } else{
                    Alert.alert("Password anda salah")
                }
            }
        }

        // const searchUser = this.state.listUser.filter(user=> {
        //     user.username.includes(this.state.username);
        // })

        // this.setState({checkUser: searchUser})
    }

    sampleFacebookSubmit=()=>{
        Alert.alert("Anda masuk ke laman facebook")
    }

    sampleGmailSubmit=()=>{
        Alert.alert("Anda nmasuk ke laman gmail")
    }

    sampleSignupSubmit=()=>{
        Alert.alert("Anda Masuk ke laman Signup")
    }

    render(){
        if(this.state.loginState != false){
            return(
                <View style={layouting.main}>
                <ScrollView>
                    <View style={layouting.searchProvider}>
                        <Text style={layouting.searchProvText}>Search Provider : </Text>
                        <TextInput style={layouting.textInput} placeholder="input phone number" keyboardType="number-pad" />
                    </View>
                    <View style={layouting.tableList}>
                        {
                            this.state.listProduct.map((product, index)=>(
                                <ListItem key={index} style={layouting.tableRow}>
                                    <Image 
                                    source={{uri: product.imageUrl}} 
                                    style={{ width: 150, height: 75 }} 
                                    resizeMode="contain"/>
                                    <View style={layouting.tableRowDetails}>
                                        {/* <Text style={layouting.productName}>{product.name}</Text> */}
                                        <TouchableOpacity style={layouting.detailsBtn} onPress={()=>this.onClickDetails(index)}>
                                            <Text style={layouting.detailsText}>Details</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ListItem>
                            ))
                        }
                    </View>
                </ScrollView>
            </View>
            )
        }
        return(
            <View style={styles.container} >
                <Text style={styles.title}>Login Now</Text>

                <Text style={styles.fontStyle}>Username</Text>

                <TextInput 
                style={styles.textInput} 
                placeholder="input username" 
                onChangeText={(username)=>this.setState({username})}
                value={this.state.username}
                />

                <Text style={styles.fontStyle}>Password</Text>

                <TextInput 
                style={styles.textInput} 
                placeholder="input password" 
                secureTextEntry={true} 
                onChangeText={(password)=>this.setState({password})}
                value={this.state.password}
                />
                
                <TouchableOpacity style={styles.button} onPress={() => this.sampleLoginSubmit()}>
                    <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.facebookButton} onPress={() => this.sampleFacebookSubmit()}>
                    <Text style={styles.fbButtonText}>Login with Facebook</Text>
                    <Image
                    source={{uri: "https://clipartspub.com/images/facebook-logo-clipart-vector-8.png"}} 
                    style={{width:50, height: 50, marginLeft: 15}}
                    resizeMode="contain"
                    />
                    {/* <Icon 
                    name=''
                    type="evilicon"
                    color="#000061"
                    /> */}
                </TouchableOpacity>

                <TouchableOpacity style={styles.gmailButton} onPress={() => this.sampleGmailSubmit()}>
                    <Text style={styles.gmailButtonText}>Login with Gmail</Text>
                    <Image
                    source={{uri: "https://clipartcraft.com/images/gmail-logo-svg.png"}} 
                    style={{width:50, height: 50, marginLeft: 15}}
                    resizeMode="contain"
                    />
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
        borderColor: "#e09200",
        borderWidth: 0.8,
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
        backgroundColor: "white",
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
        backgroundColor: "white",
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
        color: "#000061"
    },
    gmailButtonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "red"
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

const layouting = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white"
    },
    searchProvider: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
        paddingHorizontal: 10
    },
    searchProvText:{
        fontSize: 18,
        fontWeight: "bold"
    },
    textInput: {
        width: "50%",
        height: 40,
        borderColor: "grey",
        borderWidth: 0.5,
        borderRadius: 20,
        paddingHorizontal: 15,
        marginHorizontal: 10
    },
    nameFilter: {
        borderColor: "grey",
        borderWidth: 0.5,
    }, 
    tableList: {
        flex: 4
    },
    tableRow:{
        padding: 10
    },
    tableRowDetails: {
        flexDirection: "column",
        marginLeft: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    productName: {
        fontSize:20,
        marginVertical: 10,
    },
    detailsBtn:{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "orange",
        width: 80,
        height: 40,
        borderRadius: 20
    },
    detailsText:{
        fontSize: 15,
        color: "white"
    }
})
  

export default Login;