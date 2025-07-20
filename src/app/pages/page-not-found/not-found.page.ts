import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.page.html',
    styleUrls: ['./not-found.page.scss'],
    standalone: true,
    imports: [RouterModule]
})
export class NotFoundPage {
}