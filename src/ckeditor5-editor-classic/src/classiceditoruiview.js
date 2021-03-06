/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module editor-classic/classiceditoruiview
 */

import CustomBoxedEditorUIView from '../../ckeditor5-ui/src/customboxededitoruiview';
import InlineEditableUIView from '@ckeditor/ckeditor5-ui/src/editableui/inline/inlineeditableuiview';
import StickyPanelView from '@ckeditor/ckeditor5-ui/src/panel/sticky/stickypanelview';
import ToolbarView from '@ckeditor/ckeditor5-ui/src/toolbar/toolbarview';
import LabelView from '@ckeditor/ckeditor5-ui/src/label/labelview';

import uid from '@ckeditor/ckeditor5-utils/src/uid';

import '../theme/classiceditor.css';

/**
 * Classic editor UI view. Uses an inline editable and a sticky toolbar, all
 * enclosed in a boxed UI view.
 *
 * @extends module:ui/editorui/boxed/boxededitoruiview~BoxedEditorUIView
 */
export default class ClassicEditorUIView extends CustomBoxedEditorUIView {
	/**
	 * Creates an instance of the classic editor UI view.
	 *
	 * @param {module:utils/locale~Locale} locale The {@link module:core/editor/editor~Editor#locale} instance.
	 */
	constructor(editor, locale ) {
		super( locale );

		/**
		 * Sticky panel view instance. This is a parent view of a {@link #toolbar}
		 * that makes toolbar sticky.
		 *
		 * @readonly
		 * @member {module:ui/panel/sticky/stickypanelview~StickyPanelView}
		 */
		this.stickyPanel = new StickyPanelView( locale );

		/**
		 * Toolbar view instance.
		 *
		 * @readonly
		 * @member {module:ui/toolbar/toolbarview~ToolbarView}
		 */
		this.toolbar = new ToolbarView( locale );

		/**
		 * Editable UI view.
		 *
		 * @readonly
		 * @member {module:ui/editableui/inline/inlineeditableuiview~InlineEditableUIView}
		 */
		this.editable = new InlineEditableUIView( locale );


		//-----------------------------Start Custom Code Add for CommonApp---------------------------------------

		const ariaLabelUidForWordCount = uid();
		this.maxword = editor.config.get( 'maxword' );
		this.minword = editor.config.get( 'minword' );
		if(this.minword == "")
		{
			this.minword=0;
		}

		this._voiceLabelViewForWordCount = this._createVoiceLabel( ariaLabelUidForWordCount );
		this._voiceLabelViewForWordCount.text = '0/' + this.maxword + " words";
		this.wordCount = new LabelView( locale );
		this.wordCount.text =  '0/' + this.maxword + " words";

		this.wordCount.extendTemplate( {
			attributes: {
				class: 'wordCount',
				'aria-labelledby': `ck-editor__aria-label_${ ariaLabelUidForWordCount }`
			},
		} );


		const ariaLabelUidForMaxMin = uid();
		this._voiceLabelViewForMaxMin = this._createVoiceLabel( ariaLabelUidForMaxMin );
		this._voiceLabelViewForMaxMin.text =  `Min: ${ this.minword } / Max: ${ this.maxword }`;

		this.wordMinMax = new LabelView( locale );
		this.wordMinMax.text = `Min: ${ this.minword } / Max: ${ this.maxword }`;
		this.wordMinMax.extendTemplate( {
			attributes: {
				class: 'wordMinMax',
				'aria-labelledby': `ck-editor__aria-label_${ ariaLabelUidForMaxMin }`
			},

		} );


		const ariaLabelUidForrichtext = uid();
		this._richtexteditor = this._createVoiceLabel( ariaLabelUidForrichtext );
		this._richtexteditor.text =  `Rich Text Editor, Press Alt+0 for help`;

		this.editable.extendTemplate( {
			attributes: {
				'aria-labelledby': editor.config.get( 'ariadescribedby' ) + " " + `ck-editor__aria-label_${ ariaLabelUidForMaxMin }` + " " + `ck-editor__aria-label_${ ariaLabelUidForrichtext }`
			},
		} );

		this.ErrorMsg = new LabelView( locale );
		this.ErrorMsg.text = ``;
		this.ErrorMsg.extendTemplate( {
			attributes: {
				class: 'errorword'
			},
		} );


		this.wordCountTop = new LabelView( locale );
		this.wordCountTop.text =  '0/' + this.maxword + " words";
		this.wordCountTop.extendTemplate( {
			attributes: {
				class: 'word-count-top'
			},
		} );

		this.wordMinMaxTop = new LabelView( locale );
		this.wordMinMaxTop.text = `Min: ${ this.minword } / Max: ${ this.maxword }`;
		this.wordMinMaxTop.extendTemplate( {
			attributes: {
				class: 'word-min-max-top'
			},
		} );

		this.LabelTop = new LabelView( locale );
		this.LabelTop.text = editor.config.get( 'questionlabel' );
		this.LabelTop.extendTemplate( {
			attributes: {
				class: 'questiontext'
			},
		} );

		//Set the asterisk if required
		//TODO: Need to a find a better way to this, with limited knowledge following the documentation @ https://ckeditor.com/docs/ckeditor5/latest/api/module_ui_label_labelview-LabelView.html	
		if(editor.config.get( 'isrequired' )){
			this.LabelTop.render();
			this.LabelTop.element.innerHTML = `${this.LabelTop.text}<span class="has-text-red">*</span>`;
		}		
		//-----------------------------End Custom Code Add for CommonApp---------------------------------------
	}

	/**
	 * @inheritDoc
	 */
	render() {
		super.render();

		// Set toolbar as a child of a stickyPanel and makes toolbar sticky.
		this.stickyPanel.content.add( this.toolbar );

		this.top.add( this.stickyPanel );
		this.main.add( this.editable );


		//Custom Added for CommonApp
		this.toplabels.add( this.LabelTop );
		this.toplabels.add( this.wordMinMaxTop );
		this.toplabels.add( this.wordCountTop );
		this.toplabels.add( this.ErrorMsg );
		this.wordsummary.add( this.wordMinMax );
		this.wordsummary.add( this._voiceLabelViewForMaxMin );
		this.wordsummary.add( this.wordCount );
		this.wordsummary.add( this._voiceLabelViewForWordCount );
		this.main.add(this._richtexteditor);
		//End

	}

	/**
	 * @inheritDoc
	 */
	get editableElement() {
		return this.editable.element;
	}


	//Custom Added for CommonApp

	/**
	 * Creates a voice label view instance.
	 *
	 * @private
	 * @returns {module:ui/label/labelview~LabelView}
	 */
	_createVoiceLabel( ariaLabelUid ) {
		const t = this.t;
		const voiceLabel = new LabelView();
		voiceLabel.extendTemplate( {
			attributes: {
				id: `ck-editor__aria-label_${ ariaLabelUid }`,
				class: 'ck-voice-label'
			}
		} );

		return voiceLabel;
	}
}
