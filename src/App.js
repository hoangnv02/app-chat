import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
// import { ChatEngine } from 'react-chat-engine';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ChatRoom from './components/ChatRoom';
import AuthProvider from './Context/Authprovider';
import AppProvider from './Context/AppProvider';
import AddRoomModal from './components/Modal/AddRoomModal';
import AddMemberModal from './components/Modal/AddMemberModal';

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>	
				<AppProvider>
					<Switch>
						<Route component={Login} path='/login' />
						<Route component={ChatRoom} path='/' />
					</Switch>
					<AddRoomModal />
					<AddMemberModal />
				</AppProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
