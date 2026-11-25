const measure = Performance.prototype.measure

Performance.prototype.measure = function (...args) {
  try {
    return measure.apply(this, args)
  } catch {
    return undefined
  }
}

const nodeName = Object.getOwnPropertyDescriptor(Node.prototype, 'nodeName')
if (nodeName?.get) {
  const original = nodeName.get
  const elementName = Object.getOwnPropertyDescriptor(Element.prototype, 'nodeName')?.get
  Object.defineProperty(Node.prototype, 'nodeName', {
    ...nodeName,
    get() {
      const own = original.call(this)
      if (own !== '' || !elementName) return own
      if (this instanceof Element) return elementName.call(this)
        if (this instanceof Text) return '#text'
        if (this instanceof Comment) return '#comment'
        if (this instanceof DocumentFragment) return '#document-fragment'
        if (this instanceof Document) return '#document'
        return own
    },
  })
}

{
  const nodeType = Object.getOwnPropertyDescriptor(Node.prototype, 'nodeType')
  if (nodeType?.get) {
    const original = nodeType.get
    const kinds = [
      [Element, 1],
      [Text, 3],
      [Comment, 8],
      [Document, 9],
      [DocumentFragment, 11],
    ]
    Object.defineProperty(Node.prototype, 'nodeType', {
      ...nodeType,
      get() {
        const own = original.call(this)
        if (own !== 0) return own
        for (const [ctor, value] of kinds) if (this instanceof ctor) return value
        return own
      },
    })
  }
}
