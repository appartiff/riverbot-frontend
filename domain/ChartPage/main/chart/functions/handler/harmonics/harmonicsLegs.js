export function addLegs(obj, array)
{
  function  setLabels(obj,array,dY)
  {

    array.push({
      x: (obj.xTime + obj.bTime) / 2,
      y: obj.xPrice * Math.exp((Math.log(obj.bPrice) - Math.log(obj.xPrice)) /2),
      indexLabel: obj.fractalRatios.b.toString() + '%',
      indexLabelFontColor: "white"
    });
    array.push({
      x: obj.xTime,
      y: null
    });
    array.push({
      x: (obj.aTime + obj.cTime) / 2,
      y: obj.aPrice * Math.exp((Math.log(obj.cPrice) - Math.log(obj.aPrice)) /2),
      indexLabel: obj.fractalRatios.c.toString() + '%',
      indexLabelFontColor: "white"
    });
    array.push({
      x: obj.xTime,
      y: null
    });


    array.push({
      x: (obj.bTime + obj.dTime) / 2,
      y: obj.bPrice * Math.exp((Math.log(dY) - Math.log(obj.bPrice)) /2),
      indexLabel: obj.fractalRatios.abcd.toString() + '%',
      indexLabelFontColor: "white"
    });
    array.push({
      x: obj.xTime,
      y: null
    });
    array.push({
      x: (obj.xTime + obj.dTime) / 2,
      y: obj.xPrice * Math.exp((Math.log(dY) - Math.log(obj.xPrice)) /2),
      indexLabel: obj.fractalRatios.xa.toString() + '%',
      indexLabelFontColor: "white"
    });
    array.push({
      x: obj.xTime,
      y: null
    });

  }
  function legsColor(obj)
  {
    if (obj.fractalStatus.activated === false)
    {
      if (obj.fractalStatus.active === false) {
        return "#c5c6c8";
      }
      return "#fcae66";
    } else if (obj.fractalStatus.failed) {
      return "#fc666b";
    } else if (obj.fractalStatus.success) {
      return "#21deab";
    }
  }
  let legColor = legsColor(obj);
  array.push({
    x: obj.dTime,
    y: null
  });
  array.push({
    x: obj.xTime,
    y: obj.xPrice,
    lineColor: legColor,
    indexLabel: "X",
    indexLabelFontColor: "white"
  });
  array.push({
    x: obj.aTime,
    y: obj.aPrice,
    lineColor: legColor,
    indexLabel: "A",
    indexLabelFontColor: "white"
  });
  array.push({
    x: obj.bTime,
    y: obj.bPrice,
    lineColor: legColor,
    indexLabel: "B",
    indexLabelFontColor: "white",
  });

  array.push({
    x: obj.cTime,
    y: obj.cPrice,
    lineColor: legColor,
    indexLabel: "C",
    indexLabelFontColor: "white"
  });


  let highestPrice = null;
  let lowestPrice = null;
  for (let i = 0, len = obj.fractalProjectionBox.length; i < len; i++)
  {
    let item = obj.fractalProjectionBox[i];
    if(item.y > highestPrice  || highestPrice ===null)
    {
      highestPrice = item.y;
    }
    if(item.y < lowestPrice  || lowestPrice ===null)
    {
      lowestPrice = item.y;
    }
  }
  let priceIfNotActivated  = obj.xPrice < obj.aPrice ? highestPrice : lowestPrice;
  let dY = obj.fractalStatus.activated ? obj.dPrice : priceIfNotActivated;

  array.push({
    x: obj.dTime,
    y: dY,
    indexLabel: obj.name,
    indexLabelFontColor: "white"
  });
  array.push({
    x: obj.xTime,
    y: null
  });
  array.push({
    x: obj.xTime,
    y: obj.xPrice,
    lineDashType:"dash",
    lineColor:'white',
  });
  array.push({
    x: obj.dTime,
    y: dY
  });
  array.push({
    x: obj.xTime,
    y: null
  });
  array.push({
    x: obj.xTime,
    y: obj.xPrice,
    lineDashType:"dash",
    lineColor:'white',
  });
  array.push({
    x: obj.bTime,
    y: obj.bPrice,
    lineDashType:"dash",
    lineColor:'white',
  });
  array.push({
    x: obj.dTime,
    y: dY
  });
  array.push({
    x: obj.xTime,
    y: null
  });
  array.push({
    x: obj.aTime,
    y: obj.aPrice,
    lineDashType:"dash",
    lineColor:'white',
  });
  array.push({
    x: obj.cTime,
    y: obj.cPrice
  });

  array.push({
    x: obj.xTime,
    y: null
  });
  array.push({
    x: obj.dTime,
    y: null
  });

  setLabels(obj,array,dY);
}
