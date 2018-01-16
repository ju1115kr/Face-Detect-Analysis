import React from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';

export default class FACEBOOK extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uploadedFile: null,
            userPicture: ''
        };
    }

    responseFacebook = (response) => {
        const pictureURL = "http://graph.facebook.com/" + response.id + "/picture?type=large";
        this.setState({
            userPicture: pictureURL
        });
        console.log(pictureURL);
        return(pictureURL)
    }

    render() {
        return (
            <FacebookLogin
                appId="1339808736124796" // Facebook Test Page App ID
                autoLoad={false}
                fields="name, email, picture"
                callback={this.responseFacebook} 
            />
        )
    }
}

