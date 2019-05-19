// 实际应用场景改为window.innerWidth和window.innerHeight。
// 这里是为了方便查看示例。
var width = window.innerWidth;
var height = window.innerHeight;

// 创建游戏实例
var game = new Phaser.Game(width, height, Phaser.AUTO, '#game');

// 定义场景
var states = {
    // 加载场景
    preload: function() {
        this.preload = function() {
            // 设置背景为黑色
            game.stage.backgroundColor = '#000000';
            // 加载游戏资源
            game.load.crossOrigin = 'anonymous';
            game.load.image('bg', './assets/images/bg.png');
            game.load.image('Rat', './assets/images/Rat.jpg');
            game.load.image('green', './assets/images/green.png');
            game.load.image('red', './assets/images/red.png');
            game.load.image('yellow', './assets/images/yellow.png');
            game.load.image('bomb', './assets/images/bomb.png');
            game.load.image('five', './assets/images/five.png');
            game.load.image('three', './assets/images/three.png');
            game.load.image('one', './assets/images/one.png');
            game.load.audio('bgMusic', './assets/audio/bgMusic.mp3');
            game.load.audio('scoreMusic', './assets/audio/addscore.mp3');
            game.load.audio('bombMusic', './assets/audio/boom.mp3');
            // 添加进度文字
            var progressText = game.add.text(game.world.centerX, game.world.centerY, '0%', {
                fontSize: '60px',
                fill: '#ffffff'
            });
            progressText.anchor.setTo(0.5, 0.5);
            // 监听加载完一个文件的事件
            game.load.onFileComplete.add(function(progress) {
                progressText.text = progress + '%';
            });
            // 监听加载完毕事件
            game.load.onLoadComplete.add(onLoad);
            // 最小展示时间，示例为3秒
            var deadLine = false;
            setTimeout(function() {
                deadLine = true;
            }, 100);
            // 加载完毕回调方法
            function onLoad() {
                if (deadLine) {
                    // 已到达最小展示时间，可以进入下一个场景
                    game.state.start('created');
                } else {
                    // 还没有到最小展示时间，1秒后重试
                    setTimeout(onLoad, 1000);
                }
            }
        }
    },
    // 开始场景
    created: function() {
        this.create = function() {
            // 添加背景
            var bg = game.add.image(0, 0, 'bg');
            bg.width = game.world.width;
            bg.height = game.world.height;
            // 添加标题
            var title = game.add.text(game.world.centerX, game.world.height * 0.25, 'Pick Apple', {
                fontSize: '40px',
                fontWeight: 'bold',
                fill: '#f2bb15'
            });
            title.anchor.setTo(0.5, 0.5);
            // 添加提示
            var remind = game.add.text(game.world.centerX, game.world.centerY, 'Click to start', {
                fontSize: '20px',
                fill: '#f2bb15'
            });
            remind.anchor.setTo(0.5, 0.5);
            // 添加主角
            var man = game.add.sprite(game.world.centerX, game.world.height * 0.75, 'Rat');
            var manImage = game.cache.getImage('Rat');
            man.width = game.world.width * 0.1;
            man.height = man.width / manImage.width * manImage.height;
            man.anchor.setTo(0.5, 0.5);
            // 添加点击事件
            game.input.onTap.add(function() {
                game.state.start('play');
            });
        }
    },
    // 游戏场景
    play: function() {
        var man; // 主角
        var apples; // 苹果
        var score = 0; // 得分
        var title; // 分数
        var scoreMusic;
        var bombMusic;
        var bgMusic;
        this.create = function() {
            score = 0;
            // 开启物理引擎
            game.physics.startSystem(Phaser.Physics.Arcade);
            game.physics.arcade.gravity.y = 300;
            // 得分
            // 添加背景音乐
            if (!bgMusic) {
                bgMusic = game.add.audio('bgMusic');
                bgMusic.loopFull();
            }
            // 缓存其他音乐
            scoreMusic = game.add.audio('scoreMusic');
            bombMusic = game.add.audio('bombMusic');
            // 添加背景
            var bg = game.add.image(0, 0, 'bg');
            bg.width = game.world.width;
            bg.height = game.world.height;
            // 添加主角
            man = game.add.sprite(game.world.centerX, game.world.height * 0.75, 'Rat');
            var manImage = game.cache.getImage('Rat');
            man.width = game.world.width * 0.1;
            man.height = man.width / manImage.width * manImage.height;
            man.anchor.setTo(0.5, 0.5);
            game.physics.enable(man);
            man.body.allowGravity = false;
           }
       }
}
// 添加场景到游戏示例中
Object.keys(states).map(function(key) {
    game.state.add(key, states[key]);
});

// 启动游戏
game.state.start('preload');