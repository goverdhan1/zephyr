import {
  FETCH_TREE_DATA_BY_RELEASE_ID_TO_MAP, FETCH_MAP_TREE_ID, SAVE_MAP, CLEAR_MAP_EVENT,
  CLEAR_MAP_DATA, SORT_MAP_TC_GRID, SORT_MAP_REQ_GRID, GET_JIRA_REQUIREMENT_MAP, FETCH_DEFECT_SYSTEM
} from '../utils/constants/action.types';

import {GridUtil} from '../view/components/grid/grid_util';
import { MAP_GRID_PAGINATION, FETCH_TREE_SUCCESS, FETCH_GRID_SUCCESS } from '../view/components/mapTestReq/map_test.constant';
import { UtililtyFunctions } from '../utils/scripts/utils';
import {JIRA_REQUIREMENT_TYPE} from "../utils/constants/application.constants";

declare var _: any, jQuery;
declare var moment: any;

const initialState = {
    treeData: {
        redrawTree: true,
        tree: []
    },
    mapData: {},
    treeMap: {},
    mapIds: [],
    grid: {
        sortedRows: [],
        rows: [],
        columns: [],
        currentPage: 1,
        isPaginationRequired: true,
        size: MAP_GRID_PAGINATION.size,
        totalCount: 0,
        isLastPage: true,
        isFirstPage: true,
        offset: 0,
        paginationOptions: MAP_GRID_PAGINATION
    },
    defectSystem: {},
    saveMap: {},
    jiraDetails: '',
    event: ''
};

export function mapTestReqReducer(state = initialState, action) {

    switch (action.type) {
        case FETCH_DEFECT_SYSTEM:
          state.defectSystem = action.data;
          return state;

        case FETCH_TREE_DATA_BY_RELEASE_ID_TO_MAP:
            let treeObj = [{
                'name': action.data.releaseName,
                'categories': action.data.treeData,
                'id': 0
            }];
            state.treeData = {
                redrawTree: true,
                tree: getTreeNodes(treeObj)
            };

            // for bulk mapping, convert all mapping data to 0. (because we have fetched for dummy testId, should be changed in server)
            let stateMap = action.data.mapData.stateMap;
            // convert all check/partial to uncheck
            stateMap = action.data.isBulk ? JSON.parse(JSON.stringify(stateMap).replace(/partial|check/g, 'uncheck').replace(/ununcheck/g, 'uncheck')) : stateMap;
            state.mapData = stateMap;

            let treeMap = action.data.mapData.treeMap;
            // convert all allocated to 0
            treeMap = action.data.isBulk ? JSON.parse(JSON.stringify(treeMap).replace(/"allocated":".*?(?=")/g, '"allocated":"' + 0)) : treeMap;
            state.treeMap = treeMap;

            // get testcase ids mapped to this requirement in this release (empty for bulk)
            state.mapIds = action.data.isBulk ? [] : action.data.allocatedData;

            state.grid = {
                sortedRows: [],
                rows: [],
                columns: [],
                currentPage: 1,
                isPaginationRequired: true,
                size: MAP_GRID_PAGINATION.size,
                totalCount: 0,
                isLastPage: true,
                isFirstPage: true,
                offset: 0,
                paginationOptions: MAP_GRID_PAGINATION
            };
            state.event = FETCH_TREE_SUCCESS;
            return state;
        case FETCH_MAP_TREE_ID:
            state.grid.currentPage = action.data.currentPage || 1;
            state.grid.size = action.data.size || state.grid.size;

            let row = action.data.data;

          if(row.results) {
            row.results.forEach((item)=> {
              if(item['testcase'] && action.data.data.type === "testcase") {
                Object.keys(item['testcase']['customProcessedProperties']).forEach(key => {
                  item['testcase']['customProperties'][key] =
                    moment(item['testcase']['customProcessedProperties'][key], 'MM/DD/YYYY').startOf('day').unix() * 1000;
                });
              }else{
                row.results.forEach(row => {
                  row.testcase = {};
                  //row.coverage = ((row.requirementReleaseTestcaseCountMapping || []).filter(item => String(item.releaseId) === String(currRelease))[0] || {}).testcaseCount || 0;
                  row.customProperties = row.customProperties || {};
                  if(row.customProcessedProperties) {
                    let keyList = Object.keys(row.customProcessedProperties);
                    if(keyList && keyList.length) {
                      keyList.forEach(key => {
                        row.customProperties[key] =
                          moment(row.customProcessedProperties[key],'MM/DD/YYYY').startOf('day').unix() * 1000;
                      });
                    }
                  }
                  row.testcase['customProperties'] = row.customProperties || {};
                });



              }
            });
          }

            state.grid.sortedRows = row.results;
            state.grid.offset = row.firstResult || 0;
            state.grid.totalCount = row.resultSize;
            state.grid.rows = GridUtil.fetchGridRecords(row.results, state.grid, true);
            state.event = FETCH_GRID_SUCCESS;
            changeLink(state.grid.rows, state);
            return state;
        case GET_JIRA_REQUIREMENT_MAP:
            let html = '';
            if (action.data) {
                let desc = action.data;
                try {
                    if (!_.isObject(desc)) {
                        let _utililtyFunctions = new UtililtyFunctions();
                        jQuery(desc).each((index, node) => {
                            html += _utililtyFunctions.parseExternalRequirementXml(jQuery(node));
                        });
                    }
                } catch (err) {
                    console.log('error in parsing jira description', err);
                }
            }
            state.jiraDetails = html;
            state.event = 'FETCH_JIRA_REQUIREMENT';
            return state;
        case SAVE_MAP:
            state.saveMap = action.data;
            return state;
        case CLEAR_MAP_EVENT:
            state.event = '';
            state.jiraDetails = '';
            return state;
        case CLEAR_MAP_DATA:
            state.treeData = {
                redrawTree: true,
                tree: []
            };
            state.grid = {
                sortedRows: [],
                rows: [],
                columns: [],
                currentPage: 1,
                isPaginationRequired: true,
                size: MAP_GRID_PAGINATION.size,
                totalCount: 0,
                isLastPage: true,
                isFirstPage: true,
                offset: 0,
                paginationOptions: MAP_GRID_PAGINATION
            };
            state.mapData = {};
            state.treeMap = {};
            state.saveMap = {};
            return state;
        case SORT_MAP_TC_GRID:
        case SORT_MAP_REQ_GRID:
            state.event = FETCH_GRID_SUCCESS;
            state.grid = GridUtil.manageSort(action.data, state.grid);
            return state;
        default:
            return state;
    }
}

function parseExternalRequirementXml(node) {
    try {
        if (!node.html()) {
            return '';
        }

        let items = node.children('channel').children('item');
        // let urlPrefix = (node.children('channel').children('link').html() || '') + '/secure/attachment';
        let urlPrefix = '';
        if (node.children('channel').length) {
            let link = node.children('channel').children('link');
            urlPrefix = link ? link.text() || (link[0].nextSibling.nodeValue || '').trim() : '';
        }
        urlPrefix += '/secure/attachment';
        let html = '';
        let temp, nodeName, elemHTML, escapeHTML, unescapeHTML;
        if (items.length) {
            items.children().each((index, elem) => {
                nodeName = (elem.nodeName || '').toLowerCase();
                elemHTML = (jQuery(elem).html() || '').trim();
                escapeHTML = _.escape(elemHTML);
                unescapeHTML = _.unescape(elemHTML);
                temp = '';
                if (nodeName) {
                    switch (nodeName) {
                        case 'title':
                            html += `<p><font size="16" color="#60AFFE"><b>${escapeHTML}</b></font><p/><br/><br/>`;
                            break;
                        case 'link':
                            html += `<a href="${elemHTML}" target="_blank"><u>${elemHTML}</u></a>`;
                            break;
                        case 'summary':
                            html += `<font color="#60AFFE"><b>${nodeName}</b></font><br/>${escapeHTML}<br/><br/>`;
                            break;
                        case 'project':
                        case 'description':
                        case 'environment':
                        case 'key':
                        case 'type':
                        case 'priority':
                        case 'status':
                        case 'resolution':
                        case 'assignee':
                        case 'reporter':
                        case 'label':
                        case 'created':
                        case 'updated':
                        case 'version':
                        case 'fixVersion':
                        case 'due':
                        case 'votes':
                        case 'watches':
                            html += `<font color="#60AFFE"><b>${nodeName}</b></font><br/>${unescapeHTML}<br/><br/>`;
                            break;
                        case 'timeoriginalestimate':
                            html += `<font color="#60AFFE"><b>time original estimate</b></font><br/>${unescapeHTML}<br/><br/>`;
                            break;
                        case 'timeestimate':
                            html += `<font color="#60AFFE"><b>time estimate</b></font><br/>${unescapeHTML}<br/><br/>`;
                            break;
                        case 'timespent':
                            html += `<font color="#60AFFE"><b>time spent</b></font><br/>${unescapeHTML}<br/><br/>`;
                            break;
                        case 'aggregatetimeoriginalestimate':
                            html += `<font color="#60AFFE"><b>aggregate time original estimate</b></font><br/>${unescapeHTML}<br/><br/>`;
                            break;
                        case 'aggregatetimeremainingestimate':
                            html += `<font color="#60AFFE"><b>aggregate time remaining estimate</b></font><br/>${unescapeHTML}<br/><br/>`;
                            break;
                        case 'aggregatetimespent':
                            html += `<font color="#60AFFE"><b>aggregate time spent</b></font><br/>${unescapeHTML}<br/><br/>`;
                            break;
                        case 'comments':
                            temp = getCommentChildren(elem);
                            html += `<font color="#60AFFE"><b>${nodeName}</b></font><br/>${temp}`;
                            break;
                        case 'issuelinks':
                            temp = getIssueChildren(elem);
                            html += `<font color="#60AFFE"><b>${nodeName}</b></font><br/>${temp}<br/><br/>`;
                            break;
                        case 'attachments':
                            temp = getAttachmentChildren(elem, urlPrefix);
                            html += `<font color="#60AFFE"><b>${nodeName}</b></font><br/>${temp}<br/><br/>`;
                            break;
                        case 'subtasks':
                            temp = getSubtaskChildren(elem);
                            html += `<font color="#60AFFE"><b>${nodeName}</b></font>${temp}<br/><br/>`;
                            break;
                        case 'customfields':
                            html += parseExternalRequirementXmlForCustomField(elem);
                            break;
                        default:
                            html += `<font color="#60AFFE"><b>${nodeName}</b></font><br/>${unescapeHTML}<br/><br/>`;
                            break;
                    }
                }
            });
        } else {
            html = node[0].outerHTML;
        }

        return html;
    } catch (err) {
        console.log('error in formatting jira requirement', err);
        return '';
    }
}

function parseExternalRequirementXmlForCustomField(node) {
    try {
        let html = '<font color="#60AFFE"><b>Custom fields </b></font><br/>';
        let customfieldname, text, key;
        jQuery(node).children('customfield').each((index, elem) => {
            key = elem.getAttribute('key') || '';
            if ('com.atlassian.jira.plugin.system.customfieldtypes:cascadingselect' === key ||
                'com.atlassian.jira.plugin.system.customfieldtypes:multiversion' === key ||
                'com.atlassian.jira.plugin.system.customfieldtypes:version' === key) {

                // we dont' have sufficient information to display. Dropping them from display.

                html += '';

                // </customfield>
                // <customfield id="customfield_10021" key="com.atlassian.jira.plugin.system.customfieldtypes:labels">
                // <customfieldname>Custom Label</customfieldname>
                // <customfieldvalues>
                // <label>custom</label>
                // <label>field</label>
                // </customfieldvalues>
                // </customfield>
            } else if ('com.atlassian.jira.plugin.system.customfieldtypes:url' === key) {
                customfieldname = jQuery(elem).children('customfieldname').html();
                html += `<font color='#60AFFE'><b>${customfieldname}</b></font><br/>`;
                jQuery(elem).children('customfieldvalues').children().each((cfIndex, cfElem) => {
                    text = jQuery(cfElem).text() || '';
                    if (!text) {
                        text = cfElem.childNodes[0].nodeValue || '';
                        // check for "CDATA" only if it is nodeValue, and not part of text (signifying it was a comment node)
                        if (-1 !== text.indexOf('CDATA')) {
                            text = text.replace(/CDATA/gi, '').slice(2, -2);
                        }
                    }
                    html += `<a href="${text}" target="_blank"><u>${text}</u></a>`;
                });
            } else {
                customfieldname = jQuery(elem).children('customfieldname').html();
                html += `<font color='#60AFFE'><b>${customfieldname}</b></font><br/>`;
                jQuery(elem).children('customfieldvalues').children().each((cfIndex, cfElem) => {
                    text = jQuery(cfElem).text() || '';
                    if (!text) {
                        text = cfElem.childNodes[0].nodeValue || '';
                        // check for "CDATA" only if it is nodeValue, and not part of text (signifying it was a comment node)
                        if (-1 !== text.indexOf('CDATA')) {
                            text = text.replace(/CDATA/gi, '').slice(2, -2);
                        }
                    }
                    html += `${text}<br/>`;
                });
            }
            html += '<br/>';
        });
        return html;
    } catch (err) {
       // console.log('error in formatting jira requirement Custom Fields', err);
        return '';
    }
}
function getSubtaskChildren(node) {
    try {
        let html = '';
        let text;
        jQuery(node).children('subtask').each((index, elem) => {
            text = jQuery(elem).text() || '';
            html += `<br/>${text}`;
        });
        return html;
    } catch (err) {
      //  console.log('error in formatting jira requirement Sub tasks', err);
        return '';
    }
}

function getAttachmentChildren(node, urlPrefix) {
    try {
        let html = '';
        let id, name, fileUrl;
        jQuery(node).children('attachment').each((index, elem) => {
            id = elem.getAttribute('id') || '';
            name = elem.getAttribute('name') || '';
            fileUrl = `${urlPrefix}/${id}/${name}`;
            html += `<br/><a href="${fileUrl}" target="_blank">${name}</a>`;
        });
        return html;
    } catch (err) {
       // console.log('error in formatting jira requirement Attachment', err);
        return '';
    }
}

function getCommentChildren(node) {
    try {
        let html = '';
        let text;
        jQuery(node).children('comment').each((index, elem) => {
            text = jQuery(elem).text() || '';
            html += `<font color="#60AFFE"><b>comment</b></font><br/>${text}<br/><br/>`;
        });
        return html;
    } catch (err) {
      //  console.log('error in formatting jira requirement Comment', err);
        return '';
    }
}

function getIssueChildren(node) {
    try {
        let html = '';
        let nodeName, val;
        jQuery(node).children('issuelinktype').each((index, elem) => {
            nodeName = (elem.nodeName || '').toLowerCase();
            val = jQuery(elem).children('outwardlinks').children('issuelink').children('issuekey').html() || '';
            html += `<br/>${nodeName}<br/>${val}`;
        });
        return html;
    } catch (err) {
       // console.log('error in formatting jira requirement Issue Links', err);
        return '';
    }
}

function getTreeNodes(treeData) {

    return Array.isArray(treeData) && treeData.length ? treeData.map(level => ({
        'a_attr': {
            'data-id': level.id,
            'data-releaseid': level.releaseId,
            'data-type': level.type,
            'data-desc': level.description,
            'data-name': level.name,
            'class': 'zee-tcr-anchor'
        },
        'text': level.name,
        'children': getTreeNodes(level.categories)
    })) : [];
}

function changeLink(rows, state) {
  let defectUrl = (state.defectSystem || {}).url || '';
  if ('/' !== defectUrl.charAt(defectUrl.length - 1)) {
    defectUrl += '/';
  }
  defectUrl += 'browse/';

  return (rows || []).map(item => {
    item.url = JIRA_REQUIREMENT_TYPE === item.requirementType ? (defectUrl + item.externalId) : item.url;
    return item;
  });
}
