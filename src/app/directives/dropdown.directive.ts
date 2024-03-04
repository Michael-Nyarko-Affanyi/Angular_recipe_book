import {Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2} from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective implements OnInit{
  @HostBinding('class.open') isOpen: boolean = false

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('document:click', ['$event']) onClick(event: Event) {
    if(this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = !this.isOpen
    } else {
      this.isOpen = false
    }
  }

  ngOnInit() {
  }
}
