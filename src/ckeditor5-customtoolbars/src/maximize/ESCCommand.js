
import Command from '@ckeditor/ckeditor5-core/src/command';
import $ from 'jquery';

// TODO: Esc Command is triggered on Minimize button Click , that is the way it is planned
export default class ESCCommand extends Command {

	constructor(editor, view) {
        super(editor);
        this.e=editor;
		this.view=view;
	}
	execute( options = {} ) {

                if(this.e.sourceElement.nextSibling.classList.contains("ckeditorfullsize"))
                {
                        this.e.ui.view.toolbar.items._items[8].element.classList.add("ck-hidden");
                        this.e.ui.view.toolbar.items._items[4].element.classList.remove("ck-hidden");
                        this.e.ui.view.toolbar.items._items[5].element.classList.add("ck-hidden");

                        this.view.element.classList.remove("ck-on");
                        this.view.element.classList.add("ck-off");

						//this.e.sourceElement.nextSibling.classList.remove("ckeditorfullsize");
						 $(this.e.sourceElement.nextSibling.children[0]).unwrap();
						//$('.ck-editor').unwrap();
                        this.e.sourceElement.nextSibling.style="";
                        this.e.sourceElement.nextSibling.children[3].children[0].style="";
                        document.getElementsByTagName('html')[0].style.overflow = ''
                        this.e.ui.view.toplabels._parentElement.classList.add("ck-hidden")
                        this.e.ui.view.wordsummary._parentElement.classList.remove("ck-hidden")
                }
	}

}
