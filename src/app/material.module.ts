import { NgModule } from "@angular/core";
import { MatInputModule } from "@angular/material/input"
import { MatButtonModule } from "@angular/material/button"
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDialogModule } from "@angular/material/dialog";
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


const modules= [
MatInputModule,
MatButtonModule,
MatTableModule,
MatDialogModule,
MatCardModule,
MatChipsModule,
MatPaginatorModule,
MatListModule,
MatGridListModule,
MatToolbarModule,
MatIconModule,
MatProgressSpinnerModule
];

@NgModule({
    imports: modules,
    exports: modules,
    declarations:[]
})
export class MaterialModule{}