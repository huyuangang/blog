<template>
    <time>
        {{dateStr}}
    </time>
</template>

<script>
    export default {
        props: {
            date: {
                required: true
            },
            format: {
                type: String,
                default: 'hh:mm:ss'
            },
            mode: {
                type: Number,
                default: 1
            }
        },
        computed: {
            dateStr: function () {
                if(this.mode === 1)
                    return this.formatDate1(this.format);
                return this.formatDate2(this.format);
            }
        },
        methods: {
            toDate:function () {
                if (typeof this.date === 'string') {
                    return new Date(Date.parse(this.date));
                }
                else if (typeof this.date === 'number') {
                    return new Date(this.date);
                }
                else {
                    return this.date;
                }
            },
            formatDate1:function (str) {
                var date = this.toDate();
                if (!(date instanceof Date))
                    return '格式化串错误';
                var RegObj = {
                    "M+": date.getMonth() + 1,
                    "d+": date.getDate(),
                    "h+": date.getHours() % 12 == 0 ? 12 : date.getHours(),
                    "H+": date.getHours(),
                    "m+": date.getMinutes(),
                    "s+": date.getSeconds()
                }
                if (/(y+)/.test(str)) {
                    str = str.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
                }
                for (var reg in RegObj) {
                    if (RegObj.hasOwnProperty(reg)) {
                        if (new RegExp('(' + reg + ')').test(str)) {
                            str = str.replace(RegExp.$1, (RegExp.$1.length == 1 ? RegObj[reg] : ('00' + RegObj[reg]).substr(('' + RegObj[reg]).length)));
                        }
                    }
                }
                return str;
            },
            formatDate2: function (str) {
                var date = this.toDate();
                var nowDate = new Date();
                if(date.getFullYear() !== nowDate.getFullYear()) {
                    return this.formatDate1('yyyy-MM-dd ' + str);
                }
                if(date.getMonth() !== nowDate.getMonth()) {
                    return this.formatDate1('MM-dd ' + str);
                }
                if(date.getDate() === nowDate.getDate()) {
                    return this.formatDate1('今天 ' + str);
                }
                if(date.getDate() === nowDate.getDate() - 1) {
                    return this.formatDate1('昨天 ' + str);
                }
                var oDay = date.getDay() === 0 ? 7 : date.getDay();
                var nDay = nowDate.getDay() === 0 ? 7 : nowDate.getDay();
                switch (oDay){
                    case 1: return this.formatDate1('星期一 ' + str);break;
                    case 2: return this.formatDate1('星期二 ' + str);break;
                    case 3: return this.formatDate1('星期三 ' + str);break;
                    case 4: return this.formatDate1('星期四 ' + str);break;
                    case 5: return this.formatDate1('星期五 ' + str);break;
                }
                return this.formatDate1('MM-dd ' + str);
            }
        }
    }
</script>
