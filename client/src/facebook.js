import React from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';

export default class FACEBOOK extends React.Component {
    responseFacebook = (response) => {
        console.log(response);
    }

    render() {
        return (
            <FacebookLogin
                appId="1339808736124796" // Facebook Test Page App ID
                autoLoad={true}
                fields="name,email,picture"
                callback={this.responseFacebook} 
            />
        )
    }
}

