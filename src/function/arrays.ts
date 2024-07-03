export function shufflesArray(elements: any[]): any[] {
	return elements
		.map((element) => ({ element, aleatory: Math.random() }))
		.sort((first, second) => first.aleatory - second.aleatory)
		.map((obj) => obj.element);
}
