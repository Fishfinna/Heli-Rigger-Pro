import { StyleSheet, Text, Keyboard, View, 
TouchableWithoutFeedback, Image, ScrollView, RefreshControl, Modal} from 'react-native';
import styles from ".././styles/globalStyles";
import React, {useState, useEffect} from "react"
import { Icon, SearchBar } from 'react-native-elements'
import NumInput from "./numInput.js";
import FlatButton from './button.js';



export default function Reviewform({ setModal }) { 

    // delocious mini donuts, melt in your mouth, 10$


    // refresh control
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => { setRefreshing(false); } , 250);
    }, []);


    return(
        <View style={styles.modalBody}>
        {/* return */}
          <TouchableWithoutFeedback onPress={() => setModal(false)}>
          <View style={styles.cancel}> 
            <Icon name="arrow-back" size={40} color="#4d4d4D" type="material"/> 
            <Text style={styles.cancelText}> RETURN </Text>
          </View>
          </TouchableWithoutFeedback>

        {/* Custom */}
        {/* line separator */}
 
        <View style={{backgroundColor: "#F8F5F5", padding: 10}}>
        <Text style={styles.title}>use custom value</Text>
          <NumInput 
            text="Custom Density:" 
            value= "0"
            format= "kg/m"
          />
          <FlatButton text="set custom value" width="200" alignSelf="center"/>
        </View>

          {/* line separator */}
          <View
            style={{
                borderWidth: 1,
                borderColor: "#4D4D4D",
                width: "100%",
                marginBottom: 10,
                
            }}/>

          {/* Preset */}
          <Text style={styles.title}>use preset value</Text>
          <SearchBar/>
        </View>
    )
}