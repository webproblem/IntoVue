> # **Vue自定义指令**

## 简述

> Vue除了提供了默认内置的指令外，还允许开发人员根据实际情况自定义指令，它的作用价值在于当开发人员在某些场景下需要对普通DOM元素进行操作的时候。

## 注册自定义指令

Vue自定义指令和组件一样存在着全局注册和局部注册两种方式。先来看看注册全局指令的方式，通过 `Vue.directive( id, [definition] )` 方式注册全局指令，第一个参数为自定义指令名称（**指令名称不需要加 `v-` 前缀，默认是自动加上前缀的，使用指令的时候一定要加上前缀**），第二个参数可以是对象数据，也可以是一个指令函数。

```html
<div id="app" class="demo">
    <!-- 全局注册 -->
    <input type="text" placeholder="我是全局自定义指令" v-focus>
</div>
<script>
    Vue.directive("focus", {
        inserted: function(el){
            el.focus();
        }
    })
    new Vue({
        el: "#app"
    })
</script>
```
> 这个简单案例当中，我们通过注册一个 `v-focus` 指令，实现了在页面加载完成之后自动让输入框获取到焦点的小功能。其中 `inserted` 是自定义指令的钩子函数，后面的内容会详细讲解。        

全局注册好了，那么再来看看如何注册局部自定义指令，通过在Vue实例中添加 
`directives ` 对象数据注册局部自定义指令。

```html
<div id="app" class="demo">
    <!-- 局部注册 -->
    <input type="text" placeholder="我是局部自定义指令" v-focus2>
</div>
<script>
    new Vue({
        el: "#app",
        directives: {
            focus2: {
                inserted: function(el){
                    el.focus();
                }
            }
        }
    })
</script>
```

## 钩子函数

一个指令定义对象可以提供如下几个钩子函数 (均为可选)：
* **bind**：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置

* **inserted**：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。

* **update**：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 。

* **componentUpdated**：指令所在组件的 VNode 及其子 VNode 全部更新后调用。

* **unbind**：只调用一次，指令与元素解绑时调用。

> 这段是从官方文档copy来的，相信应该都一看就明白的，VNode是Vue的虚拟DOM，可以暂时忽略。

那么这几个钩子函数怎么使用呢？先来看看钩子函数的几个参数吧。指令钩子函数会被传入以下参数:       

* **el**: 指令所绑定的元素，可以用来直接操作 DOM，就是放置指令的那个元素。

* **binding**: 一个对象，里面包含了几个属性，这里不多展开说明，官方文档上都有很详细的描述。

* **vnode**：Vue 编译生成的虚拟节点。

* **oldVnode**：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

> 自定义指令也可以传递多个值,可以用javascript表达式z里面量传递，看例子：

```html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
<script>
    Vue.directive('demo', function (el, binding) {
    console.log(binding.value.color) // "white"
    console.log(binding.value.text)  // "hello!"
    })
</script>
```

说了这么多理论知识，那么现在就来动手写一个简单的案例吧。假设这样的看一个场景：`当你在阅览某网站的图片时，可能会由于图片资源比较大而加载缓慢，需要消耗一小段时间来呈现到眼前，这个体验肯定是不太友好的（就像网站切换页面，有时候会加载资源比较慢，为了给用户较好的体验，一般都会先出一个正在加载的友好提示页面），所以这个案例的功能就是在图片资源还没加载出来时，先显示默认背景图，当图片资源真正加载出来了之后，再把真实图片放置到对应的位置上并显示出来。`

```html
```