import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native"
import {ListItem, Image, Button} from "react-native-elements"
import Icon from "react-native-vector-icons/Ionicons"
import { SwipeRow } from 'react-native-swipe-list-view';
import {RNCamera} from "react-native-camera"
import {connect} from 'react-redux'
import { Platform } from 'react-native';
import { Modal } from 'react-native';
import { ActivityIndicator } from 'react-native';

class CameraPage extends Component {
    constructor(props){
        super(props);
        this.state={
            loadingCondition: false,
            imageTaken: ""
        }
    }

    async onGetPic(){
        if(this.camera){
            const options = { quality:0.5, base64:true}
            const data = await this.camera.takePictureAsync(options)
            console.log("Data Cam : ", data)
            this.props.captureImage(data.uri)

            console.log("Get Pic : ", this.props.getCaptureImage.imageData)

            this.fetchUploadData(data.uri)

        }
    }

    async saveProfile(imageUrl){
        try{
            await AsyncStorage.setItem('profile', imageUrl)
        }catch(e){
            console.log(e)
        }
    }

    createFormData(photo, body){
        const data = new FormData();

        data.append('photo', {
            // name: photo.fileName,
            // type: photo.type,
            image: 
                Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', '')
        });

        // Object.keys(body).forEach(key=>{
        //     data.append(key, body[key]);
        // });

        return data;
    }

    async fetchUploadData(photo){
        const token = await AsyncStorage.getItem('token')
        console.log(token)
        // this.setState({submitCondition: true})

        let NewForm = new FormData();

        const optionFetch = {
            method: "POST",
            headers: {
                Accept: "multipart/form-data",
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer ' + token
            },
        }

        optionFetch.body = new FormData();
        optionFetch.body.append('image', {uri:photo, name:'Profile.jpg', type:'image/jpg'})

        return fetch("http://207.148.121.63/api/upload", optionFetch)
                .then((response)=>response.json())
                .then((ResponseJson)=>{
                    console.log("Data :", ResponseJson.photo)
                    this.saveProfile(ResponseJson.photo)
                    
                })
                .catch((error)=>{
                    console.warn("Error :", error)
                })
    }

    render(){
        return(
            <View style={styles.main}>
                <RNCamera 
                    ref={
                        ref => {
                            this.camera = ref
                        }
                    }
                    androidCameraPermissionOptions={{
                        title: 'permission to use camera',
                        message: 'we need your permission to use yout camera',
                        buttonPositive: 'okay',
                        buttonNegative: 'cancel'
                    }}
                    style={{flex:1}}
                >
                    <View style={styles.btnPosition}>
                        <TouchableOpacity style={styles.takePicBtn} onPress={()=>this.onGetPic()}>
                            <Icon name='camera' size={50} color='red'/>
                        </TouchableOpacity>
                    </View>
                    {/* <Modal
                        animationType='slide'
                        transparent={true}
                        visible={false}
                    >
                        <View>
                            <View>
                                {
                                    this.state.loadingCondition ? 
                                    <ActivityIndicator />
                                    :
                                    <View>
                                        <Text>Menggunakan Sebagai Foto Profil Anda ?</Text>
                                    </View>
                                }
                            </View>
                        </View>
                    </Modal> */}
                </RNCamera>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    btnPosition:{
        flex: 1,
        alignItems: 'center',
        position: 'absolute',
        bottom: 150,
        right: 20,
        left: 20,
        elevation: 0,
    },
    takePicBtn:{
        width: 80, 
        height: 80,
        borderRadius: 80,
        backgroundColor:'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const mapStateToProps=(state)=>({
    getCaptureImage: state.changeProfileImage
})

const mapDispatchToProps=(dispatch)=>({
    captureImage:(imageCap)=>dispatch({
        type:'GET_CAM_DATA', imageData: imageCap
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(CameraPage);