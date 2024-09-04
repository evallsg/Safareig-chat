import Model from "./model.js";
import View from "./view.js";
import Controller from "./controller.js";

class App {
    constructor() {
        // this.server = new SillyClient();
        this.controller = new Controller();
        this.view = new View(this.controller);
        this.controller.init(this.view);
    }
}

export default App;
globalThis.app = new App();
/** LOGIN */
// Connect to room with a profile (room, username, image)

/** APP */
// Create new room
// Open new private chat
// Change image
// Select chat

/** CHAT (private or room)*/
// Send message (text, image, emoji, link..)
// Show message
// View online users 