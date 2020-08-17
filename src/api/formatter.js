import {constants} from "./constants";

export const codeFormat = (code) => {
    return ('000000' + code).slice(-6);
}

export const moneyFormat = (money) => {
    return (money / constants.MULTI_FACTOR).toFixed(2);
}

export const directionFormat = (direction) => {
    if(direction === constants.BUY){
        return 'Buy In';
    }else if(direction === constants.SELL){
        return 'Sell Out';
    }else{
        return "Unknown";
    }
}

export const statusFormat = (status) => {
    switch (status) {
        case constants.NOT_ORDER:
            return 'Not Ordered'
        case constants.CANCELED:
            return 'Canceled'
        case constants.PART_CANCEL:
            return 'Part Canceled'
        case constants.ORDERED:
            return 'Ordered'
        case constants.PART_TRADED:
            return 'Part Ordered'
        case constants.TRADED:
            return 'Traded'
        case constants.ILLEGAL:
            return 'Illegal'
        default:
            return 'Unknown';
    }
}


