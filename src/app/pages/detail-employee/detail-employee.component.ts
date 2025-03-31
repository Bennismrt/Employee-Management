import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/_model/app.model';
import { BankDataEmployeeService } from 'src/app/_service/app.service';

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.scss']
})
export class DetailEmployeeComponent implements OnInit {
    detailEmployee = {} as Employee | undefined
    employeeId: string = ''
    constructor(
        private service: BankDataEmployeeService,
        private route: ActivatedRoute,
        private router: Router
    ){}

    ngOnInit(): void {
        this.employeeId = this.route.snapshot.paramMap.get('id')!;
        if(this.employeeId){
            this.detailEmployee = this.service.getDetailEmployees(this.employeeId)
        }
    }

    backToHomepage(){
        const allParams = this.route.snapshot.queryParams;
        let param = `?currentPage=${allParams['currentPage'] ? allParams['currentPage'] : '0'}&pageSize=${allParams['pageSize'] ? allParams['pageSize'] : '10'}${allParams['search1'] ? '&search1=' + allParams['search1'] : ''}${allParams['search2'] ? '&search2=' + allParams['search2'] : ''}${allParams['sort'] ? '&sort=' + allParams['sort'] : ''}`;
        this.router.navigateByUrl('/' + param)
    }
}
