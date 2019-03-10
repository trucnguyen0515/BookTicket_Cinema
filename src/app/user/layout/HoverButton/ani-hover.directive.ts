import { Directive, ElementRef, OnInit, Renderer2, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appAniHover]'
})
export class AniHoverDirective {

  constructor(private elementRef:ElementRef, private render:Renderer2) { }

  @HostListener("mouseenter") SuKienEnter(eventData:Event)
  {
    this.render.addClass(this.elementRef.nativeElement,"animated");
    this.render.addClass(this.elementRef.nativeElement,"swing");
  }
  @HostListener("mouseleave") SuKienLeave(eventData:Event)
  {
    this.render.removeClass(this.elementRef.nativeElement,"animated");
    this.render.removeClass(this.elementRef.nativeElement,"swing");
  }

}
