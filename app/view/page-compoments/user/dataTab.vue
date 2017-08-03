
<template>
    <div class="data-table relative">
        <table>
            <tbody>
                <tr>
                    <th></th>
                    <td class="head"><p>名称</p></td>
                    <td class="head"><p>数据</p></td>
                </tr>
                <tr v-for="index in dataLength">
                    <th>{{index}}</th>
                    <td 
                        :class="{current: !changeFlag&&currentPos.x === 0&&currentPos.y===index-1}" 
                        :title="datas[index-1][0]||''"
                        @dblclick="changeCurrentFlag"
                        @click="changeCurrent(index-1, 0)"
                        >
                        <p>{{datas[index-1][0] || ""}}</p></td>
                    <td 
                        :class="{current: !changeFlag&&currentPos.x === 1&&currentPos.y===index-1}"
                        :title="datas[index-1][1]||''"
                        @dblclick="changeCurrentFlag"
                        @click="changeCurrent(index-1, 1)"
                        ><p>{{datas[index-1][1] || ""}}</p></td>
                </tr>
                <tr>
                    <th class="add" @click="datas.push([]);dataLength++">+</th>
                    <td><p></p></td>
                    <td><p></p></td>
                </tr>
            </tbody>
        </table>
        <input :style="inputStyle" 
                  @change="changeCurrentValue" 
                  ref="text"
                  v-model="currentValue"
                  class="absolute" 
                  id="text"
                  type="text" />
    </div>
</template>

<script>
    export default{
        name: 'dataTable',
        data () {
            return {
                dataLength: 0,
                currentValue: '',
                changeFlag: false,
                currentPos: {
                    x: -1,
                    y: -1
                }
            }
        },
        props:{
            datas: {
                type: Array,
                default (){
                    return [
                        ['苹果', 60],
                        ['香蕉', 45],
                        ['橘子', 20],
                        ['草莓', 40],
                        ['西瓜', 35]
                    ]
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
            this.datas.push([]);
            this.dataLength = this.datas.length;
        }
    }
</script>

<style lang="less" scoped>
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