export const usersByQuery = `
    {
        users {
            id
            email
            firstName
            lastName
            city
            address
            phoneNumber
            creditCard
            activationCode
            passwordResetCode
            active
            provider
            roles
        }
    }
`;

export const userByQuery = (id) => `
    {
        user(id: ${id}) {
            id
            email
            firstName
            lastName
            city
            address
            phoneNumber
            creditCard
            activationCode
            passwordResetCode
            active
            provider
            roles
        }
    }
`;
