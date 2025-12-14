import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UsuarioApiService } from './usuario-api.service';

describe('UsuarioApiService', () => {
  let service: UsuarioApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UsuarioApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
