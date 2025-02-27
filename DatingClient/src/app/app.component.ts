import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NavComponent} from "./nav/nav.component";

@Component({
    selector: 'da-root',
    standalone: true,
    imports: [CommonModule, NavComponent, RouterOutlet],
    templateUrl: "./app.component.html",
    styles: [],
})
export class AppComponent {

}
