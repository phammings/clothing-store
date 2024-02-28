export const getAllClothesByQuery = `
    {
        clohtes {
            id
            clohtesTitle
            brand
            price
            filename
            clothesRating
        }
    }
`;

export const getClothesByQuery = (id) => `
    {
        clohte(id: ${id}) {
            id
            clothesTitle
            brand
            year
            country
            clohtesGender
            filename
            price
            clothesRating
            reviews {
                id
                author
                message
                date
                rating
            }
        }
    }
`;

export const geClothesByIdsQuery = (ids) => `
    {
        clohtesIds(ids: [${ids}]) {
            id
            clothesTitle
            brands
            price
            filename
            clothesRating
        }
    }
`;
