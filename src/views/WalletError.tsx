import styled from 'styled-components'
import { DivError, Button, Span } from './AccountError'
import { Dispatch } from 'react'

interface IWalletError{
    retry: () => void
    openModal: Dispatch<React.SetStateAction<boolean>>

}



const ErrorWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
    gap: 1rem;
`

const CloseButton = styled.button`
    background-color: transparent;
    border: 2px solid transparent;
    padding: 8px;
    cursor: pointer;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    position: absolute;
    top: 3.5rem;
    right: 1rem;
    color: #000000;
    font-size: 16px;
    font-weight: 700;
`



export function WalletError({retry, openModal}: IWalletError){
    return(
        <>
            <ErrorWrapper>
                <CloseButton onClick={() => openModal(false)}>X</CloseButton>
                <DivError>!</DivError>
                <div><Span>Network Error</Span></div>
                <Button onClick={retry}>Try again</Button>
            </ErrorWrapper>
        </>
    )
}

