import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { scrollIt } from '../helpers/helpers';
import Reveal from './components/Reveal';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import Menu from './components/menu/Menu';
import Cart from './components/cart/Cart';
import More from './components/more/More';
import Swipe from './components/more/Swipe';
import Moreback from './components/more/Moreback';
import Shop from './components/shop/Shop';
import Contact from './components/contact/Contact';
import Checkout from './components/checkout/Checkout';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loggedIn: false,
      loginErrors: "",
      menuClasses: "menu",
      menuHide: true,
      moreClasses: "more-info",
      swipeClasses: "m-swipe",
      moreBackClasses: "more-back",
      moreProductName: "",
      moreProductDescription: "",
      moreProductImg: "",
      moreProductPrice: "",
      moreHide: true,
      cartClasses: "shopping-cart",
      cartHide: true,
      cartTotal: 0,
      cartProducts: [],
      emptyCart: "empty-cart",
      page: "Home",
      mgoatsS: "mgoats",
      mgoatsL: "mgoats2",
      burgerClasses: "hamburglar is-open",
      burgerToggle: true,
      revealClasses: "reveal",
      ovProducts: [],
      pbProducts: [],
      svProducts: [],
      homeProducts: []
    }
    this.body = document.body;
  }

  componentWillMount() {
    Meteor.call('products.get', (error, result) => {
      if(error) {
        console.log(error);
      } else {
        const products = result.result;
        const pb = products.filter(item => item.category.value === 'Pasta & Biscotti');
        const ov = products.filter(item => item.category.value === 'Oil & Vinegar');
        const sv = products.filter(item => item.category.value === 'Sauces & Veggies'); 
        this.setState({
          ovProducts: ov.reverse(),
          pbProducts: pb.reverse(),
          svProducts: sv.reverse(),
          homeProducts: products.slice(12).reverse()
        });
      }
    });
  }

  componentDidMount(){
    history.pushState({page: "Home"}, null, '/Home');
    window.addEventListener('popstate', (e) => {
      this.setState({ revealClasses: "reveal reveal-show" }); 
      setTimeout(() => { 
        this.setState({ "page" : e.state.page });
        window.scrollTo(0, 0);
      }, 200);
      setTimeout(() => { this.setState({ revealClasses: "reveal" }); }, 1000);
    });
    this.setState({ loggedIn: Meteor.user() !== null });
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if(nextProps.user === null) {
      this.setState({ loggedIn: false, user: null });
    } else {
      this.setState({ loggedIn: true, user: nextProps.user });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', (e) => {});
  }

  signUp = (n, e, p) => {
    Accounts.createUser({name: n, email: e.toLowerCase(), password: p}, (err) => {
      if(err){
        // console.log(err.reason);
      } else {
        // console.log('creating new user');
        Meteor.loginWithPassword(e, p, (err) => {
          if(err) {
            // console.log(err.reason);
          } else {
            this.setState({ loggedIn: true });
          }
        });
      }
    });
  }

  login = (e, p) => {
    Meteor.loginWithPassword(e, p, (err) => {
      if(err) {
        this.setState({ loginErrors: err.reason });
      } else {
        this.setState({ loggedIn: true, loginErrors: "" });
      }
    });
  }

  toggleBurger = () => {
    this.setState((prevState, prevProps) => {
      return {
        burgerToggle: !prevState.burgerToggle,
        burgerClasses: (prevState.burgerClasses === "hamburglar is-closed") ? 
                          "hamburglar is-open" : 
                          "hamburglar is-closed",
        menuClasses: (prevState.menuClasses === "menu") ? 
                          "menu menu-show" : 
                          "menu",
        menuHide: !prevState.menuHide,
        cartClasses: "shopping-cart",
        cartHide: true
      }
    });
  }

  toggleCart = (e) => {
    if(e.target.className === "mmCart mm") {
      this.setState({
        burgerToggle: true,
        burgerClasses: "hamburglar is-open",
        menuClasses: "menu",
        menuHide: true,
      });
      setTimeout(() => {
        this.setState((prevState, prevProps) => {
          return {
            cartClasses: (prevState.cartClasses === "shopping-cart") ?
                      "shopping-cart cart-show":
                      "shopping-cart",
            cartHide: !prevState.cartHide
          }
        });
      }, 600);
    } else {
      this.setState((prevState, prevProps) => {
        return {
          cartClasses: (prevState.cartClasses === "shopping-cart") ?
                      "shopping-cart cart-show":
                      "shopping-cart",
          cartHide: !prevState.cartHide
        }
      });
    }
    if(!this.state.burgerToggle) {
      this.setState({
        burgerToggle: true,
        burgerClasses: "hamburglar is-open",
        menuClasses: "menu",
        menuHide: true,
      });
    }
  }

  scrollTo = () => scrollIt(document.getElementById('abt'), 300, 'easeOutQuad');

  toggleMore = (e) => {
    this.body.classList.toggle('no-scroll');
    if(e.target.className === "more-back more-back-show") {
      this.handleMore();
      setTimeout(() => {
        document.getElementById('moreInfo').scrollTop = 0;
      }, 400);
    } else {
      let target = e.target.className === "more",
          img = (target) ? e.target.parentNode.previousSibling.childNodes[0].src 
                           : e.target.src,
          name = (target) ? e.target.nextSibling.dataset.product 
                            : e.target.parentNode.nextSibling.childNodes[1].dataset.product,
          desc = (target) ? e.target.parentNode.previousSibling.parentNode.dataset.desc
                            : e.target.parentNode.parentNode.dataset.desc,
          price = (target) ? e.target.nextSibling.dataset.price 
                             : e.target.parentNode.nextSibling.childNodes[1].dataset.price;
      this.setState({
        moreProductImg: img,
        moreProductName: name,
        moreProductDescription: desc,
        moreProductPrice: price
      }, this.handleMore());
    }
  }

  handleMore(){
    this.setState((prevState, prevProps) => {
      return {
        moreClasses: (!prevState.moreHide) ? "more-info" : "more-info more-info-show",
        moreHide: !prevState.moreHide,
        swipeClasses: (!prevState.moreHide) ? "m-swipe" : "m-swipe m-swiped",
        moreBackClasses: (!prevState.moreHide) ? "more-back" : "more-back more-back-show"
      }
    });
  }

  addItem = (e) => {
    if(this.state.cartHide === true && e.target.className === 'buy') {
      let cartItems = this.state.cartProducts, 
          total = parseInt(this.state.cartTotal, 10);
      const cartItem = e.target.dataset.product;
      const pid = e.target.dataset.id;
      const itemPrice = parseInt(e.target.dataset.price, 10);
      cartItems = cartItems.push([cartItem, itemPrice, pid]);
      total += itemPrice;
      this.setState({
        cartClasses: "shopping-cart cart-show",
        cartHide: false,
        emptyCart: "empty-cart empty-cart-false",
        cartProduct: cartItems,
        cartTotal: total,
        mgoatsS: "mgoats has-items",
        mgoatsL: "mgoats2 has-items"
      });
    }
  }

  removeItem = (e) => {
    if(e.target.className === 'remove-item') {
      const price = e.target.dataset.price;
      const index = e.target.dataset.index;
      const pid = e.target.dataset.id;
      let cartItems = this.state.cartProducts,
          total = this.state.cartTotal;
      cartItems.splice(index, 1);
      total -= price;
      this.setState({
        cartProducts: cartItems,
        cartTotal: total
      });
      if(cartItems.length === 0) {
        this.setState({
          emptyCart: "empty-cart",
          mgoatsS: "mgoats",
          mgoatsL: "mgoats2"
        });
      }
    }
  }

  navigate = (e) => {
    const page = e.target.dataset.page;
    this.setState({
      moreClasses: "more-info",
      moreBackClasses: "more-back",
      moreHide: true
    });
    this.body.classList.remove('no-scroll');
    if(page === this.state.page) {
      scrollIt(0, 300, 'easeOutQuad'); 
    } else {
      history.pushState({page: page}, null, '/' + page);
      if(e.target.className === 'mm'+page + ' mm') {
        this.toggleBurger();
        setTimeout(() => { 
          this.setState({ revealClasses: "reveal reveal-show" }); 
        }, 500);
        setTimeout(() => { 
          this.setState({ page: page }, scrollIt(0, 0, 'easeOutQuad'));
        }, 700);
        setTimeout(() => { this.setState({ revealClasses: "reveal" }) }, 1500);
      } else {
        this.setState({ 
          revealClasses: "reveal reveal-show",
          cartClasses: "shopping-cart",
          cartHide: true
        }); 
        setTimeout(() => { 
          this.setState({ page: page }, scrollIt(0, 0, 'easeOutQuad'));
        }, 200);
        setTimeout(() => { this.setState({ revealClasses: "reveal" }); }, 1000);
      }
    }
  }

  toCheckout = (e) => {
    history.pushState({page: 'Checkout'}, null, '/Checkout');
    e.persist();
    this.setState({  cartClasses: "shopping-cart", cartHide: true }); 
    setTimeout(() => { this.navigate(e) }, 500);
  }

  render = () => {
    return (
      <div className="App" >
        <Reveal 
          class={this.state.revealClasses} 
          id='r4' 
          text='GO!'/>

        <Header 
          cartToggle={this.toggleCart}
          nav={this.navigate} 
          dot={this.state.cartProducts}
          smallI={this.state.mgoatsS}
          largeI={this.state.mgoatsL} 
          page={this.state.page}
          burgerStuff={this.state.burgerClasses} 
          burger={this.toggleBurger} />

        <div id="pageBody">
          {
            (this.state.page === "Home") ? 

              <Home 
                nav={this.navigate} 
                more={this.toggleMore} 
                add={this.addItem}
                scrollTo={this.scrollTo}
                products={this.state.homeProducts} /> 

            : (this.state.page === "Shop") ? 

              <Shop 
                more={this.toggleMore} 
                add={this.addItem}
                ovProducts={this.state.ovProducts} 
                pbProducts={this.state.pbProducts} 
                svProducts={this.state.svProducts} /> 

            : (this.state.page === "Contact") ? 

              <Contact />

            : <Checkout
                loggedIn={this.state.loggedIn}
                loginErrors={this.state.loginErrors}
                cartProducts={this.state.cartProducts}
                cartTotal={this.state.cartTotal}
                user={this.state.user}
                nav={this.navigate}
                signUp={this.signUp}
                nav={this.navigate}
                login={this.login} />
          }
        </div>

        <Footer nav={this.navigate} />

        <Menu 
          classes={this.state.menuClasses}
          page={this.state.page}
          nav={this.navigate} 
          toCart={this.toggleCart} />

        <Cart 
          classes={this.state.cartClasses} 
          total={this.state.cartTotal} 
          cartToggle={this.toggleCart} 
          products={this.state.cartProducts} 
          emptyCart={this.state.emptyCart} 
          removeItem={this.removeItem}
          nav={this.toCheckout} />

        <More 
          classes={this.state.moreClasses} 
          name={this.state.moreProductName}
          description={this.state.moreProductDescription}
          img={this.state.moreProductImg} 
          price={this.state.moreProductPrice}
          toggleMore={this.toggleMore} 
          add={this.addItem} />

        <Swipe classes={this.state.swipeClasses} />

        <Moreback 
          classes={this.state.moreBackClasses} 
          toggleMore={this.toggleMore} />

      </div>
    );
  }
}



