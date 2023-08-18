import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { errorToast, successToast } from '../../utils';
import { registerUser } from '../../store/auth/authActions';

export const Register = () => {
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.auth);
	const [validationError, setValidationError] = useState('');
	let fullName = useRef('');
	let email = useRef('');
	let password = useRef('');

	const signUpUser = (e) => {
		e.preventDefault();
		e.stopPropagation();

		// validation for all fields
		if (
			!fullName.value.trim()
			|| !email.value.trim()
			|| !password.value.trim()
		) {
			setValidationError('All fields are required');
		} else {
			dispatch(registerUser({
				fullName: fullName.value,
				email: email.value,
				password: password.value,
			}))
				.unwrap()
				.then(() => {
					console.log('reach out at least hear')
					e.target.reset();
					successToast('User Registered Successfully');
				})
				.catch((errorData) => {
					errorToast(errorData.error);
				});
		}
	};

	return (
		<>
			{/* <section className="p-8">	
			<form onSubmit={signUpUser}>
				<div>
					<h1>Sign Up</h1>
					<p className="mt-4 mb-8">If you already have an account registered <br/>
						You can <Link to='/login' className="link">Login here !</Link>
					</p>
				</div>
				<div>
					<label className="block text-primary-grey text-[13px] font-medium pb-1">Full Name</label>
					<div className="relative">
						<input
							className="inputField mb-8 w-full"
							name="fullName"
							placeholder="Enter your full name"
							id="fullName"
							onChange={() => setValidationError('')}
							ref={(e) => { fullName = e; } }
							type="text"
							required />
					</div>
				</div>
				<div>
					<label className="block text-primary-grey text-[13px] font-medium pb-1">Email</label>
					<div className="relative">
						<input
							className="inputField mb-8 w-full"
							name="email"
							placeholder="Enter your email"
							id="email"
							onChange={() => setValidationError('')}
							ref={(e) => { email = e; } }
							type="email"
							required />
					</div>
				</div>
				<div>
					<label className="block text-primary-grey text-[13px] font-medium pb-1">Password</label>
					<div className="relative">
						<input
							className="inputField mb-8 w-full"
							name="password"
							placeholder="Enter your password"
							id="password"
							onChange={() => setValidationError('')}
							ref={(e) => { password = e; } }
							type="password"
							required />
					</div>
				</div>
				{validationError && <p className="text-left text-red-500">{validationError}</p>}
				<button type="submit" className="primaryButton">
					{loading ? 'Loading...' : 'Register'}
				</button>
			</form>
		</section> */}

			<section className="bg-gray-50 dark:bg-gray-900">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Create and account
							</h1>
							<form className="space-y-4 md:space-y-6" action="#">
								<div>
									<label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
									<input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
								</div>
								<div>
									<label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
									<input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
								</div>
								<div>
									<label for="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
									<input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
								</div>
								<div className="flex items-start">
									<div className="flex items-center h-5">
										<input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
									</div>
									<div className="ml-3 text-sm">
										<label for="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="link" href="#">Terms and Conditions</a></label>
									</div>
								</div>
								<button type="submit" className="primaryButton">
									{loading ? 'Creating...' : 'Create an account'}
								</button>
								<p className="text-sm font-light text-gray-500 dark:text-gray-400">
									Already have an account?
									<Link to='/login' className="link"> Login here!</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
