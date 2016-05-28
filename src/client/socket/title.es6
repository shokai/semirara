export default function use({io, store, action}){

  io.on("page:title:change", (page) => {
    const {wiki, title} = page
    action.route({wiki, title})
  })

}
