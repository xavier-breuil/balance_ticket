const colTitle = {date: 0, pce_kg: 11, ticket: 16, code_prod: 17, produit: 18, ar_prod: 19, poids_nb: 21, montant: 23};

const filterData = (refList, toKeep) => {
    const filt = (_, index) => toKeep.includes(index);
    return refList.filter(filt);
}

export {colTitle, filterData};