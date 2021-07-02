import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, ScrollView, Alert, ToastAndroid } from "react-native"
import {ListItem, Image, Button} from "react-native-elements"
import Icon from "react-native-vector-icons/Ionicons"

class Networking extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            detailsInfo: false,
            showIndex: 0
        }
    }

    componentDidMount(){
        this.getData()
    }

    getData(){
        const optionFetch = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }

        return fetch("https://omdbapi.com/?s=Batman&page=1&apikey=bed4a3d3", optionFetch)
                .then((response)=>response.json())
                .then((ResponseJson)=>{
                    console.log("Data :", ResponseJson)
                    this.setState({data: ResponseJson.Search})
                })
                .catch((error)=>{
                    console.log("Error :", error)
                })
    }

    showDetails(index){
        this.setState({detailsInfo: true, showIndex: index})
    }

    closeDetails(index){
        this.setState({detailsInfo: false})
    }

    orderItem(index){
        Alert.alert("Anda memasuki laman order film " + this.state.data[index].Title)
    }

    render(){
        console.log("Data:", this.state.data.title)
        return(
            <View style={layouting.main}>
                <View style={layouting.titleLayout}>
                    <Icon name="film-outline" size={70} color="yellow"/>
                    <Text style={layouting.title}>Movie <Text style={{color:"yellow"}}>IMDB</Text></Text>
                </View>
                <FlatList 
                data={this.state.data}
                renderItem={
                    ({item, index}) => (
                        <View style={layouting.tableRow}  key={index}>
                            <View style={layouting.tableData}>
                                <Image 
                                source={{uri: item.Poster}} 
                                style={{ width: 150, height: 300 }}
                                resizeMode="contain"
                                />
                                {
                                    this.state.detailsInfo && this.state.showIndex == index ? 
                                    <View style={layouting.movieInfo}>
                                        <Text style={{fontWeight: "700", fontSize: 20, color:"white"}}>Year : <Text style={{fontWeight: "200"}}>{item.Year}</Text></Text>
                                        <Text style={{fontWeight: "700", fontSize: 20, color:"white"}}>IMDB Code: <Text style={{fontWeight: "200"}}>{item.imdbID}</Text></Text>
                                        <Text style={{fontWeight: "700", fontSize: 20, color:"white"}}>IMDB Code: <Text style={{fontWeight: "200"}}>{item.Type}</Text></Text>
                                        <View style={layouting.movieOptions}>
                                            <TouchableOpacity style={layouting.orderButton} onPress={()=>this.orderItem(index)}>
                                                <View style={layouting.orderBtnView}>
                                                    <Icon name="logo-usd" color="white" size={25}/>
                                                    <Text style={layouting.orderBtnText}>Order</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={layouting.closeButton} onPress={()=>this.closeDetails(index)}>
                                                <Icon name="close-outline" size={40} color="white" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    :
                                    <View style={layouting.movieFront}>
                                        <Text style={layouting.movieTitle}>{item.Title}</Text>
                                        <TouchableOpacity style={layouting.detailsButton} onPress={()=>this.showDetails(index)}>
                                            <Text style={layouting.detailsBtnText}>Details</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                        </View>
                    )
                }
                showsVerticalScrollIndicator={true}
                />
            </View>
        )
    }
}

const layouting = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3d3d3d"
    },
    titleLayout:{
        padding:15,
        marginVertical: 10,
        flexDirection: "row",
        alignItems:"center",
        justifyContent:"center"
    },
    title: {
        fontSize: 50, 
        fontWeight: "bold",
        color: "white"
    },
    imdbView:{
        backgroundColor: "yellow",
        width: "40%"
    },
    tableRow: {
        marginVertical: 0,
        marginHorizontal: "5%",
        justifyContent: "center",
        alignItems: 'center',
        borderBottomColor:"white",
        borderTopColor: "white",
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5
    },
    tableData: {
        flexDirection: "row"
    },
    movieFront: {
        flexDirection: "column",
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        width: "50%",
        alignItems: "center",
        justifyContent:"center",
    },
    movieInfo: {
        flexDirection: "column",
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        width: "50%",
        // alignItems: "center",
        justifyContent:"center",
        // borderColor: "black",
        // borderWidth: 0.5,
        // borderRadius: 20
    },
    movieTitle:{
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        color: "white"
    },
    detailsButton: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 15,
        backgroundColor: "#FFA000",
        width: 140,
        height: 55,
        borderRadius: 35
    },
    detailsBtnText:{
        fontSize: 20,
        fontWeight: "bold",
        color: "white"
    },
    closeButton: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 15,
        marginLeft: 10,
        backgroundColor: "#B71C1C",
        width: 50,
        height: 55,
        borderRadius: 20
    },
    orderButton:{
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 15,
        backgroundColor: "#388E3C",
        width: 130,
        height: 55,
        borderRadius: 30
    },
    orderBtnText:{
        fontSize: 20,
        fontWeight: "bold",
        color: "white"
    },
    orderBtnView:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    movieOptions: {
        flexDirection: "row"
    }
})

export default Networking;