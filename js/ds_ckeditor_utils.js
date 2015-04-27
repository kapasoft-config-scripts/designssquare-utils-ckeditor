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
            log_on = false,
            ck_loaded = false,//false beforing importing js/css and adding wrappers.
            tear_down = false;//temp solution for overcame async nature of ck_loaded to avoid reconstract while tear down is happening

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
                    //import rest of the js libraries
                    _write_js_imports(next_index);
                }
//                var base = BASE_URL || '/';
                script.src = js_scripts[index]['path'];
//                script.src = Drupal.settings.basePath + js_scripts[index]['path'];
                script.$ = script;
                if(js_scripts[index]['options']['scope'] == 'header'){
                    ck_dom().head.appendChild(script);
                }else{
                    ck_dom().body.appendChild(script);
                }

                return;
            } else {
                return _import_inline_js();
            }
        }

        var _clean = function () {
            var jData = jQuery('<div>' + ck_editor().getData() + '</div>');

            var withoutWraps = _removeWraps(jData);//removes wrapped layout before and after the content
            var cleanText = _removeElements(withoutWraps);//removes all the removable elements content

            //set textarea
            $("#" + textId).val(cleanText.html());

            //set CKeditor content itself
            //@ToDo setData appears not working...need to be fixed
            ck_editor().setData(
                cleanText.html(),
                {
                    callback : function () {
                        this.updateElement();
                        ck_editor().fire( 'saveSnapshot' );
                        if (log_on){console.log('removed wraps and elements. The editor data was reset....')};
                    }
                },
                true
            );
            return cleanText.html();
        }

        var _removeElements = function (jData) {
            $.each(desposable_elements, function (index, obj) {
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
            return jData;
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
                editor.document.appendStyleSheet(css);
//                editor.document.appendStyleSheet('/' + css);

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
                ck_dom().body.appendChild(inline);
            });
        }

        /**
         * appends tags before and after the current content of the editor
         * @param wrap
         *      an object with 'prefix' and 'postfix' attributes containing tags to add before and after the content of editor
         */
        var _reconstruct_dom = function (wrap) {
            //@ToDo refactor to use setData or some CKEDITOR Api instead of appending children

            //imports jQuery to ensure its present before wrapping
            var script = ck_dom().createElement('script');
            script.type = 'text/javascript';
            script.onload = function () {
                if (log_on)console.log('imported jQuery lib before wrapping');
                //add wraps
                _wrap();
            }
            script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.js';
            script.$ = script;
            ck_dom().head.appendChild(script);
        }

        var _wrap = function(){
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
                    if(ck_loaded )//ensure its loaded before cleaning
                        tear_down = true;
                        //update status
                        ck_loaded = false;
                        _clean();
                });
            });
            if(window.CKEDITOR){
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

                    //prevent empty anchor tag for being removed
                    CKEDITOR.dtd.$removeEmpty['a'] = 0;

                    //disable filters
                    ev.editor.on('customConfigLoaded', function () {
                        ev.editor.config.allowedContent = true;
                        //allow php code
//                        ev.editor.config.protectedSource = [];
                    });


                    if (ev.editor.name == textId) {
                        ev.editor.on('afterModeUnload', function(evt){
                            if(ck_loaded){
                                ck_loaded = false;
                                evt.data = _clean();
                            }
                            console.log('cleaned editor content on mode change');
                        });
                        ev.editor.on('contentDomUnload', function (evt) {
                            if(ck_loaded){//only clean when loaded
                                _clean();
                                //update status
                                ck_loaded = false;
                            }
                        });
                        ev.editor.on('contentDom', function (evt) {
                            if(!ck_loaded && !tear_down){//checks if not already loaded and if we are not tear_down mode
                                _importCss();
                                //add wrappers before importing js
                                if (ck_editor().getData() && !ck_editor().editable().find('ckeditor-wrapper-end').count()) {
                                    _reconstruct_dom(wrap);//@ToDo Ensure wrapping html finishes before proceeding on importing js
                                }
                                _write_js_imports(0);//@ToDo We are under assumption that the first is JQuery library inserted in header, but if user provides other than JS lib inserted in body then we have extra garbage to clean

                                //sets the current state
                                ck_loaded=true;
                            }
                        });
                    }
                });
            }
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
                _clean();
                //update status
                ck_loaded = false;
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
            getDom: function () {
                return ck_dom();
            },
            getEditor: function () {
                return ck_editor();
            },
            turnOnDebug: function () {
                log_on = true;
            },
            getStatus: function (){
                return ck_loaded;
            },
            setStatus: function (status){
                ck_loaded = status;
            }
        }
        return CKEDITOR_DS;
    })(jQuery);
}


//CKEDITOR_DS.turnOnDebug();
CKEDITOR_DS.init();