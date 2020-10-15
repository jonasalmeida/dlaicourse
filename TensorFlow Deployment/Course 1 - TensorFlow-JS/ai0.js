console.log('ai0.js loaded at '+ Date())

ai = {}

ai.loadIrisD3=async(url="iris.csv")=>{
    let dd=[]
    await d3.csv('iris.csv',d=>{
        Object.keys(d).forEach(k=>{
            if(k.slice(0,5)=='petal'||k.slice(0,5)=='sepal'){
                d[k]=parseFloat(d[k])
            }
        })
        dd.push(d)
    })
    return dd
}

ai.runIris=async(url="iris.csv")=>{
    const trainingData = tf.data.csv(url,{
        columnConfigs:{
            species:{
                isLabel:true
            }
        }
    })
    //return trainingData
    const convertedData = trainingData.map(({xs,ys})=>{
        const labels = [
            ys.species == "setosa" ? 1 :0,
            ys.species == "virginica" ? 1 :0,
            ys.species == "versicolor" ? 1 :0
        ];
        //console.log(labels)
        return  {
            xs:Object.values(xs),
            ys:Object.values(ys)
        }
    }).batch(10)
    return convertedData
}

//lala = ai.runIris()