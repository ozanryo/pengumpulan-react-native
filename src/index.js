import React, { Component } from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import allReducers from './reducer'
import Navigator from './component/navigation/navigation'

export default class Index extends Component {
    constructor(props){
        super(props);
        this.state={}
    }

    render(){
        return(
            <Provider store={createStore(allReducers)}>
                <View style={{flex:1}}>
                    <Navigator />
                </View>
            </Provider>
        )
    }
}
