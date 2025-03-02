import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NavComponent} from "./nav/nav.component";
import {NgxSpinnerComponent} from "ngx-spinner";

@Component({
    selector: 'da-root',
    standalone: true,
    imports: [CommonModule, NavComponent, RouterOutlet, NgxSpinnerComponent],
    templateUrl: "./app.component.html",
    styles: [],
})
export class AppComponent {

}
