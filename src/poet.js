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
        LocalContractStorage.defineMapProperty(this,'arrayMap')
        LocalContractStorage.defineProperty(this,'size')
    }

    init(){
        this.size=0
    }

    savePoet(title,content){
        var index=this.size

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

        this.arrayMap.put(index,title)
        this.data.put(title,poet)
        this.size+=1
    }

    getAllPoet(offset,limit){
        limit = parseInt(limit)
        offset = parseInt(offset)
        offset = offset % this.size
        var result = []
        for (var i = offset, j = 0; j < limit; j++) {
            result.push(this.data.get(this.arrayMap.get(i)))
            i++
            i = i % this.size
        }
        return result
    }

    getPoet(title){
        if(!title){
            throw new Error("empty title")
        }
        return this.data.get(title)
    }

    getLen(){
        return this.size
    }
}

module.exports=Notapoet