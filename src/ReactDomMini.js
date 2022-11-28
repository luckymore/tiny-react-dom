import ReactReconciler, { ConcurrentRoot } from 'react-reconciler'

let reconciler = ReactReconciler({
  supportsMutation: true,
  createInstance(type, props) {
    console.log(type, props)
    let el = document.createElement(type)
    if (props.className) el.className = props.className
    if (props.src) el.src = props.src
    ;['alt', 'className', 'href', 'rel', 'src', 'target'].forEach(k => {
      if (props[k]) el[k] = props[k]
    })
    if (props.onClick) {
      el.addEventListener('click', props.onClick)
    }
    if (props.color) {
      el.style.color = props.color
    }
    if (props) return el
  },
  createTextInstance(text, rootContainerInstance, hostContext, internalInstanceHandle) {
    return document.createTextNode(text)
  },
  appendInitialChild(parent, child) {
    parent.appendChild(child)
  },
  appendChild(parent, child) {
    parent.appendChild(child)
  },
  prepareUpdate(instance, type, oldProps, newProps, rootContainerInstance, currentHostContext) {
    let payload
    if (oldProps.color !== newProps.color) {
      payload = { newColor: newProps.color }
    }
    return payload
  },
  commitUpdate(instance, updatePayload, type, oldProps, newProps, finishedWork) {
    if (updatePayload.newColor) {
      instance.style.color = updatePayload.newColor
    }
  },
  removeChildFromContainer() {},
  appendChildToContainer(container, child) {
    container.appendChild(child)
  },
  detachDeletedInstance() {},
  getRootHostContext() {},
  getChildHostContext() {},
  shouldSetTextContent() {},
  prepareForCommit() {},
  clearContainer() {},
  resetAfterCommit() {},
  finalizeInitialChildren() {},
})
console.log('reconciler:', reconciler)

function ReactDOMRoot(internalRoot) {
  this._internalRoot = internalRoot
}
ReactDOMRoot.prototype.render = function (children) {
  reconciler.updateContainer(children, this._internalRoot)
}

let ReactDOMMini = {
  createRoot(container) {
    const root = reconciler.createContainer(container, ConcurrentRoot)

    return new ReactDOMRoot(root)
  },
}

export default ReactDOMMini
