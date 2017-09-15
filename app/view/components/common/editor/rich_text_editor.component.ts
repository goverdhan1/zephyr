import {Output, EventEmitter, Component, AfterViewInit, Input, OnDestroy} from '@angular/core';


// Constants
import {I18N_MESSAGES} from '../../../../utils/messages/messages.en';

declare var jQuery: any, tinymce;

@Component({
    selector: 'zee-rich-text-editor',
    template: '<textarea id="{{editorId}}"></textarea>'
})

export class RichTextEditorComponent implements AfterViewInit, OnDestroy {
    @Input() editorId;
    @Input() editorContent;
    @Input() height = 100;
    @Input() maxLength = 10000;
    @Input() editable = true;
    @Output() onKeyUp: EventEmitter<any> = new EventEmitter();
    i18nMessages = I18N_MESSAGES;
    private editor;
    private editorDebounce;
    private validKeys = [8, 16, 17, 35, 36, 37, 38, 39, 40, 46];
    ngAfterViewInit() {
        this.editor = `textarea#${this.editorId}`;
        tinymce.remove(this.editor);
        this.initEditor();
    }
    ngOnDestroy() {
        tinymce.remove(this.editor);
    }
    reInitEditor(editorContent) {
        this.editorContent = editorContent;
        tinymce.remove(this.editor);
        this.initEditor();
    }
    initEditor() {
        if (this.editorDebounce) {
            clearTimeout(this.editorDebounce);
            this.editorDebounce = null;
        }

        this.editorDebounce = setTimeout(() => {
            this.editorDebounce = null;
            jQuery(this.editor).val(this.editorContent);
            tinymce.init({
                selector: this.editor,
                height: this.height,
                skin_url: '/html5/assets/css/skins/lightgray',
                content_style: 'label {display: block;}',
                plugins: ['link textcolor lists legacyoutput'],
                readonly : !this.editable,
                resize: true,
                max_height: 400,
                menubar: false,
                branding: false,
                statusbar: true,
                setup : this.setupTinyMce.bind(this),
                link_context_toolbar: true,
                toolbar: 'fontselect fontSizeButton | bold italic underline | forecolor ' +
                    '| alignleft aligncenter alignright alignjustify | bullist | link',

            });


            // let editor = tinymce.get(this.editorId);
            // if (editor) {
            //     editor.execCommand('fontName', false, 'Arial', {skip_focus: true});
            // }
        }, 200);
    }
    setupTinyMce(ed) {
      this.onInitTinyMce(ed);
      this.addFontListTinyMce(ed);
      this.listenOnNodeTinyMce(ed);

      if (this.onKeyUp) {
        ed.on('keyup', () => {
          var content = tinymce.get(this.editorId).getContent();
          this.onKeyUp.emit(content);
        });
      }

    }

    onInitTinyMce(ed) {
        ed.on('SetContent', e => {

            jQuery(e.target.getBody()).find('font').each((i, f) => {
                f.style.fontSize = `${Number(jQuery(f).attr('size'))}px`;
            });
        });
        ed.on('BeforeSetContent', e => {
            e.content = e.content.replace(/\r?\n/g, '<br/>');
        });
    }
    updateFontTinyMce(ed, val) {
        jQuery(ed.selection.getNode()).find('font').addBack().each((i, f) => {
            f.size = Number(val);
            f.style.fontSize = val;
        });
    }
    addFontListTinyMce(ed) {
        ed.addButton('fontSizeButton', {
            id: 'fontSizeButton',
            type: 'listbox',
            text: 'My listbox',
            icon: false,
            onselect: e => {
                let val = e.target.value();
                ed.execCommand('fontSize', false, val);
                this.updateFontTinyMce(ed, val.split('px')[0]);
            },
            values: [
                { text: '8px', value: '8px' }, { text: '9px', value: '9px' },
                { text: '10px', value: '10px' }, { text: '11px', value: '11px' },
                { text: '12px', value: '12px' }, { text: '14px', value: '14px' },
                { text: '16px', value: '16px' }, { text: '18px', value: '18px' },
                { text: '20px', value: '20px' }, { text: '22px', value: '22px' },
                { text: '24px', value: '24px' }, { text: '26px', value: '26px' },
                { text: '28px', value: '28px' }, { text: '36px', value: '36px' },
                { text: '48px', value: '48px' }, { text: '72px', value: '72px' }
            ],
            onPostRender: () => {
                // Select the second item by default
                jQuery('#fontSizeButton').find('.mce-txt').html('Font Size');
            }
        });
    }
    listenOnNodeTinyMce(ed) {
        ed.on('NodeChange', target => {
            let fontSize = (target.element.size) ? target.element.size + 'px' :
                getComputedStyle(target.element)['font-size'];

            if (fontSize) {
                jQuery('#fontSizeButton').find('.mce-txt').html(fontSize);
            }

            jQuery('#fontSizeButton').prev().find('.mce-txt').html(target.element.face || 'Arial');
        });
        ed.on('KeyDown', target => {
            let key = target.keyCode;
            return -1 !== this.validKeys.indexOf(key) || (ed.getContent().length + String.fromCharCode(key).length <= this.maxLength);
        });
    }
    getEditorContent() {
        let editor = tinymce.get(this.editorId);
        return editor && editor.getContent instanceof Function ? editor.getContent() : '';
    }
    setEditorContent(val) {
        let editor = tinymce.get(this.editorId);
        if (editor && editor.setContent instanceof Function) {
            editor.setContent(val);
        }
    }
}
