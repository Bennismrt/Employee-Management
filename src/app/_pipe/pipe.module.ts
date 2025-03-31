import { NgModule } from '@angular/core';
import { RupiahPipe } from './rupiah/rupiah.pipe';

@NgModule({
    declarations: [RupiahPipe],
    exports: [RupiahPipe],
})
export class PipeModule { }
