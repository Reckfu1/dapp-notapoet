<template>
    <div id="index" v-show="show">
        <header>
            <div class="upload" :class="{effect:isActive}">
                <span @click.stop>Nøt A Poet</span>
                <span @mouseenter="showLine" @mouseleave="hideLine" @click.stop="openSimpleDialog">Upload</span>
            </div>
        </header>
        <section>
            <v-swiper ref='vswiper' @state="getState"></v-swiper>
        </section>
        <mu-container>
            <mu-dialog title="" width="400" :open.sync="openSimple" transition="fade" @close="updateView">
                <div class="upload_popup" @click.stop>
                    <mu-text-field v-model="title" label="Title" label-float full-width color="black" max-length="15" class="label_common_style"></mu-text-field>
                    <mu-text-field v-model="content" placeholder="Content" multi-line :rows="4" :rows-max="8" full-width color="black" class="label_common_style" max-length="230"></mu-text-field>
                    <mu-text-field v-model="author" label="Author" disabled=false label-float full-width color="black" class="label_common_style"></mu-text-field>
                    <mu-button flat style="text-transform:none" @click="submit">Confirm</mu-button>
                </div>
            </mu-dialog>
        </mu-container>
        <mu-snackbar :color="color.color" :open.sync="color.open" position="top">
            <mu-icon left value="check_circle"></mu-icon>
            {{color.message}}
        </mu-snackbar>
    </div>
</template>

<script>
import swiper from '@/components/swiper'
import NebPay from 'nebpay'
// 测试网
// let dappContactAddress="n1qHtC6oz5zXQZ1tekDYSjMZN6TgirDiDVP"
let dappContactAddress="n1hhxruiEiMhVn72LfjFR5MZm8kamvkrJgn"
let nebPay = new NebPay()
let serialNumber
export default {
    data() {
        return {
            isActive:false,
            openSimple: false,
            title:'',
            content:'',
            author:'',
            color: {
                color: 'success',
                message: 'Upload Success！',
                open: false,
                timeout: 6000
            },
            show:false
        }
    },
    methods:{
        showLine(){
            this.isActive=true
        },
        hideLine(){
            this.isActive=false
        },
        openSimpleDialog () {
            this.openSimple = true
        },
        closeSimpleDialog () {
            this.openSimple = false
        },
        submit(){
            let that=this
            if(!this.title||!this.content){
                alert('title or content can not be empty')
                return
            }
            let to=dappContactAddress
            let value='0'
            let callFunction='savePoet'
            var callArgs = "[\"" + this.title + "\",\"" + this.content + "\"]";
            serialNumber = nebPay.call(to, value, callFunction, callArgs, {
                listener(resp) {
                    console.log(`the callback is ${resp}`)
                    that.openColorSnackbar()
                }
            })
        },
        updateView(){
            this.$refs.vswiper.nebCall({"function":"getLen"})
        },
        openColorSnackbar () {
            if (this.color.timer) clearTimeout(this.color.timer)
            this.color.open = true
            this.color.timer = setTimeout(() => {
                this.color.open = false;
            }, this.color.timeout)
        },
        getState(state){
            this.show=state
        }
    },
    components:{
        'v-swiper':swiper
    }
}
</script>

<style lang="css">
.upload{
    position: absolute;
    width:100%;
    height: 80px;
    /*background-color: red;*/
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.upload span{
    font-size: 16px;
    font-weight: 300;
    user-select: none;
    cursor: pointer;
}
.upload span:first-child{
    font-size: 26px;
    margin-left: 50px;
}
.upload span:last-child{
    margin-right:50px;
}
.upload span:last-child:before{
    content: '';
    position: absolute;
    width:50px;
    height: 1px;
    right:50px;
    top:53px;
    background-color: rgba(128,128,128,1);
    transform:scaleX(0);
    transition:all .25s ease;
}
.effect span:last-child:before{
    content: '';
    position: absolute;
    width:50px;
    height: 1px;
    right:50px;
    top:53px;
    background-color: rgba(0,0,0,1);
    transform:scaleX(1);
    /*transition:all .25s ease;*/
}
.upload_popup{
    height:400px;
    width:300px;
    margin:0 auto;
    font-weight: 300;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    /*background-color: red;*/
}
.label_common_style{
    font-size: 14px;
}
</style>