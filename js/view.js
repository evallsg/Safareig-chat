/**
* @description Code in charge of representing the data of the model on screen. Communicates with both a model and a controller.
*/

class View {
    constructor(controller) {
        this.controller = controller;

        this.body = document.getElementsByTagName('body')[0];
        this.login = null;
        this.createLogin();
        this.createAvatarDialog();
    }

    createLogin() {
        this.login = document.createElement('div');
        this.login.className = 'container row-container gradient';
        this.body.appendChild(this.login);

        let modal = document.createElement('div');
        modal.className = 'modal';
        this.login.appendChild(modal);

        // Image container
        let loginImage = document.createElement('div');
        loginImage.id = 'user-avatar';
        loginImage.className = 'round-image large login-image';
        loginImage.addEventListener('click', () => this.showAvatarDialog());
        modal.appendChild(loginImage);
        
        let span = document.createElement('span');
        span.className = 'caption';
        span.innerText = 'Change';
        loginImage.appendChild(span);

        let userImage = document.createElement('img');
        userImage.id = 'avatar-img';
        userImage.src="/imgs/default_avatar.png";
        loginImage.appendChild(userImage);

        // Title
        let title = document.createElement('h1');
        title.innerText = 'Safareig';
        modal.appendChild(title);

        // Form
        // username
        var div = document.createElement('div');
        div.className = "row";
        modal.appendChild(div);

        let usernameError = document.createElement('p');
        usernameError.innerText = 'Username required';
        usernameError.className = 'error hidden';
        div.appendChild(usernameError);

        let username = document.createElement('input');
        username.placeholder = 'Username';
        username.id = 'username';
        div.appendChild(username);

        // room name
        var div = document.createElement('div');
        div.className = "row";
        modal.appendChild(div);
        
        let roomnameError = document.createElement('p');
        roomnameError.innerText = 'Room name required';
        roomnameError.className = 'error hidden';
        div.appendChild(roomnameError);

        var roomname = document.createElement('input');
        roomname.placeholder = 'Room name';
        roomname.id = 'room-name';
        div.appendChild(roomname);
        
        // Button
        var div = document.createElement('div');
        div.className = "row";
        modal.appendChild(div);

        let button = document.createElement('button');
        button.innerText = 'Join';
        button.addEventListener('click', (event) => {
            usernameError.classList.add('hidden');
            roomnameError.classList.add('hidden');

            let data = {
                username: username.value,
                roomname: roomname.value,
                avatar: userImage.src,
            }
            
            if(!data.username || !data.roomname) {
                if(!data.username) {
                    usernameError.classList.remove('hidden');
                }
                if(!data.roomname) {
                    roomnameError.classList.remove('hidden');
                }
                return;
            }
            this.controller.joinChat(data, (response) => this.createApp(response), (err) => alert('Server error'));
        })
        modal.appendChild(button);
    }

    createAvatarDialog() {
        if(!this.login) {
            return;
        }

        this.avatarDialog = document.createElement('div');
        this.avatarDialog.className = "dialog";
        this.login.appendChild(this.avatarDialog);

        let grid = document.createElement('div');
        grid.className = 'grid';
        this.avatarDialog.appendChild(grid);

        // Bear avatar
        var imgDiv = document.createElement('div');
        imgDiv.className = 'round-image';
        grid.appendChild(imgDiv);
        imgDiv.addEventListener('click', (event) => this.changeAvatar(event.target))

        var img = document.createElement('img');
        img.id = 'bear-img';
        img.src = '/imgs/bear.png';
        imgDiv.appendChild(img);
        imgDiv.addEventListener('click', (event) => this.changeAvatar(event.target))

        // Fox avatar
        var imgDiv = document.createElement('div');
        imgDiv.className = 'round-image';
        grid.appendChild(imgDiv);

        var img = document.createElement('img');
        img.id = 'fox-img';
        img.src = '/imgs/fox.png';
        imgDiv.appendChild(img);
        imgDiv.addEventListener('click', (event) => this.changeAvatar(event.target))

        // Owl avatar
        var imgDiv = document.createElement('div');
        imgDiv.className = 'round-image';
        grid.appendChild(imgDiv);

        var img = document.createElement('img');
        img.id = 'owl-img';
        img.src = '/imgs/owl.png';
        imgDiv.appendChild(img);
        imgDiv.addEventListener('click', (event) => this.changeAvatar(event.target))

        // Beaver avatar
        var imgDiv = document.createElement('div');
        imgDiv.className = 'round-image';
        grid.appendChild(imgDiv);
        imgDiv.addEventListener('click', (event) => this.changeAvatar(event.target))

        var img = document.createElement('img');
        img.id = 'beaver-img';
        img.src = '/imgs/beaver.png';
        imgDiv.appendChild(img);
        imgDiv.addEventListener('click', (event) => this.changeAvatar(event.target))

        // Raccoon avatar
        var imgDiv = document.createElement('div');
        imgDiv.className = 'round-image';
        grid.appendChild(imgDiv);

        var img = document.createElement('img');
        img.id = 'raccoon-img';
        img.src = '/imgs/raccoon.png';
        imgDiv.appendChild(img);
        imgDiv.addEventListener('click', (event) => this.changeAvatar(event.target))

        // Tanuki avatar
        var imgDiv = document.createElement('div');
        imgDiv.className = 'round-image';
        grid.appendChild(imgDiv);

        var img = document.createElement('img');
        img.id = 'tanuki-img';
        img.src = '/imgs/tanuki.png';
        imgDiv.appendChild(img);
        imgDiv.addEventListener('click', (event) => this.changeAvatar(event.target))

        // Default avatar
        var imgDiv = document.createElement('div');
        imgDiv.className = 'round-image';
        grid.appendChild(imgDiv);

        var img = document.createElement('img');
        img.id = 'default-img';
        img.src = '/imgs/default_avatar.png';
        imgDiv.appendChild(img);
        imgDiv.addEventListener('click', (event) => this.changeAvatar(event.target))

        // Close button
        let span = document.createElement('span');
        span.className = 'close';
        span.addEventListener('click', () => this.hiddeAvatarDialog());
        this.avatarDialog.appendChild(span);

        // Reference author link
        let link = document.createElement('a');
        link.href = 'http://www.freepik.com';
        link.innerText = 'Designed by Freepik';
        this.avatarDialog.appendChild(link);
        
        this.hiddeAvatarDialog();        
    }

    showAvatarDialog() {
        this.avatarDialog.classList.remove('hidden');
        this.login.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            let avatar = document.getElementById('user-avatar');
            if(!this.avatarDialog || event.target.parentElement == avatar) {
                return;
            }
            // Close dialog if user clicks outside
            let area = this.avatarDialog.getBoundingClientRect();
            if(!(event.clientX >= area.x && event.clientX <= (area.x + area.width) && event.clientY >= area.y && event.clientY <= (area.y + area.height)) ) {
                this.hiddeAvatarDialog();
            }
        })
    }

    hiddeAvatarDialog() {
        this.avatarDialog.classList.add('hidden');
    }

    changeAvatar(element) {
        let img = document.getElementById('avatar-img');
        img.src = element.src;
    }

    createApp(data) {
        this.login.classList.add('hidden');
        let container = document.getElementsByClassName('container')[0];
        container.classList.remove('hidden');

        let input = document.getElementById('input-msg');
        input.addEventListener('keyup', (event) => {
            if(event.key == 'Enter') {
                this.sendMessage(event.target.value);
            }
        })
        this.updateChat(data)
    }

    updateChat(data) {
        let title = document.getElementById('chat-name');
        title.innerText = data.roomname;
    }

    sendMessage(text) {
        let currentDate = new Date(); 
        let time = (currentDate.getHours() < 10 ? '0' : '') + currentDate.getHours() + ":" + (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes();

        this.controller.sendMessage(text, time);

        let chatContainer = document.getElementById('chat-container');

        let div = document.createElement('div');
        div.className = 'message me';
        chatContainer.appendChild(div);

        let bubble = document.createElement('div');
        bubble.className = 'bubble right';
        div.appendChild(bubble);

        let user = this.controller.getUserData();
        
        var p = document.createElement('p');
        p.innerText = text;
        bubble.appendChild(p);
        
        var divInfo = document.createElement('div');
        divInfo.className = 'message-info time';
        bubble.appendChild(divInfo);

        var p = document.createElement('p');
        p.innerText = time;
        divInfo.appendChild(p);

        let avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-user round-image small';
        div.appendChild(avatarDiv);

        let img = document.createElement('img');
        img.src = user.avatar;
        avatarDiv.appendChild(img);
    }
}

export default View;