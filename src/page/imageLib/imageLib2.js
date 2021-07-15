import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, SafeAreaView, FlatList } from "react-native"
import {ListItem, Image, Button} from "react-native-elements"
import Icon from "react-native-vector-icons/Ionicons"
import { SwipeRow } from 'react-native-swipe-list-view';
import {connect} from 'react-redux'
import { Modal } from 'react-native';

class ImageLib2 extends Component {
    constructor(props){
        super(props);
        this.state={
            clickImageCon: false,
            selectImage:"",
            uploadPic: false
        }
    }

    clickImage(selectedImage){
        this.setState({clickImageCon: true, selectImage: selectedImage})
    }

    render(){
        return(
            <View style={styles.main}>
                <View style={styles.titleLayout}>
                    <View style={styles.titleView}>
                        <Text style={styles.titleTextStyle}>Album List</Text>
                        <TouchableOpacity onPress={()=>this.setState({uploadPic: true})}>
                            <Icon name='add-circle' size={45} style={{borderLeftWidth: 0.7, borderLeftColor: 'black', paddingLeft:10}} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{width: '100%', alignItems:'center'}} scrollEnabled={true}>
                    {/* {
                        this.props.getCaptureImage.imageData.map((item, index)=>(
                            <View key={index} style={styles.imageThumbnail}>
                                <TouchableOpacity onPress={()=>this.clickImage(item)}>
                                    <Image
                                        source={{uri:item}}
                                        style={
                                            {width: 300, height:300, borderRadius: 25, ...styles.shadow}
                                        }
                                    />
                                </TouchableOpacity>
                            </View>
                        ))
                    } */}
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
                            {/* <View style={styles.imageOptions}>
                                <View style={{flexDirection: 'row', width: '100%', height: 90}}>
                                    <TouchableOpacity style={styles.imageOptBtn}>
                                        <Icon name='trash' size={30} color='black' />
                                        <Text style={styles.imageOptBtnText}>DELETE</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.imageOptBtn}>
                                        <Icon name='schare-social' size={30} color='black' />
                                        <Text style={styles.imageOptBtnText}>SHARE</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.imageOptBtn}>
                                        <Icon name='information-circle' size={30} color='black' />
                                        <Text style={styles.imageOptBtnText}>DETAILS</Text>
                                    </TouchableOpacity>
                                </View>
                            </View> */}
                        </View>
                    </Modal>
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={this.state.uploadPic}
                    >
                        <View style={styles.changePicModalLayout}>
                            <View style={styles.changePicLayout}>
                                <View style={styles.closeBtnPosition}>
                                    <TouchableOpacity style={styles.closePicBtn} onPress={()=>this.setState({uploadPic: false})}>
                                        <Icon name='close' size={20} color='white' />
                                    </TouchableOpacity>
                                </View>

                                <View style={{marginHorizontal: 10, marginTop:40, marginBottom: 20}}>
                                    <Text style={{fontSize: 25, fontWeight:'900', textAlign: 'center'}}>Upload Picture To Album?</Text>
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
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={false}
                    >
                        <View>
                            <View>
                                <Text>Ini Modal Hapus</Text>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    titleLayout:{
        height: 80,
        width:'100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: 'black',
        borderTopWidth: 0.5,
        borderTopColor: 'black',
    },
    titleView:{
        flexDirection: 'row'
    },
    titleTextStyle:{
        fontSize: 35,
        fontWeight: '900',
        marginLeft: 15,
        marginRight: "28%",
        marginLeft: '10%'
    },
    selectPicModalLayout:{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"rgba(1,1,1,0.8)",
        flex: 1
    },
    selectPicLayout:{
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
    imageOptions:{
        position: 'absolute',
        bottom: 30,
        right: 20,
        left: 20,
        elevation: 0,
        backgroundColor: 'white',
        borderRadius: 15,
        height: 90,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    imageOptBtn:{
        alignItems: 'center',
        justifyContent: 'center',
        width:'20%',
        height: '20%'
    },
    imageOptBtnText:{
        fontSize: 20,
        color: 'black',
        fontWeight:'900'
    },
    imageThumbnail:{
        marginVertical: 5,
        marginHorizontal: 5
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
    uploadBtn:{
        width: 70,
        height: 70,
        borderRadius: 70,
        backgroundColor: 'blue',
        alignItems:'center',
        justifyContent: 'center'
    },
    uploadBtnPosition:{
        flex: 2,
        alignItems: 'flex-end',
        position: 'absolute',
        bottom: 150,
        right: 20,
        left: 20,
        elevation: 0,
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
    },
    btnText:{
        fontSize: 20,
        color: 'white',
        marginLeft: '10%'
    }
})

const mapStateToProps=(state)=>({
    getCaptureImage: state.changeProfileImage
})

export default connect(mapStateToProps)(ImageLib2);