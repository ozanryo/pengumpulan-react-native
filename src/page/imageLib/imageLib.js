import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, SafeAreaView, FlatList } from "react-native"
import {ListItem, Image, Button} from "react-native-elements"
import Icon from "react-native-vector-icons/Ionicons"
import { SwipeRow } from 'react-native-swipe-list-view';
import {connect} from 'react-redux'
import { Modal } from 'react-native';

class ImageLib extends Component {
    constructor(props){
        super(props);
        this.state={
            clickImageCon: false,
            selectImage:""
        }
    }

    clickImage(selectedImage){
        this.setState({clickImageCon: true, selectImage: selectedImage})
    }

    render(){
        return(
            <View style={styles.main} scrollEnabled={true}>
                <FlatList
                        data={this.props.getCaptureImage.imageData} 
                        renderItem={
                            ({item})=>
                            <View style={styles.imageThumbnail}>
                                <TouchableOpacity onPress={()=>this.clickImage(item)}>
                                    <Image
                                        source={{uri:item}}
                                        style={
                                            {width: 160, 
                                                height:160, 
                                                // borderRadius: 10, 
                                                marginHorizontal:10,
                                                marginVertical: 10
                                                , ...styles.shadow}
                                        }
                                    />
                                </TouchableOpacity>
                            </View>
                        }
                        numColumns={2}
                    />
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.clickImageCon}
                >
                    <View style={styles.selectPicModalLayout}>
                        <View style={styles.btnPosition}>
                            <TouchableOpacity style={styles.closePicBtn} onPress={()=>this.setState({clickImageCon: false})}>
                                <Icon name='close' size={20} color='white' />
                            </TouchableOpacity>
                        </View>
                        <Image
                            source={{uri:this.state.selectImage}}
                            style={
                                {width: 500, height:500}
                            }
                            resizeMode="contain"
                        />
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        flexDirection: 'column',
        width:'100%',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    selectPicModalLayout:{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"rgba(1,1,1,0.8)",
        flex: 1
    },
    selectPicLayout:{
        flexDirection: "column",
        paddingVertical: 15,
        marginHorizontal: 5,
        width: "75%",
        justifyContent:"center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 15
    },
    closePicBtn:{
        width: 50, 
        height: 50, 
        borderRadius: 50,
        backgroundColor: '#D92222',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnPosition:{
        flex: 1,
        alignItems: 'flex-end',
        position: 'absolute',
        top: 20,
        bottom: 20,
        right: 20,
        left: 20,
        elevation: 0,
    },
    imageThumbnail:{
        marginVertical: 20
    },
    shadow: {
        shadowColor: "black",
        shadowOffset: {
            width: 0, 
            height: 20,
        },
        shadowOpacity: 0.30,
        shadowRadius: 3.5,
        elevation: 7
    },
})

const mapStateToProps=(state)=>({
    getCaptureImage: state.changeProfileImage
})

export default connect(mapStateToProps)(ImageLib);