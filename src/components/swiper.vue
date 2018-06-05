<template>
    <div id="swiper">
        <swiper :options="swiperOption" style="height:100%">
            <swiper-slide>
                <div class="poet-title">不是诗人</div>
                <div class="poet-content">你可以不是诗人<br>但你可以诗意的活着<br>你能诗意的活着<br>你就是一个诗人<br><br>你可以不是诗人<br>但你可以诗意的活着<br>你能诗意的活着<br>你就是一个诗人</div>
                <div class="poet-author">Temp</div>
            </swiper-slide>
            <div class="swiper_button_next" slot="button-next">
                <span style="font-weight:300">Next</span>
            </div>
        </swiper>
    </div>
</template>

<script>
export default {
    data() {
        return {
            swiperOption: {
                // spaceBetween: 30,
                centeredSlides: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false
                },
                effect:'fade',
                fadeEffect:{
                    crossFade:true
                },
                navigation: {
                    nextEl: '.swiper_button_next'
                }
            }
        }
    }
}
</script>

<style lang="css" scoped>
#swiper{
    position: absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
    margin:auto;
    height: 320px;
    width:300px;
    /*background-color: red;*/
}
.swiper_button_next{
    cursor: pointer;
    user-select: none;
    position: absolute;
    bottom:1px;
    right:4px;
    z-index: 9999;
}
.poet-title,.poet-content,.poet-author{
    user-select: none;
    cursor: default;
}
.poet-title{
    font-weight: 300;
    font-size: 16px;
    font-weight: 600;
}
.poet-content{
    margin-top:20px;
}
.poet-author{
    position: absolute;
    bottom:20px;
}
</style>