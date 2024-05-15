export const getAllClothesByQuery = `
    {
        clothes {
            id
            title
            clother
            price
            filename
            clothRating
        }
    }
`;

export const getClothByQuery = (id) => `
    {
        cloth(id: ${id}) {
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
`;

export const geClothesByIdsQuery = (ids) => `
    {
        clothesIds(ids: [${ids}]) {
            id
            title
            clother
            price
            filename
            clothRating
        }
    }
`;
