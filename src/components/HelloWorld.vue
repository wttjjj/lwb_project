<template>
	<div class="container">
		<h1 class="hello">
			小刘是直男吗
		</h1>
	</div>
</template>

<script>
export default {
    data () {
        return {
            name: 'App',
            nameText: '你觉得自己是吗',
            buttonText: '不是',
            buttonStyle: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            },
            attempts: 0,
            showConfetti: false,
            yesShowConfetti: false,
            confettis: [],
            sounds: {
                miss: null,
                laugh: null,
            },
        };
    },
    methods: {
        moveButton () {
            this.sounds.miss.play();
            this.attempts++;

            // 随机新位置
            const newTop = Math.random() * 80 + 10;
            const newLeft = Math.random() * 80 + 10;

            this.buttonStyle = {
                position: 'absolute',
                top: `${newTop}%`,
                left: `${newLeft}%`,
                transform: 'none',
                transition: 'all 0.3s ease-out',
            };

            // 偶尔改变按钮文字
            if ( Math.random() > 0.7 ) {
                const texts = ['差一点!', '哈哈抓不到', '太慢啦~', '再试一次'];
                const texts1 = ['能不能说实话!', '心里没点数吗', '还点', '你是认真的吗'];
                this.buttonText = texts[Math.floor( Math.random() * texts.length )];
                this.nameText = texts1[Math.floor( Math.random() * texts1.length )];
            }
        },
        handleClick ( type ) {
            if ( type == 2 ) {
                // 只有按钮在原始位置时才可能被点击
                if ( this.buttonStyle.top === '50%' && this.buttonStyle.left === '50%' ) {
                    this.showConfetti = true;
                    this.sounds.laugh.play();
                    this.createConfetti();
                } else {
                    this.moveButton();
                }
            } else {
                this.yesShowConfetti = true;
                this.createConfetti();
            }

        },
        createConfetti () {
            // 创建50个彩色纸屑
            this.confettis = [];
            const colors = [
                '#f44336',
                '#e91e63',
                '#9c27b0',
                '#673ab7',
                '#3f51b5',
                '#2196f3',
                '#03a9f4',
                '#00bcd4',
                '#009688',
                '#4CAF50',
            ];

            for ( let i = 0; i < 50; i++ ) {
                this.confettis.push( {
                    style: {
                        backgroundColor: colors[Math.floor( Math.random() * colors.length )],
                        left: `${Math.random() * 100}%`,
                        animationDuration: `${Math.random() * 3 + 2}s`,
                        animationDelay: `${Math.random() * 0.5}s`,
                    },
                } );
            }
        },
        reset () {
            this.buttonStyle = {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            };
            this.showConfetti = false;
            this.attempts = 0;
            this.buttonText = '点我试试~';
        },
    },
};
</script>

<style>
.container {
  height: 100%;
  background: antiquewhite;
  padding: 50px;
}

h1 {
  color: #333;
  font-size: 24px;
}

.prank-button , .prank-button-yes {
  padding: 5px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  transition: all 0.3s;
}

.prank-button-yes {
  background-color: #d99fbe;
  margin-left: 10px;
}

.prank-button:hover {
  background-color: #45a049;
}

.confetti-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.8);
  z-index: 100;
}

.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  opacity: 0;
  animation: fall linear forwards;
}

@keyframes fall {
  0% {
    transform: translateY(-100px) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}

.message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  z-index: 101;
}

.message button {
  padding: 10px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
}

.button-content {
  display: flex;
}
</style>
