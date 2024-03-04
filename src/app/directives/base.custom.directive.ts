import {Directive, ElementRef, OnInit} from "@angular/core";

@Directive({
  selector: '[appCustomDirective]'
})
export class BaseCustomDirective implements OnInit{
  constructor(private elementRef: ElementRef) {
  }
  ngOnInit(): void {
    this.elementRef.nativeElement.style.backgroundColor = 'green'
  }
}
