import View from "./view.js";
/**
* @description Code in charge of modifying the data based on user interaction. Accepts input and converts it to commands for the model or view.
*/

class Controller {
    constructor() {
        this.host = 'wss://webglstudio.org/port/55000/ws';
        this.view =  null;
        this.server = new SillyClient();

        this.username = null;
        this.userId = null;
        this.avatar = null;
    }

    init(view) {
        this.view =  view;
        // this.bindLoginEvents();
    }

    // bindLoginEvents() {
    //     let userAvatar = document.getElementById('user-avatar');
    //     userAvatar.addEventListener('click', () => this.view.showAvatarDialog());

    //     let closeBtn = document.getElementsByClassName('close')[0];
    //     closeBtn.addEventListener('click', () => this.view.hiddeAvatarDialog());
    // }

    joinChat(data, onJoin, onError) {
        // Connect to server        
        this.server.connect( this.host, data.roomname);
        this.server.on_ready = ( userId ) =>
        {
            if(onJoin) {
                this.username = data.username;
                this.userId = userId;
                this.avatar = data.avatar;
                this.server.getRoomInfo( data.roomname, (data) => console.log(data))
                onJoin(data);
            }
        }

        this.server.on_error = function (err) {
            if(onError) {
                onError(err);
            }
        }
    }

    sendMessage(text, time) {
        let message = {
            type: 'msg',
            text: text,
            time: time,
            user: this.userId
        }

        this.server.sendMessage(message);
    }

    getUserData() {
        return {username: this.username, avatar: this.avatar};
    }
}

export default Controller;