import React, { useState } from 'react';
import useFileStore from '../hooks/useFileStore';
import { AuthContext } from './Authprovider';



export const AppContext = React.createContext();

export default function AppProvider({ children }) {

    const [isAddRoom, setIsAddRoom] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState('');
    const [isAddMember, setIsAddMember] = useState(false);
    
    const {
        user: { uid },
      } = React.useContext(AuthContext);
    

    const roomsCondition = React.useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            comperaValue: uid,
        };
    }, [uid]);

    const rooms = useFileStore('rooms', roomsCondition);
    // console.log(rooms);

    const selectedRoom = React.useMemo(
        () => rooms.find((room) => room.id === selectedRoomId) || {}, 
        [rooms, selectedRoomId]
    );
    
    const usersCondition = React.useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            comperaValue: selectedRoom.members,
        };
    }, [selectedRoom.members]);
    const members = useFileStore('users', usersCondition);

    // console.log(members);

    return (
        <AppContext.Provider value={{ 
            rooms, 
            members,
            isAddRoom, 
            setIsAddRoom, 
            isAddMember, 
            setIsAddMember,
            selectedRoom,
            selectedRoomId, 
            setSelectedRoomId
        }}>
            {children}
        </AppContext.Provider>
    );
}