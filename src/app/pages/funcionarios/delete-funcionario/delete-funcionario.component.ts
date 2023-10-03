import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario } from 'src/app/models/Funcionario';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-delete-funcionario',
  templateUrl: './delete-funcionario.component.html',
  styleUrls: ['./delete-funcionario.component.scss'],
})
export class DeleteFuncionarioComponent {
  idFuncionario: number | null = null;
  funcionario: Funcionario | null = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public funcionarioService: FuncionarioService
  ) {}

  async ngOnInit(): Promise<void> {
    const funcionarioIdParam = this.activatedRoute.snapshot.paramMap.get(
      'id'
    ) as string;
    const idFuncionario = funcionarioIdParam
      ? parseInt(funcionarioIdParam)
      : null;
    if (idFuncionario) {
      this.idFuncionario = idFuncionario;
      await this.getFuncionario();
    }
  }

  async getFuncionario(): Promise<void> {
    if (this.idFuncionario) {
      this.ObterFuncionario(this.idFuncionario);
    }
  }

  ObterFuncionario(idFuncionario: number) {
    this.funcionarioService.ObterFuncionario(idFuncionario).subscribe(
      (response: Funcionario) => {
        this.funcionario = response;
      },
      (error) => console.error(error),
      () => {}
    );
  }

  deleteFuncionario() {
    const funcionarioIdParam = this.activatedRoute.snapshot.paramMap.get(
      'id'
    ) as string;
    this.funcionarioService
      .DeleteFuncionario(parseInt(funcionarioIdParam))
      .subscribe(
        () => {
          this.goToListFuncionarios();
        },
        (error) => console.error(error),
        () => {}
      );
  }

  goToListFuncionarios() {
    this.router.navigate(['/funcionario/list']);
  }
}
