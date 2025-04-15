<template>
	<div class="container">
		<div
			ref="target"
			class="target"
			:style="{ transform: `rotate(${-rotationAngle}deg)` }"
		></div>

		<div
			v-if="showWhip"
			ref="whip"
			class="whip"
			:style="whipStyle"
		></div>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const target = ref( null );
const whip = ref( null );
const showWhip = ref( false );

// 旋转控制参数
const rotationAngle = ref( 0 );
const rotateSpeed = ref( 3 );
let lastFrameTime = 0;
let animationFrameId = null;

// 鞭子样式
const whipStyle = ref( {
    right: '20px',
    bottom: '50%',
} );

// 动画循环
const animate = ( currentTime ) => {
    if ( !lastFrameTime ) {
        lastFrameTime = currentTime;
    }

    // 计算时间差并更新角度
    const deltaTime = currentTime - lastFrameTime;
    rotationAngle.value += rotateSpeed.value * deltaTime / 16.67;

    // 保持角度在0~360范围内
    rotationAngle.value %= 360;

    lastFrameTime = currentTime;
    animationFrameId = requestAnimationFrame( animate );
};

// 鞭打动画
const handleHit = () => {
    // 加速旋转
    rotateSpeed.value = Math.min( 40, rotateSpeed.value + 7 );

    // 设置鞭子位置
    if ( target.value ) {
        const rect = target.value.getBoundingClientRect();
        whipStyle.value = {
            right: `${window.innerWidth - rect.right + 20}px`,
            bottom: `${window.innerHeight - rect.bottom + 100}px`,
            animation: 'whip-swing 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        };
    }

    // 显示鞭子
    showWhip.value = true;

    // 600ms后隐藏鞭子
    setTimeout( () => {
        showWhip.value = false;
    }, 600 );
};

// 初始化
onMounted( () => {
    animationFrameId = requestAnimationFrame( animate );

    // 添加事件监听
    window.addEventListener( 'click', handleHit );
    window.addEventListener( 'touchstart', ( e ) => {
        e.preventDefault();
        handleHit();
    } );
} );

// 清理
onBeforeUnmount( () => {
    if ( animationFrameId ) {
        cancelAnimationFrame( animationFrameId );
    }

    window.removeEventListener( 'click', handleHit );
    window.removeEventListener( 'touchstart', handleHit );
} );
</script>
<style>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f0f0;
  touch-action: manipulation;
  overflow: hidden;
}

.target {
  width: 200px;
  height: 200px;
  background: url('../assets/top.png') center/contain no-repeat;
  position: relative;
  transform: rotate(0deg);
}

.whip {
  position: fixed;
  width: 160px;
  height: 8px;
  background: linear-gradient(to bottom, #8B4513 50%, transparent);
  border-radius: 4px;
  transform-origin: 90% 50%;
  pointer-events: none;
  opacity: 0;
  right: v-bind('whipStyle.right');
  bottom: v-bind('whipStyle.bottom');
  transform: rotate(90deg) translate(0, 0);
  animation: v-bind('whipStyle.animation');
}

@keyframes whip-swing {
  0% {
    transform: rotate(90deg) translate(0, 0);
    opacity: 0;
  }
  40% {
    transform: rotate(180deg) translate(100px, 80px);
    opacity: 1;
    filter: brightness(1.5);
  }
  80% {
    transform: rotate(210deg) translate(140px, 120px);
    opacity: 0.6;
  }
  100% {
    transform: rotate(270deg) translate(180px, 160px);
    opacity: 0;
  }
}
</style>
