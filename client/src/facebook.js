import React from 'react';
import FacebookLogin from 'react-facebook-login';
import request from 'superagent';
const UPLOAD_URL = 'http://ju1115kr.iptime.org:9009';
const UPLOAD_API_PATH = '/api/v1.0/profilePicture';

export default class FACEBOOK extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profileID: '',
            uploadedURL: '',
            userPicture: '',
            file: ''
        };
    }

    responseFacebook = (response) => {
        const pictureURL = "http://graph.facebook.com/" + response.id + "/picture?type=large";
        this.setState({
            userPicture: pictureURL,
            profileID: response.id
        });
        this.handleImageUpload(pictureURL);
    }

    handleImageUpload(url){
        let getPicture = request.get(url);

        getPicture.end((err, response) => {
            if (err) {
                console.error(err);
            }
            if(response.body !== '') {
                this.setState({
                    file: response.text
                });
//                console.log(response);
//                console.log(this.state.file);
            }
        });
        

        let upload = request.post(UPLOAD_URL + UPLOAD_API_PATH)
                        .send({url: this.state.userPicture, id: this.state.profileID})
        console.log(upload);
        
        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }

            if(response.body !== '') {
                this.setState({
                    uploadedURL: UPLOAD_URL + response.text
                });
            }
        });
    }

    render() {
        return (
            <div>
                <FacebookLogin
                    appId="1339808736124796" // Facebook Test Page App ID
                    autoLoad={false}
                    fields="name, email, picture"
                    scope="public_profile"
                    callback={this.responseFacebook} 
                />

                <div>
                    {this.state.userPicture === '' ? null :
                    <div>
                        <p>{this.state.userPicture}</p>
                        <img className="profileImage" src={this.state.uploadedURL} width="50%" height="50%" alt="profileImage" />
                    </div>
                    }
                    </div>
                </div>
        )
    }
}

