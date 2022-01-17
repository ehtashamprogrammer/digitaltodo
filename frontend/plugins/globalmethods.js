
export default ({ app }, inject) => {

    inject('image',name => 'url('+require('@/assets'+name)+')')

  }
  