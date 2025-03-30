import React, { createContext, useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import { Toaster } from "sonner";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Home } from './components/Home';
import { UserSignIn } from './components/auth-components/UserSignIn';
import { UserLogIn } from './components/auth-components/UserLogIn';
import { UserSignOut } from './components/auth-components/UserSignOut';
import { UserLogOut } from './components/auth-components/UserLogOut';
import { ForgotPassword } from './components/auth-components/ForgotPassword';
import { PageNotFound } from "./components/PageNotFound";

export const TaskContext = createContext();

const App = () => {

	const router = createBrowserRouter([
		{ path: "/", element: <Home /> },
		{ path: "/signin", element: <UserSignIn /> },
		{ path: "/login", element: <UserLogIn /> },
		{ path: "/signout", element: <UserSignOut /> },
		{ path: "/logout", element: <UserLogOut /> },
		{ path: "/forgotpassword", element: <ForgotPassword /> },
		{ path: "*", element: <PageNotFound /> }
	]);

	const storedUser = localStorage.getItem("user");
	const [user, setUser] = useState(storedUser || null);

	const [task, setTask] = useState([]);
	const [filteredTask, setFilteredTask] = useState([]);
	const [filter, setFilter] = useState("all");

	const contextValues = {
		user, setUser, task, setTask, setFilter, filteredTask
	};

	useEffect(() => {
		if (filter == "all")
			setFilteredTask(task);
		else if (filter == "completed")
			setFilteredTask(task.filter(item => item.completed));
		else
			setFilteredTask(task.filter(item => !item.completed));
	}, [task, filter]);

	return (
		<TaskContext.Provider value={contextValues} >
			<Toaster richColors position="top-center" swipeDirections={["left", "right"]} />
			<RouterProvider router={router} />
		</TaskContext.Provider>
	);
}

export default App;
