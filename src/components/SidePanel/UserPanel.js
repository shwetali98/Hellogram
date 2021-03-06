import React from "react";

import firebase from "../../firebase";
import {Dropdown, Grid, Header, Icon, Image} from "semantic-ui-react";

class UserPanel extends React.Component {
  state = {
    user: this.props.currentUser,
  };

  DropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{this.state.user.displayName}</strong>
        </span>
      ),
      disabled: true,
    },
    {
      key: "avtar",
      text: <span> Change Avtar </span>,
    },
    {
      key: "signout",
      text: <span onClick={this.handleSignout}>Sign Out</span>,
    },
  ];

  handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("Signed out !"));
  };
  render() {
    const {user} = this.state;
    return (
      <Grid style={{background: "#4c3c4c"}}>
        <Grid.Column>
          <Grid.Row style={{padding: "1.2em", margin: 0}}>
            <Header inverted floated="left" as="h2">
              <Icon name="code" />
              <Header.Content>Hellogram</Header.Content>
            </Header>

            <Header style={{padding: "0.25em"}} as="h4" inverted>
              <Dropdown
                trigger={
                  <span>
                    <Image src={user.photoURL} spaced="right" avatar />
                    {user.displayName}
                  </span>
                }
                options={this.DropdownOptions()}
              />
            </Header>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
