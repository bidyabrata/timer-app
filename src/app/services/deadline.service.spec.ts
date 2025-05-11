import { TestBed } from '@angular/core/testing';

import { DeadlineService } from './deadline.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('DeadlineService', () => {
  let service: DeadlineService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeadlineService]
    });
    service = TestBed.inject(DeadlineService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should fetch seconds left to deadline from API', (done) => {
    const mockResponse = { secondsLeft: 20 };

    service.getSecondsLeftToDeadline().subscribe((data) => {
      expect(data).toEqual(mockResponse);
      done();
    });

    const req = httpTestingController.expectOne('/api/deadline');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});