import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  email: any;

  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.auth.getUser().subscribe((user) => {
      this.email = user?.email;
    });
  }

  ngOnInit(): void {}

  async handleSignOut() {
    try {
      await this.auth.signOut();
      //this.router.navigateByUrl(['/']);
      this.toastr.success('Logged out successfully');
    }catch(e: any) {
      this.toastr.error(e.message);
    }
  }
}
