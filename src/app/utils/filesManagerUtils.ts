import {
	FileManagerItemType,
	ItemsPayloadType
} from "../types/fileManagerTypes";

export const getTree = (data: ItemsPayloadType): FileManagerItemType[] => {
	const roots = [] as any
	const mapping = data.items.reduce((acc: any, item) => {
		acc[item.id] = {value: item, children: []}
		if (!item.parentId)
			roots.push(acc[item.id])
		return acc
	}, {})
	
	for(const item of data.items) {
		if (item.parentId) {
			const parent = mapping[item.parentId]
			const child = mapping[item.id]
			// @ts-ignore
			parent.children.push(child)
		}
	}
	
	console.log('initial: ', roots)
	
	return roots
	/*return [
		{
			value: { type: Item.FOLDER, id: 12236, name: 'My Documents' },
			children: [
				{
					value: { type: Item.FOLDER, id: 23565, name: 'Learn FP' },
					children: [ { value: { type: Item.FILE, id: 36549, name: 'Pure Functions.txt' }, children: [] } ]
				},
				{
					value: { type: Item.FOLDER, id: 45643, name: 'University lectures' },
					children: []
				},
				{
					value: { type: Item.FILE, id: 123548, name: 'Fitness records.txt' },
					children: []
				},
				{
					value: { type: Item.FOLDER, id: 1236654, name: "Travel Plans" },
					children: []
				},
				{
					value: { type: Item.FOLDER, id: 12665489, name: "Reading Technics" },
					children: [
						{
							value: { type: Item.FILE, id: 465798, name: 'Technic 1.txt'},
							children: []
						},
						{
							value: { type: Item.FILE, id: 451324, name: 'Technic 2.txt'},
							children: []
						}
					]
				}
			]
		},
	]*/
}