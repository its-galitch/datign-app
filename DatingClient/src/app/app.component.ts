import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {NavComponent} from "./nav/nav.component";
import {AccountService} from './_services/account.service';
import {HomeComponent} from './home/home.component';

@Component({
    selector: 'da-root',
    standalone: true,
    imports: [CommonModule, NavComponent, HomeComponent, RouterOutlet],
    templateUrl: "./app.component.html",
    styles: [],
})
export class AppComponent {

}
