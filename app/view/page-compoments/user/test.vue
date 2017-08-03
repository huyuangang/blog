
<template>
    <div class="table">
        <span class="axis-corner"></span>
        <div class="axis-x" v-if="xAxisL > 0">
            <ul class="clearfix">
                <li>X</li>
                <li v-for="x in xAxisL">{{64+x | numberToLetter}}</li>
                <li class="add">+</li>
            </ul>
        </div>
        <div class="axis-y">
            <ul>
                <li v-if="xAxisL > 0">Y</li>
                <li v-for="y in yAxisL">{{y}}</li>
                <li class="add">+</li>
            </ul>
        </div>
        <div class="head-x" :style="headXStyle">
            <ul class="clearfix" v-if="xAxisL > 0">
                <li></li>
                <li v-for="xk in xAxisKey">{{xk}}</li>
                <li></li>
            </ul>
            <ul class="clearfix" v-else>
                <li>名称</li>
                <li>数据</li>
            </ul>
        </div>
        <div class="head-y" :style="headYStyle">
            <ul>
                <li v-for="yk in yAxisKey">{{yk}}</li>
                <li></li>
            </ul>
        </div>
        <div class="table-data"></div>
    </div>
</template>

<script>
    export default{
        name: 'dataTable',
        data () {
            return {
                xAxisL: 0,
                yAxisL: 0,
                currentValue: '',
                changeFlag: false,
                currentPos: {
                    x: -1,
                    y: -1
                }
            }
        },
        props:{
            yAxisKey: {
                type: Array,
                default() {
                    return [
                        '苹果',
                        '香蕉',
                        '橘子',
                        '草莓',
                        '西瓜'
                    ]
                }
            },
            xAxisKey: {
                type: Array,
                default() {
                    return ['姓名']
                }
            },
            datas: {
                type: Array,
                default (){
                    return [ 60, 45, 20, 40, 35 ]
                }
            }
        },
        computed: {
            inputStyle () {
                let me = this;
                if(this.changeFlag){
                    return {
                        left: me.currentPos.x * 100 + 30 + 'px',
                        top: (me.currentPos.y + 1 ) * 30 - 1 + 'px',
                        display: "block"
                    }
                }
                return {
                    display: "none"
                }
            },
            headYStyle() {
                if(this.xAxisL) {
                    return {
                        top: '60px'
                    }
                }
                return{}
            },
            headXStyle() {
                if(this.xAxisL){
                    return{
                        top: '30px'
                    }
                }
                return {}
            }
        },
        methods: {
            changeCurrent (index, type) {
                if(type !== undefined){
                    this.currentPos.x = type;
                    this.currentPos.y = index;
                    this.currentValue = this.datas[index][type];
                }
                this.changeFlag = false;
            },
            changeCurrentFlag () {
                this.changeFlag = true;
                this.$nextTick(() => {
                    this.$refs.text.focus();
                })
                
            },
            changeCurrentValue () {
                let currentPos = this.currentPos;
                if(currentPos.x){
                    this.datas[currentPos.y][1] = (+this.currentValue)|| this.currentValue;
                }
                else{
                    this.datas[currentPos.y][0] = this.currentValue;
                }
            }
        },
        created() {
            this.xAxisL = this.xAxisKey.length;
            this.yAxisL = this.yAxisKey.length;
        },
        filters: {
            numberToLetter(v){
                return String.fromCharCode(v);
            }
        }
    }
</script>

<style lang="less" scoped>
    @head-back: #BFBFBF;
    @border-color: #f0f0f0;
    @font-color: #626262;
    .clearfix{
        &:after{
            content: "";
            display: table;
            clear: both;
        }
    }
    .table{
        position: relative;
        .axis-corner{
            width: 30px;
            height: 30px;
            position: absolute;
            border-right: 1px solid #000;
            border-bottom: 1px solid #000;
            left: 0;
            top: 0;
        }
        .axis-x{
            position: absolute;
            left: 30px;
            li{
                float: left;
                width: 100px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                border-right: 1px solid #000;
                border-bottom: 1px solid #000;
            }
        }
        .axis-y{
            position: absolute;
            top: 30px;
            li{
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                border-right: 1px solid #000;
                border-bottom: 1px solid #000;
            }
        }
        .head-x{
            position: absolute;
            left: 30px;
            li{
                float: left;
                width: 100px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                border-right: 1px solid #000;
                border-bottom: 1px solid #000;
            }
        }
        .head-y{
            position: absolute;
            left: 30px;
            li{
                width: 100px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                border-right: 1px solid #000;
                border-bottom: 1px solid #000;
            }
        }
    }
    *{
        box-sizing: border-box;
    }
    .relative{
        position: relative;
    }
    .absolute{
        position: absolute;
    }
    .data-table{
        display: inline-block;
        table{
            border-spacing: 0;
            font-size: 12px !important;
            color: #626262 !important;
        }
        th,td{
            width: 100px;
            border-left: 1px solid #f0f0f0;
            border-bottom: 1px solid #f0f0f0;
            p{
                padding: 2px 4px;
                height: 29px !important;
                line-height: 29px !important;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        th,.head{
            background: #BFBFBF;
            text-align: center;
        }
        th{
            width: 30px;
        }
        td{
            width: 100px;
            background: #fff;
        }
        td.current{
            box-shadow: 0 0 0 2px #5292f7 inset;
            position: relative;
            &:after{
                content: "";
                display: table;
                width: 5px;
                height: 5px;
                border: 2px solid #fff;
                background: rgb(82, 146, 247);
                position: absolute;
                right: -4px;
                bottom: -4px;
            }
        }
        .add{
            cursor: pointer;
            &:hover{
                background: #ccc;
            }
        }
        #text{
            width: 100px;
            max-width: 141px;
            padding: 2px 4px;
            height: 31px !important;
            line-height: 31px !important;
            font-size: 12px !important;
            color: #000;
            outline: none;
            border: 1px solid #f0f0f0;
            box-shadow: 0 0 0 2px #5292f7 inset;
            display: none;
        }
    }
</style>