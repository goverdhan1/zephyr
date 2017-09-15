export const REFRESH_RATE: any = {
    '60' : '1 Hour',
    '240' : '4 Hour',
    '480' : '8 Hour',
    '1440' : '1 Day',
    '10080' : '1 Week',
};

export const REFRESH_RATE_MAPPINGS : any = [
  {id: '60', text: '1 Hour'},
  {id: '240', text: '4 Hour'},
  {id: '480', text: '8 Hour'},
  {id: '1440', text: '1 Day'},
  {id: '10080', text: '1 Week'},
];

export const TRACK_PULSE_BY : any = [
  {id: 'testcaseCount', text: 'Tests Created'},
  {id: 'executionCount', text: 'Tests Executed'},
  {id: 'defectCount', text: 'Defects Count'},
];

export const TRACK_PULSE_BY_OBJ : any = {
  'testcaseCount': 'Tests Created',
  'executionCount': 'Tests Executed',
  'defectCount': 'Defects Count',
};

export const TRACK_PULSE_KEYS = [
  'testcaseCount',
  'executionCount',
  'defectCount'
];


export const TRACK_PULSE_BY_ORDER : any = {
  'Tests Created': 1,
  'Tests Executed': 2,
  'Defects': 3,
};

export const TRACK_PULSE_BY_ORDER_KEY : any = {
  'testcaseCount': 1,
  'executionCount': 2,
  'defectCount': 3,
};

export const PULSE_COLOR : any = {
  'testcaseCount': '#e6e628',
  'executionCount': '#008000',
  'defectCount': '#ec0505',
};

export const DATE_RANGES : any = [
  {id: '1', text: 'Yesterday'},
  {id: '7', text: 'Last 7 Days'},
  {id: '15', text: 'Last 15 Days'},
  {id: '30', text: 'Last 30 Days'},
  {id: '90', text: 'Last Quarter'},
  {id: '365', text: 'Last Year'},
  {id: '0', text: 'Custom'},
];
