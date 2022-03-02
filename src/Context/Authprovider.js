import React,{useState} from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase/config';
import { Spin } from 'antd';

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {

    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    // Kiểm tra đăng nhập thành công
    const history = useHistory();

    React.useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {     
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                setUser({
                    displayName, 
                    email, 
                    uid, 
                    photoURL,
                });
                setIsLoading(false);
                history.push('/');
                return;
            }
            // reset user info
            setUser({});
            setIsLoading(false);
            history.push('/login');
        });
        return () => {
            unsub();
        };
    }, [history]);

    return (
        <AuthContext.Provider value={{ user }}>
            {isLoading ? <Spin /> : children}
        </AuthContext.Provider>
    )
}