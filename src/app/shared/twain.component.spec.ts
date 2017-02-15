import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {TwainComponent} from './twain.component';
import {TwainService} from './twain.service';

describe('Twain Component', () => {

    let comp:       TwainComponent;
    let fixture:    ComponentFixture<TwainComponent>;
    let de:         DebugElement;
    let el:         HTMLElement;
    let spy:        jasmine.Spy;
    
    let twainService: TwainService;
    let testQuote = 'Test quote';


    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TwainComponent],
            providers: [TwainService]
        });

        fixture = TestBed.createComponent(TwainComponent);
        comp = fixture.componentInstance;

        // TwainService actually inject into the component
        twainService = TestBed.get(TwainService);

        // Setup spy on the `getQuote` method
        spy = spyOn(twainService, 'getQuote').and.returnValue(Promise.resolve(testQuote));

        // Get the Twain quote element by CSS selector (e.g., by class name)
        de = fixture.debugElement;
        el = de.nativeElement;
    });

    it('should not show quote before OnInit', () => {
        expect(el.textContent).toBe('', 'nothing displayed');
        expect(spy.calls.any()).toBe(false, 'getQuote not yet called');
    });

    it('should still not show quote after component initialized', () => {
        fixture.detectChanges();
        
        // getQuote service is async => still has not returned with quote
        expect(el.textContent).toBe('...', 'no quote yet');
        expect(spy.calls.any()).toBe(true, 'getQuote called');
    });

    it('should show quote after getQuote promise (async)', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => { // wait for async getQuote
            fixture.detectChanges();      // update view with quote
            expect(el.textContent).toBe(testQuote);
        });
    }));

    it('should show quote after getQuote promise (fakeAsync)', fakeAsync(() => {
        fixture.detectChanges();

        tick();                     // wait for async getQuote
        fixture.detectChanges();    // update view with quote
        expect(el.textContent).toBe(testQuote);
    }));
});