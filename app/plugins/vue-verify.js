


var VueVerify = {
    _veriObj: {
    },
    init (veriObj) {
        for(var v in veriObj){
            if(veriObj.hasOwnProperty(v) && !this._veriObj[v]) {
                this._veriObj[v] = veriObj[v];
            }
        }
    },
    install : function (Vue) {
        var me = this;
        Vue.mixin({
            beforeCreate () {
                var veriObj = this.$options.verify;
                if(veriObj && typeof veriObj === 'object'){
                    me.init(veriObj);
                }
                this.$verify = me._veriObj;
                this.$verify.handler = function (type, testStr) {
                    if(!this[type]){
                        throw new Error(`no this [${type}] rules of verify`);
                        return ;
                    }
                    var veriObj = this[type];
                    //如果有验证方法，直接执行验证方法
                    var veriMethods = veriObj.handle;

                    if(typeof veriMethods === 'function') {
                        return veriMethods.call(veriObj,testStr);
                    }
                    //判断是否有验证规则
                    if(!veriObj.pattern && veriObj.pattern!=='') {
                        throw new Error(`no  pattren of this [${type}] rules`);
                    }
                    var pattern;
                    if(typeof veriObj.pattern === 'string'){
                       pattern = new RegExp('(' + veriObj.pattern + ')');
                    }
                    else{
                        pattern = veriObj.pattern;
                    }
                    if(!pattern.test(testStr)){
                        return veriObj.tip || false;
                    }
                    return true;
                }
            }
        })
    }
}

export default VueVerify;