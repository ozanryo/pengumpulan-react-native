import React, { Component } from 'react'

export default class Layouting extends Component {
    render(){
        return(
            <View style={layouting.main}>
                <View style={layouting.container1}><Text style={layouting.textInfo}>Layout flex 1</Text></View>
                <View style={layouting.containter2}>
                    <Text style={layouting.textInfo}>Layout flex 2</Text>
                    <Text style={layouting.textInfo}>flex direction row</Text>
                </View>
                <View style={layouting.containter3}>
                    <Text style={layouting.textInfo}>Layout flex 3</Text>
                    <Text style={layouting.textInfo}>flex direction column</Text>
                </View>
            </View>
        )
    }
}

const layouting = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "blue"
    }, 
    container1: {
        alignItems: "center",
        flex: 1,
        backgroundColor: "red"
    }, 
    containter2: {
        alignItems: "center",
        justifyContent:"center",
        flexDirection: "row",
        flex: 2,
        backgroundColor: "orange"
    },
    containter3: {
        alignItems: "center",
        justifyContent:"center",
        flexDirection: "column",
        flex: 3,
        backgroundColor: "black"
    },
    textInfo: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
        margin: 10
    }
})