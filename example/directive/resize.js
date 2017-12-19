/**
 * github: https://github.com/vuetifyjs/vuetify/blob/dev/src/directives/resize.js
*/

function inserted (el, binding) {
    //指令的绑定值，是一个function函数
    const callback = binding.value

    //延时执行函数的毫秒数
    const debounce = binding.arg || 200

    //禁止执行与事件关联的默认动作
    const options = binding.options || { passive: true }
    
    let debounceTimeout = null
    const onResize = () => {
        clearTimeout(debounceTimeout)
        debounceTimeout = setTimeout(callback, debounce, options)
    }

    //监听窗口缩放
    window.addEventListener('resize', onResize, options)

    //存储监听窗口缩放事件的参数，方便在unbind钩子函数中解除事件绑定的时候使用到
    el._onResize = {
        callback,
        options
    }

    if (!binding.modifiers || !binding.modifiers.quiet) {
        onResize()
    }
}

//绑定的DOM元素被移除时触发
function unbind (el, binding) {
    const { callback, options } = el._onResize

    window.removeEventListener('resize', callback, options)
    delete el._onResize
}

export default {
    //指令名称
    name: 'resize',
    inserted,
    unbind
}
