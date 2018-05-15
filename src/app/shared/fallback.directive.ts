import { Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
    selector: '[appFallback]'
})
export class FallbackDirective {
    @Input() fallbackText: string;

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

    @HostListener('error') onError(eventData: Event) {
        console.log('there was an error!');
        this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
    }
}
