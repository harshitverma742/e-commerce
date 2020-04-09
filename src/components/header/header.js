import React from 'react';
import {HeaderContainer,LogoContainer,ImageContainer,OptionsContainer,OptionDiv,OptionLink} from './header.styles';
import {Link} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';
import Logo from '../../assets/crown.png';
import {auth} from '../../firebase/firebase.utils';
import {connect} from 'react-redux';
import CartIcon from '../cart-icon/cart-icon';
import CartDropdown from '../cart-dropdown/cart-dropdown';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selectors';

const Header=({currentUser,hidden})=>
(
    <HeaderContainer>
        <LogoContainer  to="/">
           <ImageContainer  src={Logo} alt="Logo"/>

        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink  to='/shop'>
                CONTACT
            </OptionLink>
            {
                currentUser ? (
                <OptionDiv  onClick={() =>auth.signOut()}>
                    SIGN OUT
                    </OptionDiv>
 ) :(

                <OptionLink  to='/signin'>
                    SIGN IN
                    </OptionLink>
 )}
 <CartIcon/>


        </OptionsContainer>
        {
            hidden ? null: <CartDropdown/>
            

        }


    </HeaderContainer>
)
const  mapStateToProps = createStructuredSelector({
    currentUser:selectCurrentUser,
    hidden:selectCartHidden

})

export default connect(mapStateToProps)(Header);