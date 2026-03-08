const colTitle = {date: 0, pce_kg: 11, ticket: 16, code_prod: 17, produit: 18, ar_prod: 19, poids_nb: 21, montant: 23};

const filterData = (refList, toKeep) => {
    const filt = (_, index) => toKeep.includes(index);
    return refList.filter(filt);
}

const trimAndConvert = s => {
    return Number(s) || s.trim();
}

const colSum = (arr, colNum) => {
    let sum = 0;
    arr.forEach(line => {
        sum = sum + line[colNum]
    })
    return sum;
}

const resellOrProd = code => {
    switch(code) {
        case 1:
            return 'prod';
        case 2:
            return 'revente';
        case 3:
            return 'savon';
        case 0:
            return 'erreur balance';
        default:
            return code;
    }
}

const itemOrWeight = code => {
    switch(code) {
        case 1:
            return 'piece';
        case 2:
            return 'poids';
        default:
            return code;
    }
}

export {colTitle, filterData, trimAndConvert, colSum, resellOrProd, itemOrWeight};