import { TestBed, inject } from '@angular/core/testing';

import { ThongBaoService } from './thong-bao.service';

describe('ThongBaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThongBaoService]
    });
  });

  it('should be created', inject([ThongBaoService], (service: ThongBaoService) => {
    expect(service).toBeTruthy();
  }));
});
