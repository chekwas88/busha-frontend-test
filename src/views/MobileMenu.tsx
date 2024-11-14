import styled from "styled-components";
import Modal from "../components/shared/Modal";
import { IModal } from "../util";



export const Sidebar = styled.aside`
    display: flex;
    flex-direction: column;
    margin-top: 40px;

     @media (max-width: 1024px) {
        max-width: 200px;
        margin-top: 20px;
    }

    @media (max-width: 640px) {
        display: none

    }
   
   
`

export const MenuWrapper = styled.ul`
    padding: 0px;
    margin: 0px;
    list-style:none;
    display: flex;
    flex-direction: column;

`
export const MenuItem = styled.li<{isActive?: boolean}>`
    display: flex;
    align-items: center;
    background-color: ${({ isActive }) => (isActive ? "#F5F7FA" : "transparent")};
    width: 200px;
    height: 44px;
    border-radius: 3px 0px 0px 0px;
    font-weight: ${({ isActive }) => (isActive ? "500" : "400")};
    &:hover{
        background-color: #F5F7FA;
    }
    @media (max-width: 640px) {
        font-size: 14px;
    }

`

export const Link = styled.a
    `
   padding-left: 1rem;
   color: #3E4C59
   
`

const menuitems = [
    'Wallets',
    'Prices',
    'Peer2Peer',
    'Activities',
    'Settings'
]

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem;
`

const MenuCloseButton = styled.button`
    background-color: transparent;
    border: 2px solid transparent;
    padding: 8px;
    cursor: pointer;
    width: 32px;
    height: 32px;
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: #000000;
    font-size: 16px;
    font-weight: 700;
`


export const Menu = () => {
    return <MenuWrapper>
        {menuitems.map((item, index) => (
            <MenuItem isActive={index === 0} key={item}><Link>{item}</Link></MenuItem>
        ))}
    </MenuWrapper>

}



export function MobileMenu({isOpen, openModal}: IModal){
    return <Modal isOpen={isOpen}>
        <Wrapper>
            <Menu />
            <MenuCloseButton onClick={() => openModal(false)}>X</MenuCloseButton>
        </Wrapper>
    </Modal>
}