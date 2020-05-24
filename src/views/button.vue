<template>
    <div>
        <div class="button" ref="button"></div>
    </div>
</template>
<script>
export default {
    mounted () {
        const button = this.$refs.button;
        button.addEventListener('click',ev=>{
            let x = ev.clientX - ev.target.offsetLeft;
            let y = ev.clientY - ev.target.offsetTop;
            var btn = document.createElement('div');
            btn.className = 'btn'
            btn.style.cssText = `left:${x}px;top:${y}px`
            button.appendChild(btn);
            setTimeout(()=>{
                button.removeChild(btn)
            },500)
        },true)
    }
}
</script>
<style lang="scss">
    .button{
        width: 200px;
        height: 50px;
        background: blue;
        border-radius: 25px;
        margin: 50px auto;
        position: relative;
        overflow: hidden;
        .btn{
            position: absolute;
            border-radius: 50%;
            background : white;
            transform: translate(-50%,-50%);
            animation: btn .5s linear;
            opacity: .3;
        }
        @keyframes btn {
            0%{
                width: 0;
                height: 0;
            }
            100%{
                width: 400px;
                height: 400px;
            }
        }
    }
</style>