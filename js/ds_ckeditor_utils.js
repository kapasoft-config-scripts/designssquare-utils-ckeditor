if (!window.CKEDITOR_DS) {
    /**
     * This is the API entry point. The entire CKEditor code runs under this object.
     * @class CKEDITOR
     * @singleton
     */
    window.CKEDITOR_DS = (function ($) {

        var text_id = location.href.match('/configure') ? 'edit-body-value' : 'edit-body-und-0-value';

        var textId = text_id,
            js_inline = [],//holds all the inline js to add editor
            js_scripts = [],//holds all scripts to import in editor
            css_styles = [],//holds css styles to import
            desposable_elements = [], //element ref which content needs to be removed at clean time
            wrap = {},//holds object of tags to add before and after conent editor
            body_class = {},//holds classes to add to body tag
            log_on = false;

//        var ck_dom = (CKEDITOR.instances[textId]) ? CKEDITOR.instances[textId].document.$ : {};
        var ck_dom = function () {
            if (CKEDITOR.instances[textId]) {
                return CKEDITOR.instances[textId].document.$;
            } else {
                return {};
            }
        }

        var ck_editor = function () {
            if (CKEDITOR.instances[textId]) {
                return CKEDITOR.instances[textId];
            } else {
                return {};
            }
        }

        var _write_js_imports = function (index) {
            var js_to_add = '';
            if (js_scripts[index]) {
                var next_index = index + 1;
                var script = ck_dom().createElement('script');
                script.type = 'text/javascript';
                script.onload = function () {
                    if (log_on)console.log('script ' + js_scripts[index]['path'] + ' loaded');
                    //after importing jquery at index 0, we append wrappers to the body DOM depending on region
                    if (index == 0) {
                        if (ck_editor().getData() && !ck_dom().body.getElementsByClassName('ckeditor-wrapper-end').length) {
                            _reconstruct_dom(wrap);
                        }
                    }
                    //import rest of the js libraries
                    _write_js_imports(next_index);
                }
                script.src = '/' + js_scripts[index]['path'];
                script.$ = script;
                ck_dom().head.appendChild(script);
                return;
            } else {
                return _import_inline_js();
            }
        }

        var _clean = function (textId) {
            var decodedOldHtml = ck_editor().getData();
            var jData = jQuery(decodedOldHtml);

            var newData = _removeWraps(jData);//removes wrapped layout before and after the content
            _removeElements(newData);//removes all the removable elements content

            //set textarea
            $('#' + textId).html(newData.html());
            //set CKeditor content itself
            //@ToDo setData appears not working...need to be fixed
            editor.setData(newData.html(), {
                callback: function () {
                    this.updateElement();
                    if (log_on)console.log('removed wraps....:');
                }
            });

        }

        var _removeElements = function (jData) {
            $.each(desposable_elements, function (index, obj) {
//                var target = jData.find(id);
//                if(target.length == 1){
//                    target.empty();
//                }else if(target.length >= 1){
//
//                }
                jData.find(obj['id']).each(function () {
                    if (obj['remove'] == 'element') {
                        var cnt = $(this).contents();
                        $(this).replaceWith(cnt);
                        if (log_on)console.log('the element with reference: ' + obj['id'] + ' was removed');
                    } else if (obj['remove'] == 'content') {
                        $(this).empty();
                        if (log_on)console.log('the content for element with reference: ' + obj['id'] + ' was removed');
                    } else if (obj['remove'] == 'attr') {
                        var element = $(this);
                        $.each(obj['attr'], function () {
                            element.removeAttr(this);
                            if (log_on)console.log('the attribute ' + this + ' for element with reference: ' + obj['id'] + ' was removed');
                        });
                    }
//                    }else if(obj['remove'] == 'attr-replace'){
//                    $.each(obj['attr'],function(attribute,value){
//                        $(this).attr(attribute.value);
//                        if(log_on)console.log('the attribute ' + this + ' for element with reference: ' + obj['id'] + ' was removed');
//                    });
                });
            });
        }


        var _removeWraps = function (jData) {

            var newHtml = (jData.find('.ckeditor-wrapper-end').length) ? jData.find('.ckeditor-wrapper-end') : jData;
            return newHtml;
        }

        /**
         * takes each CSS style and appends to header for the editor
         * @returns {*}
         */
        var _importCss = function () {
            editor = ck_editor();
            $.each(css_styles, function (index, css) {
                editor.document.appendStyleSheet('/' + css);
                if (log_on)console.log('css file ' + css + ' imported');
            });
        }

        /**
         * creates script element, puts the inline js and appends to the head of editor
         * @param $inline
         *      list of objects each containing the inline js
         */
        var _import_inline_js = function () {
            $.each(js_inline, function (index, obj) {
                var inline = ck_dom().createElement('script');
                inline.type = 'text/javascript';
                if (log_on)console.log('write inline js: ' + obj);
                var textNode = ck_dom().createTextNode(obj);
                inline.appendChild(textNode);
                ck_dom().head.appendChild(inline);
            });
        }

        /**
         * appends tags before and after the current content of the editor
         * @param wrap
         *      an object with 'prefix' and 'postfix' attributes containing tags to add before and after the content of editor
         */
        var _reconstruct_dom = function (wrap) {
            //@ToDo refactor to use setData CKEDITOR Api instead of appending children
//                ck_dom = this.ck_dom();
            //add wraps
            var inline = ck_dom().createElement('script');
            inline.type = 'text/javascript';
            var domWraps = 'if($(\'body\').length > 0){ $(\'body\').html(\'' + wrap['prefix'] + '\' + $(\"body\").html() + \'' + wrap['postfix'] + '\');}';
            if (log_on)console.log('adding content wrapper - ' + wrap['prefix'] + '[BODY]' + wrap['postfix']);
            var textBodyWraps = ck_dom().createTextNode(domWraps);
            inline.appendChild(textBodyWraps);

            //add body class
            var bodyClasses = '$(\'body\').addClass(\'' + body_class + '\');';
            if (log_on)console.log('update body classes - ' + body_class);
            var textNodeBody = ck_dom().createTextNode(bodyClasses);
            inline.appendChild(textNodeBody);

            ck_dom().head.appendChild(inline);
        }

        var _init = function () {
            $(window.document).ready(function ($) {
                $('#edit-submit').on('click', function (e) {
                    _clean(textId);
                });
            });

            CKEDITOR.on('instanceCreated', function (ev) {
                //ensure the following tags are not removed when empty
                CKEDITOR.dtd.$removeEmpty['b'] = 0;
                CKEDITOR.dtd.$removeEmpty['em'] = 0;
                CKEDITOR.dtd.$removeEmpty['i'] = 0;
                CKEDITOR.dtd.$removeEmpty['label'] = 0;
                CKEDITOR.dtd.$removeEmpty['small'] = 0;
                CKEDITOR.dtd.$removeEmpty['span'] = 0;
                CKEDITOR.dtd.$removeEmpty['strong'] = 0;
                CKEDITOR.dtd.$removeEmpty['u'] = 0;
                //make sure LI is not wrapped within UL
                delete CKEDITOR.dtd.$listItem['li'];
                delete CKEDITOR.dtd.$intermediate['li'];
                //make sure OPTIONS can be edited
                delete CKEDITOR.dtd.$nonEditable['option'];

                //disable filters
                ev.editor.on('customConfigLoaded', function () {
                    ev.editor.config.allowedContent = true;
                });

                if (ev.editor.name == textId) {
                    ev.editor.on('contentDomUnload', function () {
                        var data = ev.editor.getData();
                        var jData = jQuery(data);
                        if (jData.find('.ckeditor-wrapper-end').length) {
                            _clean(textId);
                        }
                    });
                    ev.editor.on('contentDom', function () {
                        _write_js_imports(0);
                    });
                }
            });

            CKEDITOR.on('instanceReady', function (ev) {
                var editor = ev.editor;
                if (editor.name == textId) {
                    _importCss();
                }
            });
        }

        var CKEDITOR_DS = {
            add_js_script: function (obj) {
                js_scripts.push(obj);
            },
            add_js_inline: function (obj) {
                js_inline.push(obj);
            },
            add_disposable_elements: function (obj) {
                desposable_elements.push(obj);
            },
            add_css: function (obj) {
                css_styles.push(obj);
            },
            set_wrap: function (obj) {
                wrap = obj;
            },
            set_body_class: function (obj) {
                body_class = obj;
            },
            removeWraps: function (textId) {
                _clean(textId);
            },
            write_js_imports: function (index) {
                _write_js_imports(index);
            },
            reconstruct_dom: function (wrap) {
                _reconstruct_dom(wrap);
            },
            import_inline_js: function () {
                _import_inline_js();
            },
            importCss: function () {
                _importCss();
            },
            init: function () {
                _init();
            },
            editorId: function () {
                return text_id;
            },
            turnOnDebug: function () {
                log_on = true;
            }

        }
        return CKEDITOR_DS;
    })(jQuery);
}


CKEDITOR_DS.turnOnDebug();
CKEDITOR_DS.init();