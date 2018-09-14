export class Reference {
    _lov1: any = {
        'major': [{ 'value': '1', 'caption': 'CT' }, { 'value': '2', 'caption': 'CS' }]
    };
    _lov2: any = {
        'ref001': [{ 'value': '', 'caption': 'Empty' }]
    };
    _lov3: any = {
        'ref001': [{ 'value': '', 'caption': 'Empty' }]
    };

    getMenuObj() {
        return { id: 0, t1: '', t2: '', t3: '', n1: 0, n2: 0, order: 0, userId: '' };
    }
    getUserObj() {
        return { id: 0, userId: '', t1: '', t2: '', t3: '', t4: '', t5: '', role: 0, navs: [] };
    }
}
