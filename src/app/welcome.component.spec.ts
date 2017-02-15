import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {WelcomeComponent} from './welcome.component';
import {UserService} from './model';

describe('Welcome component', () => {

    let comp:           WelcomeComponent;
    let fixture:        ComponentFixture<WelcomeComponent>;
    let de:             DebugElement;
    let el:             HTMLElement;
    let userService:    UserService;

    let userServiceStub = {
        isLoggedIn: true,
        user: { name: 'Test User'}
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [WelcomeComponent],
            providers: [
                {provide: UserService, useValue: userServiceStub}
            ]
        });

        fixture = TestBed.createComponent(WelcomeComponent);
        comp = fixture.componentInstance;   // WelcomeComponent test instance

        // Always works :
        // userService = fixture.debugElement.injector.get(UserService);

        // UserService from the root injector
        userService = TestBed.get(UserService);

        de = fixture.debugElement.query(By.css('.welcome'));
        el = de.nativeElement;
    });

    it('should welcome the user', () => {
        fixture.detectChanges();

        const content = el.textContent;
        expect(content).toContain('Welcome', '"Welcome ..."');
        expect(content).toContain('Test User', 'expected name');
    });

    it('should welcome "Bubba"', () => {
        userService.user.name = 'Bubba'; // welcome message hasn't been shown yet
        fixture.detectChanges();

        expect(el.textContent).toContain('Bubba');
    });

    it('should request login if not logged in', () => {
        userService.isLoggedIn = false; // welcome message hasn't been shown yet
        fixture.detectChanges();

        const content = el.textContent;
        expect(content).not.toContain('Welcome', 'not welcomed');
        expect(content).toMatch(/log in/i, '"log in');
    });

});