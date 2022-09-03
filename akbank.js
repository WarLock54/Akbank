function oddoreven(number){
    let y=[];
    y=String(number).split("").map(x=>+x);
    var toplam=0;
    for(let i=0;i<y.length;i++){
    toplam+=y[i];
    }
    return toplam%2==0?"Even":"Odd";
    }
    console.log(oddoreven(345));