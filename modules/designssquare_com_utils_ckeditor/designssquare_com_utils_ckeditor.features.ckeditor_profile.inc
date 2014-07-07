<?php
/**
 * @file
 * designssquare_com_utils_ckeditor.features.ckeditor_profile.inc
 */

/**
 * Implements hook_ckeditor_profile_defaults().
 */
function designssquare_com_utils_ckeditor_ckeditor_profile_defaults() {
    $module_path = drupal_get_path('module', 'designssquare_com_ckeditor');
    $data = array(
    'Advanced' => array(
      'name' => 'Advanced',
      'settings' => array(
        'ss' => 2,
        'toolbar' => '[
    [\'Image\',\'CodeSnippet\',\'Source\',\'DocProps\',\'DrupalBreak\',\'EqnEditor\',\'Googledocs\',\'leaflet\',\'MediaEmbed\',\'oembed\',\'Slideshow\',\'UIColor\',\'Uploadcare\',\'PageBreak\',\'Maximize\',\'Iframe\',\'Flash\',\'Preview\',\'Undo\',\'Redo\',\'Find\',\'Print\',\'Cut\',\'Copy\',\'Templates\'],
    \'/\',
    [\'Styles\',\'Format\',\'Font\',\'FontSize\',\'BGColor\',\'TextColor\',\'NewPage\',\'Paste\',\'PasteText\',\'PasteFromWord\',\'SpellChecker\',\'Scayt\',\'SelectAll\',\'RemoveFormat\',\'TransformTextSwitcher\',\'TransformTextToLowercase\',\'TransformTextToUppercase\',\'Replace\',\'TransformTextCapitalize\',\'SpecialChar\'],
    \'/\',
    [\'Bold\',\'Italic\',\'Underline\',\'Strike\',\'Subscript\',\'Superscript\',\'NumberedList\',\'BulletedList\',\'Outdent\',\'Indent\',\'Blockquote\',\'CreateDiv\',\'JustifyLeft\',\'JustifyCenter\',\'JustifyRight\',\'JustifyBlock\',\'BidiLtr\',\'BidiRtl\',\'Link\',\'Unlink\',\'Anchor\',\'Table\',\'HorizontalRule\',\'Language\',\'Smiley\']
]',
        'expand' => 't',
        'default' => 't',
        'show_toggle' => 't',
        'uicolor' => 'default',
        'uicolor_user' => 'default',
        'width' => '100%',
        'lang' => 'en',
        'auto_lang' => 't',
        'language_direction' => 'default',
        'allowed_content' => 'f',
        'extraAllowedContent' => '',
        'enter_mode' => 'p',
        'shift_enter_mode' => 'br',
        'font_format' => 'p;div;pre;address;h1;h2;h3;h4;h5;h6',
        'custom_formatting' => 'f',
        'formatting' => array(
          'custom_formatting_options' => array(
            'indent' => 'indent',
            'breakBeforeOpen' => 'breakBeforeOpen',
            'breakAfterOpen' => 'breakAfterOpen',
            'breakAfterClose' => 'breakAfterClose',
            'breakBeforeClose' => 0,
            'pre_indent' => 0,
          ),
        ),
        'css_mode' => 'none',
        'css_path' => '',
        'css_style' => 'theme',
        'styles_path' => '',
        'filebrowser' => 'imce',
        'filebrowser_image' => '',
        'filebrowser_flash' => '',
        'UserFilesPath' => '%b%f/',
        'UserFilesAbsolutePath' => '%d%b%f/',
        'forcePasteAsPlainText' => 'f',
        'html_entities' => 'f',
        'scayt_autoStartup' => 'f',
        'theme_config_js' => 'f',
        'js_conf' => '',
        'loadPlugins' => array(
          'autogrow' => array(
            'name' => 'autogrow',
            'desc' => 'DesignsSquare.com: CKEditor: Auto Grow plugin',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/autogrow_4.4.0/',
            'default' => 't',
            'buttons' => FALSE,
          ),
          'backgrounds' => array(
            'name' => 'backgrounds',
            'desc' => 'DesignsSquare.com: CKEditor: Background Image for Tables and Cells',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/backgrounds_1.5.1/',
            'default' => 't',
            'buttons' => FALSE,
          ),
          'codesnippet' => array(
            'name' => 'codesnippet',
            'desc' => 'DesignsSquare.com: CKEditor: Code Snippet plugin',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/codesnippet/',
            'default' => 't',
            'buttons' => array(
              'CodeSnippet' => array(
                'label' => 'Code Snippet',
                'icon' => 'icons/codesnippet.png',
              ),
            ),
          ),
          'confighelper' => array(
            'name' => 'confighelper',
            'desc' => 'DesignsSquare.com: CKEditor: Configuration Helper',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/confighelper_1.8.2/',
            'default' => 't',
            'buttons' => FALSE,
          ),
          'docprops' => array(
            'name' => 'docprops',
            'desc' => 'DesignsSquare.com: CKEditor: Document Properties',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/docprops_4.4.0/',
            'default' => 't',
            'buttons' => array(
              'DocProps' => array(
                'label' => 'Document Properties',
                'icon' => 'icons/docprops.png',
              ),
            ),
          ),
          'drupalbreaks' => array(
            'name' => 'drupalbreaks',
            'desc' => 'Plugin for inserting Drupal teaser and page breaks.',
            'path' => '%plugin_dir%drupalbreaks/',
            'buttons' => array(
              'DrupalBreak' => array(
                'label' => 'DrupalBreak',
                'icon' => 'images/drupalbreak.png',
              ),
            ),
            'default' => 't',
          ),
          'eqneditor' => array(
            'name' => 'eqneditor',
            'desc' => 'DesignsSquare.com: CKEditor: Equation Editor plugin',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/eqneditor/',
            'default' => 't',
            'buttons' => array(
              'EqnEditor' => array(
                'label' => 'Equation Editor',
                'icon' => 'icons/eqneditor.png',
              ),
            ),
          ),
          'fakeobjects' => array(
            'name' => 'fakeobjects',
            'desc' => 'DesignsSquare.com: CKEditor: Fake Objects plugin',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/fakeobjects_4.4.0/',
            'default' => 't',
            'buttons' => FALSE,
          ),
          'googledocs' => array(
            'name' => 'googledocs',
            'desc' => 'DesignsSquare.com: CKEditor: Google Docs Viewer plugin',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/googledocs/',
            'default' => 't',
            'buttons' => array(
              'Googledocs' => array(
                'label' => 'Google Docs Viewer',
                'icon' => 'icons/googledocs.png',
              ),
            ),
          ),
          'htmlbuttons' => array(
            'name' => 'htmlbuttons',
            'desc' => 'DesignsSquare.com: CKEditor: HTML Buttons',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/htmlbuttons_1.0/',
            'default' => 't',
            'buttons' => FALSE,
          ),
          'iframedialog' => array(
            'name' => 'iframedialog',
            'desc' => 'DesignsSquare.com: CKEditor: IFrame Dialog Field plugin',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/iframedialog_4.4.0/',
            'default' => 't',
            'buttons' => FALSE,
          ),
          'imce' => array(
            'name' => 'imce',
            'desc' => 'Plugin for inserting files from IMCE without image dialog',
            'path' => '%plugin_dir%imce/',
            'buttons' => array(
              'IMCE' => array(
                'label' => 'IMCE',
                'icon' => 'images/icon.png',
              ),
            ),
            'default' => 'f',
          ),
          'leaflet' => array(
            'name' => 'leaflet',
            'desc' => 'DesignsSquare.com: CKEditor: Leaflet plugin',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/leaflet/',
            'default' => 't',
            'buttons' => array(
              'leaflet' => array(
                'label' => 'Leaflet Map',
                'icon' => 'icons/leaflet.png',
              ),
            ),
          ),
          'letterspacing' => array(
            'name' => 'letterspacing',
            'desc' => 'DesignsSquare.com: CKEditor: Letter Spacing',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/ckeditor-letterspacing-0.1.0/',
            'default' => 't',
            'buttons' => FALSE,
          ),
          'lineutils' => array(
            'name' => 'lineutils',
            'desc' => 'DesignsSquare.com: CKEditor: LineUtils plugin',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/lineutils/',
            'default' => 't',
            'buttons' => FALSE,
          ),
          'maxheight' => array(
            'name' => 'maxheight',
            'desc' => 'DesignsSquare.com: CKEditor: Max Height',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/maxheight_4.0_0/',
            'default' => 't',
            'buttons' => FALSE,
          ),
          'mrmonkey' => array(
            'name' => 'mrmonkey',
            'desc' => 'DesignsSquare.com: CKEditor: MrMonkey - simulator',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/mrmonkey_1.0.0_0/',
            'default' => 't',
            'buttons' => array(
              'ToggleMrMonkey' => array(
                'label' => 'Toggle Mr Monkey',
                'icon' => 'icons/togglemrmonkey.png',
              ),
              'MrMonkeySettings' => array(
                'label' => 'Mr Monkey Settings',
                'icon' => 'icons/mrmonkeysettings.png',
              ),
            ),
          ),
          'oembed' => array(
            'name' => 'oembed',
            'desc' => 'DesignsSquare.com: CKEditor: Media (oEmbed) plugin',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/oembed_1.16/',
            'default' => 't',
            'buttons' => array(
              'oembed' => array(
                'label' => 'Media (oEmbed)',
                'icon' => 'icons/oembed.png',
              ),
            ),
          ),
          'showprotected' => array(
            'name' => 'showprotected',
            'desc' => 'DesignsSquare.com: CKEditor: Show Protected plugin',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/showprotected/',
            'default' => 't',
            'buttons' => FALSE,
          ),
          'slideshow' => array(
            'name' => 'slideshow',
            'desc' => 'DesignsSquare.com: CKEditor: SlideShow',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/SlideShow_1.05/',
            'default' => 't',
            'buttons' => array(
              'Slideshow' => array(
                'label' => 'Slide Show',
                'icon' => 'icons/slideshow.png',
              ),
            ),
          ),
          'sourcedialog' => array(
            'name' => 'sourcedialog',
            'desc' => 'DesignsSquare.com: CKEditor: Source Dialog plugin',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/sourcedialog_4.4.0/',
            'default' => 't',
            'buttons' => array(
              'Sourcedialog' => array(
                'label' => 'Source Dialog',
                'icon' => 'icons/sourcedialog.png',
              ),
            ),
          ),
          'tableresize' => array(
            'name' => 'tableresize',
            'desc' => 'DesignsSquare.com: CKEditor: Table Resize plugin',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/tableresize_4.4.0/',
            'default' => 't',
            'buttons' => FALSE,
          ),
          'textselection' => array(
            'name' => 'textselection',
            'desc' => 'DesignsSquare.com: CKEditor: Keep Text Selection',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/textselection_1.03/',
            'default' => 't',
            'buttons' => FALSE,
          ),
          'texttransform' => array(
            'name' => 'texttransform',
            'desc' => 'DesignsSquare.com: CKEditor: Text Transform',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/texttransform_1.1/',
            'default' => 't',
            'buttons' => array(
              'TransformTextSwitcher' => array(
                'label' => 'TransformTextSwitcher',
                'icon' => 'images/transformSwitcher.png',
              ),
              'TransformTextToLowercase' => array(
                'label' => 'TransformTextToLowercase',
                'icon' => 'images/transformToLower.png',
              ),
              'TransformTextToUppercase' => array(
                'label' => 'TransformTextToUppercase',
                'icon' => 'images/transformToUpper.png',
              ),
              'TransformTextCapitalize' => array(
                'label' => 'TransformTextCapitalize',
                'icon' => 'images/transformCapitalize.png',
              ),
            ),
          ),
          'uicolor' => array(
            'name' => 'uicolor',
            'desc' => 'DesignsSquare.com: CKEditor: UI Color plugin',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/uicolor_4.4.0/',
            'default' => 't',
            'buttons' => array(
              'UIColor' => array(
                'label' => 'UI Color',
                'icon' => 'icons/uicolor.png',
              ),
            ),
          ),
          'uploadcare' => array(
            'name' => 'uploadcare',
            'desc' => 'DesignsSquare.com: CKEditor: Uploadcare: Add media from anywhere',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/uploadcare_1.3.0/',
            'default' => 't',
            'buttons' => array(
              'Uploadcare' => array(
                'label' => 'Uploadcare',
                'icon' => 'images/logo.png',
              ),
            ),
          ),
          'widget' => array(
            'name' => 'widget',
            'desc' => 'DesignsSquare.com: CKEditor: Widget plugin',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/widget/',
            'default' => 't',
            'buttons' => FALSE,
          ),
          'xmas' => array(
            'name' => 'xmas',
            'desc' => 'DesignsSquare.com: CKEditor: Greetings Cards plugin',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/ckeditor-plugin-xmas-1.0.3/',
            'default' => 't',
            'buttons' => array(
              'Xmas' => array(
                'label' => 'Greetings Cards',
                'icon' => 'icons/xmas.png',
              ),
            ),
          ),
        ),
      ),
      'input_formats' => array(
        'filtered_html' => 'Filtered HTML',
      ),
    ),
    'CKEditor Global Profile' => array(
      'name' => 'CKEditor Global Profile',
      'settings' => array(
        'skin' => 'moono',
        'ckeditor_path' => '%l/ckeditor',
        'ckeditor_local_path' => '',
        'ckeditor_plugins_path' => '%m/plugins',
        'ckeditor_plugins_local_path' => '',
        'ckfinder_path' => '%m/ckfinder',
        'ckfinder_local_path' => '',
        'ckeditor_aggregate' => 'f',
        'toolbar_wizard' => 't',
        'loadPlugins' => array(),
      ),
      'input_formats' => array(),
    ),
    'Full' => array(
      'name' => 'Full',
      'settings' => array(
        'ss' => 2,
        'toolbar' => '[
    [\'Image\',\'CodeSnippet\',\'Source\',\'DocProps\',\'DrupalBreak\',\'EqnEditor\',\'Googledocs\',\'leaflet\',\'MediaEmbed\',\'oembed\',\'Slideshow\',\'UIColor\',\'Uploadcare\',\'PageBreak\',\'Maximize\',\'Iframe\',\'Flash\',\'Preview\',\'Undo\',\'Redo\',\'Find\',\'Print\',\'Cut\',\'Copy\',\'Templates\'],
    \'/\',
    [\'Styles\',\'Format\',\'Font\',\'FontSize\',\'BGColor\',\'TextColor\',\'NewPage\',\'Paste\',\'PasteText\',\'PasteFromWord\',\'SpellChecker\',\'Scayt\',\'SelectAll\',\'RemoveFormat\',\'TransformTextSwitcher\',\'TransformTextToLowercase\',\'TransformTextToUppercase\',\'Replace\',\'TransformTextCapitalize\',\'SpecialChar\'],
    \'/\',
    [\'Bold\',\'Italic\',\'Underline\',\'Strike\',\'Subscript\',\'Superscript\',\'NumberedList\',\'BulletedList\',\'Outdent\',\'Indent\',\'Blockquote\',\'CreateDiv\',\'JustifyLeft\',\'JustifyCenter\',\'JustifyRight\',\'JustifyBlock\',\'BidiLtr\',\'BidiRtl\',\'Link\',\'Unlink\',\'Anchor\',\'Table\',\'HorizontalRule\',\'Language\',\'Smiley\']
]',
        'expand' => 't',
        'default' => 't',
        'show_toggle' => 't',
        'uicolor' => 'default',
        'uicolor_user' => 'default',
        'width' => '100%',
        'lang' => 'en',
        'auto_lang' => 't',
        'language_direction' => 'default',
        'allowed_content' => 'f',
        'extraAllowedContent' => '',
        'enter_mode' => 'p',
        'shift_enter_mode' => 'br',
        'font_format' => 'p;div;pre;address;h1;h2;h3;h4;h5;h6',
        'custom_formatting' => 'f',
        'formatting' => array(
          'custom_formatting_options' => array(
            'indent' => 'indent',
            'breakBeforeOpen' => 'breakBeforeOpen',
            'breakAfterOpen' => 'breakAfterOpen',
            'breakAfterClose' => 'breakAfterClose',
            'breakBeforeClose' => 0,
            'pre_indent' => 0,
          ),
        ),
        'css_mode' => 'none',
        'css_path' => '',
        'css_style' => 'theme',
        'styles_path' => '',
        'filebrowser' => 'imce',
        'filebrowser_image' => '',
        'filebrowser_flash' => '',
        'UserFilesPath' => '%b%f/',
        'UserFilesAbsolutePath' => '%d%b%f/',
        'forcePasteAsPlainText' => 'f',
        'html_entities' => 'f',
        'scayt_autoStartup' => 'f',
        'theme_config_js' => 'f',
        'js_conf' => '',
        'loadPlugins' => array(
          'autogrow' => array(
            'name' => 'autogrow',
            'desc' => 'DesignsSquare.com: CKEditor: Auto Grow plugin',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/autogrow_4.4.0/',
            'default' => 't',
            'buttons' => FALSE,
          ),
          'backgrounds' => array(
            'name' => 'backgrounds',
            'desc' => 'DesignsSquare.com: CKEditor: Background Image for Tables and Cells',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/backgrounds_1.5.1/',
            'default' => 't',
            'buttons' => FALSE,
          ),
          'codesnippet' => array(
            'name' => 'codesnippet',
            'desc' => 'DesignsSquare.com: CKEditor: Code Snippet plugin',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/codesnippet/',
            'default' => 't',
            'buttons' => array(
              'CodeSnippet' => array(
                'label' => 'Code Snippet',
                'icon' => 'icons/codesnippet.png',
              ),
            ),
          ),
          'confighelper' => array(
            'name' => 'confighelper',
            'desc' => 'DesignsSquare.com: CKEditor: Configuration Helper',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/confighelper_1.8.2/',
            'default' => 't',
            'buttons' => FALSE,
          ),
          'docprops' => array(
            'name' => 'docprops',
            'desc' => 'DesignsSquare.com: CKEditor: Document Properties',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/docprops_4.4.0/',
            'default' => 't',
            'buttons' => array(
              'DocProps' => array(
                'label' => 'Document Properties',
                'icon' => 'icons/docprops.png',
              ),
            ),
          ),
          'drupalbreaks' => array(
            'name' => 'drupalbreaks',
            'desc' => 'Plugin for inserting Drupal teaser and page breaks.',
            'path' => '%plugin_dir%drupalbreaks/',
            'buttons' => array(
              'DrupalBreak' => array(
                'label' => 'DrupalBreak',
                'icon' => 'images/drupalbreak.png',
              ),
            ),
            'default' => 't',
          ),
          'eqneditor' => array(
            'name' => 'eqneditor',
            'desc' => 'DesignsSquare.com: CKEditor: Equation Editor plugin',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/eqneditor/',
            'default' => 't',
            'buttons' => array(
              'EqnEditor' => array(
                'label' => 'Equation Editor',
                'icon' => 'icons/eqneditor.png',
              ),
            ),
          ),
          'fakeobjects' => array(
            'name' => 'fakeobjects',
            'desc' => 'DesignsSquare.com: CKEditor: Fake Objects plugin',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/fakeobjects_4.4.0/',
            'default' => 't',
            'buttons' => FALSE,
          ),
          'googledocs' => array(
            'name' => 'googledocs',
            'desc' => 'DesignsSquare.com: CKEditor: Google Docs Viewer plugin',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/googledocs/',
            'default' => 't',
            'buttons' => array(
              'Googledocs' => array(
                'label' => 'Google Docs Viewer',
                'icon' => 'icons/googledocs.png',
              ),
            ),
          ),
          'htmlbuttons' => array(
            'name' => 'htmlbuttons',
            'desc' => 'DesignsSquare.com: CKEditor: HTML Buttons',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/htmlbuttons_1.0/',
            'default' => 't',
            'buttons' => FALSE,
          ),
          'iframedialog' => array(
            'name' => 'iframedialog',
            'desc' => 'DesignsSquare.com: CKEditor: IFrame Dialog Field plugin',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/iframedialog_4.4.0/',
            'default' => 't',
            'buttons' => FALSE,
          ),
          'imce' => array(
            'name' => 'imce',
            'desc' => 'Plugin for inserting files from IMCE without image dialog',
            'path' => '%plugin_dir%imce/',
            'buttons' => array(
              'IMCE' => array(
                'label' => 'IMCE',
                'icon' => 'images/icon.png',
              ),
            ),
            'default' => 'f',
          ),
          'leaflet' => array(
            'name' => 'leaflet',
            'desc' => 'DesignsSquare.com: CKEditor: Leaflet plugin',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/leaflet/',
            'default' => 't',
            'buttons' => array(
              'leaflet' => array(
                'label' => 'Leaflet Map',
                'icon' => 'icons/leaflet.png',
              ),
            ),
          ),
          'letterspacing' => array(
            'name' => 'letterspacing',
            'desc' => 'DesignsSquare.com: CKEditor: Letter Spacing',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/ckeditor-letterspacing-0.1.0/',
            'default' => 't',
            'buttons' => FALSE,
          ),
          'lineutils' => array(
            'name' => 'lineutils',
            'desc' => 'DesignsSquare.com: CKEditor: LineUtils plugin',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/lineutils/',
            'default' => 't',
            'buttons' => FALSE,
          ),
          'maxheight' => array(
            'name' => 'maxheight',
            'desc' => 'DesignsSquare.com: CKEditor: Max Height',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/maxheight_4.0_0/',
            'default' => 't',
            'buttons' => FALSE,
          ),
          'mrmonkey' => array(
            'name' => 'mrmonkey',
            'desc' => 'DesignsSquare.com: CKEditor: MrMonkey - simulator',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/mrmonkey_1.0.0_0/',
            'default' => 't',
            'buttons' => array(
              'ToggleMrMonkey' => array(
                'label' => 'Toggle Mr Monkey',
                'icon' => 'icons/togglemrmonkey.png',
              ),
              'MrMonkeySettings' => array(
                'label' => 'Mr Monkey Settings',
                'icon' => 'icons/mrmonkeysettings.png',
              ),
            ),
          ),
          'oembed' => array(
            'name' => 'oembed',
            'desc' => 'DesignsSquare.com: CKEditor: Media (oEmbed) plugin',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/oembed_1.16/',
            'default' => 't',
            'buttons' => array(
              'oembed' => array(
                'label' => 'Media (oEmbed)',
                'icon' => 'icons/oembed.png',
              ),
            ),
          ),
          'showprotected' => array(
            'name' => 'showprotected',
            'desc' => 'DesignsSquare.com: CKEditor: Show Protected plugin',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/showprotected/',
            'default' => 't',
            'buttons' => FALSE,
          ),
          'slideshow' => array(
            'name' => 'slideshow',
            'desc' => 'DesignsSquare.com: CKEditor: SlideShow',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/SlideShow_1.05/',
            'default' => 't',
            'buttons' => array(
              'Slideshow' => array(
                'label' => 'Slide Show',
                'icon' => 'icons/slideshow.png',
              ),
            ),
          ),
          'sourcedialog' => array(
            'name' => 'sourcedialog',
            'desc' => 'DesignsSquare.com: CKEditor: Source Dialog plugin',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/sourcedialog_4.4.0/',
            'default' => 't',
            'buttons' => array(
              'Sourcedialog' => array(
                'label' => 'Source Dialog',
                'icon' => 'icons/sourcedialog.png',
              ),
            ),
          ),
          'tableresize' => array(
            'name' => 'tableresize',
            'desc' => 'DesignsSquare.com: CKEditor: Table Resize plugin',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/tableresize_4.4.0/',
            'default' => 't',
            'buttons' => FALSE,
          ),
          'textselection' => array(
            'name' => 'textselection',
            'desc' => 'DesignsSquare.com: CKEditor: Keep Text Selection',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/textselection_1.03/',
            'default' => 't',
            'buttons' => FALSE,
          ),
          'texttransform' => array(
            'name' => 'texttransform',
            'desc' => 'DesignsSquare.com: CKEditor: Text Transform',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/texttransform_1.1/',
            'default' => 't',
            'buttons' => array(
              'TransformTextSwitcher' => array(
                'label' => 'TransformTextSwitcher',
                'icon' => 'images/transformSwitcher.png',
              ),
              'TransformTextToLowercase' => array(
                'label' => 'TransformTextToLowercase',
                'icon' => 'images/transformToLower.png',
              ),
              'TransformTextToUppercase' => array(
                'label' => 'TransformTextToUppercase',
                'icon' => 'images/transformToUpper.png',
              ),
              'TransformTextCapitalize' => array(
                'label' => 'TransformTextCapitalize',
                'icon' => 'images/transformCapitalize.png',
              ),
            ),
          ),
          'uicolor' => array(
            'name' => 'uicolor',
            'desc' => 'DesignsSquare.com: CKEditor: UI Color plugin',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/uicolor_4.4.0/',
            'default' => 't',
            'buttons' => array(
              'UIColor' => array(
                'label' => 'UI Color',
                'icon' => 'icons/uicolor.png',
              ),
            ),
          ),
          'uploadcare' => array(
            'name' => 'uploadcare',
            'desc' => 'DesignsSquare.com: CKEditor: Uploadcare: Add media from anywhere',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/uploadcare_1.3.0/',
            'default' => 't',
            'buttons' => array(
              'Uploadcare' => array(
                'label' => 'Uploadcare',
                'icon' => 'images/logo.png',
              ),
            ),
          ),
          'widget' => array(
            'name' => 'widget',
            'desc' => 'DesignsSquare.com: CKEditor: Widget plugin',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/widget/',
            'default' => 't',
            'buttons' => FALSE,
          ),
          'xmas' => array(
            'name' => 'xmas',
            'desc' => 'DesignsSquare.com: CKEditor: Greetings Cards plugin',
            'path' => '%base_path%'.$module_path.'/ckeditor-plugins/ckeditor-plugin-xmas-1.0.3/',
            'default' => 't',
            'buttons' => array(
              'Xmas' => array(
                'label' => 'Greetings Cards',
                'icon' => 'icons/xmas.png',
              ),
            ),
          ),
        ),
      ),
      'input_formats' => array(
        'full_html' => 'Full HTML',
      ),
    ),
  );
  return $data;
}
