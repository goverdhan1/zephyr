import {Component, Output, Input, AfterViewInit, EventEmitter, OnInit, OnChanges, Inject, ChangeDetectorRef} from '@angular/core';
import {GlobalAction} from '../../../../actions/global.action';
import {ZephyrStore} from '../../../../store/zephyr.store';
import {ToastrService} from '../../../../services/toastr.service';
import {Resizable} from '../../../../utils/scripts/resizable';

declare var jQuery: any, _: any;

@Component({
	selector: 'tree-view',
	templateUrl: 'tree.html',
	providers: [GlobalAction]
})

export class TreeComponent implements OnChanges, AfterViewInit {
	treeView: any;
	@Output() onCopyNode: EventEmitter<any> = new EventEmitter();
	@Output() onTreeNodeDragAndDrop: EventEmitter<any> = new EventEmitter();
	@Output() onTreeNodeDrop: EventEmitter<any> = new EventEmitter();
	@Output() onTreeNodeDrag: EventEmitter<any> = new EventEmitter();
	@Output() onTreeNodeSelect: EventEmitter<any> = new EventEmitter();
	@Output() onTreeNodeDeselect: EventEmitter<any> = new EventEmitter();
	@Output() onTreeNodeClick: EventEmitter<any> = new EventEmitter();
	@Output() onToggleNode: EventEmitter<any> = new EventEmitter();
	@Output() onDragEnd: EventEmitter<any> = new EventEmitter();
	@Output() clearTreeUpdate: EventEmitter<any> = new EventEmitter();
	@Output() treeInstance: EventEmitter<any> = new EventEmitter();
  // @Output() treeStateUpdate: EventEmitter<any> = new EventEmitter();
	@Input() options; //additional JSTress plugins to be used
	@Input() conditionalSelectFunction;
	@Input() treeData;
	@Input() removeFromDefault = [];
	@Input() showContextMenu;
	@Input() contextMenuItems;
	@Input() showFilter = true;
	@Input() treeContext: string = '';
	@Input() createNode;
	@Input() deleteNode;
	@Input() renameNode;
	@Input() selectedNodes = {};
	@Input() openAll = false;
	@Input() threeStateCheckbox = true;
	@Input() openID;
	@Input() selectID;
	@Input() forceSelect;
	@Input() openSelect;
	@Input() treeClass = '';
	@Input() dragCb = undefined;
	@Input() checkCb = undefined;
	@Input() showCount = false;
	@Input() showStar = false;
	@Input() doDirtyCheck = false;
	@Input() selectOnRedraw = false;
	@Input() dropExternal = {};
	@Input() doAllocate = {};
	@Input() selectFilter = undefined;
	@Input() alwaysCopy = false;
	@Input() sortKey = '';
	@Input() secondarySort = false;
  	@Input() showDocker = true;
  	@Input() sectionTitle = '';
  	hoverCollapsed = false;
  	treeDocked;
	private isTriggerCheck = false;
	private is_state_set = false;
	private showMenu = false;
	private selectedNode;
	private contextClick = false;
	private oldTreeData;
	private defaultPluginOptions = ['search', 'dnd', 'types', 'contextmenu', 'sort']; //defuault jsTree plugin used
	private _zephyrStore;
	private debounce;
	private dndDebounce;
	private isRedraw = false;
	private isRedrawSelect = false;
	private treeState;
	private forceSelectId;
	private maxWaitForTree = 20;

	constructor(private globalAction: GlobalAction, @Inject(ToastrService) private toastrService:ToastrService, private cdr: ChangeDetectorRef) {
		this._zephyrStore = ZephyrStore.getZephyrStore();
	}
	ngOnChanges(changedNode) {
		if(!this.treeData) {
			return;
		}
		this.treeInstance.emit({tree: '#zephyr-tree' + this.treeContext, context: '#tree-context-menu' + this.treeContext});
		this.treeView = jQuery('#zephyr-tree' + this.treeContext);

		Object.keys(changedNode).forEach(item =>  {
			switch (item) {
				case 'createNode':
					if (!(this.treeView.length && this.createNode && this.createNode.hasOwnProperty('newNode') &&
						this.createNode.newNode.text || '').trim()) {
						return;
					}
					this.treeView.jstree('create_node', this.createNode.parentNode, this.createNode.newNode, this.createNode.pos,
						this.createNode.callback, this.createNode.isLoaded);
					break;
				case 'renameNode':
					if (!(this.treeView.length && this.renameNode && this.renameNode.hasOwnProperty('nodeName') &&
						this.renameNode.nodeName || '').trim()) {
						return;
					}
					this.treeView.jstree('rename_node', this.renameNode.selectedNode, this.renameNode.nodeName);
					break;
				case 'deleteNode':
					if (this.treeView.length) {
						this.treeView.jstree('delete_node', this.deleteNode);
					}
					break;
        		case 'openSelect':
          			break;
				case 'selectedNodes':
					if (this.treeView.length) {
						this.checkNodes(this.treeView.jstree());
					}
					break;
				case 'openID':
					if (this.treeView.length) {
						this.openNode(this.openID);
					}
					break;
				case 'selectID':
					if (this.treeView.length) {
						this.selectNode(this.selectID);
					}
					break;
				default:
					if (this.debounce)  {
						clearTimeout(this.debounce);
					}
					this.debounce = setTimeout(() => {
						this.debounce = null;
						let treeData = JSON.stringify(this.treeData);
						if (JSON.stringify(this.oldTreeData) !== treeData || this.treeData.refreshTree) {
							this.oldTreeData = JSON.parse(treeData);
							this.treeData.refreshTree = false;
							this.oldTreeData.refreshTree = false;
							this.renderTree(this.oldTreeData);
						}
					}, 500);
					break;
			}
		});
	}

  	ngAfterViewInit() {
		this.treeDocked = this.showDocker;
		this.hoverCollapsed = !this.showDocker;
		this.cdr.markForCheck();

  	}

	toggleTreeMenu() {
		this.hoverCollapsed = true;
		this.treeDocked = !this.treeDocked;
		this.cdr.markForCheck();
	}
	treeDataPresent(treeData) {

		// write a better logic for this, empty tree to be valid input

		if (Array.isArray(treeData)) {
			return treeData.length;
		} else if (treeData instanceof Function) {
			return true;
		}
		return false;
	}
	checkNodes(thisTree) {
		if (thisTree.uncheck_all instanceof Function && thisTree.check_node instanceof Function) {
			this.isTriggerCheck = true;
			thisTree.uncheck_all();

			let partialCheckTree = [];
			this.treeView.find('.jstree-anchor').each((index, item) => {
				let node = jQuery(item).data('id');
				let checkState = this.selectedNodes[node] || '';
				if ('check' === checkState) {
					jQuery(item).removeClass('show-tree-checked');
					thisTree.check_node(jQuery(item));
				} else if ('partial' === checkState) {
					jQuery(item).removeClass('show-tree-checked');
					partialCheckTree.push(node);
				} else if ('uncheck' === checkState) {
					jQuery(item).addClass('show-tree-checked');
					if ('-tcrBrowse' === this.treeContext) {
						thisTree.uncheck_node(jQuery(item));
					}
				}
			});
			this.isTriggerCheck = false;

			// allow jstree onUncheck's and onCheck's internal timeout(50ms) to run before proceeding
			setTimeout(() => {
				this.treeView.find('.jstree-anchor').each((index, item) => {
					let thisNode = jQuery(item).children('.jstree-checkbox');
					let node = jQuery(item).data('id');
					if (-1 !== partialCheckTree.indexOf(node)) {
						if (0 === Number(node) && !thisNode.length) {
							thisNode = this.treeView.children('ul').children('li').children('a').children('.jstree-checkbox');
						}
						let parentNodes = thisNode.parents('ul.jstree-children').siblings('.jstree-anchor').children('.jstree-checkbox');
						thisNode.add(parentNodes).addClass('jstree-undetermined');
					}
				});
			}, 51);

		}
	}

	refresh() {
    	this.treeView.jstree(true).refresh();
  	}

	insertIcon(tree) {
		for(let key in tree) {
		  if(tree[key] != null) {
			tree[key].icon = 'fa fa-folder-open color-level1';
			this.insertIcon(tree[key].children);
		  }
		}
	}
	getState(id) {
		if (!(this.treeView.jstree()._model && this.treeView.jstree()._model.data && Object.keys(this.treeView.jstree()._model.data).length)) {
			return [];
		}
		let data = this.treeView.jstree()._model.data;
		let node = Object.keys(data).filter(item => data[item].a_attr && Number(id) === data[item].a_attr['data-id']);
		if (Array.isArray(node) && node.length) {
			let returnData = data[node[0]].parents.concat(node[0]).sort();
			returnData.shift();
			returnData.unshift(this.treeView.jstree().element.children().children().prop('id'));
			return returnData;
		}
		return ['#'];
	}
	renderTree(treeData) {
		let pluginOptions = this.options ?  this.defaultPluginOptions.concat(this.options) : this.defaultPluginOptions;

    	this.removeFromDefault.forEach(item => {
			let index = pluginOptions.indexOf(item);
			if (-1 !== index) {
				pluginOptions.splice(index, 1);
			}
		});
		if(treeData.redrawTree) {
			this.treeView.jstree('destroy');
		}
		if(!treeData.redrawTree && this.treeView.hasClass('jstree')) {
			let state = this.treeView.jstree().get_state();
			let treeState = state.core || {};

			let openedNode = (treeState.open || []).map(item => (this.treeView.jstree().get_node(item).a_attr || {})['data-id']);

			let selectedNode = (treeState.selected || []).map(item => (this.treeView.jstree().get_node(item).a_attr || {})['data-id']);

			this.treeState = {openedNode, selectedNode};
			this.forceSelectId = this.forceSelect;

			this.is_state_set = true;
			this.treeView.jstree().settings.core.data = treeData.tree;
			this.isRedraw = true;
			if (Array.isArray(selectedNode) && selectedNode.length && !this.forceSelectId) {
				this.isRedrawSelect = true;
			}
			this.treeView.jstree(true).refresh();
			this.treeView.jstree().redraw(true);

			return;
		}
		let conditionalselect = this.conditionalSelectFunction;
		let jstreeConfiguration = {
			'core': {
				'force_text': true,
				'data': treeData.tree,
				'check_callback' : this.checkCb || this.onDnD
			},
			'contextmenu': {
				'show_at_node': false,
				'select_node': true,
				'items': this.contextMenuItems
			},
			'conditionalselect' : ((node, event) => conditionalselect instanceof Function ? conditionalselect(node) : true),
			'checkbox': {
				'whole_node': false,
				'tie_selection': false,
				'three_state': this.threeStateCheckbox
			},
			'dnd': {
				is_draggable: this.dragCb || (node => node[0].a_attr['data-id']),
				always_copy: this.alwaysCopy,
				check_while_dragging: true
			},
			'sort': (a, b) => {
				let aNode = this.treeView.jstree().get_node(a);
				let bNode = this.treeView.jstree().get_node(b);

				if (this.sortKey) {
					// if sortKey present, check if it is available in the data of the node.
					if (aNode.hasOwnProperty('data') && aNode.data.hasOwnProperty(this.sortKey) && bNode.hasOwnProperty('data') && bNode.data.hasOwnProperty(this.sortKey)) {
						let aKey = aNode.data[this.sortKey];
						let bKey = bNode.data[this.sortKey];
						if (_.isNumber(aKey) && _.isNumber(bKey)) {
							// if both values are same and secondarySort is true, sort by alphabetically
							return aKey === bKey ? this.secondarySort ? this.sort(aNode, bNode) : 1 : aKey > bKey ? 1 : -1;
						}
						if (_.isString(aKey) && _.isString(bKey)) {
							// if both values are same and secondarySort is true, sort alphabetically
							return aKey.localeCompare(bKey) || (this.secondarySort ? this.sort(aNode, bNode) : 1);
						}
						return 1;
					}
					return 1;
				}

				// if sort key is not specified, sort alphabetically
				return this.sort(aNode, bNode);
			},
			'plugins' : pluginOptions
		};
		if(this.treeView.closest('.tree-tcr').length) {
			//this.insertIcon(treeData.tree);
			jstreeConfiguration['types'] = {
				'default': {
					'icon': 'fa fa-folder-o color-level1'
				}
			};
		}

		// attach ready and loaded before initializing the tree
		this.treeView.on('loaded.jstree', (event, data) => {
			data.instance.element.find('li a').each(function () {
				jQuery(this).addTouch();
			});
			if (Object.keys(this.selectedNodes).length && data.instance.settings && data.instance.settings.plugins.indexOf('checkbox') > -1) {
				data.instance.open_all();
				this.checkNodes(data.instance);
				data.instance.close_all();
			}
			if (this.openAll && data.instance.open_all instanceof Function) {
				data.instance.open_all();
			}
		}).on('ready.jstree', (e, data) => {

			// not catching openSelect anywhere else because this is required ONLY on first load of tree.

			if (this.openSelect) {
				this.openNode({silent: false, node: this.openSelect});
				this.selectNode({silent: false, node: this.openSelect, showMenu: true, preventRedraw: true});
			} else {
				if (this.openID) {
					this.openNode(this.openID);
				}
				if (this.selectID) {
					this.selectNode(this.selectID);
				}
			}

			if (this.showCount || this.showStar) {
				data.instance.element.find('.jstree-anchor').each((index, target) => {
					let anchorData = jQuery(target).data();
					if (this.showCount && anchorData.hasOwnProperty('count')) {
						jQuery(target).append(`<div class="number-lozenge">${anchorData.count}</div>`);
					}
					if (this.showStar) {
						if (anchorData.star === 'selected') {
							jQuery(target).append(`<div class="tree-star selected-star-image"></div>`);
						} else if (anchorData.star === 'unselected') {
							jQuery(target).append(`<div class="tree-star unselected-star-image"></div>`);
						}
					}
				});
			}
			setTimeout(() => {
				this.addExternalDrop(true);
			}, 51);
		}).on('redraw.jstree', (e, data) => {
			setTimeout(() => {
				if (this.showCount || this.showStar) {
					this.treeView.find('.jstree-anchor').each((index, target) => {
						let anchorData = jQuery(target).data();
						if (this.showCount && anchorData.hasOwnProperty('count')) {
							jQuery(target).append(`<div class="number-lozenge">${anchorData.count}</div>`);
						}
						if (this.showStar) {
							if (anchorData.star === 'selected') {
								jQuery(target).append(`<div class="tree-star selected-star-image"></div>`);
							} else if (anchorData.star === 'unselected') {
								jQuery(target).append(`<div class="tree-star unselected-star-image"></div>`);
							}
						}
					});
				}
				this.addExternalDrop(true);
			}, 51);

			if (!this.isRedraw) {
				return;
			}

			let openedNode = (this.treeState || {}).openedNode;
			let selectedNode = (this.treeState || {}).selectedNode;
			this.isRedraw = false;
			this.is_state_set = false;
			if (this.openAll) {
				data.instance.open_all();
			} else {
				this.setOpenNode(openedNode, 0);
			}

			data.instance.deselect_all(true);
			if (this.forceSelectId) {
				this.selectNode({silent: false, node: this.forceSelectId});
			} else {
				this.selectNode({silent: true, node: selectedNode[0]});
			}
			this.forceSelectId = null;
		}).jstree(jstreeConfiguration).on('open_node.jstree', (e, data) => {
      		setTimeout(() => {
        		jQuery(`#zephyr-tree${this.treeContext} .jstree-leaf .jstree-ocl`).off('click.fetch').on('click.fetch', ev => {
          			jQuery(ev.target).next('.jstree-anchor').trigger('click');
        		});
      		}, 100);

      		this.addExternalDrop();
			if (this.is_state_set) {
				return;
			}
			this.fetchNodeInfo(e, data);
			if(data.instance.element.closest('.tree-tcr').length) {
				data.instance.set_icon(data.node, 'fa fa-folder-open-o color-level1');
			}
			if (data.instance.settings && data.instance.settings.plugins.indexOf('checkbox') > -1) {
				this.checkNodes(data.instance);
			}
			if (this.showCount || this.showStar) {
				data.instance.element.find('.jstree-anchor').each((index, target) => {
					let anchorData = jQuery(target).data();
					if (this.showCount && anchorData.hasOwnProperty('count')) {
						jQuery(target).append(`<div class="number-lozenge">${anchorData.count}</div>`);
					}
					if (this.showStar) {
						if (anchorData.star === 'selected') {
							jQuery(target).append(`<div class="tree-star selected-star-image"></div>`);
						} else if (anchorData.star === 'unselected') {
							jQuery(target).append(`<div class="tree-star unselected-star-image"></div>`);
						}
					}
				});
			}
		}).on('close_node.jstree', (e, data) => {
			this.addExternalDrop();
			if (this.is_state_set) {
				return;
			}
			this.fetchNodeInfo(e, data);
			if(data.instance.element.closest('.tree-tcr').length) {
				data.instance.set_icon(data.node, 'fa fa-folder-o color-level1');
			}

			// close all child nodes
			let allChild = Array.isArray(data.node.children_d) ? data.node.children_d : [];
			allChild.forEach(item => {
				data.instance.close_node(item);
			});

			if (data.instance.settings && data.instance.settings.plugins.indexOf('checkbox') > -1) {
				this.checkNodes(data.instance);
			}
		}).on('copy_node.jstree', (e, data) => {
			if (this.promptForSave()) {
				return;
			}

			let sourceNodeId = data.node.a_attr['data-id'];
	        let sourceNodeReleaseId = data.node.a_attr['data-releaseid'];

			let parent = data.new_instance.get_node(data.parent);

			let targetNode = data.position ? data.new_instance.get_node(parent.children[data.position - 1]) : parent;

			let targetNodeId = (targetNode.a_attr || {})['data-id'] || 0;

			let targetNodeReleaseId = (targetNode.a_attr || {})['data-releaseid'];
			if (!sourceNodeId || !sourceNodeReleaseId || !String(targetNodeId) || !targetNodeReleaseId ) {
				return;
			}

			this.onCopyNode.emit({sourceNodeId, sourceNodeReleaseId, targetNodeId, targetNodeReleaseId});
		}).on('check_node.jstree', (e, data) => {
			// to prevent infinite loop
			if (this.isTriggerCheck) {
				return;
			}

			// child nodes
			let selectedNode = data.node.children_d.map(item => data.instance._model.data[item].a_attr['data-id']);

			let selectedTreeNode = JSON.parse(JSON.stringify(data.node.children_d));

			// add current node
			selectedNode.push(data.node.a_attr['data-id']);
			selectedTreeNode.push(data.node.id);

			this.selectedNodes[data.node.a_attr['data-id']] = 'check';

			this.contextClick = true;
			data.instance.deselect_all();
			data.instance.select_node(data.node.id);
			setTimeout(() => {
				this.contextClick = false;
			}, 51);

			let type = e.type;

			let parents = JSON.parse(JSON.stringify(data.node.parents));
			parents = parents.filter(item => {
				let node = data.instance.get_node(item);
				return node.a_attr && node.a_attr['data-id'];
			});

			let parentId = parents.map(item => data.instance._model.data[item].a_attr['data-id']);
			parentId.push(0);

			let id = data.node.id;
			let tree = this.treeView;
			this.onTreeNodeSelect.emit({selectedNodes: this.selectedNodes, parents, selectedNode, type, selectedTreeNode, id, tree, parentId});
		}).on('uncheck_node.jstree', (e, data) => {

			// to prevent infinite loop
			if (this.isTriggerCheck) {
				return;
			}

			// child nodes
			let selectedNode = data.node.children_d.map(item => data.instance._model.data[item].a_attr['data-id']);
			let selectedTreeNode = JSON.parse(JSON.stringify(data.node.children_d));

			// add current node
			selectedNode.push(data.node.a_attr['data-id']);
			selectedTreeNode.push(data.node.id);

			this.selectedNodes[data.node.a_attr['data-id']] = 'uncheck';

			this.contextClick = true;
			data.instance.deselect_all();
			data.instance.select_node(data.node.id);
			setTimeout(() => {
				this.contextClick = false;
			}, 51);

			let type = e.type;

			let parents = JSON.parse(JSON.stringify(data.node.parents));
			parents = parents.filter(item => {
				let node = data.instance.get_node(item);
				return node.a_attr && node.a_attr['data-id'];
			});

			let id = data.node.id;
			let tree = this.treeView;
			let parentId = parents.map(item => data.instance._model.data[item].a_attr['data-id']);
			parentId.push(0);

			this.onTreeNodeSelect.emit({selectedNodes: this.selectedNodes, parents, selectedNode, type, selectedTreeNode, id, tree, parentId});
			delete this.selectedNodes[data.node.a_attr['data-id']];
		}).on('select_node.jstree', (e, data) => {
			if  (this.contextClick && this.selectedNode === data.node.id) {
				return;
			}
			data.instance.element.find('.node-clicked-sibling').remove();
			jQuery('<div class="node-clicked-sibling"></div>').insertBefore(data.instance.element.find('li[id=' + data.node.id + ']'));

			let previousSelected = this.selectedNode;
			this.selectedNode = data.node.id;

			if (this.is_state_set || this.isRedrawSelect) {
				this.isRedrawSelect = false;
				return;
			}
			if (this.promptForSave()) {
				this.selectNode({node: data.instance.get_node(previousSelected).a_attr['data-id'], silent: true});
				return;
			}
			let node = data.node;
			let selectedNode = [node.id];
			let selectedNodeId = node.a_attr['data-id'];
			let releaseId = node.a_attr['data-releaseId'];
			let nodeData = node.a_attr['data-node'];
			let cycleId = node.a_attr['data-cycleId'];

			let parents = node.parents;
			let bCrumbData = this.getBreadCrumbData(parents, node);

			let isChecked:any = false;
			if (data.instance.is_checked instanceof Function) {
				isChecked = data.instance.is_checked(data.node.id) ? 'check' : 'uncheck';
			}
			if (data.instance.is_undetermined instanceof Function) {
				isChecked = data.instance.is_undetermined(data.node.id) ? 'partial' : isChecked;
			}
			let level = data.instance.get_node(node.id, true).attr('aria-level');

			let showMenu = this.showMenu;

			let type = node.a_attr['data-type'];

			parents = parents.filter(item => {
				let node = data.instance.get_node(item);
				return node.a_attr && node.a_attr['data-id'];
			});
			let parenttype = node.a_attr['data-parenttype'];
			this.onTreeNodeClick.emit({selectedNodeId, bCrumbData, selectedNode, isChecked, level, showMenu, type, releaseId, parents, nodeData, cycleId, parenttype, node});

			if (data.instance.settings && data.instance.settings.plugins.indexOf('checkbox') > -1) {
				this.checkNodes(data.instance);
			}
		}).on('deselect_all.jstree', (e, data) => {
			if (Array.isArray(data.node) && 1 === data.node.length && data.node[0] === this.selectedNode) {
				return;
			}
			this.selectedNode = undefined;
			data.instance.element.find('.node-clicked-sibling').remove();
			this.onTreeNodeDeselect.emit();
		});

		let treeSettings = this.treeView.jstree().settings;
		if (treeSettings && treeSettings.plugins.indexOf('dnd') > -1) {
			this.onDnDStop();
		}

		if (treeSettings && treeSettings.plugins.indexOf('search') > -1) {
			this.treeSearch(this.treeView);
		}

		// [ZEPHYR-15510] - removed disabling of jstree default right-click
		// this.disableRightClick(this.treeView);
        this.onNodeHover(this.treeView);
	}

	addExternalDrop(isReInit?) {
		if (!_.isEmpty(this.dropExternal)) {
			let dropOptions = this.dropExternal;
			let options = {
				greedy: true,
				tolerance: 'pointer',
				accept: dropOptions['accept'] || '*',
				drop: (event, ui) => {

					// get all values from "event" and "ui" before timeout so that context is correct
					let targetId = event.target.id;
					let ctrlKey = event.ctrlKey;
					let dragId = ui.helper.data('id').split(',');
					let isAllocate = ui.helper.data('allocate');
					let copy_drag = ui.helper.hasClass('copy_drag');

					setTimeout(() => {
						let isConfirmVisible = ui.helper.data('isConfirmVisible');
						if (!isConfirmVisible) {
							let node = this.treeView.jstree().get_node(targetId);

							let dropId = (node.a_attr || {})['data-id'] || '';
							let release = (node.a_attr || {})['data-releaseid'] || '';
							let operation = !isAllocate ? ctrlKey || copy_drag ? 'copy' : 'move' : 'allocate';

							let parentType = (node.a_attr || {})['data-parenttype'] || '';
							parentType = parentType || (node.li_attr || {})['data-parenttype'] || '';

							this.onDragEnd.emit({dragId, dropId, release, parentType, operation});
						}
					}, 2);
				}
			};
			if (dropOptions['scope']) {
                options['scope'] = dropOptions['scope'];
            }
			try {
			this.treeView.find('li').each((index, element) => {
				if (isReInit) {
					if (jQuery(element).droppable('instance')) {
						jQuery(element).droppable('destroy');
					}
					jQuery(element).droppable(options);
				} else {
					if (!jQuery(element).droppable('instance')) {
						jQuery(element).droppable(options);
					}
				}
			});
			} catch (err) {
				console.log('cannot attach droppable to tree', this.treeView.prop('id'));
			}
		}
	}

	setOpenNode(openedNode, count) {
		if (this.treeView.is(':visible')) {
			let data = this.treeView.jstree()._model.data;
			if (1 === Object.keys(data).length) {
				if (count >= this.maxWaitForTree) {
					this.toastrService.error('Sorry, we were not able to open the tree to your last opened state. Please open your nodes again.');
					return;
				}
				setTimeout(() => {
					this.setOpenNode(openedNode, ++count);
				}, 51);
			} else {
				openedNode.forEach(item => {
					this.openNode({silent: false, node: item});
				});
			}
		}
	}
	openNode(openID) {
		if (!openID.node) {
			return;
		}
		this.is_state_set = openID.silent;
		this.getState(openID.node).forEach(item => {
			this.treeView.jstree().open_node(item, () => {
				if (jQuery(`#${item}`).position() && this.treeView.offset()) {
					this.treeView.scrollTop(jQuery(`#${item}`).position().top - this.treeView.offset().top);
				}
			}, 0);
		});
		this.is_state_set = false;
	}
	selectNode(selectID) {
		if (!selectID ||!selectID.node) {
			return;
		}
		this.is_state_set = selectID.silent;
		this.showMenu = selectID.showMenu;
		setTimeout(() => {
			let model = this.treeView.jstree()._model;
			if (_.isObject(model) && _.isObject(model.data)) {
				let node = Object.keys(model.data).filter(item => {
					let nAttr = model.data[item].a_attr;
					let returnValue = nAttr && Number(nAttr['data-id']) === Number(selectID.node);
					let selectFilter = selectID.filter || this.selectFilter;
					if (selectFilter) {
						returnValue = returnValue && nAttr[selectFilter.a_attr] === selectFilter.value;
					}
					return returnValue;
				});
				if (Array.isArray(node) && node.length) {
					this.treeView.jstree().deselect_all();
					this.treeView.jstree().open_node(model.data[node[0]].parent);
					this.treeView.jstree().select_node(node[0]);
				} else if (this.selectOnRedraw && !selectID.preventRedraw) {
					this.is_state_set = false;
					node = Object.keys(model.data).filter(item => model.data[item].a_attr).sort();
					if (Array.isArray(node) && node.length) {
						this.treeView.jstree().deselect_all();
						this.treeView.jstree().open_node(model.data[node[0]].parent);
						this.treeView.jstree().select_node(node[0]);
					}
				}
			}
			this.showMenu = false;
			this.is_state_set = false;
		}, 101);
	}
	fetchNodeInfo(e, data) {
		let eventType = e.type;
		let targetElement = e.target;
		let selectedNodeId = data.node.a_attr['data-id'];
		let parentNode = (data.instance.get_node(data.node.parent).a_attr || {})['data-id'];

		this.onToggleNode.emit({eventType, selectedNodeId, targetElement, parentNode});
	}

	getBreadCrumbData(parents, node) {
		let parentsArray = [];
		parentsArray.push({
			text: node.a_attr['data-name'],
			id: node.a_attr['data-id'] || 0,
			type: node.a_attr['data-type'] ? 'node' : 'parent'
		});
		parents.forEach(parentId => {
			if (parentId !== '#') {
				let parent = this.treeView.jstree().get_node(parentId);
				parentsArray.push({
					text: parent.a_attr['data-name'] || '',
					id: parent.a_attr['data-id'] || 0,
					type: parent.a_attr['data-type'] ? 'node' : 'parent'
				});
			}
		});
		return parentsArray.reverse();
	}
	disableRightClick(treeView) {
		jQuery(treeView).off('contextmenu.jstree').on('contextmenu.jstree', ev => {
			ev.preventDefault();
		});
	}
	onNodeHover(treeView) {
		let node,
			contextMenuIcon = '<div class="contextMenuIcon fa fa-ellipsis-v"></div>',
			parentWidth = treeView.parent().width(),
			contextMenuEl = jQuery('.jstree-contextmenu'),
			contextMenuWidth,
			contextMenuHeight;

		if (this.showContextMenu) {
			treeView.off('click.context').on('click.context', '.contextMenuIcon', ev => {
				// timeout added to allow for jstree's internal timeout to run before proceeding with this
			  ev.preventDefault();
			  setTimeout(() => {
				if(!node) {
					return;
				}
				treeView.jstree().show_contextmenu(`#${node.children('a').prop('id')}`);
				treeView.find('.jstree-container-ul.jstree-contextmenu').removeClass('jstree-contextmenu');

				contextMenuEl = jQuery('.jstree-contextmenu');
				contextMenuWidth = contextMenuEl.width();
				contextMenuHeight = contextMenuEl.height();
				let pageX = ev.pageX,
				pageY = ev.pageY;

				if(pageX + contextMenuWidth >= jQuery(window).width()) {
					pageX = jQuery(window).width() - contextMenuWidth;
				} else if(pageY + contextMenuHeight >= jQuery(window).height()) {
					pageY = jQuery(window).height() - contextMenuHeight;
				}
				contextMenuEl.css({left: pageX, top: pageY});
				this.contextClick = false;
			  }, 201);
			  this.contextClick = true;
			});
		}
		treeView.on('hover_node.jstree', (ev, data) => {
			let parent = treeView.find(`#${data.node.id}`);

			treeView.find('.node-hover-sibling').remove();
			jQuery('<div class="node-hover-sibling"></div>').insertBefore(parent);

			if(parent.children('.contextMenuIcon').length || !this.showContextMenu) {
				return;
			}

			node = parent;
			treeView.find('.contextMenuIcon').remove();
			node.children('.jstree-anchor').append(contextMenuIcon);
		}).on('dehover_node.jstree', (ev, data) => {
			let parent = treeView.find(`#${data.node.id}`);
			parent.children('.jstree-anchor').children('.contextMenuIcon').remove();
			parent.prev('.node-hover-sibling').remove();
		});

	}
	onDnDStop() {
		jQuery(document).on('dnd_stop.vakata', (e, data) => {

			e.stopPropagation();

			let sourceNode = jQuery(data.element),
				targetNode = jQuery(data.event.target);

			if(targetNode.prop('tagName').toUpperCase() === 'I') {
				targetNode = targetNode.parent();
			}

			let sourceNodeId = sourceNode.data('id'),
				sourceNodeReleaseId = sourceNode.data('releaseid'),
				targetNodeId = targetNode.data('id'),
				targetNodeReleaseId = targetNode.data('releaseid');

			this.onTreeNodeDrop.emit();
			if (!targetNodeId) {
				let newTarget = this.treeView.jstree().get_node(targetNode.parent().prop('id'));
				if ('#' === newTarget.parent) {
					targetNodeId = 0;
					targetNodeReleaseId = sourceNodeReleaseId;
				}
			}

			if ('global' === targetNode.data('parenttype')) {
				targetNodeReleaseId = 0;
			}

			let obj = data.data.obj;
			let eventTarget = obj.closest('.jstree').prop('id') || obj.context.id;

			let treeId = this.treeView.prop('id');


			let dragEl = jQuery.vakata.dnd._get();
			let allcoate = dragEl.helper.data('allocate');

			if(!sourceNodeId || !(targetNodeId || 0 === targetNodeId) || (!allcoate && sourceNodeId === targetNodeId) || eventTarget !== treeId) {
				return;
			}

			let operation = !allcoate ? data.event.ctrlKey || sourceNode.data('alwayscopy') ? 'copy_node' : 'move_node' : 'allocate';

			if (this.dndDebounce)  {
				clearTimeout(this.dndDebounce);
			}
			this.dndDebounce = setTimeout(() => {
				this.dndDebounce = null;
				this.onTreeNodeDragAndDrop.emit({sourceNodeId, targetNodeId, sourceNodeReleaseId, targetNodeReleaseId, operation});
			}, 500);

		}).on('dnd_move.vakata', (e, data) => {

			e.stopPropagation();

			let sourceNode = jQuery(data.element),
				targetNode = jQuery(data.event.target);

			if(targetNode.prop('tagName').toUpperCase() === 'I') {
				targetNode = targetNode.parent();
			}

			let sourceNodeId = sourceNode.data('id'),
				sourceParentType = sourceNode.data('parenttype'),
				targetParentType = targetNode.data('parenttype'),
				sourceNodeReleaseId = sourceNode.data('releaseid');


			if(!sourceNodeId) {
				return;
			}

			let showAllocate = !_.isEmpty(this.doAllocate) && sourceParentType === this.doAllocate['source'];
			let isAllocate = showAllocate && targetParentType === this.doAllocate['target'];

			try {
				let dragEl = jQuery.vakata.dnd._get();
				let operation = !isAllocate ? dragEl.helper.find('.jstree-copy').is(':visible') || sourceNode.data('alwayscopy') ? 'Copying' : 'Moving' : 'Allocating';
				let dragIcon = dragEl.helper.find('.jstree-icon');
				jQuery(dragIcon[0].nextSibling).remove();
				dragEl.helper.data('allocate', isAllocate);
				dragIcon.after(`<span><strong>${operation}</strong><span> ${sourceNode.text()}</span></span>`);
			} catch (err) {
				console.log('Could not modify drag view', err);
			}
			this.onTreeNodeDrag.emit({sourceNodeId, sourceNodeReleaseId, showAllocate});
		});
	}
	onDnD(operation, node, node_parent, node_position, more) {
		if(!node_parent.parent) {
			return false;
		}

		return true;
	}
	treeSearch(treeView) {
		let timeoutId = null;

		jQuery('#tree-view-filter' + this.treeContext).off('keyup.tree').on('keyup.tree', ev => {
			if(timeoutId) {
				clearTimeout(timeoutId);
			}
			timeoutId = setTimeout(() => {
				treeView.jstree().search(ev.target.value);
			}, 250);
		});
	}
	sort(aNode, bNode) {
		if ('#' === aNode.parent && '#' === bNode.parent) {

			// if Parent type is available use that to sort
			let aParent = aNode.a_attr['data-parenttype'];
			let bParent = bNode.a_attr['data-parenttype'];
			if (aParent || bParent) {
				if ('import' === aParent) {
					return 'global' === bParent ? 1 : -1;
				}
				if ('global' === aParent) {
					return 'import' === bParent ? -1 : 1;
				}
				return -1;
			}

			// if root nodes, imported is at last and rest alphabetically
			if ('Imported' === aNode.text) {
				return 1;
			}
			if ('Imported' === bNode.text) {
				return -1;
			}
			return (aNode.text || '').localeCompare(bNode.text || '') || 1;
		}

		// sort nodes alphabetically, if same, compare returns 0 while jstree needs 1 or -1
		return (aNode.text || '').localeCompare(bNode.text || '') || 1;
	}
	promptForSave() {
        let isDirty = this._zephyrStore.getState().global.isDirty;
        if (this.doDirtyCheck && isDirty && !confirm('There is unsaved data in the testcase. Are you sure you want to continue?')) {
            return true;
        }
        this._zephyrStore.dispatch(this.globalAction.clearDirtyCheck());
        return false;

    }

  	onTreeExpand() {
		this.hoverCollapsed = false;
		// this.emitTreeState();
	}

  	onTreeCollapse() {
		jQuery.vakata.context.hide();
      	this.hoverCollapsed = true;
      	// this.emitTreeState();
  }

  // commenting as cycle tree update which requires more discussion.
  // emitTreeState(){
  //   this.treeStateUpdate.emit({hoverCollapsed: this.hoverCollapsed , treeDocked: this.treeDocked , showDocker:this.showDocker });
  // }
}
