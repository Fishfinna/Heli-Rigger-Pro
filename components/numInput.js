import React, { useState, Component } from "react";
import { StyleSheet, TouchableOpacity, Text, View, TextInput} from 'react-native';
import styles from ".././styles/globalStyles";

export default function numInput(props){

    return(
        
        <View style={styles.forms}>
            <Text>
                {props.text}
            </Text>

        <View style={styles.inputField}>
        <TextInput
        style={styles.input}
        placeholder='0'
        onChangeText={props.onChangeText ? props.onChangeText : null} 
        value={props.value}
        keyboardType="numeric"
        >
        </TextInput>
            <Text style={{color:"grey", paddingRight: 10, width: 50}}>
                {props.format}
            </Text>
        </View>
    


        </View>                    
    )
}