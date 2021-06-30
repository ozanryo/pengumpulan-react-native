import React, { Component } from 'react'
import { View, Text, Button, TextInput, StyleSheet, Alert, Pressable, TouchableOpacity, SafeAreaView, ScrollView, Platform } from "react-native"
import { Button as ButtonElement, Image, Avatar, ListItem} from "react-native-elements"


class Product extends Component {
    constructor(props){
        super(props);
        this.state={
            listProduct: [
                {
                    pulsa: "5000",
                    harga: 5500
                }, {
                    pulsa: "10000",
                    harga: 10450
                }
            ]
        }
    }
    render(){
        return(
            <View style={prodStyle.main}>
                <View>
                    {
                        this.state.listProduct.map((product, index)=>(
                            <ListItem key={index}>
                                <Text>{product.pulsa}</Text>
                                <Text>{product.harga}</Text>
                            </ListItem>
                        ))
                    }
                </View>
            </View>
        )
    }
}

const prodStyle = StyleSheet.create({
    main:{
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
})

export default Product;