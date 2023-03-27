import {FileManagerItemPayload} from '../../types/types'
import {ItemType} from '../../types/fileManagerTypes'

export const payloadMock = [{
  'id': '12236',
  'type': 'folder',
  'name': 'My Documents',
  'refId': null,
  'parentId': null
}, {'id': '123548', 'type': 'file', 'refId': 1, 'name': 'Fitness records.txt', 'parentId': '12236'}, {
  'id': '1236654',
  'type': 'folder',
  'refId': 2,
  'name': 'Travel Plans',
  'parentId': '12236'
}, {'id': '12665489', 'type': 'folder', 'refId': 3, 'name': 'Reading Technics', 'parentId': '12236'}, {
  'id': '23565',
  'type': 'folder',
  'refId': 4,
  'name': 'Learn FP',
  'parentId': '12236'
}, {'id': '36549', 'type': 'file', 'refId': 5, 'name': 'Pure Functions.txt', 'parentId': '23565'}, {
  'id': '45643',
  'type': 'folder',
  'refId': 6,
  'name': 'University lectures',
  'parentId': '12236'
}, {'id': '465798', 'type': 'file', 'refId': 7, 'name': 'Technic 1.txt', 'parentId': '12665489'}, {
  'id': '451324',
  'type': 'file',
  'refId': 8,
  'name': 'Technic 2.txt',
  'parentId': '12665489'
}] as unknown as FileManagerItemPayload<ItemType>[]

export const expected = [
  {
    'children': [
      {
        'children': [],
        'value': {
          'id': '123548',
          'name': 'Fitness records.txt',
          'parentId': '12236',
          'refId': 1,
          'type': 'file'
        }
      },
      {
        'children': [],
        'value': {
          'id': '1236654',
          'name': 'Travel Plans',
          'parentId': '12236',
          'refId': 2,
          'type': 'folder'
        }
      },
      {
        'children': [
          {
            'children': [],
            'value': {
              'id': '465798',
              'name': 'Technic 1.txt',
              'parentId': '12665489',
              'refId': 7,
              'type': 'file'
            }
          },
          {
            'children': [],
            'value': {
              'id': '451324',
              'name': 'Technic 2.txt',
              'parentId': '12665489',
              'refId': 8,
              'type': 'file'
            }
          }
        ],
        'value': {
          'id': '12665489',
          'name': 'Reading Technics',
          'parentId': '12236',
          'refId': 3,
          'type': 'folder'
        }
      },
      {
        'children': [
          {
            'children': [],
            'value': {
              'id': '36549',
              'name': 'Pure Functions.txt',
              'parentId': '23565',
              'refId': 5,
              'type': 'file'
            }
          }
        ],
        'value': {
          'id': '23565',
          'name': 'Learn FP',
          'parentId': '12236',
          'refId': 4,
          'type': 'folder'
        }
      },
      {
        'children': [],
        'value': {
          'id': '45643',
          'name': 'University lectures',
          'parentId': '12236',
          'refId': 6,
          'type': 'folder'
        }
      }
    ],
    'value': {
      'id': '12236',
      'name': 'My Documents',
      'parentId': null,
      'refId': null,
      'type': 'folder'
    }
  }
]