import { Route, Routes } from 'react-router-dom';
import { Home } from '../../pages/home';
import { Login } from '../../pages/login';
import { Register } from '../../pages/register';
import Styles from './app.module.scss';
import { Toaster } from 'react-hot-toast';
import PublicRoute from '../publicRoute/publicRoute';
import PrivateRoute from '../privateRoute/privateRoute';

const App = () => {
	return (
		<div>
			<Layout>
				<Routes>
					{/* Private Routes */}
					<Route path="/" element={<PrivateRoute />}>
						<Route index element={<Home />} />
					</Route>
					
					{/* Public Routes */}
					<Route path="/" element={<PublicRoute restricted={true} />}>
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
					</Route>
				</Routes>
			</Layout>
		</div>
	);
}

const Layout = ({ children }) => (
	<div className={Styles.mainContainer}>
		<Toaster />
		<div className={Styles.contentContainer}>
			{children}
		</div>
	</div>
);

export default App;
