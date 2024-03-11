class AuthService {
    constructor(prisma) {
        this.prisma = prisma;
    }

    async registerUser(username ,email, password, name) {
        try {
            // Check if the username already exists
            const existingUser = await this.prisma.users.findFirst({
                where: {
                    username: username,
                },
            });

            if (existingUser) {
                throw new Error('Username already exists');
            }

            // Create a new user
            const newUser = await this.prisma.users.create({
                data: {
                    email: email,
                    username: username,
                    password: password,
                    name: name,
                },
            });

            return newUser;
        } catch (error) {
            throw new Error(`Failed to register user: ${error.message}`);
        }
    }

    async loginUser(username, email, password) {
        try {
            // Find the user with the given username or email
            const user = await this.prisma.users.findFirst({
                where: {
                    OR: [
                        {
                            username: username,
                        },
                        {
                            email: email,
                        },
                    ],
                },
            });

            if (!user) {
                throw new Error('User not found');
            }

            // Check if the password is correct
            if (user.password !== password) {
                throw new Error('Invalid password');
            }

            return user;
        } catch (error) {
            throw new Error(`Failed to login user: ${error.message}`);
        }
    }
}

module.exports =  AuthService;
