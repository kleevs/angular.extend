export declare type Data = string | boolean | number;

export class Database<T extends {[s:string]: Data}> {
	private index: {[s: string]: { id: number, value: Data }[] } = {};
	private objects: {[id: number]: T } = {};
	private length = 0;

	constructor(private name: string) {
		this.load();
	}

	private filter(criteria: {[s:string]: Data}): number[] {
		var ids: {[id:number]: boolean } = undefined;
		Object.keys(criteria).map(key => {
			var index = this.index[key] || [];
			var tmp: {[id:number]: boolean } = {};

			index.filter(item => !ids || ids[item.id])
				.map((item) => !criteria[key] || item.value === criteria[key] ? item.id : undefined)
				.filter(_ => _)
				.forEach(id => {
					tmp[id] = true;
				});
			ids = tmp;
		});

		return <any>Object.keys(ids || this.objects);
	}

	public find(): T[];
	public find(criteria: {[s:string]: Data}): T[];
	public find(criteria?: {[s:string]: Data}): T[] {
		return this.filter(criteria || {}).map(id => JSON.parse(JSON.stringify(this.objects[id])));
	}

	public insert(data: T) {
		var id = ++this.length,
			toSave = JSON.parse(JSON.stringify(data));

		toSave.id = id;
		Object.keys(toSave).forEach(key => {
			var value = toSave[key];
			this.index[key] = this.index[key] || [];
			this.index[key].push({ value: value, id: id });
			this.index[key] = this.index[key].sort((a, b) => a.value > b.value ? 1 : a.value === b.value ? 0 : -1);
		});

		this.objects[id] = toSave;
		this.save();
		return id;
	}

	public update(criteria: {[s:string]: Data}, data: T) {
		var ids = this.filter(criteria),
			toSave = JSON.parse(JSON.stringify(data));
		
		Object.keys(toSave).forEach(key => { 
			ids.forEach(id => {
				this.objects[id][key] = toSave[key];
				this.index[key] = this.index[key] || [];
				this.index[key].filter(_ => _.id === id).forEach(_ => _.value = toSave[key]);
			});

			this.index[key] = this.index[key] || [];
			this.index[key] = this.index[key].sort((a, b) => a.value > b.value ? 1 : a.value === b.value ? 0 : -1);
		});

		this.save();
		return ids.length;
	}

	public remove(criteria: {[s:string]: Data}) {
		var ids = this.filter(criteria);
			
		ids.forEach(id => {
			var tmp = this.objects[id];
			delete this.objects[id];
			Object.keys(tmp).forEach(key => {
				this.index[key] = this.index[key] && this.index[key].filter(_ => _.id !== id) || [];
				this.index[key] = this.index[key].sort((a, b) => a.value > b.value ? 1 : a.value === b.value ? 0 : -1);
			});
		});
			
		this.save();
		return ids.length;
	}

	private save() {
		var result = JSON.stringify(this);
		localStorage.setItem(this.name, result);
	}
	
	private load() {
		var storage = localStorage.getItem(this.name);
		
		if (storage) {
			var result = JSON.parse(storage);
			this.index = result.index || {};
			this.objects = result.objects || {};
			this.length = result.length || 0;
		}
	}
}