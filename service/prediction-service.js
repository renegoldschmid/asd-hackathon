const dataManager = require('./data')


const calculateHO = (testData)=>{
    const input = {Zahl1:testData[0],Zahl2:testData[1],Zahl3:testData[2],Zahl4:testData[3],Zahl5:testData[4],Zahl6: testData[5]}
    const val = dataManager.transformedData.map(elem =>{
        return (({ Zahl1, Zahl2,Zahl3,Zahl4,Zahl5,Zahl6 }) => ({ Zahl1, Zahl2,Zahl3,Zahl4,Zahl5,Zahl6}))(elem);
    } );
    return calculate(input,val);

};

module.exports.calculate = calculateHO;


const calculate = (inputFromUser,numbers) =>{
    const count = numbers.length;
    const map = numbers.reduce( (acc, current) => {
        return countPosition(acc,current)
    },{});


    const percentages =Object.entries(inputFromUser).reduce((acc,[numberPosition,drawnNumber])=>{
        const occurrance = map[numberPosition][drawnNumber];
        const percentage =  occurrance/count*100 ;
        return [...acc, percentage];
    },[]);
    const sum = percentages.reduce((sum,percentage)=>{
        return sum +percentage;
    },0)

    return sum/6;
};

// extrahieren der Lottoziehung in eine map {position der Zahl} => {gezogerne Nummer}
const countPosition = (countingMap,lottoschein) => {
    return Object.entries(lottoschein).reduce((acc,[numberPosition,drawnNumber])=>{
        if(acc[numberPosition]){
            if(acc[numberPosition][drawnNumber]){
                acc[numberPosition][drawnNumber]++
            }else{
                acc[numberPosition][drawnNumber] = 1;
            }
        }else{
            acc[numberPosition] = {[drawnNumber]: 1}
        }

        return acc;
    },countingMap)
}

