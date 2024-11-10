export interface IAccount {
    id: string;
    name: string;
    type: string;
    imgURL: string;
    deposit: boolean;
    payout: boolean;
    pending_balance: string;
    balance: string;
    currency: string;
}

export interface IWallet {
    name: string;
    type: string;
    imgURL: string;
    currency: string;
}

