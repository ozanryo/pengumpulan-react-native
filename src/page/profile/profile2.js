import React, { Component } from 'react'
import { View, Text, Button, TextInput, StyleSheet, Alert, Pressable, TouchableOpacity, Modal, ScrollView, Platform, ToastAndroid } from "react-native"
import { Button as ButtonElement, Image, Avatar} from "react-native-elements"
import Icon from "react-native-vector-icons/Ionicons"
import {connect} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

class Profile2 extends Component {
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
            editProfileStat: false,
            profile:[],
            detailsInfo: false,
            changePic: false,
        }
    }

    componentDidMount(){
        this.getDataProfile()
    }

    async getDataProfile(){
        try{
            const getProfile = await AsyncStorage.getItem('profile')
            this.setState({
                profile: JSON.parse(getProfile)
            })
        }catch(e){
            console.log(e)
        }
    }

    beginEditProfile(){
        ToastAndroid.show("Mulai Mengedit", ToastAndroid.SHORT)
        this.setState({editProfileStat: true})
    }

    async changeLogout(){
        try{
            await AsyncStorage.removeItem('token')
            this.props.navigation.reset({index:0, routes:[{name: 'LoginNav'}]})
        }catch(e){
            console.log(e)
        }
    }
    logoutProfile(){
        // this.props.logoutUser()
        this.changeLogout();
        ToastAndroid.show("Keluar Aplikasi", ToastAndroid.SHORT)
    }

    optionsButton(){
        ToastAndroid.show("Memasuki Laman Options", ToastAndroid.SHORT)
    }

    gotoCam(){
        this.setState({changePic: false})
        this.props.navigation.navigate('Camera')
    }

    gotoLibrary(){
        this.setState({changePic: false})
        this.props.navigation.navigate('Image Library')
    }


    render(){
        return(
            <View style={styles.main} >
                <View style={styles.imageLayout}>
                    {
                        this.state.profile.photo != '' ? 
                        <TouchableOpacity onPress={() => this.setState({changePic: true})}>
                            <Avatar
                                size={250}
                                rounded
                                source={{uri: this.state.profile.photo}}
                                activeOpacity={0.7}
                                overlayContainerStyle={{backgroundColor:'#90A4AE'}}
                            />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => this.setState({changePic: true})}>
                            <Avatar
                                size={250}
                                rounded
                                icon={{name:'person', type:'Ionicons', size: 200}}
                                onPress={() => this.setState({changePic: true})}
                                activeOpacity={0.7}
                                overlayContainerStyle={{backgroundColor:'#E0E0E0'}}
                            />
                        </TouchableOpacity>
                    }
                </View>
                <View style={styles.profileLayout}>
                    <Text style={styles.nameProfile} >{this.state.profile.name}</Text>
                    <TouchableOpacity style={styles.detailsBtn} onPress={() => this.setState({detailsInfo: true})}>
                        <Icon name='document-text' color='white' size={30}/>
                        <Text style={styles.btnText}>Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionsBtn} onPress={() => this.optionsButton()}>
                        <Icon name='settings' color='white' size={30}/>
                        <Text style={styles.btnText}>Options</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutBtn} onPress={() => this.logoutProfile()}>
                        <Icon name='exit' color='white' size={30}/>
                        <Text style={styles.btnText}>Logout</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.detailsInfo}
                >
                    <View style={styles.detailsModalLayout}>
                        <View style={styles.detailsLayout}>
                            <View style={styles.closeBtnPosition}>
                                <TouchableOpacity style={styles.closePicBtn} onPress={()=>this.setState({detailsInfo: false})}>
                                    <Icon name='close' size={20} color='white' />
                                </TouchableOpacity>
                            </View>
                            <View style={{marginBottom: 15, marginTop: 30}}>
                                <Text style={styles.textProfile}>Nama : {this.state.profile.name}</Text>
                                <Text style={styles.textProfile}>Email : {this.state.profile.email}</Text>
                                <Text style={styles.textProfile}>Phone : {this.state.profile.phone}</Text>
                                <Text style={styles.textProfile}>Alamat : {this.state.profile.alamat}</Text>
                            </View>
                            <TouchableOpacity style={styles.editBtn} onPress={() => this.beginEditProfile()}>
                                <Icon name='create' color='white' size={30}/>
                                <Text style={styles.btnText}>Edit Profile</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.changePic}
                >
                    <View style={styles.changePicModalLayout}>
                        <View style={styles.changePicLayout}>
                            <View style={styles.closeBtnPosition}>
                                <TouchableOpacity style={styles.closePicBtn} onPress={()=>this.setState({changePic: false})}>
                                    <Icon name='close' size={20} color='white' />
                                </TouchableOpacity>
                            </View>
                            <View style={{marginHorizontal: 10, marginTop:40, marginBottom: 20}}>
                                <Text style={{fontSize: 25, fontWeight:'900', textAlign: 'center'}}>Change Profile Picture ?</Text>
                            </View>
                            
                            <View style={{marginVertical: 10, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                                <TouchableOpacity style={styles.cameraBtn} onPress={() => this.gotoCam()}>
                                    <Icon name='camera' color='white' size={30}/>
                                    <Text style={styles.btnText}>From Camera</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.imageBtn} onPress={() => this.gotoLibrary()}>
                                    <Icon name='image' color='white' size={30}/>
                                    <Text style={styles.btnText}>From Library</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={styles.footer}></View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    main:{
        flex:1,
        alignItems: "center",
        justifyContent: 'center',
        flexDirection: "column",
        backgroundColor: "white"
    },
    imageLayout:{
        marginTop: 30,
        marginBottom: 15
    },
    profileLayout:{
        marginBottom: 5,
        width: "90%",
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileCaption:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '90%'
    },
    textProfile:{
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        marginVertical: 5,
        textAlign: 'left'
    },
    nameProfile:{
        fontSize: 40,
        fontWeight: "bold",
        color: "#EF6C00",
        marginVertical: 10,
        textAlign: 'center'
    },
    detailsBtn:{
        backgroundColor: '#31BDC2',
        alignItems: 'center',
        justifyContent: 'center',
        width: "90%",
        height: 50,
        marginVertical: 5,
        borderRadius: 25,
        flexDirection: 'row'
    },
    optionsBtn:{
        backgroundColor: '#514C51',
        alignItems: 'center',
        justifyContent: 'center',
        width: "90%",
        height: 50,
        marginVertical: 5,
        borderRadius: 25,
        flexDirection: 'row'
    },
    editBtn:{
        backgroundColor: '#31BDC2',
        alignItems: 'center',
        justifyContent: 'center',
        width: "80%",
        height: 50,
        marginVertical: 5,
        borderRadius: 25,
        flexDirection: 'row'
    },
    logoutBtn:{
        backgroundColor: '#E90F24',
        alignItems: 'center',
        justifyContent: 'center',
        width: "90%",
        height: 50,
        marginVertical: 5,
        borderRadius: 25,
        flexDirection: 'row'
    },
    closeBtn:{
        backgroundColor: '#E90F24',
        alignItems: 'center',
        justifyContent: 'center',
        width: "80%",
        height: 50,
        marginVertical: 5,
        borderRadius: 25,
        flexDirection: 'row'
    },
    btnText:{
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        marginLeft: 10
    },
    detailsModalLayout: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"rgba(1,1,1,0.8)",
        flex: 1
    },
    detailsLayout:{
        flexDirection: "column",
        paddingVertical: 15,
        marginHorizontal: 5,
        width: "75%",
        justifyContent:"center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 15
    },
    changePicModalLayout:{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"rgba(1,1,1,0.8)",
        flex: 1
    },
    changePicLayout:{
        flexDirection: "column",
        paddingVertical: 15,
        marginHorizontal: 5,
        width: "75%",
        justifyContent:"center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 15
    },
    footer:{
        height: "25%"
    },
    cameraBtn:{
        backgroundColor: '#1C191C',
        alignItems: 'center',
        justifyContent: 'center',
        width: "80%",
        height: 50,
        marginVertical: 5,
        borderRadius: 25,
        flexDirection: 'row'
    },
    imageBtn:{
        backgroundColor: '#317AAD',
        alignItems: 'center',
        justifyContent: 'center',
        width: "80%",
        height: 50,
        marginVertical: 5,
        borderRadius: 25,
        flexDirection: 'row'
    },
    closePicBtn:{
        width: 30, 
        height: 30, 
        borderRadius: 30,
        backgroundColor: '#D92222',
        alignItems: 'center',
        justifyContent: 'center'
    },
    closeBtnPosition:{
        flex: 1,
        alignItems: 'flex-end',
        position: 'absolute',
        top: 20,
        bottom: 20,
        right: 20,
        left: 20,
        elevation: 0,
    }
})

const mapDispatchToProps=(dispatch)=>({
    logoutUser: ()=>dispatch({
        type:'LOGOUT'
    })
})

export default connect(null, mapDispatchToProps) (Profile2);