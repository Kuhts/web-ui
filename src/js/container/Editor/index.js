// import React from 'react'
// import { fromJS, Map, } from 'immutable'
// import {
//   array,
//   any,
// } from 'prop-types'
// import {
//   workouts,
// } from 'js/service'
// import {
//   ImmutableContainer,
// } from 'js/utils'
// import {
//   Subscribe,
//   Provider,
// } from 'unstated'
// // import {
// //   Value,
// // } from 'slate'
// import {
//   Local,
// } from 'js/container'
// import SlateHTML from 'slate-html-serializer'
// import {
//   rules,
// } from './rules'
// const slateHTML = new SlateHTML({
//   rules,
// })
// const editorContentsKeys = ['editor', 'contents']
// export class EditorContainer extends ImmutableContainer {
//   constructor(props) {
//     super(props)
//     this.state = props
//   }

//   loaded(id) {
//     return this.getIn('id') === id
//   }

//   loading = (id) => {
//     const loading = this.state.loading !== id
//     if (!loading) {
//       return loading
//     }
//     if (id === this.getIn('id')) {
//       return loading
//     }
//     this.load(id).then((data) => {
//       if (id !== this.state.loading) {
//         return Promise.resolve()
//       }
//       const { contents, } = data
//       const latest = contents[contents.length - 1]
//       const content = slateHTML.deserialize(latest)
//       return this.setState({
//         data: fromJS(data),
//         loading: false,
//         value: content,
//       })
//     })
//     this.setState({
//       loading: id,
//     })
//     return loading
//   }

//   save = async () => {
//     const { contents, } = this.state
//     const content = slateHTML.serialize(contents)
//     await Local.save(editorContentsKeys, content)
//     await workouts.write(this.getIn('id'), [content])
//   }

//   setContents(contents) {
//     const EditorState = this
//     return EditorState.setState(() => contents)
//   }

//   load(id) {
//     return workouts.get({
//       id,
//     })
//   }
// }

// // Following the Singleton Service pattern (think Angular Service),
// // we will instantiate the Container from within this module
// const localResult = Local.getIn(editorContentsKeys)
// const savedJSON = slateHTML.deserialize(localResult || '<p>Begin here...</p>')
// export const Editor = new EditorContainer({
//   data: new Map(),
//   value: savedJSON,
// })

// // Then we will wrap the provider and subscriber inside of functional
// // React components. This simplifies the resuse of the module as we
// // will be able to import this module as a depenency without having
// // to import Unstated and/or create React Contexts  manually in the
// // places that we want to Provide/Subscribe to the API Service.
// // We leave the injector flexible, so you can inject a new dependency
// // at any time, eg: snapshot testing
// export const EditorProvider = (props) => (
//   <Provider inject={props.inject || [Editor]}>{props.children}</Provider>
// )
// EditorProvider.propTypes = {
//   inject: array,
//   children: any,
// }

// // We also leave the subscribe "to" flexible, so you can have full
// // control over your subscripton from outside of the module
// export const EditorSubscribe = (props) => (
//   <Subscribe to={props.to || [Editor]}>{props.children}</Subscribe>
// )
// EditorSubscribe.propTypes = {
//   to: array,
//   children: any,
// }
