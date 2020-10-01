export const convertToString = (query: string | string[]) => {
    const initialState = 
        typeof query === 'string' || typeof query === 'undefined'
            ? query
            : query.join();
            
    return initialState;
}

