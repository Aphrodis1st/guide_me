import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Role_model from "../database/models/Role";
import { User } from "../database/models/User";
import { sendResponse } from "../utils/httpRceptions";
import { isValidUUID } from "../validations/idValidator";

const SALT_ROUNDS = 10;

const ACCESS_TOKEN_SECRET =
	process.env.ACCESS_TOKEN_SECRET || "default_secret_key";

const generateAccessToken = (payload: {
	userId: string;
	role: string;
	firstName: string;
	lastName: string;
	email: string;
}) => {
	return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "360h" });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ where: { email } });
		if (!user) {
			return sendResponse(res, 400, "BAD REQUEST", "User not found");
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return sendResponse(res, 400, "BAD REQUEST", "Invalid password");
		}

		const Role = Role_model(User.sequelize!);
		const role = await Role.findOne({ where: { id: user.role } });
		const roleName = role ? role.roleName : "Unknown";

		const { id, firstName, lastName } = user;
		const token = generateAccessToken({
			userId: id,
			role: roleName,
			firstName,
			lastName,
			email,
		});

		return sendResponse(res, 200, "SUCCESS", "Login successful", { token });
	} catch (error) {
		return sendResponse(
			res,
			500,
			"SERVER ERROR",
			"Something went wrong!",
			(error as Error).message
		);
	}
};

interface UserAttributes {
	firstName: string;
	lastName: string;
	userName: string;
	email: string;
	role: string;
	password: string;
	confirmPassword: string;
}

const signup = async (req: Request, res: Response) => {
	try {
		console.log("Request Body:", req.body);
		const {
			firstName,
			lastName,
			userName,
			email,
			password,
			confirmPassword,
		}: UserAttributes = req.body;

		const defaultUserRoleId = "11afd4f1-0bed-4a3b-8ad5-0978dabf8fcd";

		if (password !== confirmPassword) {
			return res.status(400).json({ message: "Passwords do not match" });
		}

		const existingUser = await User.findOne({ where: { email } });
		if (existingUser) {
			return res.status(409).json({ message: "Email is already in use" });
		}

		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

		const newUser = await User.create({
			firstName,
			lastName,
			userName,
			email,
			role: defaultUserRoleId,
			password: hashedPassword,
			confirmPassword: hashedPassword,
		});

		res.status(201).json({
			message: "User registered successfully",
			user: {
				id: newUser.id,
				firstName: newUser.firstName,
				lastName: newUser.lastName,
				userName: newUser.userName,
				email: newUser.email,
				role: newUser.role,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error. Please try again later." });
	}
};

// Get All Users
// Get All Users
const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.findAll({
			attributes: { exclude: ["password", "confirmPassword"] }, // Exclude sensitive fields
		});
		res.status(200).json({ data: users });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Error fetching users",
			error: (error as Error).message,
		});
	}
};

const getUserById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const user = await User.findByPk(id, {
			attributes: { exclude: ["password", "confirmPassword"] },
		});
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json({ data: user });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Error fetching user",
			error: (error as Error).message,
		});
	}
};

// Update User by ID
const updateUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		console.log(id);
		const { firstName, lastName, userName, email, password, role } = req.body;

		const hashedPassword = password
			? await bcrypt.hash(password, SALT_ROUNDS)
			: undefined;

		const updated = await User.update(
			{ firstName, lastName, userName, email, password: hashedPassword, role },
			{ where: { id } }
		);

		console.log(updated, "Updated");

		if (!updated) {
			return res.status(404).json({ message: "User not found" });
		}

		const updatedUser = await User.findByPk(id);
		res
			.status(200)
			.json({ message: "User updated successfully", data: updatedUser });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Error updating user",
			error: (error as Error).message,
		});
	}
};

// Delete User by ID
const deleteUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const deleted = await User.destroy({ where: { id } });
		if (!deleted) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Error deleting user",
			error: (error as Error).message,
		});
	}
};

export default { login, signup, getUsers, getUserById, updateUser, deleteUser };
