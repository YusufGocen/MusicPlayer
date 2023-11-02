class Music {
    constructor(title, singer, img, file) {
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }

    getName() {
        return this.title + " - " + this.singer;
    }
}

const musicList = [
    new Music("Blinding Lights","The Weekend","Blinding-lights.png","Blinding-lights.mp3"),
    new Music("Do I Wanne Know","Artic-Monkeys","articmonkeys.jpg","articmonkeys.mp3"),
    new Music("Kill Bill","SZA","Sza.jpg","Sza.mp3"),
    new Music("Another Love","Tom Odell","tomodel.jpg","tomodel.mp3"),
    new Music("Flowers","Miley Cyrus","Flowers.jpg","flowers.mp3"),
    new Music("Calm Down","Selena Gomez - Rema","calm-down.jpg","calm-down.mp3"),
    new Music("Wake up In The Sky","","brunomars.png","brunomars.mp3"),
    new Music("Let Go","Central Cee","letgo.jpg","letgo.mp3"),
    new Music("Starboy","The Weekend","starboy.png","starboy.mp3"),
    new Music("Rich Flex","Drake","Drake.webp","drake.mp3")  
];
