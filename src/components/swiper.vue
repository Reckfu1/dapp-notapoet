<template>
    <div id="swiper">
        <swiper :options="swiperOption" style="height:100%">
            <swiper-slide v-for="item in allPoet" :key="item.id">
                <div class="poet-title">{{item.title}}</div>
                <div class="poet-content">{{item.content}}</div>
                <div class="poet-author">{{item.author}}</div>
            </swiper-slide>
            <div class="swiper_button_next" slot="button-next">
                <span style="font-weight:300">Next</span>
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
            allPoet:[]
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
                })
                .catch(err =>  {
                    console.log(`error:${err.message}`)
                })

            })         
            .catch(err => {
                console.log(`error:${err.message}`)
            })
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
    max-height: 230px;
    overflow: hidden;
}
.poet-author{
    position: absolute;
    bottom:25px;
    font-weight: 300;
}
</style>