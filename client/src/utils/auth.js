export const check = async () => {
	const res = await fetch(`${process.env.BACKEND_URL}/api/user/me`, {
		method: "GET",
		credentials: 'include',
	});
	
	return await res.json();
}

export const login = async ({ email, password }) => {
	try {
		const res = await fetch(`${process.env.BACKEND_URL}/api/user/login`, {
			method: "POST",
			credentials: 'include',
			body: JSON.stringify({
				email,
				password,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		return await res.json();
	} catch (e) {
		console.log(e);
	}
};

export const register = async ({ name, email, password }) => {
	try {
		const res = await fetch(`${process.env.BACKEND_URL}/api/user/register`, {
			method: "POST",
			body: JSON.stringify({
					name,
					email,
					password,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		return await res.json();
	} catch(e) {
		console.log(e);
	}
}

export const update = async (data) => {
	try {
		const res = await fetch(`${process.env.BACKEND_URL}/api/user/update`, {
			method: "PUT",
			credentials: 'include',
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		});

		return await res.json();
	} catch(e) {
		console.log(e);
	}
}

export const updatePhoto = async (body) => {
	try {
		const res = await fetch(`${process.env.BACKEND_URL}/api/user/updatePhoto`, {
			method: "POST",
			credentials: 'include',
			body
		});

		return await res.json();
	} catch(e) {
		console.log(e);
	}
}