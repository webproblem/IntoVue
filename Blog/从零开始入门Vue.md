## 从零开始入门Vue ##

> ## **Hello World示例**
首先通过Hello World示例来初步了解Vuejs。可以查看[Demo页面](../example/base/HelloWorld.html)。

```
<!DOCTYPE html>
<html lang="en">
    <head>
        <title></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="../vue.js"></script>
    </head>
    <body>
        <!--Vue挂载的容器-->
        <div id="app">{{ message }}</div>

        <script>
            //Vue示例
            var app = new Vue({
                el: "#app",
                data: {
                    message: "欢迎Vue.js!"
                }
            })
        </script>
    </body>
</html>
```

可以看到，需要先通过new Vue()来创建一个Vue示例，然后通过挂载容器来实现响应式数据绑定。挂载容器中的文本值是的形式是双大括号，这种写法是Vue的模板语法。在某些场景下，需要通过`v-html`指令来数据绑定。比如数据值中包含html标签:
```
<!--Vue挂载的容器-->
<div id="app2" v-html="message"></div>

<script>
    //Vue示例
    var app2 = new Vue({
        el: "#app2",
        data: {
            message: "<span style='color: red;'>欢迎Vue.js!</span>"
        }
    })
</script>    
```
> 可能你已经注意到了，在v-html指令中使用message时没有了双括号了，这就是Vue模板语法的写法形式，只有当是文本插值的时候，才会使用双括号进行包裹，其他情况下不需要使用。

在Vue模板语法中，还可以使用javscript表达式来绑定值。
```
<div id="app3">
    我有{{ total }}个苹果，今天吃掉了{{ used }}个，还剩{{ total - used }}个苹果。
</div>
<script>
    var app3 = new Vue({
        el: "#app3",
        data: {
            total: 5,
            used: 2
        }
    })
</script>
```

> ## **Vue指令**
在Vue模板语法中，有一个很重要的一项，就是**指令**，在实际项目中，都会经常使用到Vue指令操作。Vue指令的前缀都是以`v-`开始的。现在就来讲讲Vue指令操作。

## **v-text**
其实就是文本插值。看一个例子:
```
<div id="app" v-text="message"></div>
<!--等同于下面的写法
<div id="app">{{ message }}</div>
-->
<script>
    var app = new Vue({
        el: "#app",
        data: {
            message: "我是v-text指令"
        }
    })
</script>
```
所以一般情况下，都是直接用下面的那种便捷的写法。

## **v-html**
v-html指令就是将值作为普通html插入。用法如前面的那样。

## **v-model**
将值进行双向数据绑定。看例子:
```
<div id="app2">
    <input v-model="message">
    <span>{{ message }}</span>
</div>
<script>
    var app2 = new Vue({
        el: "#app2",
        data: {
            message: "我是v-model指令"
        }
    })
</script>
```
v-model双向数据绑定，是Vue的本质所在。我们可以通过v-model来动态获取数据，v-model大体是作用在一些用户输入或者操作的form表单元素上，如：input，textarea，checkbox，radio，select等。用户动态的输入或者操作改变了数据，v-model也会同步更新绑定的值，而不需要通过传统的操作Dom来改变结果。

## **v-on**
Vue事件指令，主要是用来绑定监听事件的。看例子：
```
<div id="app3" class="demo">
    <button v-on:click="handleClick">点击我</button>
</div>
<script>
    var app3 = new Vue({
        el: "#app3",
        methods: {
            handleClick: function(){
                alert("我是点击事件");
            }
        }
    })
</script>
```
可以看到，通过v-on给button元素绑定了一个click事件`handleClick`（也可以用缩写的方式 `@click="handleClick"`），handleClick是Vue实例的一个方法，可能你已经注意到了，Vue实例的方法都是包裹在`methods`键中。你也可以通过Vue实例来访问绑定的事件方法。
```
app3.handleClick();
```
详细的解说可以参考具体的API文档，[Vue事件处理](https://cn.vuejs.org/v2/guide/events.html)。

## **v-bind**
用于动态绑定html属性或者是组件的props值。看例子：
```
<div id="app4" v-bind:class="className + ' demo'">我是v-bind指令</div>
<script>
    var app4 = new Vue({
        el: "#app4",
        data: {
            className: "current-index"
        }
    })
</script>
```
v-bind指令也有缩写，可以用这样的写法：`:class="className + ' demo'"`。

## **v-for**
动态循环数据，作用和javascript的for循环一样，但也有不同之处。看例子：
```
<div id="app5" class="demo">
<div>
    <h2>武林外传中的人物表：</h2>
    <ul>
        <li v-for="item in people" :key="item.name">
            姓名：{{ item.name }}，
            性别：{{ item.sex }}，
            年龄：{{ item.age }}
        </li>
    </ul>
</div>
</div>
<script>
var app5 = new Vue({
    el: "#app5",
    data: {
        people: [
            {name: "佟湘玉", sex: "女", age: 28},
            {name: "白展堂", sex: "男", age: 26},
            {name: "郭芙蓉", sex: "女", age: 22},
            {name: "吕秀才", sex: "男", age: 22},
            {name: "李大嘴", sex: "男", age: 28},
            {name: "莫小贝", sex: "女", age: 12},
            {name: "邢捕头", sex: "男", age: 30},
            {name: "燕小六", sex: "男", age: 20},
            {name: "钱掌柜", sex: "男", age: 30}
        ]
    }
})
</script>
```
注意，使用v-for的时候最好绑定一个key值，[看文档](https://cn.vuejs.org/v2/api/#key)。

## **v-if与v-show**
v-if和v-show指令其实都是用来操作元素的，作用都是相同的，但是两者之间的区别是：`v-show指令只是简单的控制元素的隐藏和显示，当值是true的时候显示值为false的时候元素隐藏，只是简单的CSS状态切换；而v-if指令就有点不同，v-if指令其实是有惰性的特点，就是当值是false的时候，v-if对于的元素不会进行任何操作，但是当值为true的时候，对应的元素会渲染到DOM结构树中，改变了DOM数结构，性能就相对v-show就要差了。`具体[看文档解释](https://cn.vuejs.org/v2/guide/conditional.html)。


> ## **Vue计算属性和观察者**
计算属性的设计其实就是为了让模板更加的简洁。当模板内的表达式语法太复杂或者在模板中需要多次使用某个表达式，就会造成模板复杂化，所以在某些场景下，就可以使用到计算属性的操作了。看例子:
```
<div id="app" class="demo">
    <input type="number" v-model="value1">
    +
    <input type="number" v-model="value2">
    = {{result}}
</div>
<script type="text/javascript">
    var app = new Vue({
        el: "#app",
        data: {
            value1: 0,
            value2: 0
        },
        computed: {
            result: function(){
                return parseInt(this.value1) + parseInt(this.value2);
            }
        }
    })
</script>
```
计算属性都是包裹在computed对象中的，Vue实例化之后，计算属性会被当做Vue实例的属性。当你修改两个输入框的值后，计算属性会动态的得到两个输入框拼接起来的值。计算属性的值必须return返回。    

Vue使用`watch`来监听数据的变化，然后可以执行某些操作，有时候我们需要通过监听某些数据的变化来达到目的。watch是一个对象，里面包含了要监听的数据。可能你会发现，上面的例子中，用watch监听也能实现，你可能会这样去实现：
```
<div id="app2" class="demo">
    <input type="number" v-model="value1">
    +
    <input type="number" v-model="value2">
    = {{result}}
</div>
<script type="text/javascript">
    var app2 = new Vue({
        el: "#app2",
        data: {
            value1: 0,
            value2: 0,
            result: 0
        },
        watch: {
            value1: function (val) {
                this.result = parseInt(val) + parseInt(this.value2);
            },
            value2: function (val) {
                this.result = parseInt(this.value1) + parseInt(val);
            }
        }
    })
</script>
```
虽然这样也是能够实现效果的，但是明显没有计算属性更方便简洁，所以应该在适当的场景下使用watch监听，比如数据变动时执行异步处理或者开销较大的操作的时候。  
想象一下，假设有这样的一个场景，当你在做一个商城的搜索栏的时候，你需要根据用户输入的内容实时的查询出相关的产品数据，这个时候就可以使用watch监听了。
```
<div id="shop-search" class="demo">
    <input type="text" v-model="searchKey" placeholder="请输入任意关键字">
    <ul>
        <li v-for="item in resultData">{{ item }}</li>
    </ul>
</div>
<script type="text/javascript">
    var shopSearch = new Vue({
        el: "#shop-search",
        data: {
            //搜索关键字
            searchKey: "",
            //搜索结果
            resultData: []
        },
        watch: {
            searchKey: function() {
                const vm = this;
                vm.getResultData(true).then((data) => {
                    vm.resultData = data;
                })
            }
        },
        methods: {
            getResultData: function(ready) {
                const vm = this;
                return new Promise((resolve, reject) => {
                    if (ready) {
                        const data = [
                            vm.searchKey,
                            vm.searchKey + vm.searchKey,
                            vm.searchKey + vm.searchKey + vm.searchKey
                        ];
                        resolve(data);
                        } else {
                        reject("filed");
                    }
                })
            }
        }
    })
</script>
```
这个案例忽略了函数防抖处理。
好了，watch的基本使用就是这样。可能你会发现，watch只是监听了单个数据值，如果要监听的是一个数据对象，又应该怎么去监听值的变化？答案是，使用watch的深度监听。
```
<div id="app3">
    名称： {{ user.name }}，
    年龄： {{ user.age }}，
    作者： {{ user.author }}
</div>
<script type="text/javascript">
    var app3 = new Vue({
        el: "#app3",
        data: {
            user: {
                name: "秦时明月",
                age: 10,
                author: "玄机科技"
            }
        },
        watch: {
            user: {
                handler: function(val, oldVal){
                    alert("监听到了user对象数据的变化了");
                },
                deep: true
            }
        }
    })
    app3.user.name = "秦时明月"; //设置的值一样，不会执行监听
    app3.user.age = 30; //可以监听到数据变化
</script>
```
使用深度watcher可以监听到对象数据的变动，但是如果要监听对象数据某个具体属性的变化呢，比如就是想要监听user.author的值的变化，该如何监听。    
简单粗暴型：
```
var app3 = new Vue({
    el: "#app3",
    data: {
        user: {
            name: "秦时明月",
            age: 10,
            author: "玄机科技"
        }
    },
    watch: {
        "user.author": function(val, oldVal){
            alert("监听到了user.author值的变化了");
        }
    }
})
```
或者可以使用$watch实例监听。
```
var app3 = new Vue({
    el: "#app3",
    data: {
        user: {
            name: "秦时明月",
            age: 10,
            author: "玄机科技"
        }
    }
})
app3.$watch("user.author", function(val, oldVal){
    alert("监听到了user.author值的变化了!");
})
```



> ## **扩展**
## **问题1：为什么很多项目或者示例中Vue的挂载el的值都是以`#`为前缀？挂载点只能是元素id吗？**
对于刚入手Vue的新手开发者来说，确实会感到有疑惑，在没有详尽的阅读API文档或者对API不熟的时候，可能会被误导挂载点只能是元素id。其实不然，官方API文档中已经s对其说明了，`提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标。可以是 CSS 选择器，也可以是一个 HTMLElement 实例。`  也就是说，el挂载点的值不只是id，还可以是其他的css选择器，可以查看例子Demo: [Vue挂载点的值](../example/base/扩展1.html)。
