import { Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
    selector: '[appFallback]'
})
export class FallbackDirective {
    @Input() fallbackText: string;

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

    @HostListener('error', ['$event']) onError(event: Event) {
        // this.renderer.createElement(this.elementRef.nativeElement.parentNode, 'div');
    }
}
