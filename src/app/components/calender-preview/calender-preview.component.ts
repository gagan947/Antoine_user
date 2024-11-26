import { ChangeDetectorRef, Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-calender-preview',
  templateUrl: './calender-preview.component.html',
  styleUrl: './calender-preview.component.css'
})
export class CalenderPreviewComponent {
  loading: boolean = false;
  data: any;
  year: any;
  month: any;
  daysInMonth: number[] = [];
  calendarData: any[] = [];
  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  constructor(
    private service: SharedService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.route.queryParams.subscribe((params) => {
      this.year = params['year'] ? params['year'] : undefined
      this.month = params['month'] ? params['month'] : undefined
      this.getAlbum()
    });
  }

  ngOnInit() {
    // this.getAlbum()
  }

  getAlbum() {
    this.loading = true
    let apiUrl = `image/getimage-yearandmonth`
    let formData = new URLSearchParams()
    formData.set('year', this.year)
    formData.set('month', this.month)

    this.service.post(apiUrl, formData.toString()).subscribe(res => {
      if (res.success) {
        this.data = res.data
        this.initializeCalendar(this.year, this.month);
      } else {
        this.loading = false
      }
    })
  }

  initializeCalendar(year: number, month: string) {
    let MonthNo: any = this.getMonthNumber(month)
    this.calendarData = this.getWeeks(year, MonthNo);
    this.cdr.detectChanges();
  }

  getWeeks(year: number, month: number) {
    const weeks = [];
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 0).getDay();

    let day = 1;
    let week = [];

    const adjustedFirstDay = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;

    for (let i = 0; i < adjustedFirstDay; i++) {
      week.push(null);
    }

    while (day <= daysInMonth) {
      const dateToCheck = new Date(year, month - 1, day);

      const matchingData = this.data.find((item: { created_at: string | number | Date; }) => {
        const createdDate = new Date(item.created_at);
        return createdDate.getFullYear() === dateToCheck.getFullYear() &&
          createdDate.getMonth() === dateToCheck.getMonth() &&
          createdDate.getDate() === dateToCheck.getDate();
      });
      week.push({
        day,
        image: matchingData ? matchingData.image : null
      });

      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
      day++;
    }

    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      weeks.push(week);
    }
    this.loading = false
    return weeks;
  }

  getMonthNumber(monthName: string): number | null {

    const monthIndex = this.months.findIndex(
      (month) => month.toLowerCase() === monthName.toLowerCase()
    );

    return monthIndex !== -1 ? monthIndex + 1 : null;
  }


  nextMonth() {
    let currentMonthIndex = this.months.indexOf(this.month);

    if (currentMonthIndex < this.months.length - 1) {
      currentMonthIndex++;
    } else {
      currentMonthIndex = 0;
      this.year++;
    }

    this.navigateToMonth(this.year, this.months[currentMonthIndex]);
  }

  previousMonth() {
    let currentMonthIndex = this.months.indexOf(this.month);

    if (currentMonthIndex > 0) {
      currentMonthIndex--;
    } else {
      currentMonthIndex = this.months.length - 1;
      this.year--;
    }

    this.navigateToMonth(this.year, this.months[currentMonthIndex]);
  }

  private navigateToMonth(year: number, month: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { year, month },
      queryParamsHandling: 'merge',
    });
  }
}
