// import React, {
//   Component,
//   Fragment,
// } from 'react'
// import {
//   Redirect,
// } from 'react-router-dom'
// import {
//   Helmet,
// } from 'react-helmet'
// import {
//   Subscribe,
// } from 'unstated'
// import {
//   Icon,
// } from 'antd'
// import {
//   User,
//   Sider,
// } from 'js/container'

// const Authenticate = (props) => {
//   const {
//     location,
//     onOk,
//   } = props
//   const state = location.state || {}
//   const prev = state.prev || {}
//   const pathname = prev.pathname || '/app/'
//   return (
//     <Subscribe to={[User, Sider]}>{(user, sider) => {
//       const { state } = user
//       const { data, providers } = state
//     return (
//       <Fragment>
//         <Helmet>
//           <title>Authenticate</title>
//         </Helmet>
//         {providers.map((provider) => {
//           const key = provider.get('provider')
//           return (
//             <div
//               key={key}
//               onClick={() => {
//                 user.startLogin(key)
//               }}>
//               {data.providers[key] ? <Icon type="close" onClick={() => {
//                 console.log('remove', key)
//               }} /> : <Icon type="minus" onClick={() => {
//                 console.log('logging in', key)
//               }} />}
//               {provider.get('name')}
//             </div>
//           )
//         })}
//       </Fragment>
//     )}}</Subscribe>
//   )
// }
//               // {provider.get('loading') ? <Icon type="loading" /> : []}

// export {
//   Authenticate,
// }
