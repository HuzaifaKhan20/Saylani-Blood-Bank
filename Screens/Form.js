import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Button, Input } from 'react-native-elements';
import { db } from '../firebase';
import { StatusBar } from 'expo-status-bar';

const Form = ({ navigation }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [blood, setBlood] = useState("");
    const [address, setAddress] = useState("");
    const [sign, setSign] = useState("");

    const donate = async () => {
        await db.collection('chats').add({
            FullName: name,
            phoneNum: phone,
            bloodgr: blood,
            address: address,
            sg: sign,
        }).then(() => {
            navigation.goBack();
        })
            .catch((error) => alert(error));
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <StatusBar style="auto" />
                <Input
                    placeholder="Full Name"
                    onChangeText={(e) => setName(e)}
                    onSubmitEditing={donate}
                    value={name}
                />
                <Picker
                    onValueChange={(e) => setBlood(e)}
                    selectedValue={blood}
                >
                    <Picker.Item label="Blood Group" value="Blood Group" />
                    <Picker.Item label="O" value="O" />
                    <Picker.Item label="A" value="A" />
                    <Picker.Item label="AB" value="AB" />
                    <Picker.Item label="B" value="B" />
                </Picker>
                <Picker
                    onValueChange={(e) => setSign(e)}
                    selectedValue={sign}
                >
                    <Picker.Item label="Sign" value="Sign" />
                    <Picker.Item label="+" value="+" />
                    <Picker.Item label="-" value="-" />
                </Picker>
                <Input
                    placeholder="Phone Number"
                    onChangeText={(e) => setPhone(e)}
                    onSubmitEditing={donate}
                    value={phone}
                />
                <Input
                    placeholder="Address"
                    onChangeText={(e) => setAddress(e)}
                    onSubmitEditing={donate}
                    value={address}
                />
                <Button disabled={!name, !blood, !sign, !phone, !address} containerStyle={{backgroundColor: "#000"}} onPress={donate} type="outline" title='Donate Now' />
            </View>
        </ScrollView>
    )
}

export default Form;

const styles = StyleSheet.create({
    container: {
        padding: 30,
        paddingTop: 100,
        backgroundColor: "white",
        paddingBottom: 215,
        height: "100%",
    },
})

