import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, ScrollView, Alert, ToastAndroid } from "react-native"
import {Image, Button} from "react-native-elements"
import Icon from "react-native-vector-icons/Ionicons"

class Lifecycle extends Component {
    constructor(props){
        super(props);
        this.state={
            user: [],
            absenStat: false,
            izinStat: false,
            selectedIndex: 0
        }
    }

    componentDidMount(){
        console.log("compDidMount")

        const fetchUser = [
            {
                firstname: "Budi",
                lastname: "Hartono",
                umur: 20,
                pekerjaan: "Accountant",
                hobi: "Soccer",
                domisili: "Jakarta",
                absensi: 0,
                izin: 0,
                // gaji: 0
            }, {
                firstname: "Aisyah",
                lastname: "Maharani",
                umur: 25,
                pekerjaan: "Medical Physics",
                hobi: "Read",
                domisili: "Bandung",
                absensi: 0,
                izin: 0,
                // gaji: 0
            }
        ]

        this.setState(
            {
                user: fetchUser,
                absenStat: false,
                izinStat: false,
                selectedIndex: 0
            }
        )

        // if(this.state.absenStat == true || this.state.izinStat == true){
        //     this.setState(
        //         {
        //             absenStat: false,
        //             izinStat: false,
        //             selectedIndex: 0
        //         }
        //     )
        // } else{
        //     this.setState(
        //         {
        //             user: fetchUser,
        //             absenStat: false,
        //             izinStat: false,
        //             selectedIndex: 0
        //         }
        //     )
        // }
    }

    componentDidUpdate(){
        console.log("compDidUpdate")
        // if(this.state.absenStat == true){
        //     const allData = this.state.user
        //     const absensiList = this.state.user[this.state.selectedIndex]

        //     const absenData = {
        //         firstname: absensiList.firstname,
        //         lastname: absensiList.lastname,
        //         umur: absensiList.umur,
        //         pekerjaan: absensiList.pekerjaan,
        //         hobi: absensiList.hobi,
        //         domisili: absensiList.domisili,
        //         absensi: absensiList.absensi + 1,
        //         izin: absensiList.izin,
        //     }

        //     allData.splice(this.state.selectedIndex, 1, absenData)

        //     this.setState({user: allData})
        // }

    }

    absensiUser(index){
        const allData = this.state.user
        const absensiList = this.state.user[index]

        const absenData = {
            firstname: absensiList.firstname,
            lastname: absensiList.lastname,
            umur: absensiList.umur,
            pekerjaan: absensiList.pekerjaan,
            hobi: absensiList.hobi,
            domisili: absensiList.domisili,
            absensi: absensiList.absensi + 1,
            izin: absensiList.izin,
        }

        allData.splice(index, 1, absenData)

        this.setState({user: allData})

        // this.setState({absenStat: true, selectedIndex: index})
    }

    izinUser(index){
        const allData = this.state.user
        const izinList = this.state.user[index]
        
        const izinData = {
            firstname: izinList.firstname,
            lastname: izinList.lastname,
            umur: izinList.umur,
            pekerjaan: izinList.pekerjaan,
            hobi: izinList.hobi,
            domisili: izinList.domisili,
            absensi: izinList.absensi,
            izin: izinList.izin + 1,
        }

        allData.splice(index, 1, izinData)

        this.setState({user: allData})
    }


    render(){
        console.log("Render")
        return(
            <View style={layouting.main}>
                
                <View style={layouting.listTable}>
                    <FlatList 
                        data={this.state.user}
                        renderItem={({item, index}) => (
                            <View key={index} style={layouting.tableRow}>
                                <Text style={layouting.tableData}>{item.firstname} {item.lastname}</Text>
                                <Text style={layouting.tableData}>{item.umur}</Text>
                                <Text style={layouting.tableData}>{item.pekerjaan}</Text>
                                <Text style={layouting.tableData}>{item.hobi}</Text>
                                <Text style={layouting.tableData}>{item.domisili}</Text>

                                <View style={layouting.utilTabel}>
                                    <TouchableOpacity style={layouting.utilOptions} onPress={()=>this.absensiUser(index)}>
                                        <Icon 
                                            name="enter-outline"
                                            size={40}
                                            color="blue"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={layouting.utilOptions} onPress={()=>this.izinUser(index)}>
                                        <Icon 
                                            name="exit-outline"
                                            size={40}
                                            color="red"
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View style={layouting.utilTabel}>
                                    <Text style={layouting.tableData}>Absensi : {item.absensi}</Text>
                                    <Text style={layouting.tableData}>Izin : {item.izin}</Text>
                                </View>

                                {/* <Text style={layouting.tableData}>Gaji : {item.gaji}</Text> */}
                            </View>)
                        }
                        showsVerticalScrollIndicator={true}
                        showsHorizontalScrollIndicator={true}
                    />
                    
                </View>
            </View>
        )
    }
}

const layouting = StyleSheet.create({
    main:{
        flex: 1,
        backgroundColor: "white"
    },
    listTable:{
        flex: 3,
        color: "black",
        flexDirection: "column"
    },
    tableRow:{
        backgroundColor: "white",
        paddingLeft: 20, 
        marginBottom: 10, 
        borderColor: 'grey', 
        borderBottomWidth: 0.5,
        flexDirection: "column",
    },
    tableData:{
        marginHorizontal: 10,
        marginVertical: 5,
        textAlign: "center",
        fontSize: 20
    },
    utilTabel: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    utilOptions: {
        marginHorizontal: 15,
        marginVertical: 10
    },
    containter4: {
        marginHorizontal: "20",
        flexDirection: "row",
        flex: 1,
        backgroundColor: "white",
        marginVertical: 5
    },
    buttonPosition:{
        flexDirection: "row"
    },
    btnText:{
        fontSize: 15,
        color: "white",
        fontWeight: "bold"
    },
    button:{
        alignItems: "center",
        justifyContent: "center",
        width: 90,
        height: 70,
        borderRadius: 20,
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: "green"
    },
    saveButton:{
        alignItems: "center",
        justifyContent: "center",
        width: 90,
        height: 70,
        borderRadius: 20,
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: "blue"
    },
    cancelButton:{
        alignItems: "center",
        justifyContent: "center",
        width: 90,
        height: 70,
        borderRadius: 20,
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: "red"
    },
    textInfo: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
        margin: 10
    },
    textCon3: {
        color: "black",
        fontSize: 20
    },
    textInput: {
        width: "50%",
        height: 40,
        borderColor: "grey",
        borderWidth: 0.5,
        borderRadius: 20,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        color: "black"
    },
})

export default Lifecycle;