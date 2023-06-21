interface User {

    token: string;
    firstName?: string;

}

interface UserSignUp {

    firstName: string;
    lastName: string;
    email: string;
    password: string;

}

interface UserLogIn {

    email: string;
    password: string;

}