class Title extends Phaser.Scene {
    constructor() {
        super({ key: 'title' });
    }
    preload(){
        this.load.path = './assets/';
        this.load.spritesheet('roly', 'RolySpriteSheet.png', {
            frameWidth: 100,
            frameHeight: 100,
            endFrame: 2,
        });
    }

    create() {
        this.add.text(400, 250, 'Rolly-Polly to the End', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        // Add a button to start the game
        this.add.text(400, 350, 'Press The Up Arrow To Start', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        this.input.keyboard.on('keydown', (event) => {
            if (event.code === 'ArrowUp') {
                this.scene.start('transition');
            }
          });
    }
}



class Gameplay extends Phaser.Scene{
    constructor() {
        super('gameplay');
    }
    create(){
        this.add.text(100, 50, "This is the Gameplay screen.\n Rolly polly jumps over two slugs ");

        // if loss then go to defeat screen 
        // if win then go to victory screen 
        this.add.text(400, 350, 'Press The Up Arrow To Win', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        this.add.text(400, 500, 'Press The Down Arrow To Lose', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        this.input.keyboard.on('keydown', (event) => {
            if (event.code === 'ArrowUp') {
                this.scene.start('victory');
            }
            if (event.code === 'ArrowDown') {
                this.scene.start('defeat');
            }
          });
    }
}

class Defeat extends Phaser.Scene{
    constructor() {
        super({ key: 'defeat' });
    }
    preload ()
    {
        this.load.image("rolly polly", "assets/RolySpriteSheet.png");
        this.load.image("skull", "assets/skull.png");
    }
    create() {
        this.add.text(100, 50, "This is the Defeat screen.");
        
        const text = this.add.text(400, 150, 'Defeat!', { align: 'center' }, 0xFF69B4);
        text.setTint(0x750000, 0xA30000, 0xD10000, 0xFF0000);
        text.setOrigin(0.5, 0.5);
        text.setResolution(window.devicePixelRatio);
        text.setFontFamily('Arial');
        text.setFontStyle('bold');
        text.setFontSize(100);
        text.setDropShadow(0, 8, 0x000000, 0.2);

        text.preFX.setPadding(32);
        
        const bug = this.add.image(100, 500, 'rolly polly');
        let skull = this.add.image(500, 450, 'skull');
        
        bug.setScale(2);

        this.tweens.add({
            targets: bug,
            x: 400,
            ease: 'power3',
            duration: 1000
        });
        this.tweens.add({
            targets: skull,
            x: 400,
            ease: 'power3',
            duration: 500
        });
        
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}

class Victory extends Phaser.Scene{
    constructor() {
        super('victory');
    }
    preload ()
    {
        this.load.image("rolly polly", "assets/RolySpriteSheet.png");
        this.load.image("award", "assets/award.png");
    }
    create() {
        this.add.text(100, 50, "This is the Victory screen.");
        const text = this.add.text(400, 150, 'Victory!', { align: 'center' }, 0xFF69B4);
        text.setTint(0xFF69B4, 0xFFC0CB, 0x9F2B68, 0xE30B5C);
        text.setOrigin(0.5, 0.5);
        text.setResolution(window.devicePixelRatio);
        text.setFontFamily('Arial');
        text.setFontStyle('bold');
        text.setFontSize(100);

        text.preFX.setPadding(32);
        
        const bug = this.add.image(100, 500, 'rolly polly');
        const award = this.add.image(500, 450, 'award');
        bug.setScale(2);

        this.tweens.add({
            targets: bug,
            x: 400,
            ease: 'power3',
            duration: 1000
        });
        this.tweens.add({
            targets: award,
            x: 400,
            ease: 'power3',
            duration: 500
        });
        
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}

class Transition extends Phaser.Scene{
    constructor(){
        super('transition')
    }
    create(){
        this.anims.create({
            key: 'roll', 
            frames: 'roly',
            frameRate: 6,
            repeat: -1
        });
        const sprite = this.add.sprite(800, 600*.5, 'roly').play('roll');

        this.add.text(400, 250, "Transition");
        
        this.tweens.add({
            targets: sprite,
            x: 0,
            duration: 2000,
            ease: 'Linear',
            repeat: -1,
        });

        this.time.delayedCall(2000, ()=> this.scene.start('gameplay'));
    }
    
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
        }
    },
    scene: [Title,Transition,Gameplay,Victory,Defeat]
};

// Create a new game with the configuration
var game = new Phaser.Game(config);