import React, { Component } from 'react'
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, ToastAndroid} from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { connect } from 'react-redux';
import {EditUser, AddUser} from '../index'
import AsyncStorage from '@react-native-async-storage/async-storage';
class History2 extends Component {
    constructor(props){
        super(props);
        this.state={
            emptyNotice: false,
            deleteInfo: false,
            detailsInfo: false,
            sampleData: [],
            detailsSampleData: [],
            editCondition: false,
            claimToken: ""
        }
    }
    /** Latihan, Screen Capture ada di branch main readme.md */

    componentDidMount(){
        console.log("History2")
        this.getData()
    }

    async getToken(){
        try{
            const getToken = await AsyncStorage.getItem('token')
            this.setState({claimToken: getToken})
        }catch(e){
            console.log(e)
        }
    }

    async getData(){
        const token = await AsyncStorage.getItem('token')
        const optionFetch = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': 'Bearer '+token
            }
        }

        return fetch("http://207.148.121.63/api/employee?owner=3", optionFetch)
                .then((response)=>response.json())
                .then((ResponseJson)=>{
                    console.log("Data :", ResponseJson)
                    console.log(this.props.getLoginStat)
                    // this.setState({sampleData: ResponseJson.data})
                    this.props.fetchWorkerData(ResponseJson.data)
                    
                })
                .catch((error)=>{
                    console.log("Error :", error)
                })
    }

    async detailsData(index){
        const token = await AsyncStorage.getItem('token')
        const optionFetch = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': 'Bearer '+token
            }
        }

        return fetch("http://207.148.121.63/api/employee/" + index, optionFetch)
                .then((response)=>response.json())
                .then((ResponseJson)=>{
                    console.log("Data :", ResponseJson)
                    this.setState({detailsSampleData: ResponseJson.data, detailsInfo: true})
                    
                })
                .catch((error)=>{
                    console.log("Error :", error)
                })
    }

    async deleteButton(index){
        // this.setState({deleteInfo: true})
        const token = await AsyncStorage.getItem('token')
        const optionFetch = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': 'Bearer '+ token
            }
        }

        return fetch("http://207.148.121.63/api/employee/" + index, optionFetch)
                .then((response)=>response.json())
                .then((ResponseJson)=>{
                    console.log("Data :", ResponseJson)
                    this.setState({detailsSampleData: ResponseJson.data, deleteInfo: true})

                })
                .catch((error)=>{
                    console.log("Error :", error)
                })
    }

    cancelButton(){
        this.setState({deleteInfo: false, detailsInfo: false})
    }

    /** Latihan */
    async deleteOkayButton(index){
        const token = await AsyncStorage.getItem('token')
        this.setState({deleteInfo: false})
        const optionFetch = {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': 'Bearer '+ token
            }
        }
        return fetch('http://207.148.121.63/api/employee/'+ index, optionFetch)
                .then((response)=>response.json())
                .then((ResponseJson)=>{
                    console.log("Data :", ResponseJson)
                    this.getData();
                    ToastAndroid.show("Data sudah dihapus", ToastAndroid.SHORT)
                })
                .catch((error)=>{
                    console.log("Error :", error)
                })
    }

    editUser(){
        this.setState({detailsInfo: false})
        this.props.fetchCurrentData(this.state.detailsSampleData)
        this.props.navigation.navigate('Edit User')
    }

    addUser(){
        this.props.beginEdit()
    }

    render(){
        // if(this.props.getEditResponse.editCondition != false){
        //     return(
        //         <EditUser />
        //     )
        // } 
        // else if(this.props.getAddStat.addCondition != false){
        //     return(
        //         <AddUser />
        //     )
        // }
        return(
            <View contentContainerStyle={styles.main}>
                <View style={styles.titleLayout}>
                    <View style={styles.titleView}>
                        <Text style={styles.titleTextStyle}>Your Worker List</Text>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Create User')}>
                            <Icon name='person-add' size={45} style={{borderLeftWidth: 0.7, borderLeftColor: 'black', paddingLeft:10}} />
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    this.props.getWorkerData.data != null? 
                    <View>
                        <SwipeListView 
                            style={styles.listSwipe}
                            data={this.props.getWorkerData.data}
                            renderItem={(data, rowMap)=>(
                                <View key={rowMap} style={styles.rowFront}>
                                    <Text style={styles.textFront}>{data.item.nama}</Text>
                                </View>
                            )}
                            renderHiddenItem={(data, rowMap) => (
                                <View key={rowMap} style={styles.rowBack}>
                                    <View style={styles.rightRowBack}>
                                        <TouchableOpacity style={{paddingHorizontal:10}} onPress={()=>this.detailsData(data.item.id)}>
                                            <Icon  name='information-circle' size={35} color='#01579B' />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{paddingHorizontal:5}} onPress={()=>this.deleteButton(data.item.id)}>
                                            <Icon name='trash' size={35} color='#B71C1C' />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                            rightOpenValue={-140}
                            closeOnRowOpen={true}
                            closeOnRowBeginSwipe={true}
                            stopLeftSwipe={-1}
                        />
                        {/* {
                            this.state.sampleData.map((item, index)=>(
                                <SwipeRow key={index} style={styles.listSwipe} rightOpenValue={-130}>
                                    <View style={styles.rowBack}>
                                        <View style={styles.rightRowBack}>
                                            <TouchableOpacity style={{paddingHorizontal:5}} onPress={()=>this.detailsData(item.id)}>
                                                <Icon  name='information-circle' size={45} color='#01579B' />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{paddingHorizontal:5}} onPress={()=>this.deleteButton(item.id)}>
                                                <Icon name='trash' size={45} color='#B71C1C' />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={styles.rowFront}>
                                        <Text style={styles.textFront}>{item.nama}</Text>
                                    </View>
                                </SwipeRow>
                            ))
                        } */}
                        <Modal
                            animationType='slide'
                            transparent={true}
                            visible={this.state.deleteInfo}
                        >
                            <View style={styles.deleteModalLayout}>
                                <View style={styles.deleteLayout}>
                                    <Text style={{textAlign: 'center', marginVertical: 20, fontSize: 20}}>Apakah Anda Yakin Akan Menghapus Data?</Text>
                                    <View style={styles.deleteUtil}>
                                        <TouchableOpacity style={styles.yesButton} onPress={()=>this.deleteOkayButton(this.state.detailsSampleData.id)}>
                                            <Text style={styles.deleteBtnText} >Ya</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.noButton} onPress={()=>this.cancelButton()}>
                                            <Text style={styles.deleteBtnText} >Tidak</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        <Modal
                            animationType='slide'
                            transparent={true}
                            visible={this.state.detailsInfo}
                        >
                           <View style={styles.detailsModalLayout}>
                               <View style={styles.detailsLayout}>
                                   <View style={{marginHorizontal: 20, marginVertical: 20}}>
                                        <Text style={{fontWeight: "700", fontSize: 20, color:"black"}}>Nama Pegawai : <Text style={{fontWeight: "200"}}>{this.state.detailsSampleData.nama}</Text></Text>
                                        <Text style={{fontWeight: "700", fontSize: 20, color:"black"}}>NIP : <Text style={{fontWeight: "200"}}>{this.state.detailsSampleData.nip}</Text></Text>
                                        <Text style={{fontWeight: "700", fontSize: 20, color:"black"}}>Alamat : <Text style={{fontWeight: "200"}}>{this.state.detailsSampleData.alamat}</Text></Text>
                                        <Text style={{fontWeight: "700", fontSize: 20, color:"black"}}>Jabatan : <Text style={{fontWeight: "200"}}>{this.state.detailsSampleData.jabatan}</Text></Text>
                                        <Text style={{fontWeight: "700", fontSize: 20, color:"black"}}>Masa Kerja : <Text style={{fontWeight: "200"}}>{this.state.detailsSampleData.masa_kerja}</Text></Text>
                                   </View>
                                   <View style={styles.detailsUtils}>
                                        <TouchableOpacity style={styles.editButton} onPress={()=>this.editUser()}>
                                            <Text style={styles.ediBtnText} >Edit</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.closeButton} onPress={()=>this.cancelButton()}>
                                            <Text style={styles.closeBtnText} >Keluar</Text>
                                        </TouchableOpacity>
                                   </View>
                               </View>
                            </View> 
                        </Modal>
                    </View>
                    :
                    <View style={styles.emptyLayout}>
                        <Icon name='file-tray-outline' size={320} color='#D37878' style={{marginTop: 30}}/>
                        <Text style={styles.emptyText}>Sorry, Currently There Isn't Any Worker Data on the Database</Text>
                    </View>
                }
            </View>
        )
    }
}

const mapStateToProps=(state)=>({
    getWorkerData: state.worker,
    getEditResponse: state.current,
    getLoginStat: state.auth,
    getAddStat: state.add
})

const mapDispatchToProps=(dispatch)=>({
    fetchWorkerData: (workerData)=>dispatch(
        {type:'GET_LIST_WORKER', data:workerData}
    ),
    fetchCurrentData: (workerData)=>dispatch(
        {type: 'GET_CURRENT_DATA', currentWorker: workerData}
    ),
    beginEdit: ()=>dispatch(
        {type: 'ADD_BEGIN'}
    )
})

export default connect(mapStateToProps, mapDispatchToProps)(History2);

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    emptyLayout:{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText:{
        fontSize: 40,
        color: '#D37878',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '80%'
    },
    titleLayout:{
        height: "20%",
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: 'black'
    },
    titleView:{
        flexDirection: 'row'
    },
    titleTextStyle:{
        fontSize: 35,
        fontWeight: '900',
        marginLeft: 15,
        marginRight: "10%"
    },
    listSwipe:{
        width: '100%'
    },
    rowFront:{
        alignItems: 'center',
        backgroundColor: '#D13737',
        borderBottomColor: 'black',
        borderBottomWidth: 0.7,
        justifyContent: 'center',
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        height: 75,
        width: 430
    },
    textFront:{
        color: '#EDD9D9',
        fontSize: 25,
        fontWeight: '700',
        textAlign: 'right'
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 15
    },
    rightRowBack: {
        flexDirection: 'row'
    },
    deleteModalLayout: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"rgba(1,1,1,0.8)",
        flex: 1
    },
    deleteLayout:{
        flexDirection: "column",
        paddingVertical: 15,
        marginHorizontal: 5,
        width: "75%",
        justifyContent:"center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 15
    },
    deleteUtil:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    yesButton: {
        backgroundColor: '#2E7D32',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 40,
        marginHorizontal: 10,
        borderRadius: 25
    },
    noButton: {
        backgroundColor: '#B71C1C',
        alignItems: 'center',
        justifyContent: 'center',
        width: 85,
        height: 40,
        marginHorizontal: 10,
        borderRadius: 25
    },
    deleteBtnText: {
        fontSize: 20,
        color: 'white',
        paddingHorizontal:5
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
    detailsUtils:{
        flexDirection: 'row'
    },
    closeButton:{
        backgroundColor: '#B71C1C',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 40,
        marginHorizontal: 10,
        borderRadius: 25
    }, 
    closeBtnText:{
        fontSize: 20,
        color: 'white',
        paddingHorizontal:5
    },
    editButton:{
        backgroundColor: '#262CAF',
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 40,
        marginHorizontal: 10,
        borderRadius: 25
    },
    ediBtnText:{
        fontSize: 20,
        color: 'white',
        paddingHorizontal:5
    },
})