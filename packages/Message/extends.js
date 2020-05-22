import Vue from 'vue'
import ms from './message'
let instances = [];
export function $message() {
  var dom = Vue.extend(ms);
  var c = new dom({
    data: {
      message: 'nomeessage',
      show: false
    },
    mounted() {
      this.show = true;

      setTimeout(() => {
        this.show = false;
      }, 2000)
    }
  }).$mount()

  c.$nextTick(() => {
    let messageArr = document.getElementsByClassName('lb-message_box');
    let length = messageArr.length;
    let verticalOffset = 20
    instances.forEach(item => {
      verticalOffset += item.offsetHeight + 16;
    });
    c.$el.style.top = verticalOffset + 'px'
    document.body.appendChild(c.$el);
    instances.push(c.$el)
  })
}