import React from 'react'
import styled from 'react-emotion'
import {
  func,
  shape,
  string,
} from 'prop-types'
import {
  Modal as AntdModal,
} from 'antd'
import {
  ModalSubscribe,
  ModalContainer,
} from 'js/container'

const StyledModal = styled(UnstyledModal)`
.ant-modal-body {
  min-height: 56px;
}
`
const Modal = hocProps => props => <StyledModal {...props} {...hocProps} />

/* const ModalFooterless = (Component) => (props) => (<UnstyledModalFooterless {...props}>
  <Component {...props} />
</UnstyledModalFooterless>)
*/

export {
  Modal,
  // ModalFooterless,
}

function UnstyledModal(props) {
  const {
    children: Component,
    directions,
    className,
  } = props
  const Modal = new ModalContainer({
    directions,
  })
  return (
    <ModalSubscribe to={[Modal]}>
      {({
        state,
        forward,
        back,
      }) => (
        <AntdModal
          onCancel={() => back('./')}
          className={className}
          visible={state.visible}
          footer={null}
        >
          {state.redirect}
          <Component
            {...props}
            onOk={() => forward()}
            onCancel={() => back('./')}
          />
        </AntdModal>
      )}
    </ModalSubscribe>
  )
}
UnstyledModal.propTypes = {
  children: func,
  directions: shape({
    forward: string,
    back: string,
  }),
}
