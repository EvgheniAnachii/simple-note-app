import {TreeValuePayloadType} from "../../types/types";
import {ItemType} from "../../types/fileManagerTypes";

export const payloadMock = [{
	"id": "12236",
	"type": "folder",
	"name": "My Documents",
	"refId": null,
	"parentId": null
}, {"id": "123548", "type": "file", "refId": 1, "name": "Fitness records.txt", "parentId": "12236"}, {
	"id": "1236654",
	"type": "folder",
	"refId": 2,
	"name": "Travel Plans",
	"parentId": "12236"
}, {"id": "12665489", "type": "folder", "refId": 3, "name": "Reading Technics", "parentId": "12236"}, {
	"id": "23565",
	"type": "folder",
	"refId": 4,
	"name": "Learn FP",
	"parentId": "12236"
}, {"id": "36549", "type": "file", "refId": 5, "name": "Pure Functions.txt", "parentId": "23565"}, {
	"id": "45643",
	"type": "folder",
	"refId": 6,
	"name": "University lectures",
	"parentId": "12236"
}, {"id": "465798", "type": "file", "refId": 7, "name": "Technic 1.txt", "parentId": "12665489"}, {
	"id": "451324",
	"type": "file",
	"refId": 8,
	"name": "Technic 2.txt",
	"parentId": "12665489"
}] as unknown as TreeValuePayloadType<ItemType>[]

export const expected = [
	{
		value: { type: 'folder', id: 12236, name: 'My Documents' },
		children: [
			{
				value: { type: 'folder', id: 23565, name: 'Learn FP' },
				children: [ { value: { type: 'file', id: 36549, name: 'Pure Functions.txt' }, children: [] } ]
			},
			{
				value: { type: 'folder', id: 45643, name: 'University lectures' },
				children: []
			},
			{
				value: { type: 'file', id: 123548, name: 'Fitness records.txt' },
				children: []
			},
			{
				value: { type: 'folder', id: 1236654, name: "Travel Plans" },
				children: []
			},
			{
				value: { type: 'folder', id: 12665489, name: "Reading Technics" },
				children: [
					{
						value: { type: 'file', id: 465798, name: 'Technic 1.txt'},
						children: []
					},
					{
						value: { type: 'file', id: 451324, name: 'Technic 2.txt'},
						children: []
					}
				]
			}
		]
	},
]