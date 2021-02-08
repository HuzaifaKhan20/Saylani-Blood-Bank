import React from 'react';
import { ListItem } from 'react-native-elements';

const List = ({ id, phoneNum, FullName, bloodgr, address, sg }) => {
    return (
        <ListItem key={id} onPress={() => (id, phoneNum, FullName, bloodgr, address, sg)} bottomDivider>
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }}>
                    Name: {FullName}{'\n'}
                    Phone Number: {phoneNum}{'\n'}
                    Blood Group: {bloodgr}{sg}{'\n'}
                    Address: {address}
                </ListItem.Title>
            </ListItem.Content>
        </ListItem>
    )
}

export default List;