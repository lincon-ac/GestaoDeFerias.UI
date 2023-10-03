import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Departamento } from 'src/app/models/Departamento';
import { DepartamentoService } from 'src/app/services/departamento.service';

@Component({
  selector: 'app-delete-departamento',
  templateUrl: './delete-departamento.component.html',
  styleUrls: ['./delete-departamento.component.scss'],
})
export class DeleteDepartamentoComponent {
  idDepartamento: number | null = null;
  departamento: Departamento | null = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public departamentoService: DepartamentoService
  ) {}

  async ngOnInit(): Promise<void> {
    const departamentoIdParam = this.activatedRoute.snapshot.paramMap.get(
      'id'
    ) as string;
    const idDepartamento = departamentoIdParam
      ? parseInt(departamentoIdParam)
      : null;
    if (idDepartamento) {
      this.idDepartamento = idDepartamento;
      await this.getDepartamento();
    }
  }

  async getDepartamento(): Promise<void> {
    if (this.idDepartamento) {
      this.ObterDepartamento(this.idDepartamento);
    }
  }

  ObterDepartamento(idDepartamento: number) {
    this.departamentoService.ObterDepartamento(idDepartamento).subscribe(
      (response: Departamento) => {
        this.departamento = response;
      },
      (error) => console.error(error),
      () => {}
    );
  }

  deleteDepartamento() {
    const departamentoIdParam = this.activatedRoute.snapshot.paramMap.get(
      'id'
    ) as string;
    this.departamentoService
      .DeleteDepartamento(parseInt(departamentoIdParam))
      .subscribe(
        () => {
          this.goToListDepartamentos();
        },
        (error) => console.error(error),
        () => {}
      );
  }

  goToListDepartamentos() {
    this.router.navigate(['/departamento/list']);
  }
}
