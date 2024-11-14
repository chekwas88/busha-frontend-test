import styled from 'styled-components'
import {Caption} from './AccountLoading'
import ForwardIcon from '../assets/forward-icon.png'
import { IAccount } from '../util'
import { Dispatch } from 'react'
import NgnIcon from '../assets/NGN.svg'
import BtcIcon from '../assets/BTC.svg'
import EthIcon from '../assets/ETH.svg'
import LtcIcon from '../assets/LTC.svg'


interface IAccounts {
    accounts: IAccount[]
    openModal: Dispatch<React.SetStateAction<boolean>>
}


const TopWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

`
const AddButton = styled.button`
    font-weight: 500;
    font-size: 16px;
    color: #000000;
    background-color: transparent;
    border: 2px solid transparent;
    padding: 8px;
    cursor: pointer;
    align-self: flex-end;
    height: 50px;
    &:focus {
        outline-color: none;
    }
   
  }

`
const Divider = styled.div`
    width: 100%;
    border: 1px solid #D3D5D880
`

const AccountContainer = styled.ul`
    display: grid;
    gap: 3rem;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: auto;
    justify-content: space-evenly;
    justify-items: center;
    align-content: space-evenly;
    align-items: center;
    list-style-type: none;
    
    padding: 0;
    background: transparent;
    

    @media (max-width: 1024px) {
        gap: 1rem;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        
    }

    @media (max-width: 640px) {
        gap: 1rem;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        
    }


`

const Img = styled.img`
    width: 34px;
    height: 34px;
    border-radius: 50%;
`

const Div = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
`

const AccountItem = styled.li`
    width: 240px;
    height: 150px;
    border-radius: 10px;
    background: #111111;
    box-shadow: 0px 10px 20px 0px #8A8A8A80;
    color: #ffffff;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    
    @media (max-width: 1024px) {
        width: 210px;
        height: 120px;
    }

     @media (max-width: 820px) {
        width: 140px;
         height: 110px;
    }
     @media (max-width: 640px) {
        width: 150px;
        height: 100px;
       
    }

`
const ForwardDiv = styled.div`
    width: 32px;
    height: 32px;
    align-self: flex-end;
    display: flex;
    justify-content: center;
    border-radius: 50%;

`

const PName = styled.span`
    color: #9AA5B1;
    font-size: 14px;
    font-weight: 400;
`

const Balance = styled.p`
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;

    @media (max-width: 1024px) {
        font-size: 14px;
    }

     @media (max-width: 640px) {
        font-size: 12px;
    }

`

const ImgDiv = styled.div`
    width: 34px;
    height: 34px;
    border-radius: 50%;
    font-size: 8px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    background: green;

`

const getCoinIcon = (currency: string): string => {
    if(currency === 'NGN')return NgnIcon
    if(currency === 'BTC') return BtcIcon
    if(currency === 'LTC') return LtcIcon
    if(currency === 'ETH') return EthIcon
    return ''
}

const Account = ({ currency, name, balance, type }: IAccount) => {
    const getBalance = (): string => {
        if(type === 'fiat') return new Intl.NumberFormat('en-NG', {
            maximumFractionDigits: 8,
            minimumFractionDigits: 0,
            style: 'currency',
            currency
        }).format(parseFloat(balance))

        return `${balance } ${currency}`
    }
   return(
    <AccountItem>
        <Div>
            {getCoinIcon(currency) ? <Img src={getCoinIcon(currency)} alt={name}/>: <ImgDiv>{currency}</ImgDiv>}
            <PName>{name}</PName>
        </Div>
        <Balance>{getBalance()}</Balance>
        <ForwardDiv><Img src={ForwardIcon}/></ForwardDiv>
    </AccountItem>
   )
}

export function AccountList({ accounts, openModal } : IAccounts){
    return(
        <>
            <TopWrapper>
                <Caption>Wallets</Caption>
                <AddButton onClick={() => openModal(true)}>+ Add new wallet</AddButton>
            </TopWrapper>
            <Divider />
            <AccountContainer>
                {accounts.map((acc) => {
                    return(
                        <Account key={acc.id} {...acc}/>
                    )
                })}
                
            </AccountContainer>
        </>
    )
}


