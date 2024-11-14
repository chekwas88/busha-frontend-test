import styled from 'styled-components'
import logo from '../assets/top-nav.jpg'
import { AccountLoading } from './AccountLoading'
import { AccountList } from './AccountsList'
import { AccountError } from './AccountError'
import { AddWallet } from './AddWallet'
import useDataLoadable from '../useDataLoadable'
import { Dispatch, useState } from 'react'
import { Sidebar, Menu, MobileMenu } from './MobileMenu'

const Header = styled.header`
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 4px 12px 0px #0000000D;

`

const HeaderWrapper = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;

     @media (max-width: 1024px) {
        width: 100%;
        padding: 0 .5rem;
    }
    @media (max-width: 640px) {
         width: 100%;
         padding: 0 .5rem;
    }
   
`

const NameContainer = styled.div`
    display: flex;
    gap: .2rem;
    align-items: center;
`

const Initial = styled.div`
    width: 36px;
    height: 36px;
    display: flex;
    border-radius: 50%;
    background: #9AA5B14D;
    justify-content: center;
    align-items: center;

`

const Span = styled.span`
    font-weight: 500;
    font-size: 14px;
    color: #3E4C59;

    @media (max-width: 640px) {
        font-size: 12px;
        display: none;
    }
`
const Img = styled.img`
    width: 120px;
    height: 28px;

     @media (max-width: 64px) {
        width: 80px;
        height: 20px;
    }
`
const Container = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
    gap: 4rem;

     @media (max-width: 1024px) {
        width: 100%;
        gap: 2rem;
    }

    @media (max-width: 640px) {
        width: 100%;
        justify-content: flex-start;
        flex-direction: column;
    }
    
`

const ContainerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 1024px) {
        padding: 0 .5rem;
    }
`

const DivBurger = styled.div`
   
    height: 4px;
    background-color: #000000;
    margin: 5px 0;
    
`

const HamburgerContainer = styled.button`
    display: none;
    @media (max-width: 640px) {
        display: block;
        width: 35px;
        padding: 0 2px;
        background-color: transparent;
        border: 2px solid transparent;
        cursor: pointer;

    }

`

const Div = styled.div`
    display: flex;
    gap: .5rem;
    justify-content: center;
    align-items: center;
`

const Hamburger = ({showMobileOpen}: {showMobileOpen:Dispatch<React.SetStateAction<boolean>>}) => {
    return (
        <HamburgerContainer onClick={() => showMobileOpen(true)}>
            <DivBurger></DivBurger>
            <DivBurger></DivBurger>
            <DivBurger></DivBurger>
        </HamburgerContainer>
    )
}
   




const Main = styled.main`
    flex: 1;
`







export function Account() {
    const [isOpen, setOpen] = useState<boolean>(false)
    const {isLoading, error, data, refetch, toggleRefetch} = useDataLoadable('https://my-json-server.typicode.com/bushaHQ/busha-frontend-test/accounts', "account")
    const [isMobileMenu, setIsMobileMenu] = useState<boolean>(false)
    return <>
        <Header>
            <HeaderWrapper>
                <Div>
                    <Hamburger showMobileOpen={setIsMobileMenu} />
                    <Img src={logo} alt='company-logo' />
                </Div>
                <NameContainer>
                    <Initial>O</Initial>
                    <Span>Oluwatobi Akindunjoye</Span>
                </NameContainer>
            </HeaderWrapper>
        </Header>
        <ContainerWrapper>
            <Container>
                <Sidebar>
                    <Menu />
                </Sidebar>
                <Main>
                    {isLoading ? <AccountLoading />:(null)}
                    
                    {error && !isLoading ? <AccountError retry={refetch} toggleRefetch={toggleRefetch}/> : (null)}
                    {!isLoading && !error ? (<AccountList accounts={data} openModal={setOpen}/>): (null)}
                    
                </Main>
            </Container>
            {isOpen ?  <AddWallet isOpen={isOpen} openModal={setOpen} />: null}
            {isMobileMenu ? <MobileMenu isOpen={isMobileMenu} openModal={setIsMobileMenu}/>: null}
        </ContainerWrapper>
    </>
}






