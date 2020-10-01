export interface Beer {
    name: string;
    id: number;
    food_pairing: string[];
    image_url: string;
    contributed_by: string;
    volume: {
        unit: string;
        value: number;
    },
    abv: number;
    description: string;
    ph: number;
    ingredients: {
        malt: {
            name: string;
            amount: {
                unit: string;
                value: number;
            }
        }[];
        hops: {
            name: string
        }[]
    }
}