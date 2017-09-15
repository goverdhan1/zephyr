import { Injectable } from '@angular/core';
import {VISIBLE_RELEASE_STATUS} from '../constants/application.constants';
import {ZephyrStore} from '../../store/zephyr.store';
declare var jQuery: any, _:any, moment:any;

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

@Injectable()
export class UtililtyFunctions {
    scrollbarWidth:number = null;

    //funtion to style status dropDown options
    statusSelectTemplateFunction (data , container) {
        if (data.element && data.element.dataset && data.element.dataset.color) {
            container.setAttribute('style', 'color:' + data.element.dataset.color);
            container.setAttribute('title', data.text);

        }
        container.innerHTML = data.text;
        return container;
    }

    //funtion to style status dropDown selected option
    statusSelectSelectedOptionTemplateFunction (data , container) {
        let newContainer = container;
        if (data.element && data.element.dataset && data.element.dataset.color && container && container[0]) {
            newContainer = jQuery('<span>'+data.text +'</span>')[0];
            newContainer.setAttribute('style', 'color:' + data.element.dataset.color);
        }
        if (container && container[0]) {
           newContainer.innerHTML = data.text;
        }
        return newContainer;
    }

    //funtion to style status lozenges
    styleObjectLozenges (color) {
    	return styleObjectLozenge(color);
    }

    usersAllocatedToParticularProject(allUsers , projectsUsersMapping , projectId) {
        allUsers = allUsers ? JSON.parse(JSON.stringify(allUsers)) : [];
        projectsUsersMapping = projectsUsersMapping || {};
        let usersAllocatedToCurrentProject = [];
            Object.keys(projectsUsersMapping).forEach(function (key) {
                    if (key == projectId) {
                      usersAllocatedToCurrentProject = projectsUsersMapping[key];
                    }
                 });

         let filteredArray = allUsers.filter((user) => {
                              return usersAllocatedToCurrentProject.filter(id => {
                                  return (user.id == id); //second condition doesn't shows hidden cycle
                              })[0];
                          });
        return filteredArray;
    }

    isUserManager(user) {
        if(user) {
            let isManager = (user.roles || []).filter((role) => 'manager' === role.name);
            return isManager.length;
        }
        return false;
    }

    checkIfReleaseIsHidden(release) {
        if(release && release.status != VISIBLE_RELEASE_STATUS) {
            return true;
        }
        return false;
    }

    getUserMap(gloablUsers, memebersArray) {
      let userMap = [];
      memebersArray.forEach(memeberObject => {
        gloablUsers.forEach(userObject => {
          if (userObject.id == memeberObject.userId) {
            let user = { id:userObject.id , fullname : userObject.firstName + ' ' + userObject.lastName, roles:userObject.roles};
            userMap.push(user);

          }
        });
      });
      return userMap;
    }

    timeStampToMmDdYy(value) {
      let _dateVal = new Date(value);
      let month = (_dateVal.getMonth()  + 1).toString();
      if(month.length == 1)
        month = '0'+month;
      let date = _dateVal.getDate().toString();
      if(date.length == 1)
        date = '0'+date;
      return month + '/' + date + '/' +
        _dateVal.getFullYear().toString().substr(2,2);
    }

    getScrollbarWidth() {
        if(this.scrollbarWidth) {
          return this.scrollbarWidth;
        }
        let outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.width = '100px';
        outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

        document.body.appendChild(outer);

        let widthNoScroll = outer.offsetWidth;
        // force scrollbars
        outer.style.overflow = 'scroll';

        // add innerdiv
        let inner = document.createElement('div');
        inner.style.width = '100%';
        outer.appendChild(inner);

        let widthWithScroll = inner.offsetWidth;

        // remove divs
        outer.parentNode.removeChild(outer);

        return this.scrollbarWidth = (widthNoScroll - widthWithScroll);
    }
    checkAppAccessPermission(appId) {
        let permissionList = ZephyrStore.getZephyrStore().getState().loggedInUser.accessibleAppIds;
        return permissionList ? permissionList.indexOf(appId) >= 0 : false;
    }

    getAllAccessibleApps(columns) {
        let permissionList = ZephyrStore.getZephyrStore().getState().loggedInUser.accessibleAppIds;
        columns.group.forEach(group => {
            group.permission = !(permissionList.indexOf(group.appId) < 0);
            if(group.items) {
                group.items.forEach(item => {
                    if(permissionList.indexOf(item.appId) < 0) {
                        item.permission = false;
                    } else {
                        item.permission = true;
                    }
                });
            }
        });
        return columns;
    }

    /**
     * Shift the string by offset
     */
    shiftString(str, offset) {
        if(!str) {
            return str;
        }
        let arr = [];
        for(let i = 0; i < str.length; i++) {
            arr.push(str.charCodeAt(i) + offset);
        }
        let value = '';
        arr.forEach((chr) => {
            value += String.fromCharCode(chr);
        });
        return value;
    }

    // get parsed date from date number
    parseDate(field) {
        let momentField = moment(field);
        return momentField._isAMomentObject ? `${months[momentField.get('M')]} ${momentField.get('D')}, ${momentField.get('y')}` : field;
    }
    parseExternalRequirementXml(node) {
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

function styleObjectLozenge (color) {
 return  'color:' + color +
 		 ';border:' +'1px solid ' + color +
 		 ';width:' + '80px'+
         ';min-width:' + '80px'+
 		 ';border-radius:' + '3px'+
 		 ';padding:' + '0px 3px 0px 3px'+
         ';text-overflow: ellipsis'+
         ';overflow: hidden'+
         ';display:inline-block';
}
