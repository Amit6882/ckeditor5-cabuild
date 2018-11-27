
import Command from '@ckeditor/ckeditor5-core/src/command';


export default class ESCCommand extends Command {

	constructor(editor, view) {
        super(editor);
        this.e=editor;		
		this.view=view;
	}
	execute( options = {} ) {
       
                if(this.e.sourceElement.nextSibling.classList.contains("ckeditorfullsize"))
                {
                        this.e.ui.view.toolbar.items._items[5].element.classList.add("ck-hidden");
                        this.view.element.classList.remove("ck-on");
                        this.view.element.classList.add("ck-off");
                        this.e.sourceElement.nextSibling.classList.remove("ckeditorfullsize");
                        this.e.sourceElement.nextSibling.style="";
                        this.e.sourceElement.nextSibling.children[3].children[0].style="";
                        document.getElementsByTagName('html')[0].style.overflow = ''
                        this.e.ui.view.toplabels._parentElement.classList.add("ck-hidden")
                        this.e.ui.view.wordsummary._parentElement.classList.remove("ck-hidden")
                }

                if(this.e.ui.view.accessibilitymodel._items[0].element.style.display === "block")
                {
                        this.e.ui.view.accessibilitymodel._items[0].element.style.display="none";
                        this.e.ui.view.editable.editableElement.focus();
                }
	}
			
}