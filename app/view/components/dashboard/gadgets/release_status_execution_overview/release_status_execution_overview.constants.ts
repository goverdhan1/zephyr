export const CHART_TITLE = 'Test Execution by Cycle';
export const CYCLE_PHASE = 'cyclephase';
export const PHASE = 'phase';
export const UNEXECUTED = 'unexecuted';
export const TCR_CATALOG_TREE_ID = 'tcrCatalogTreeId';

// const data1 = [
//   {
//     "cycle": {
//       "name": "cycle-1",
//       "status": 0,
//       "id": 1,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 0,
//       "2": 0,
//       "3": 18,
//       "4": 48,
//       "unexecuted": 9
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-1",
//       "status": 0,
//       "id": 2,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 18,
//       "2": 0,
//       "3": 0,
//       "4": 12,
//       "unexecuted": 8
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-3",
//       "status": 0,
//       "id": 3,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 32,
//       "2": 16,
//       "3": 12,
//       "4": 6,
//       "unexecuted": 0
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-4",
//       "status": 0,
//       "id": 4,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 12,
//       "2": 3,
//       "3": 9,
//       "4": 16,
//       "unexecuted": 24
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-5",
//       "status": 0,
//       "id": 5,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 12,
//       "2": 6,
//       "3": 48,
//       "4": 0,
//       "unexecuted": 12
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-6",
//       "status": 0,
//       "id": 6,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 48,
//       "2": 24,
//       "3": 18,
//       "4": 0,
//       "unexecuted": 24
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-7",
//       "status": 0,
//       "id": 7,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 0,
//       "2": 0,
//       "3": 16,
//       "4": 12,
//       "unexecuted": 0
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-8",
//       "status": 0,
//       "id": 8,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 24,
//       "2": 4,
//       "3": 6,
//       "4": 6,
//       "unexecuted": 9
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-9",
//       "status": 0,
//       "id": 9,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 4,
//       "2": 48,
//       "3": 6,
//       "4": 48,
//       "unexecuted": 16
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-10",
//       "status": 0,
//       "id": 10,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 24,
//       "2": 12,
//       "3": 32,
//       "4": 3,
//       "unexecuted": 6
//     }
//   }
// ];
//
// const data2 = [
//   {
//     "cycle": {
//       "name": "cycle-1",
//       "status": 0,
//       "id": 1,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 18,
//       "2": 48,
//       "3": 48,
//       "4": 48,
//       "unexecuted": 48
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-2",
//       "status": 0,
//       "id": 2,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 6,
//       "2": 24,
//       "3": 4,
//       "4": 24,
//       "unexecuted": 0
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-3",
//       "status": 0,
//       "id": 3,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 0,
//       "2": 0,
//       "3": 0,
//       "4": 18,
//       "unexecuted": 4
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-4",
//       "status": 0,
//       "id": 4,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 6,
//       "2": 18,
//       "3": 0,
//       "4": 24,
//       "unexecuted": 0
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-5",
//       "status": 0,
//       "id": 5,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 12,
//       "2": 9,
//       "3": 48,
//       "4": 4,
//       "unexecuted": 8
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-6",
//       "status": 0,
//       "id": 6,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 12,
//       "2": 6,
//       "3": 0,
//       "4": 9,
//       "unexecuted": 8
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-7",
//       "status": 0,
//       "id": 7,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 24,
//       "2": 12,
//       "3": 0,
//       "4": 12,
//       "unexecuted": 16
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-8",
//       "status": 0,
//       "id": 8,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 24,
//       "2": 0,
//       "3": 18,
//       "4": 6,
//       "unexecuted": 8
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-9",
//       "status": 0,
//       "id": 9,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 24,
//       "2": 48,
//       "3": 9,
//       "4": 6,
//       "unexecuted": 4
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-10",
//       "status": 0,
//       "id": 10,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 12,
//       "2": 0,
//       "3": 3,
//       "4": 12,
//       "unexecuted": 6
//     }
//   }
// ];
//
// const data3 = [
//   {
//     "cycle": {
//       "name": "cycle-1",
//       "status": 0,
//       "id": 1,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 48,
//       "2": 0,
//       "3": 32,
//       "4": 16,
//       "unexecuted": 24
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-2",
//       "status": 0,
//       "id": 2,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 18,
//       "2": 0,
//       "3": 24,
//       "4": 16,
//       "unexecuted": 1
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-3",
//       "status": 0,
//       "id": 3,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 24,
//       "2": 6,
//       "3": 18,
//       "4": 0,
//       "unexecuted": 0
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-4",
//       "status": 0,
//       "id": 4,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 9,
//       "2": 24,
//       "3": 3,
//       "4": 0,
//       "unexecuted": 3
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-5",
//       "status": 0,
//       "id": 5,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 18,
//       "2": 48,
//       "3": 24,
//       "4": 6,
//       "unexecuted": 3
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-6",
//       "status": 0,
//       "id": 6,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 9,
//       "2": 18,
//       "3": 6,
//       "4": 18,
//       "unexecuted": 1
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-7",
//       "status": 0,
//       "id": 7,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 12,
//       "2": 24,
//       "3": 0,
//       "4": 0,
//       "unexecuted": 18
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-8",
//       "status": 0,
//       "id": 8,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 16,
//       "2": 12,
//       "3": 0,
//       "4": 18,
//       "unexecuted": 24
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-9",
//       "status": 0,
//       "id": 9,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 18,
//       "2": 0,
//       "3": 18,
//       "4": 16,
//       "unexecuted": 8
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-10",
//       "status": 0,
//       "id": 10,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 0,
//       "2": 0,
//       "3": 12,
//       "4": 6,
//       "unexecuted": 16
//     }
//   }
// ];
//
// const data4 = [
//   {
//     "cycle": {
//       "name": "cycle-1",
//       "status": 0,
//       "id": 1,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 12,
//       "2": 24,
//       "3": 12,
//       "4": 3,
//       "unexecuted": 0
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-2",
//       "status": 0,
//       "id": 2,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 9,
//       "2": 0,
//       "3": 0,
//       "4": 18,
//       "unexecuted": 12
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-3",
//       "status": 0,
//       "id": 3,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 32,
//       "2": 24,
//       "3": 3,
//       "4": 4,
//       "unexecuted": 1
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-4",
//       "status": 0,
//       "id": 4,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 12,
//       "2": 32,
//       "3": 9,
//       "4": 24,
//       "unexecuted": 0
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-5",
//       "status": 0,
//       "id": 5,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 18,
//       "2": 6,
//       "3": 48,
//       "4": 3,
//       "unexecuted": 24
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-6",
//       "status": 0,
//       "id": 6,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 0,
//       "2": 9,
//       "3": 4,
//       "4": 24,
//       "unexecuted": 0
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-7",
//       "status": 0,
//       "id": 7,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 0,
//       "2": 6,
//       "3": 3,
//       "4": 4,
//       "unexecuted": 1
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-8",
//       "status": 0,
//       "id": 8,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 24,
//       "2": 24,
//       "3": 0,
//       "4": 24,
//       "unexecuted": 24
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-9",
//       "status": 0,
//       "id": 9,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 0,
//       "2": 4,
//       "3": 16,
//       "4": 16,
//       "unexecuted": 24
//     }
//   },
//   {
//     "cycle": {
//       "name": "cycle-10",
//       "status": 0,
//       "id": 10,
//       "revision": 52,
//       "releaseId": 1,
//       "createdOn": 1489489664000
//     },
//     "cycleStatus": {
//       "1": 16,
//       "2": 6,
//       "3": 0,
//       "4": 4,
//       "unexecuted": 0
//     }
//   }
// ];
//
// export const data = {
//   1 : data1,
//   2 : data2,
//   3 : data3,
//   4 : data4,
// };
