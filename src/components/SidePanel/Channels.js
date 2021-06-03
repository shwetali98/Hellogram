import React from "react";

import firebase from "../../firebase";
import {
  Menu,
  Icon,
  Modal,
  Form,
  Input,
  Button,
  MenuItem,
} from "semantic-ui-react";

class Channels extends React.Component {
  state = {
    user: this.props.currentUser,
    channels: [],
    channelName: "",
    channelDetails: "",
    channelsRef: firebase.database().ref("channels"),
    modal: false,
  };

  componentDidMount() {
    this.addListeners();
  }
  addListeners = () => {
    let loadedChannels = [];
    this.state.channelsRef.on("child_added", (snap) => {
      loadedChannels.push(snap.val());
      console.log(loadedChannels);
    });
  };

  addChannel = () => {
    const {channelsRef, channelName, channelDetails, user} = this.state;
    const key = channelsRef.push().key;

    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL,
      },
    };
    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        this.setState({channelName, channelDetails});
        this.CloseModal();
        console.log("channel added");
      })

      .catch((err) => {
        console.error(err);
      });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.addChannel();
    }
  };
  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  displayChannels = (channels) =>
    channels.length > 0 &&
    channels.map((channel) => (
      <MenuItem
        key={channel.id}
        onclick={() => console.log("channels")}
        name={channel.name}
        style={{opacity: 0.7}}
      >
        #{channel.name}
      </MenuItem>
    ));

  isFormValid = ({channelName, channelDetails}) => true;

  openModal = () => this.setState({modal: true});

  CloseModal = () => this.setState({modal: false});

  render() {
    const {channels, modal} = this.state;
    return (
      <React.Fragment>
        <Menu.Menu style={{paddingBottom: "2em"}}>
          <Menu.Item>
            <span>
              <Icon name="exchange" /> CHANNELS
            </span>
            ({""}) ({channels.length}){" "}
            <Icon name="add" onClick={this.openModal} />
          </Menu.Item>
          {this.displayChannels(channels)}
        </Menu.Menu>

        <Modal basic open={modal} onClose={this.classModal}>
          <Modal.Header> Add a Channel </Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label="Name of Channel"
                  name="ChannelName"
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field>
                <Input
                  fluid
                  label="About the Channel"
                  name="ChannelDetails"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
            <Modal.Content>
              <Modal.Actions>
                <Button color="green" inverted onClick={this.handleSubmit}>
                  <Icon name="checkmark" />
                  Add
                </Button>
                <Button color="red" inverted onClick={this.CloseModal}>
                  <Icon name="remove" />
                  Cancel
                </Button>
              </Modal.Actions>
            </Modal.Content>
          </Modal.Content>
        </Modal>
      </React.Fragment>
    );
  }
}
export default Channels;
