import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { loginUser } from '../../store/auth/authActions';
import { errorToast } from '../../utils';

export const Login = () => {
	const { user, loading } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	let email = useRef('');
	let password = useRef('');

	useEffect(() => {
		if (user) {
			navigate('/', { successLogin: true });
		}
	}, [navigate, user]);

	const signinUser = async (e) => {
		e.preventDefault();

		dispatch(loginUser({
			email: email.value,
			password: password.value
		}))
			.unwrap()
			.catch((errorData) => {
				errorToast(errorData.error);
			});
	};

	return (
		<section className="bg-gray-50 dark:bg-gray-900">
			<div className="flex flex-col items-center justify-center px-6 py-4 mx-auto md:h-screen lg:py-0">

				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Sign in to your account
						</h1>
						<form className="space-y-4 md:space-y-6" onSubmit={signinUser}>
							<div>
								<label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
								<input className="inputField w-full mb-8" name="email" placeholder="name@gmail.com" id="email" ref={(e) => { email = e; }} type="email" required />
							</div>
							<div>
								<label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
								<input className="inputField w-full mb-8" name="password" id="password" ref={(e) => { password = e; }} type="password" placeholder="••••••••" required />
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-start">
									<div className="flex items-center h-5">
										<input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
									</div>
									<div className="ml-3 text-sm">
										<label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
									</div>
								</div>
								<a href="#" className="text-sm link">Forgot password?</a>
							</div>
							<button type="submit" className="primaryButton">
								{loading ? 'Loading...' : 'Login'}
							</button>
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Don’t have an account yet?
								<Link to='/register' className="link"> Register here!</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};
