export const getDefaultDateDay = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

export const getDefaultDateMonth = () => {
    const today = new Date();
    return today.toISOString().slice(0, 7);
};