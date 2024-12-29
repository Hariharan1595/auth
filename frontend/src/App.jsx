import { Navigate, Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShapes";




import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import EmailVerification from "./pages/EmailVerification";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/signin' replace />;
	}

	if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user.isVerified) {
		return <Navigate to='/' replace />;
	}

	return children;
};

function App() {
	const { isCheckingAuth, checkAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);


	return (
		<div
			className='min-h-screen bg-gradient-to-br
    from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'
		>
			<FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
			<FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
			<FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />

			<Routes>
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/signup'
					element={
						<RedirectAuthenticatedUser>
							<Signup />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route
					path='/signin'
					element={
						<RedirectAuthenticatedUser>
							<Signin />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route path='/verify-email' element={<EmailVerification />} />
				<Route
					path='/forgot-password'
					element={
						<RedirectAuthenticatedUser>
							<ForgotPassword />
						</RedirectAuthenticatedUser>
					}
				/>

				<Route
					path='/reset-password/:token'
					element={
						<RedirectAuthenticatedUser>
							<ResetPassword />
						</RedirectAuthenticatedUser>
					}
				/>
				{/* catch all routes */}
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;