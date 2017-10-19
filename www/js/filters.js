
angular.module('starter.filter', [])

.filter('filterColor', function () {
    return function (num) {
        if(num > 0) {
            return 'red';
        }
        if(num == 0) {
            return '';
        }
        if(num < 0) {
            return 'green';
        }
    }
})

.filter('fNumber', function () {
    return function (num) {
        var num = num / 10000;
        var unit = '万'
        if(num >= 10000) {
            unit = '亿';
            num = num / 10000;
        }
        num = num.toFixed(arguments[1]);
        var array = new Array();  
        var array = num.split(".");  
        var re = /(-?\d+)(\d{3})/;  
        while(re.test(array[0])){  
          array[0]=array[0].replace(re,"$1,$2")  
        }  
        var returnNum=array[0];  
        for(var i = 1;i < array.length; i++){  
          returnNum += "."+array[i];  
        }       
        return returnNum + unit;
    }
})

.filter('shdNumber', function () {
    return function (num) {
        var num = Number(num);
        var unit = '万'
        if(num >= 10000) {
            unit = '亿';
            num = num / 10000;
        }
        num = num.toFixed(arguments[1]);
        return num + unit;
    }
})
