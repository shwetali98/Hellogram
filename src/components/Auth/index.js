import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import reportWebVitals from './reportWebVitals';
import firebase from './firebase';


import Spinner from './Spinner' ;
import { BrowserRouter as Router ,Switch,Route, withRouter} from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import   'semantic-ui-css/semantic.min.css';
import { createStore} from 'redux';
import {Provider,connect} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from '../../reducers';
import {setUser,clearUser} from './actions';
const store = createStore(rootReducer, composeWithDevTools());



class Root extends React.Component {
  componentDidMount() {
    //console.log(this.props.isLoading);
    firebase.auth().onAuthStateChanged(user =>{
      if (user) {
        this.props.setUser(user);
        this.props.history.push('/');
      }
      else {
        this.props.history.push('/login');
        this.props.clearUser();

      }
    });
  }
  render() {
    return  this.props.isLoading ?<Spinner/> :  (
      
        <Switch>
          <Route  exact path ="/" component ={App}/>
          <Route path ="/Login" component ={Login}/>
          <Route path ="/Register" component ={Register}/>
        </Switch>
      
    );

  }
}
const mapstateFromProps =state =>({
  isLoading: state.user.isLoading 

});
 const RouteWithAuth = withRouter(connect(mapstateFromProps,{setUser,clearUser})(Root));

ReactDOM.render(
  <Provider store = {store}>
  <Router>
<RootWithAuth/>
</Router>
</Provider>
,document.getElementById('root')
);

//ReactDOM.render(
  //<React.StrictMode>
   // <App />
  //</React.StrictMode>,
 // document.getElementById('root')
//);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
