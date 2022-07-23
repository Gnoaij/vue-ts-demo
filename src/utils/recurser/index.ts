function getAllNodes(data: any[] = [], children = 'children') {
  const result: any[] = []

  function _recurseGetLeafNodes(_data: any[]) {
    _data.forEach((_item) => {
      result.push(_item)
      if (_item[children] && _item[children].length > 0) {
        _recurseGetLeafNodes(_item[children])
      }
    })
  }

  _recurseGetLeafNodes(data)

  return result
}

function getParentNodes(data: any[] = [], children = 'children') {
  const result: any[] = []

  function _recurseGetLeafNodes(_data: any[]) {
    _data.forEach((_item) => {
      if (_item[children] && _item[children].length > 0) {
        result.push(_item)
        _recurseGetLeafNodes(_item[children])
      }
    })
  }

  _recurseGetLeafNodes(data)

  return result
}

function getLeafNodes(data: any[] = [], children = 'children') {
  const result: any[] = []

  function _recurseGetLeafNodes(_data: any[]) {
    _data.forEach((_item) => {
      if (_item[children] && _item[children].length > 0) {
        _recurseGetLeafNodes(_item[children])
      } else {
        result.push(_item)
      }
    })
  }

  _recurseGetLeafNodes(data)

  return result
}

export { getAllNodes, getParentNodes, getLeafNodes }
