import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import List from './List';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { auth, db } from '../firebase';

const DetailScreen = ({ navigation }) => {
    const [chats, setChats] = useState([]);

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Saylani Blood Bank')
        })
    };

    useEffect(() => {
        const xk = db.collection('chats').onSnapshot((snapshot) => (
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        )
        );
        return xk;
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Donors",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "red" },
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{
                    justifyContent: "space-around",
                    width: 80,
                    flexDirection: "row",
                }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Form')}>
                    <Text style={styles.donateNow}>Donate Now</Text>
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{ marginLeft: 20 }}>
                <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
                <Text style={styles.signout}>Sign out</Text>
                </TouchableOpacity>
            </View>
            ),
        });
    }, [navigation]);

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
            <StatusBar style="auto" />
                {chats.map(({ id, data: { FullName,phoneNum,bloodgr, address, sg }}) => (
                    <List
                    key={id} 
                    id={id} 
                    FullName={FullName}
                    phoneNum={phoneNum}
                    bloodgr={bloodgr}
                    address={address}
                    sg={sg}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default DetailScreen;

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    signout: {
        width: 65,
        backgroundColor: "#000",
        height: 40,
        paddingTop: 10,
        borderRadius: 20,
        color: "white",
        textAlign: 'center',
        marginRight: 10
    },
    donateNow: {
        width: 100,
        backgroundColor: "#000",
        height: 40,
        paddingTop: 10,
        borderRadius: 20,
        color: "white",
        textAlign: 'center',
        marginLeft: 30
    }
});
