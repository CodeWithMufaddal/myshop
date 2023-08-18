import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Footer from '../footer/footer';
import Navbar from '../navbar/navbar';

const PrivateRoute = ({ component: Component, ...props }) => {
	const { user } = useSelector((state) => state.auth);

	return (
		<>
			<Navbar />
			{
				!user
					? <Navigate to={{ pathname: '/login', state: { from: props.location } }} replace />
					// : <Component {...props} />
					: <Outlet {...props} />
			}
			<Footer />
		</>
	);
};

export default PrivateRoute;
