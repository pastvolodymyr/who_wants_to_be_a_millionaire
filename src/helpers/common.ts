export const numberToLetter = (number: number) => String.fromCharCode(number + 'A'.charCodeAt(0));

export const compareArrays = (array1: any[], array2: any[]) =>
    array1.length === array2.length && array1.every((value, index) => value === array2[index]);

export const numberWithCommas = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
