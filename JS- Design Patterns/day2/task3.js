class Device {
    increaseVolume() {

    }

    decreaseVolume() {

    }

    mute() {

    }
}


class TV extends Device {
    constructor() {
        super();
        this.volume = 50;
    }

    increaseVolume() {
        this.volume = this.volume + 10;
        console.log(`TV Volume Increased to ${this.volume}`);
    }

    decreaseVolume() {
        this.volume = this.volume - 10;
        console.log(`TV Volume Decreased to ${this.volume}`);
    }

    mute() {
        console.log("TV Muted");
    }
}

class Speaker extends Device {
    constructor() {
        super();
        this.volume = 5;
    }

    increaseVolume() {
        this.volume += 2;
        console.log(`Speaker Volume Increased to ${this.volume}`);
    }

    decreaseVolume() {
        this.volume -= 2;
        console.log(`Speaker Volume Decreased to ${this.volume}`);
    }

    mute() {
        console.log("Speaker Muted");
    }
}


class RemoteControl {
    constructor(device) {
        this.device = device;
    }

    increaseVolume() {
        this.device.increaseVolume();
    }

    decreaseVolume() {
        this.device.decreaseVolume();
    }
}

class SimpleRemote extends RemoteControl {
    constructor(device) {
        super(device);
    }
}

// Refined Abstraction: Advanced Remote
class AdvancedRemote extends RemoteControl {
    constructor(device) {
        super(device);
    }

    mute() {
        this.device.mute();
    }
}

// --- Demonstration ---

const tv = new TV();
const speaker = new Speaker();

console.log("--- Simple Remote with TV ---");
const simpleRemoteForTV = new SimpleRemote(tv);
simpleRemoteForTV.increaseVolume();
simpleRemoteForTV.decreaseVolume();

console.log("\n--- Simple Remote with Speaker ---");
const simpleRemoteForSpeaker = new SimpleRemote(speaker);
simpleRemoteForSpeaker.increaseVolume();
simpleRemoteForSpeaker.decreaseVolume();


console.log("\n--- Advanced Remote with TV ---");
const advancedRemoteForTV = new AdvancedRemote(tv);
advancedRemoteForTV.increaseVolume();
advancedRemoteForTV.decreaseVolume();
advancedRemoteForTV.mute();

console.log("\n--- Advanced Remote with Speaker ---");
const advancedRemoteForSpeaker = new AdvancedRemote(speaker);
advancedRemoteForSpeaker.increaseVolume();
advancedRemoteForSpeaker.decreaseVolume();
advancedRemoteForSpeaker.mute();