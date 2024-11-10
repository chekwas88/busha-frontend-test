import styled from 'styled-components'
import Loader from '../components/shared/Loader'
import Modal from '../components/shared/Modal'
import { Button } from './AccountError';
import { WalletError } from './WalletError';
import NetWorkFailedIcon from '../assets/Icon.png'
import { Dispatch, useState } from 'react';
import useDataLoadable from '../useDataLoadable';


interface IAddWallet {
    isOpen: boolean;
    openModal: Dispatch<React.SetStateAction<boolean>>
    refetchAccounts: () => void
}

const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

`

const Select = styled.select`
    width: 100%;
    border-radius: 4px;
    border: 1px solid #CBD2D9;
    padding: 16px;
    margin-top: .5rem;

`

const Container = styled.div`
    padding: 1rem;
    margin-top: 3rem;
`
const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
`

const Label = styled.label`
    color: #3E4C59;
    font-size: 16px;
    font-weight: 500px;
`

const Div = styled.div`
    width: 100%;
`

const Span = styled.span<{size?: number, color?: string}>`
    font-weight: 500;
    font-size: ${({ size }) => (size ? size : "16px")};
    color: ${({ color }) => (color ? color : "#000000")};
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
    right: .5rem;
    color: #000000;
    font-size: 16px;
    font-weight: 700;
`

const Paragraph = styled.p`
    color: #3E4C59;
    font-weight: 400;
    font-size: 18px;
    margin: 2rem 0;

`

const CreateDivError = styled.div`
    background: #FFF4F4;
    border: 1px solid #E0B3B2;
    padding-left: .5rem;
    border-radius: 8px;
    margin-top: 2rem;
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;


`

const IconError = styled.img`
    width: 20px;
    height: 20px;
`

const CloseErrorButton = styled.button`
    background-color: transparent;
    border: 2px solid transparent;
    padding: 8px;
    cursor: pointer;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    font-size: 16px;
    font-weight: 700;
    color: #D72C0D;
    display: flex;
    justify-content: center;
    align-items: center;
`

const DivErrorTitle = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;

`





export function AddWallet({isOpen, openModal, refetchAccounts}: IAddWallet){
    const {isLoading, error, data, refetch, toggleRefetch} = useDataLoadable('http://localhost:3090/wallets')
    const [createError, setCreateError] = useState<string>('')
    const [selectedWallet, setSelectedWallet] = useState<string>('')
    const [isSubmitting, setSubmitting] = useState<boolean>(false)

    const createWallet = async () => {
        try {
          setCreateError('');
          setSubmitting(true)
          const response = await fetch("http://localhost:3090/accounts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ currency: selectedWallet }),
          });
          if (!response.ok){
            throw new Error("Network error");
          }else{
            refetchAccounts()
            setTimeout(() => {
                setSubmitting(false)
                openModal(false)
            }, 600)
          }

        } catch (err) {
          setCreateError("Network error");
          setSubmitting(false)
        } finally {
          setSelectedWallet("");
        }
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createWallet()
    }

    return (<Modal isOpen={isOpen}>
        {isLoading ? (<LoaderWrapper>
            <Loader size={80}/>
        </LoaderWrapper> ): null}
        {error && !isLoading ? ( <WalletError retry={() => refetch(!toggleRefetch)} openModal={openModal}/> ): null}
        {!isLoading && !error ? (
            <Container>
            <Div>
                <Span>Add New Wallet</Span>
                <CloseButton onClick={() => openModal(false)}>X</CloseButton>
            </Div>
            <Paragraph>
                The crypto wallet will be created instantly and be available in your
                list of wallets.
            </Paragraph>

            <Form onSubmit={handleSubmit}>
                <Div>
                    <Label htmlFor='wallet'>Select wallet</Label>
                    <Select id='wallet' value={selectedWallet} onChange={(e) => setSelectedWallet(e.target.value)}>
                        <option key='empty'>Select Wallet</option>
                        {data.map((wallet) => {
                            return (
                                <option key={wallet.name} value={wallet.currency}>{wallet.name}</option>
                            )
                        })}
                    </Select>
                </Div>
                <Button type='submit' disabled={!selectedWallet}>{isSubmitting ? <Loader size={20} />: 'Create Wallet'}</Button>
               {createError ? ( <CreateDivError>
                    <DivErrorTitle>
                        <IconError src={NetWorkFailedIcon} alt='network failed icon'/>
                        <Span color='#D72C0D'>Network error</Span>
                    </DivErrorTitle>
                    <CloseErrorButton onClick={() => setCreateError('')}>X</CloseErrorButton>
                </CreateDivError>): null}
            </Form>

           
        </Container>
        ): null}
        
    </Modal>)
}

