import {getTree} from '../filesManagerUtils'
import {expected, payloadMock} from './treeNodes.mock'

describe('Test filesManagerUtils', () => {
  it('should test getTree', function () {
    const actual = getTree(payloadMock)
		
    expect(actual).toEqual(expected)
  })
})