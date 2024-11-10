import styled from 'styled-components'
import logo from '../assets/top-nav.jpg'
import { AccountLoading } from './AccountLoading'
import { AccountList } from './AccountsList'
import { AccountError } from './AccountError'
import { AddWallet } from './AddWallet'
import useDataLoadable from '../useDataLoadable'
import { useState } from 'react'

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
`
const Img = styled.img`
    width: 120px;
    height: 28px;
`
const Container = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
    gap: 4rem;
    
`

const ContainerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Sidebar = styled.aside`
    display: flex;
    flex-direction: column;
    margin-top: 40px;
   
`

const MenuWrapper = styled.ul`
    padding: 0px;
    margin: 0px;
    list-style:none
    display: flex;
    flex-direction: column;
`
const MenuItem = styled.li<{isActive?: boolean}>`
    display: flex;
    align-items: center;
    background-color: ${({ isActive }) => (isActive ? "#F5F7FA" : "transparent")};
    width: 200px;
    height: 44px;
    border-radius: 3px 0px 0px 0px;
    font-weight: ${({ isActive }) => (isActive ? "500" : "400")};

`

const Link = styled.a
    `
   padding-left: 1rem;
   color: #3E4C59
    
`
   




const Main = styled.main`
    flex: 1;
`


const menuitems = [
    'Wallets',
    'Prices',
    'Peer2Peer',
    'Activities',
    'Settings'
]

const Menu = () => {
    return <MenuWrapper>
        {menuitems.map((item, index) => (
            <MenuItem isActive={index === 0} key={item}><Link>{item}</Link></MenuItem>
        ))}
    </MenuWrapper>

}


export function Account() {
    const [isOpen, setOpen] = useState<boolean>(false)
    const {isLoading, error, data, refetch, toggleRefetch} = useDataLoadable('http://localhost:3090/accounts')
    return <>
        <Header>
            <HeaderWrapper>
                <Img src={logo} alt='company-logo' />
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
            {isOpen ?  <AddWallet isOpen={isOpen} openModal={setOpen} refetchAccounts={() => refetch(!toggleRefetch)}/>: null}
        </ContainerWrapper>
    </>
}






