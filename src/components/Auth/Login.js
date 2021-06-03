import React from 'react';
import firebase from '../../firebase';

import { Grid, Form, Button, Header, Message, Icon,Segment} from 'semantic-ui-react';
import { Link } from 'react-router-dom';




class Login extends  React.Component  {
    state = {
       
        email :"",
        password :"",
        errors : [],
        loading : false,

    };

       

    

    displayErrors = errors => errors.map((error,i)  =><p key ={i}>{error.message}</p>)

    handleChange = Event => {
        this.setState({[Event.target.name]: Event.target.value});
    }; 

    handleSubmit = Event => {
        Event.preventDefault();
        if (this.isFormvalid(this.state))
        {
            this.setState({ errors : [], loading: true});
            firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(signedInUser => {
                console.log(signedInUser);

            })

            .catch(err => {
                console.error(err);
                this.setState({
                    errors: this.state.errors.concat(err),
                    loading :false
                })
            })
    
      
    };

};
isFormvalid = ({email,password})  => email && password;



handleInputError =(errors, inputName) => {
  return errors.some(error =>
    error.message.toLowerCase().includes(inputName)
    )

    ? "error"
    : ""

}


    
    render() 
     {
        const{email,password,errors,loading} = this.state;
        return (
           <Grid textAlign="center" verticalAlign="middle" className="app">
               <Grid.Column style ={{ maxWidth: 450 }}>
                   <Header as="h2" Icon color="yellow" textAlign="Center">
                       <Icon name ="code branch" iconPosition="center" color="yellow"/>
                       Login to Hellogram
                   </Header>
                   <Form onSubmit={this.handleSubmit}  size="large">
                       <Segment stacked>

                        
                           <Form.Input
                            fluid name="email"
                             icon="mail" 
                             iconPosition="left"
                           placeholder="Email Address"
                            onChange={this.handleChange}
                            value={email}
                           className = {this.handleInputError(errors, 'email')}
                            type= "Email"/>

                           <Form.Input
                            fluid name="password"
                             icon="lock"
                              iconPosition="left"
                           placeholder="Password" 
                           onChange={this.handleChange}
                           value={password}
                           className = {this.handleInputError(errors, 'password')}
                           type="Password"/>

                           


                           <Button disabled={loading} className ={loading ? 'loading' : ''}
                           color ="yellow" fluid size="large">Submit</Button>
                       </Segment>
                   </Form>
                   {errors.length > 0 && 
                   (<Message error>
                       <h1> Error </h1>
                       {this.displayErrors(errors)}

                       </Message>
                   
                   )}
                    <Message>Don't have an account?  <Link to="/Register">Register</Link></Message>
               </Grid.Column>
           </Grid>
        );
    };
};

export default Login;