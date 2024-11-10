import styled from 'styled-components'
import Loader from '../components/shared/Loader'

export const Caption = styled.h4`{
    font-weight: 700;
    color: #000000;
    font-size: 32px;
    line-height: 32px;
    margin-bottom: 1rem;

}`

const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 3rem;

`

export function AccountLoading(){
    return(
        <>
            <Caption>Wallets</Caption>
            <LoaderWrapper><Loader size={80}/></LoaderWrapper>
        </>
    )
}


