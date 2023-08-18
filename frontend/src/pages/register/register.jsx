import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { errorToast, successToast } from '../../utils';
import { registerUser } from '../../store/auth/authActions';

export const Register = () => {
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.auth);
	const [validationError, setValidationError] = useState('');
	const [showPassword, setShowPassword] = useState(false)

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
									<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
									<input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
								</div>
								<div>
									<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
									<div className='relative  container'>
										<input className="inputField w-full mb-8" name="password" id="password" ref={(e) => { password = e; }} type={showPassword ? "text" : "password"} placeholder="••••••••" required />
										<button
											className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
											onClick={() => setShowPassword((prevPass) => !prevPass)}
											type='button'
										>
											{showPassword ?
												<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
													<path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
													<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
												</svg>

												:
												<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
													<path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
												</svg>
											}
										</button>
									</div>
								</div>
								<div>
									<label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
									<input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
								</div>
								<div className="flex items-start">
									<div className="flex items-center h-5">
										<input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
									</div>
									<div className="ml-3 text-sm">
										<label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="link" href="#">Terms and Conditions</a></label>
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
