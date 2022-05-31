import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Token } from 'src/app/book-model';
import { PageSubstring } from 'src/app/page-sub-string';



@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @Input()
  appHighlight: PageSubstring[] = [];
  constructor(private el: ElementRef) {
  }
  /**
   * Highlight the page on hover
   */
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('yellow');
  }
  /**
     * Remove Highlight the page on mouse leave
     */
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  /**
   * 
   * @param color The highlight function
   */
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
    let element = this.el.nativeElement

    console.error(element);

  }

}
