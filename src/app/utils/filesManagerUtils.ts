import {
  ExpandCollapseAction,
  ExpandCollapseActionType,
  ExpandCollapseType,
  FileManagerItemNode,
  ItemsVisibility,
  ItemType
} from '../types/fileManagerTypes'
import {FileManagerItemPayload} from '../types/types'
import {anyPass, curry, equals, filter, includes, indexBy, map, pipe, prop, propEq, values} from 'ramda'
import {PayloadAction} from '@reduxjs/toolkit'

export const getTree = (items: FileManagerItemPayload<ItemType>[]): FileManagerItemNode[] => {
  const roots: FileManagerItemNode[] = []
  const mapping = items.reduce<Record<string, FileManagerItemNode>>((acc, item) => {
    acc[item.id] = {value: item, children: []}
    if (!item.parentId)
      roots.push(acc[item.id])
    return acc
  }, {})
  
  for (const item of items) {
    if (item.parentId) {
      const parent = mapping[item.parentId]
      const child = mapping[item.id]
      parent?.children?.push(child)
    }
  }
  
  return roots
}

type FileManagerItemNodeOrNull = FileManagerItemNode | null

const findNode = (nodes: FileManagerItemNode[], id: string, foundNode: FileManagerItemNodeOrNull = null): any => {
  for (let i = 0; i < nodes.length; i++)
    if (nodes[i].value.id === id) {
      return nodes[i]
    } else {
      const found = findNode(nodes[i]?.children || [], id, foundNode)
      if (found) return found
    }
}

export const updateVisibilitySettings = (settings: Record<string, ItemsVisibility>, node: FileManagerItemNode, actionType: ExpandCollapseType) => {
  const parentVisibility = {isExpanded: actionType === 'expand', isDisplayed: true}
  settings[node.value.id] = parentVisibility
  
  node?.children?.forEach(node => {
    settings[node.value.id].isDisplayed = parentVisibility.isExpanded
  })
  
  return settings
}

export const getCollapseExpandSettings = (data: ExpandCollapseActionType, settings: Record<string, ItemsVisibility>) => {
  const foundNode = findNode(data.tree, data.id)
  return updateVisibilitySettings(settings, foundNode, data.actionType)
}

export const itemsPayloadIdentity = (items: Record<string, FileManagerItemPayload<ItemType>>) => items

export const getItemPayloadIds = curry((items, item) => pipe(
  itemsPayloadIdentity,
  values,
  filter(propEq('parentId', item.id)),
  map((item: any) => item.id)
)(items))

export const removeDeletedItems = (action: PayloadAction<{
  ids: [], items: Record<string, FileManagerItemPayload<ItemType>>
}>) => pipe(
  itemsPayloadIdentity,
  values,
  filter<FileManagerItemPayload<ItemType>>(item => {
    if (!item.parentId) return true
    else if (includes(item.id, action.payload.ids)) return false
    else return !includes(item.parentId, action.payload.ids)
  }),
  indexBy(prop('id'))
)(action.payload.items)

export const isEnterPressed = anyPass([equals('Enter'), equals('NumpadEnter')])