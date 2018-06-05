class Poet {
    constructor(text){
        if(text){
            let obj=JSON.parse(text)
            this.title=obj.title
            this.content=obj.content
            this.author=obj.author
        }
    }

    toString(){
        return JSON.stringify(this)
    }
}

class Notapoet {
    constructor(){
        LocalContractStorage.defineMapProperty(this,'data',{
            parse(text){
                return new Poet(text)
            },
            stringify(obj){
                return obj.toString()
            }
        })
    }

    init(){}

    savePoet(title,content){
        if(!title||!content){
            throw new Error("empty title or content")
        }
        if(title.length > 15){
            throw new Error("title exceed limit length")
        }
 
        let from=Blockchain.transaction.from
        let poet=this.data.get(title)

        if(poet){
            throw new Error("poet has been occupied");
        }
        poet=new Poet()
        poet.title=title
        poet.content=content
        poet.author=from

        this.data.put(title,poet)
    }

    getPoet(title){
        if(!title){
            throw new Error("empty title")
        }
        return this.data.get(title)
    }

}

module.exports=Notapoet