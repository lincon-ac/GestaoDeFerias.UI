import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ferias } from 'src/app/models/Ferias';
import { Funcionario } from 'src/app/models/Funcionario';
import { FeriasService } from 'src/app/services/ferias.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-delete-ferias',
  templateUrl: './delete-ferias.component.html',
  styleUrls: ['./delete-ferias.component.scss'],
})
export class DeleteFeriasComponent {
  idFerias: number | null = null;
  ferias: Ferias | null = null;
  idFuncionario: number | null = null;
  funcionario: Funcionario | null = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public feriasService: FeriasService,
    public funcionarioService: FuncionarioService
  ) {}

  async ngOnInit(): Promise<void> {
    const feriasIdParam = this.activatedRoute.snapshot.paramMap.get(
      'id'
    ) as string;
    const idFerias = feriasIdParam ? parseInt(feriasIdParam) : null;
    if (idFerias) {
      this.idFerias = idFerias;
      await this.getFerias();
    }
  }

  async getFerias(): Promise<void> {
    if (this.idFerias) {
      this.ObterFerias(this.idFerias);
    }
  }

  async getFuncionario(idFuncionario: number): Promise<void> {
    if (idFuncionario) {
      this.ObterFuncionario(idFuncionario);
    }
  }

  ObterFerias(idFerias: number) {
    this.feriasService.ObterFerias(idFerias).subscribe(
      (response: Ferias) => {
        this.ferias = response;
        this.idFuncionario = response.FuncionarioId;
        this.getFuncionario(response.FuncionarioId);
      },
      (error) => console.error(error),
      () => {}
    );
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

  deleteFerias() {
    const feriasIdParam = this.activatedRoute.snapshot.paramMap.get(
      'id'
    ) as string;
    this.feriasService.DeleteFerias(parseInt(feriasIdParam)).subscribe(
      () => {
        this.goToListFerias();
      },
      (error) => console.error(error),
      () => {}
    );
  }

  goToListFerias() {
    this.router.navigate(['/ferias/list']);
  }
}
