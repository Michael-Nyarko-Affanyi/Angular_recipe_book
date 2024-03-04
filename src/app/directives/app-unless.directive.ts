import {Directive, Input, ViewContainerRef, OnInit, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class AppUnlessDirective implements OnInit{
  @Input('appUnless') set unless(value: boolean) {
    if(!value) {
      this.vcRef.createEmbeddedView(this.templateRef)
    } else {
      this.vcRef.clear()
    }
  };

  constructor(private vcRef: ViewContainerRef, private templateRef: TemplateRef<any>) { }

  ngOnInit() {}

}
