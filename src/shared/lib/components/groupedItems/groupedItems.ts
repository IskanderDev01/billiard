export const groupItems = (items, idKey) => {
    return items.reduce((acc, item) => {
        const foundItem = acc.find((i) => i[idKey] === item[idKey]);
        if (foundItem) {
            foundItem.quantity++;
        } else {
            acc.push({ [idKey]: item[idKey], quantity: '1' });
        }
        return acc;
    }, []);
};