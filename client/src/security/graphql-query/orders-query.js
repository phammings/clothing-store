export const ordersByQuery = `
    {
        orders {
            id
            totalPrice
            date
            firstName
            lastName
            city
            address
            email
            phoneNumber
            creditCard
            orderItems {
                id
                amount
                quantity
                cloth {
                    id
                    title
                    clother
                    year
                    country
                    clothGender
                    fragranceTopNotes
                    fragranceMiddleNotes
                    fragranceBaseNotes
                    filename
                    price
                    volume
                    type
                    clothRating
                    reviews {
                        id
                        author
                        message
                        date
                        rating
                    }
                }
            }
        }
    }
`;

export const ordersByEmailQuery = (email) => `
    {
        ordersByEmail(email: \"${email}\") {
            id
            totalPrice
            date
            firstName
            lastName
            city
            address
            email
            phoneNumber
            creditCard
            orderItems {
                id
                amount
                quantity
                cloth {
                    id
                    title
                    clother
                    year
                    country
                    clothGender
                    fragranceTopNotes
                    fragranceMiddleNotes
                    fragranceBaseNotes
                    filename
                    price
                    volume
                    type
                    clothRating
                    reviews {
                        id
                        author
                        message
                        date
                        rating
                    }
                }
            }
        }
    }
`;
