import styled from 'styled-components'
import { Caption } from './AccountLoading'

interface IAccountError{
    retry: (b: boolean) => void
    toggleRefetch: boolean
}
export const DivError = styled.div`
    width: 100px;
    height: 100px;
    border: 5px solid #FFBDBD;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: xxx-large;
     color: #E12D39;

`


const ErrorSign = () => {
    return (
        <DivError>!</DivError>
    )
}

const ErrorWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 3rem;
    height: 100vh;
    gap: 1rem;
`


export const Span = styled.span`
    font-size: 18px;
    font-weight: 400;
    color: #3E4C59;

`

export const Button = styled.button`
    padding: 18px 54px;
    border-radius: 40px;
    border: 2px solid transparent;
    cursor: pointer;
    background: #000000;
    color: #ffffff;
    cursor: pointer;
    max-width: 200px;
    &:disabled{
        opacity: 0.7;
        cursor: not-allowed;
    }

`


export function AccountError({ retry, toggleRefetch }: IAccountError){
    return(
        <>
            <Caption>Wallets</Caption>
            <ErrorWrapper>
            <ErrorSign />
                <div><Span>Network Error</Span></div>
                <Button onClick={() => retry(!toggleRefetch)}>Try again</Button>
            </ErrorWrapper>
        </>
    )
}

