const bcrypt = require("bcrypt");
const hashPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	const hashedPass = await bcrypt.hash(password, salt);
	return hashedPass;
};
("use strict");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface) {
		await queryInterface.bulkInsert(
			"Users",
			[
				{
					id: "7121d946-7265-45a1-9ce3-3da1789e657e",
					firstName: "prince",
					lastName: "Junior",
					userName: "jj",
					email: "princejj@gmail.com",
					password: await hashPassword("longPassWORD123"),
					confirmPassword: await hashPassword("longPassWORD123"),
					role: "11afd4f1-0bed-4a3b-8ad5-0978dabf8fcd",
					// isVerified: true,
					// isActive: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},

				{
					id: "1001d946-7265-45a1-9ce3-3da1789e100a",
					firstName: "aline",
					lastName: "Jascaline",
					userName: "aline",
					email: "alinj12@gmail.com",
					password: await hashPassword("longPassWORD123"),
					confirmPassword: await hashPassword("longPassWORD123"),
					role: "12afd4f1-0bed-4a3b-8ad5-0978dabf8fcd",
					// isVerified: true,
					// isActive: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: "1001d946-8065-45a1-9ce3-3da1789e100a",
					firstName: "Muhinde",
					lastName: "Josua",
					userName: "mju",
					email: "muhj12@gmail.com",
					password: await hashPassword("longPassWORD123"),
					confirmPassword: await hashPassword("longPassWORD123"),
					role: "13afd4f1-0bed-4a3b-8ad5-0978dabf8fcd",
					// isVerified: true,
					// isActive: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: "7321d946-7265-45a1-9ce3-3da1789e657e",
					firstName: "Aphrodis",
					lastName: "Uwineza",
					userName: "aphro",
					email: "aphro@gmail.com",
					password: await hashPassword("longPassWORD123"),
					confirmPassword: await hashPassword("longPassWORD123"),
					role: "13afd4f1-0bed-4a3b-8ad5-0978dabf8fcd",
					// isVerified: false,
					// isActive: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},

				{
					id: "7ca39bd8-ab6c-42a7-a136-62357cbede3a",
					firstName: "Aphrodis",
					lastName: "Uwineza",
					userName: "Aphro10",
					email: "aphrodisu2019@gmail.com",
					password: await hashPassword("Morning12$"),
					confirmPassword: await hashPassword("Morning12$"),
					role: "12afd4f1-0bed-4a3b-8ad5-0978dabf8fcd",
					// isVerified: true,
					// isActive: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: "6d21d946-7265-45a1-6ce3-3da1789e657e",
					firstName: "Garrix",
					lastName: "Sven",
					userName: "aphro",
					email: "garrixme@gmail.com",
					password: await hashPassword("Morning12$"),
					confirmPassword: await hashPassword("Morning12$"),
					role: "13afd4f1-0bed-4a3b-8ad5-0978dabf8fcd",
					// isVerified: true,
					// isActive: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete("Users", null, {});
	},
};
