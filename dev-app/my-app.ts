import { Editors, FieldType, Formatters, GridOption } from '@slickgrid-universal/common';

const NB_ITEMS = 995;

export class MyApp {
    columnDefinitions1 = [
        { id: 'title', name: 'Title', field: 'title', sortable: true, minWidth: 100 },
        {
            id: 'duration', name: 'Duration (days)', field: 'duration', sortable: true, minWidth: 100,
            type: FieldType.number,
            editor: {
                model: Editors.slider,
                minValue: 0,
                maxValue: 100,
                // editorOptions: { hideSliderNumber: true },
            },
        },
        { id: '%', name: '% Complete', field: 'percentComplete', sortable: true, minWidth: 100 },
        { id: 'start', name: 'Start', field: 'start', formatter: Formatters.dateIso },
        { id: 'finish', name: 'Finish', field: 'finish', formatter: Formatters.dateIso },
        { id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven', sortable: true, minWidth: 100 }
    ];
    gridOptions1: GridOption = {
        enableCellNavigation: true,
        gridHeight: 225,
        gridWidth: 800,
        enableAutoResize: true,
        enableSorting: true,
        autoEdit: true,
        editable: true
    };
    dataset1: any[] = this.mockData(NB_ITEMS);

    mockData(count: number) {
        // mock a dataset
        const mockDataset: any[] = [];
        for (let i = 0; i < count; i++) {
            const randomYear = 2000 + Math.floor(Math.random() * 10);
            const randomMonth = Math.floor(Math.random() * 11);
            const randomDay = Math.floor((Math.random() * 29));
            const randomPercent = Math.round(Math.random() * 100);

            mockDataset[i] = {
                id: i,
                title: 'Task ' + i,
                duration: Math.round(Math.random() * 100) + '',
                percentComplete: randomPercent,
                start: new Date(randomYear, randomMonth + 1, randomDay),
                finish: new Date(randomYear + 1, randomMonth + 1, randomDay),
                effortDriven: (i % 5 === 0)
            };
        }

        return mockDataset;
    }
}
