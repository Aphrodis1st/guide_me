import { Request, Response } from "express";
import { sequelizeConnection } from "../database/config/db.config";
import Role_model from "../database/models/Role";
import User_model from "../database/models/User";

const Role = Role_model(sequelizeConnection);
const User = User_model(sequelizeConnection);

const createRole = async (req: Request, res: Response) => {
	try {
		const { roleName } = req.body;
		const newRole = await Role.create({ roleName });
		return res
			.status(201)
			.json({ message: "Role created successfully", role: newRole });
	} catch (error) {
		console.error("Error creating role:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

const getRoles = async (req: Request, res: Response) => {
	try {
		const roles = await Role.findAll();
		return res.status(200).json({ roles });
	} catch (error) {
		console.error("Error retrieving roles:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

const getRoleById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const role = await Role.findByPk(id);
		if (!role) {
			return res.status(404).json({ message: "Role not found" });
		}
		return res.status(200).json({ role });
	} catch (error) {
		console.error("Error retrieving role:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

const updateRole = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { roleName } = req.body;
		const role = await Role.findByPk(id);
		if (!role) {
			return res.status(404).json({ message: "Role not found" });
		}
		role.roleName = roleName;
		await role.save();
		return res.status(200).json({ message: "Role updated successfully", role });
	} catch (error) {
		console.error("Error updating role:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

const assignRole = async (req: Request, res: Response) => {
	try {
		const { roleName } = req.body; // Changed from roleId to roleName
		const { userId } = req.params;

		console.log(
			"Assigning role with roleName:",
			roleName,
			"to user with userId:",
			userId
		);

		// Find the user by userId
		const user = await User.findByPk(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Fetch the Role model and find the role by roleName
		const Role = Role_model(User.sequelize!);
		const role = await Role.findOne({ where: { roleName } }); // Find by roleName instead of roleId
		if (!role) {
			return res.status(404).json({ message: "Role not found" });
		}

		// Assign the role's id to the user
		user.role = role.id;
		await user.save();

		const userData = {
			...user.toJSON(),
			password: undefined,
			confirmPassword: undefined,
		};

		return res
			.status(200)
			.json({ message: "Role assigned successfully", userData });
	} catch (error) {
		console.error("Error assigning role to user:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

const deleteRole = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const role = await Role.findByPk(id);
		if (!role) {
			return res.status(404).json({ message: "Role not found" });
		}
		await role.destroy();
		return res.status(200).json({ message: "Role deleted successfully" });
	} catch (error) {
		console.error("Error deleting role:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export default {
	createRole,
	getRoles,
	getRoleById,
	updateRole,
	deleteRole,
	assignRole,
};
