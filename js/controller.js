import View from "./view.js";
/**
* @description Code in charge of modifying the data based on user interaction. Accepts input and converts it to commands for the model or view.
*/

class Controller {
    constructor() {
        this.host = "localhost" + ":55000/"//'wss://localhost/55000/ws';
        this.view =  null;
        this.server = new SillyClient();

        this.username = null;
        this.userId = null;
        this.avatar = null;
        this.users = {};
        this.currentChat = '';
        this.room = '';
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
                this.server.getRoomInfo( data.roomname, (data) => console.log(data));
                this.currentChat = this.room = data.roomname;
                onJoin(data);
                this.sendMessage('profile');
            }
        }

        this.server.on_error = function (err) {
            if(onError) {
                onError(err);
            }
        }

        this.server.on_user_connected = (userId) =>  this.sendMessage('profile', {users: [userId]});
        this.server.on_user_disconnected = (userId) => this.removeOnlineUser(userId);

        this.server.on_message = (userId, msg) => this.messageReceived(userId, msg);
    }

    changeChat(name) {
        this.currentChat = name;
    }

    sendMessage(type, data = {}) {
        
        let message = {
            user: this.userId,
            username: this.username,
            type: type
        }
        switch(type) {
            case 'text': case 'private':
                message.text = data.text;
                message.time = data.time;
                break;
            case 'typing':
                message.state = data.state;
                break;
            case 'history':
                break;
            case 'profile':
                message.username = this.username;
                message.avatar = this.avatar;
                break;
        }

        if(type == 'private' || type == 'profile' && data.users) {
            this.server.sendMessage(message, data.users);
        }
        else {
            this.server.sendMessage(message);
        }
    }

    messageReceived( userId, message ) {
        message = JSON.parse(message);
        switch(message.type) {
            case 'text': case 'private':
                message.text = message.text;
                message.time = message.time;
                this.view.messageReceived(userId, message, this.users[userId]);
                break;
            case 'typing':
                this.view.updateTypingState(this.users[userId].username, message.state);
                break;
            case 'history':
                break;
            case 'profile':
                this.addOnlineUser(userId, message.username, message.avatar);
                return;
        }
    }

    getUserData() {
        return {username: this.username, avatar: this.avatar};
    }

    addOnlineUser(userId, username, avatar) {

        this.users[userId] = {username, avatar};
        this.view.updateOnlineUsers(this.users);
    }

    removeOnlineUser(userId) {
        delete this.users[userId]    
        this.view.updateOnlineUsers(this.users);
        
    }

    async getHits() {
        const client_id = ""//MY_ID
        const client_secret = ""// MY_KEY

        const encoded = btoa(unescape(encodeURIComponent((client_id + ":" + client_secret))))

        let headers = {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "Authorization": "Basic " + encoded
        }
        const request = new Request("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers,
            body: "grant_type=client_credentials"
        })
        let response = await fetch(request);
        if(response.ok) {
            response.json().then(async data => {

                console.log(data)
                const access_token = data['access_token'];
                localStorage.access_token = access_token;
    
                // Send the HTTP GET request to the Spotify API for the top tracks
                // Set up the headers for the HTTP GET request
                headers = {
                    'Authorization': 'Bearer ' + access_token,
                    'Content-Type': 'application/json',
                }
                response = await fetch('https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n/tracks?limit=5&offset=0', {headers, method: 'GET'});
                if(response.ok) {
                    response.json().then(tracks => {
                        const top_tracks = tracks['items']
                        const hits = []
                        for(let i = 0; i < top_tracks.length; i++) {
                            const track = top_tracks[i];
                            const rank = (i+1).toString() + '.'
                            const name = track['track']['name']
                            let artists = track['track']['artists'].map(x=>x.name);
                            artists = artists.join(", ")
                            const uri = track['track']['uri']
                            hits.push({"rank":rank, "name":name, "artist":artists, "uri":uri})
        
                        }
                        this.view.sendPlaylist(hits);
                    })
                }
                else {
                    console.log(response.status)
                    response.text().then(text => console.log(text))
                }
            });
        }
        else {
            console.log(response.status)
            response.text().then(text => console.log(text))
        }
    }

    async getTrack() {
        const client_id = ""//MY_ID
        const client_secret = ""// MY_KEY

        const encoded = btoa(unescape(encodeURIComponent((client_id + ":" + client_secret))))

        let headers = {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "Authorization": "Basic " + encoded
        }
        const request = new Request("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers,
            body: "grant_type=client_credentials"
        })
        let response = await fetch(request);
        if(response.ok) {
            response.json().then(async data => {

                console.log(data)
                const access_token = data['access_token'];
                localStorage.access_token = access_token;
    
                // Send the HTTP GET request to the Spotify API for the top tracks
                // Set up the headers for the HTTP GET request
                headers = {
                    'Authorization': 'Bearer ' + access_token,
                    'Content-Type': 'application/json',
                }
                response = await fetch('https://spclient.wg.spotify.com/color-lyrics/v2/track/', {headers, method: 'GET'});
                if(response.ok) {
                    response.json().then(tracks => {
                        const top_tracks = tracks['items']
                        const hits = []
                        for(let i = 0; i < top_tracks.length; i++) {
                            const track = top_tracks[i];
                            const rank = (i+1).toString() + '.'
                            const name = track['track']['name']
                            let artists = track['track']['artists'].map(x=>x.name);
                            artists = artists.join(", ")
                            const uri = track['track']['uri']
                            hits.push({"rank":rank, "name":name, "artist":artists, "uri":uri})
        
                        }
                        this.view.sendPlaylist(hits);
                    })
                }
                else {
                    console.log(response.status)
                    response.text().then(text => console.log(text))
                }
            });
        }
        else {
            console.log(response.status)
            response.text().then(text => console.log(text))
        }
    }
}

export default Controller;