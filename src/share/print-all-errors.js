import hasDom from 'has-dom'

if(hasDom()){
  window.addEventListener('unhandledrejection', reason => {
    console.error('Unhandled Rejection', reason)
  })
}
else{
  process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection', err.stack || err)
  })
}
