import React from 'react';
import { db } from '../firebase/config';
import {useState} from 'react';

const useFileStore = (collection, condition) => {
    const [documents, setDocuments] = useState([])
    // Lắng nghe sự thay đổi users từ firestore Database
    React.useEffect(() => {
        let collectionRef =db.collection(collection).orderBy('createdAt');
        
        if (condition) {
            if( !condition.comperaValue || !condition.comperaValue.length ) {
                setDocuments([]);
                return;
            }
            collectionRef = collectionRef.where(
                condition.fieldName, 
                condition.operator, 
                condition.comperaValue,
                )
        }
        const unsubscribe = collectionRef.onSnapshot((snapshot) => {
            const documents = snapshot.docs.map((doc) => ({ 
                ...doc.data(), 
                id: doc.id, 
            }));
            setDocuments(documents);
        })
        return unsubscribe;
    },[collection, condition]);
    return documents;
}

export default useFileStore;