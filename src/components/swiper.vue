<template>
    <div id="swiper">
        <swiper :options="swiperOption" style="height:100%">
            <swiper-slide v-for="item in allPoet" :key="item.id">
                <div class="poet-title">{{item.title}}</div>
                <div class="poet-content">{{item.content}}</div>
                <div class="poet-author">{{item.author}}</div>
            </swiper-slide>
            <div class="swiper_button_next" slot="button-next" :class="{effect_next:isActive}">
                <span style="font-weight:300" @mouseenter="showLine" @mouseleave="hideLine">Next</span>
            </div>
        </swiper>
    </div>
</template>

<script>
let dappContactAddress = "n1qHtC6oz5zXQZ1tekDYSjMZN6TgirDiDVP"
import Nebulas from 'nebulas'
let Neb = Nebulas.Neb
let neb = new Neb()
neb.setRequest(new Nebulas.HttpRequest("https://testnet.nebulas.io"))
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
            },
            len:'',
            allPoet:[],
            isActive:false
        }
    },
    mounted(){
        this.nebCall({"function":"getLen"})
    },
    methods:{
        nebCall(contract){
            let from = dappContactAddress
            let value = "0"
            let nonce = "0"
            let gas_price = "1000000"
            let gas_limit = "2000000"
            neb.api.call(from, dappContactAddress, value, nonce, gas_price, gas_limit, contract).then(resp => {
                this.len=resp.result
                let contract2={
                    "function":"getAllPoet",
                    "args":'[\"0\",\"'+this.len+'\"]'
                }
                neb.api.call(from, dappContactAddress, value, nonce, gas_price, gas_limit, contract2).then(resp => {
                    let result = resp.result
                    result = JSON.parse(result)
                    // result.forEach((item,index) => {
                    //     console.log(item)
                    // })
                    this.allPoet=result
                    this.$emit('state',true)
                })
                .catch(err =>  {
                    console.log(`error:${err.message}`)
                })

            })         
            .catch(err => {
                console.log(`error:${err.message}`)
            })
        },
        showLine(){
            this.isActive=true
        },
        hideLine(){
            this.isActive=false
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
    bottom:0;
    right:0;
    z-index: 9999;
}
.swiper_button_next span:before{
    content: '';
    position: absolute;
    width:100%;
    height: 1px;
    top:20px;
    background-color: rgba(128,128,128,1);
    transform:scaleX(0);
    transition:all .25s ease;
}
.effect_next span:before{
    content: '';
    position: absolute;
    width:100%;
    height: 1px;
    top:20px;
    background-color: rgba(0,0,0,1);
    transform:scaleX(1);
    /*transition:all .25s ease;*/
}
.poet-title,.poet-content,.poet-author{
    user-select: none;
    cursor: default;
}
.poet-title{
    font-weight: 300;
    font-size: 16px;
    font-weight: 600;
    border-bottom:1px solid rgba(0,0,0,.05);
    padding-bottom: 14px;
}
.poet-content{
    margin-top:6px;
    max-height: 230px;
    overflow: hidden;
}
.poet-author{
    position: absolute;
    bottom:25px;
    font-weight: 300;
}
</style>