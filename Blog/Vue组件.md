> ## **认识组件**

组件是 Vue 强大的功能之一。Vue组件具有封装可复用的特点，能够让你在复杂的应用中拆分成独立模块使用。注意，所有的 Vue 组件同时也都是 Vue 的实例。      

## **Vue组件的注册**

我们可以通过全局注册和局部注册的方式来注册一个 Vue 组件，两种方式的区别在于，全局注册的组件能够在任何地方使用，其实就是所有的 Vue 实例化的时候都会去渲染这个全局组件；而局部组件只是注册在某一个 Vue 实例化对象上，只能在这个 Vue 实例化的时候会渲染，其他地方使用会被当成普通的Html标签渲染。我们就先来了解下全局组件的注册。     
Vue 组件全局注册时通过 `Vue.component(tagName, options)` 方式注册。  看一个简单的示例。

```
<div id="app" class="demo">
    <!-- Vue组件 -->
    <simple-component></simple-component>
</div>
<script>
    Vue.component("simple-component", {
        template: "<span>我是一个最简单的Vue组件示例</span>"
    })
    new Vue({
        el: "#app"
    })
</script>
```
Vue.component 方法中传入两个参数，一个参数是组件的自定义标签名，另一个参数是一个对象，里面的template属性的值就是组件的模板。

可能你会想，组件的内容太简单了吧，只有一个标签，要是内容复杂点的组件，难道也要像以前一样用字符串把内容都拼接起来吗？感觉太恐怖了，就算是使用了es6的字符串语法，写下去也是一大推，很不优雅感觉。嗯，是的，针对这个问题，在 Vue 中给出了良好的解决方案，可以使用 `<script type="x-template">` 标签来处理复杂的组件模板。

```
<div id="app2" class="demo">
    <vut-button></vut-button>
</div>
<script type="x-template" id="vComponent">
    <div class="vut-button">
        <span>我是Button组件</span>
    </div>
</script>

<script>
    Vue.component("vut-button", {
        template: "#vComponent"
    })
    new Vue({
        el: "#app2"
    })
</script>
```
当然，为了能够让代码看起来更加清晰明了点，你可以使用 `template` 标签来包裹组件模板，`template` 标签在浏览器渲染过程中不会被渲染出来。

```
<div id="app-test" class="demo">
    <vut-button></vut-button>
</div>
<template id="vComponent">
    <div class="vut-button">
        <span>我是Button组件</span>
    </div>
</template>

<script>
    Vue.component("vut-button", {
        template: "#vComponent"
    })
    new Vue({
        el: "#app-test"
    })
</script>
```
好了，那么局部组件应该怎么注册呢？你可以通过在Vue实例选项`components`注册仅在其作用域中可用的局部组件。
```
<div id="app-local" class="demo">
    <!-- Vue组件 -->
    <simple-component></simple-component>
</div>
<script>
    new Vue({
        el: "#app-local",
        components: {
            "simple-component": {
                template: "<span>我是一个最简单的局部Vue组件示例</span>"
            }
        }
    })
</script>
```  
Vue实例选项`components`包含了一个属性，键是组件的名称，值是一个对象，包含了组件的模板等属性。