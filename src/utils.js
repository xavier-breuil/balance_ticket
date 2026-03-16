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

const assignGroup = code => {
    const resellGroup = {
        porc: [1400, 1401, 1402, 1403, 1404, 1405, 1406, 1407, 1408, 1409, 1411, 1412, 1413, 1414, 1415, 1416, 1417, 1418, 1419, 1420, 1421, 1422, 1424, 1425, 1426, 1427, 1428, 1429, 1430, 1431, 1432, 1433],
        boeuf: [1185, 1186, 1187, 188, 1189, 1190, 1191, 1192, 1193, 1194, 1195, 1196, 11971, 1198, 1199, 1200, 1201, 1202, 1203, 1204, 1205, 1207, 1209, 1211, 1214, 1215, 1216, 1217, 1218],
        veau: [1179, 1180, 1181, 1182, 1183, 1184, 1208, 1210, 1212, 1213, 1216],
        poulet: [1041, 1042, 1043, 1044, 1045, 1046, 1047, 1050],
        savon: [990, 991, 992],
        miel: [102, 103, 105, 106],
        laitier_vache: [1051, 1052, 1053, 1054, 1055, 1056, 1057, 1058, 1059, 1060, 1061, 1062, 1063, 1064, 1065, 1066, 1067, 1069, 1070, 1071],
        pain: [1021, 1022, 1023, 1024, 1025, 1027, 1028, 1029, 1030, 1031, 1032, 1033],
        laitier_chevre: [1300, 1301, 1302, 1303, 1304, 1305, 1306, 1307, 1308, 1309],
        boisson: [1010, 1011, 1012, 1013, 2010, 2011, 2013, 2015, 2016, 2017, 2018, 2019],
        laitier_brebis: [1600, 1601, 1602, 1603, 1604, 1605, 1606],
        oeufs: [100, 101],
        consigne: [997, 998, 999],
        epicerie: [861, 1500, 1510, 1511, 1512, 1520, 1521, 1522, 1523, 1524, 1525, 1526, 1530, 2014],
        plants: [2001, 2002, 2003, 2004],
        conserve_legumes: [61, 62, 621, 63, 64, 65, 66, 67, 68, 681, 69]
    };
    const group = Object.keys(resellGroup).find(gr => resellGroup[gr].includes(code))
    if (typeof group == 'undefined') {
        return '';
    }
    return group;
}

export {colTitle, filterData, trimAndConvert, colSum, resellOrProd, itemOrWeight, assignGroup};