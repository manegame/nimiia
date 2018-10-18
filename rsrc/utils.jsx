function GetBounds (pDocument, pPage) {
  var pWidth  = pDocument.documentPreferences.pageWidth;
  var pHeight = pDocument.documentPreferences.pageHeight;
  if (pPage.side == PageSideOptions.leftHand) {
    var X2 = pPage.marginPreferences.left;
    var X1 = pPage.marginPreferences.right;
  } else {
    var X1 = pPage.marginPreferences.left;
    var X2 = pPage.marginPreferences.right;
  }
  var Y1 = pPage.marginPreferences.top;
  var X2 = pWidth - X2;
  var Y2 = pHeight - pPage.marginPreferences.bottom;
  return [Y1, X1, Y2, X2];
}

function GetOuterBounds (pDocument) {
  return {
    width: pDocument.documentPreferences.pageWidth,
    height: pDocument.documentPreferences.pageHeight
  }
}

function randomValue (min, max) {
  return Math.floor(Math.random() * max) + min;
}

// var blocks = [
//   { w: 100, h: 100 },
//   { w: 100, h: 100 },
//   { w: 100, h: 100 },
//   { w: randomValue(10, 100), h: randomValue(40, 120) },
//   { w: randomValue(60, 100), h: randomValue(60, 100) },
//   { w: randomValue(20, 100), h: randomValue(20, 100) },
//   { w: randomValue(10, 100), h: randomValue(10, 100) },
//   { w: randomValue(10, 100), h: randomValue(10, 100) },
//   { w: randomValue(10, 100), h: randomValue(10, 100) },
//   { w: randomValue(10, 100), h: randomValue(10, 100) },
//   { w: randomValue(10, 100), h: randomValue(10, 100) },
//   { w: randomValue(10, 100), h: randomValue(10, 100) },
//   { w: randomValue(10, 100), h: randomValue(10, 100) },
//   { w: randomValue(10, 100), h: randomValue(10, 100) },
//   { w: randomValue(10, 100), h: randomValue(10, 100) }
// ];
 
//recursive
function factorial(n) {
  n = Number(n)
  if(n == 0) {
      return 1
  } else {
      return n * factorial(n - 1);
  }
}

function generateBlocks (outerBounds, amount) {
  var arr = []

  for (var i = 2; i < amount; i++) {
    arr.push({
      w: outerBounds.width / i,
      h: outerBounds.height / i
    })    
  }

  return arr
}

function generateBlocksPowers (outerBounds, steps) {
  if (steps > 10) return;
  
  var arr = [];
  
  var base = 2;

  for (var step = 1; step <= steps; step++) {
    for (var times = 0; times < Math.pow(base, step); times++) {
      arr.push({
        w: Math.floor(outerBounds.width / Math.pow(base, step) * 100) / 100,
        h: Math.floor(outerBounds.height / Math.pow(base, step) * 100) / 100
      })
    }
  }

  return arr
}


function generateBlocksSorted (outerBounds, amount, scale) {
  var arr = [];

  for (var i = 0; i < amount; i++) {
    var w = randomValue(2, 20);
    var h = randomValue(2, 20);
    var surf = w + h;

    var newBlock = {
      w: w,
      h: h,
      surf: surf
    };

    if (i === 0) {
      arr.push(newBlock);
    } else {
      for (var j = 0, len = arr.length; j < len; j++) {
        if (newBlock.surf < arr[j].surf) {
          arr.splice(j, 0, newBlock);
          break;
        }
      }
    }
  }

  return arr;
}


/**
// an array of objects
var newObj = {
  key: value
};

for (var i = 0, len = arr.length; i < len; i++) {
  if (somevalue < arr[i].key) {
      arr.splice(i, 0, newObj);
      break;
  }
}

return arr;
 */


 /**
function compare (a,b) {
  if (a.surf < b.surf)
    return -1;
  if (a.surf > b.surf)
    return 1;
  return 0;
}
 */