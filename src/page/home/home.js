import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native"
import {ListItem, Image, Button} from "react-native-elements"

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
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
                }]
        }
    }

    onClickDetails=(index)=>{
        Alert.alert("Anda memasuki detail Provider " + this.state.listProduct[index].name)
    }

    render(){
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
}

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

export default Home;